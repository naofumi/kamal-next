"use server"

import {seedAll} from "@/app/repositories/seed"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"

export async function seedAllAction() {
  await seedAll()
  revalidatePath("/")
  redirect("/users")
}

