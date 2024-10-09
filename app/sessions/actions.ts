"use server"

import {notFound, redirect} from "next/navigation"
import {getSession} from "@/app/helpers/session_helper"
import {headers} from "next/headers"
import {isSafeRedirect} from "@/app/helpers/redirect_helpers"
import {getUser} from "@/app/repositories/user_repository"

export async function createSession(formData: FormData): Promise<void> {
  const user = await getUser(formData.get('userId') as string) || notFound()

  const session = await getSession()
  // Renewing the session after login to prevent session fixation attacks.
  // https://en.wikipedia.org/wiki/Session_fixation
  // This may be unnecessary with the iron-session scheme
  session.destroy()
  session.userId = user.id
  await session.save()

  const headersList = headers();
  const host = headersList.get('host')
  const redirectLocation = formData.get("referer") as string || "/"

  if (isSafeRedirect(redirectLocation, host)) {
    redirect(redirectLocation)
  } else {
    throw new Error(`Cannot confirm safety of redirect location: ${redirectLocation} from host: ${host}`)
  }
}

export async function destroySession() {
  const session = await getSession()
  session.userId = undefined
  session.destroy()

  redirect("/")
}

