import {getIronSession} from "iron-session"
import {cookies} from "next/headers"
import {redirect} from "next/navigation"
import {getUser} from "@/app/repositories/user_repository"

export type SessionData = {
  userId?: number
}

export async function getSession() {
  // If using this in a real application, the password should be treated as a secret and
  // stored outside of version control.
  const session = await getIronSession<SessionData>(cookies(),
    {password: "gc8avA38V49cL1fcCNqcH9VMHk5A52VX", cookieName: "SESSION", cookieOptions: {secure: false}})
  return session
}

export async function getCurrentUserId() {
  const session = await getSession();

  return session.userId
}

export async function getCurrentUser() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) {
    return null
  }

  return getUser(currentUserId)
}

export async function authenticate() {
  const userId = await getCurrentUserId()
  if (!userId) {
    redirect("/sessions/create")
  }
}

export async function authenticateAndReturnCurrentUser() {
  const userId = await getCurrentUserId()
  const user = userId && await getUser(userId)
  if (!user) redirect("/sessions/create")

  return user
}

export async function isAuthenticated() {
  return !!(await getCurrentUserId())
}

