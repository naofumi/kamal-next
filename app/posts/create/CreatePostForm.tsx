"use client"
import {useFormState} from "react-dom"
import {createPostAction} from "@/app/posts/actions"
import FormBody from "@/app/posts/components/FormBody"
import {Prisma, User} from "@prisma/client"

export default function CreatePostForm({post, users}:
  {post: Prisma.PostCreateInput | Prisma.PostCreateWithoutAuthorInput, users: Pick<User, "name" | "id">[]}) {
  const [errors, formAction] = useFormState(createPostAction, null)

  return <form action={formAction} id="create-post-form">
    <FormBody post={post} errors={errors} users={users}/>
  </form>
}
