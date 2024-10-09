"use server"

import {createUser, deleteUser, getUser, updateUser} from "@/app/repositories/user_repository"
import {revalidatePath} from "next/cache"
import {notFound, redirect} from "next/navigation"
import {validateUser, ValidationUserErrors} from "@/app/users/user_validator"
import {authenticateAndReturnCurrentUser} from "@/app/helpers/session_helper"
import {userPermission} from "@/app/helpers/permissions_helpers"

export async function updateUserAction(
  userId: string | number,
  previousState: ValidationUserErrors,
  formData: FormData
) {
  const currentUser = await authenticateAndReturnCurrentUser()
  const user = await getUser(userId) || notFound()
  if (!userPermission("update", user, currentUser)) { redirect("/sessions/create") }

  // Explicitly specify the fields that we want to include from formData.
  // Do not use Object.fromEntries(formData) without whitelisting, since this
  // would be vulnerable to mass-assignment attacks.
  const {validatedFields, errors} = validateUser({
    ...user,
    name: formData.get("name") as string | null,
    email: formData.get("email") as string,
  })

  if (validatedFields.success) {
    await updateUser(validatedFields.data, user.id)

    revalidatePath("/")
    redirect("/users")
  } else {
    return errors
  }
}

export async function createUserAction(
  previousState: ValidationUserErrors,
  formData: FormData
) {
  // Explicitly specify the fields that we want to include from formData.
  // Do not use Object.fromEntries(formData) without whitelisting, since this
  // would be vulnerable to mass-assignment attacks.
  const {validatedFields, errors} = validateUser({
    name: formData.get("name") as string | null,
    email: formData.get("email") as string,
  })
  const currentUser = await authenticateAndReturnCurrentUser()
  if (!userPermission("create", null, currentUser)) { return redirect("/sessions/create") }

  if (validatedFields.success) {
    await createUser(validatedFields.data)

    revalidatePath("/")
    redirect("/users")
  } else {
    return errors
  }
}

export async function deleteUserAction(userId: number) {
  const currentUser = await authenticateAndReturnCurrentUser()
  const user = await getUser(userId)
  if (!userPermission("delete", user, currentUser)) { redirect("/sessions/create") }

  await deleteUser(userId)

  revalidatePath("/")
}

