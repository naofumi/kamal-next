import TopNavigation from "@/app/TopNavigation"
import CreateUserForm from "@/app/users/create/CreateUserForm"
import {newUser} from "@/app/repositories/user_repository"
import {authenticate} from "@/app/helpers/session_helper"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CreateUserPage() {
  await authenticate()

  const user = newUser()

  return (
    <TopNavigation title="Create New User" current="users">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        <Link href="/users" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          form="create-user-form"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Create User
        </button>
      </div>
      <CreateUserForm user={user}/>
    </TopNavigation>
  )
}
