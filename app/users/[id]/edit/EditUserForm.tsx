"use client"

import {useFormState} from "react-dom"
import {updateUserAction} from "@/app/users/actions"
import {User} from "@prisma/client"
import FormBody from "@/app/users/components/FormBody"

export default function EditUserForm({user}: { user: User }) {
  const [errors, formAction] = useFormState(updateUserAction.bind(null, user.id), null)

  return <form action={formAction} id="edit-user-form">
    <FormBody user={user} errors={errors}/>
  </form>
}
