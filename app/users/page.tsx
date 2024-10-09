import {getUsers} from "@/app/repositories/user_repository"
import TopNavigation from "@/app/TopNavigation"
import UsersTable from "@/app/users/components/UsersTable"
import _ from "lodash"
import {getCurrentUser} from "@/app/helpers/session_helper"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UsersPage() {
  const rawUsers = await getUsers();
  const users = rawUsers.map(rawUser => _.pick(rawUser, "name", "email", "id"))
  const rawCurrentUser = await getCurrentUser()
  const currentUser = rawCurrentUser &&  _.pick(rawCurrentUser, "name", "email", "id")

  return (
    <TopNavigation title="Users" current="users">
      <UsersTable users={users} currentUser={currentUser} />
    </TopNavigation>
  )
}
