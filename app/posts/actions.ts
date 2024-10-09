"use server"

import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"
import {validatePost, ValidatePostErrors} from "@/app/posts/post_validator"
import {createPost, deletePost, updatePost} from "@/app/repositories/post_repository"
import {ParseStringAsBoolean, ParseStringAsNumber} from "@/app/helpers/type_helpers"

export async function updatePostAction(
  postId: string | number,
  previousState: ValidatePostErrors,
  formData: FormData
) {
  const {validatedFields, errors} = validatePost(params(formData))

  if (validatedFields.success) {
    await updatePost(validatedFields.data, Number(postId))

    revalidatePath("/")
    redirect(`/posts/${postId}`)
  } else {
    return errors
  }
}

export async function createPostAction(
  previousState: ValidatePostErrors,
  formData: FormData
) {
  const {validatedFields, errors} = validatePost(params(formData))

  if (validatedFields.success) {
    const {authorId, ...rest} = validatedFields.data
    await createPost(rest, {authorId})

    revalidatePath("/")
    redirect("/posts")
  } else {
    return errors
  }
}

export async function deletePostAction(postId: number) {
  await deletePost(postId)

  revalidatePath("/posts")
}

function params(formData: FormData) {
  return {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    published: ParseStringAsBoolean(formData.getAll("published")?.at(-1) as string),
    authorId: ParseStringAsNumber(formData.get("authorId") as string),
  }
}
