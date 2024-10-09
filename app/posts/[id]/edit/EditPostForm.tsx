"use client"

import {useFormState} from "react-dom"
import {Post, User} from "@prisma/client"
import FormBody from "@/app/posts/components/FormBody"
import {updatePostAction} from "@/app/posts/actions"

export default function EditPostForm({post, users}: { post: Post, users: User[] }) {
  const [errors, formAction] = useFormState(updatePostAction.bind(null, post.id), null)

  return <form action={formAction} id="edit-post-form">
    <FormBody post={post} errors={errors} users={users}/>
  </form>
}
