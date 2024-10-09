"use client"
import {useFormState} from "react-dom"
import {createUserAction} from "@/app/users/actions"
import FormBody from "@/app/users/components/FormBody"
import {Prisma} from "@prisma/client"

export default function CreateUserForm({user}: {user: Prisma.UserCreateInput}) {
  const [errors, formAction] = useFormState(createUserAction, null)

  return <form action={formAction} id="create-user-form">
    <FormBody user={user} errors={errors}/>
  </form>
}
