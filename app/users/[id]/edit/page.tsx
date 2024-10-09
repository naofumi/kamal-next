import {getUser} from "@/app/repositories/user_repository"
import TopNavigation from "@/app/TopNavigation"
import EditUserForm from "./EditUserForm"
import {notFound, redirect} from "next/navigation"
import Link from "next/link"
import {authenticateAndReturnCurrentUser} from "@/app/helpers/session_helper"
import {userPermission} from "@/app/helpers/permissions_helpers"
import _ from "lodash"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UserPage({params}: { params: { id: string } }) {
  const rawCurrentUser = await authenticateAndReturnCurrentUser()
  const rawUser = await getUser(params.id) || notFound()
  if (!userPermission("update", rawUser, rawCurrentUser)) { redirect("/sessions/create") }

  const user = rawCurrentUser &&  _.pick(rawUser, "name", "email", "id")

  return (
    <TopNavigation title="Edit User" current="users">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        <Link href={`/users/${user.id}`} className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          form="edit-user-form"
          type="submit"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Update User
        </button>
      </div>
      <EditUserForm user={user}/>
    </TopNavigation>
  )
}
