import {getUserWithPosts} from "@/app/repositories/user_repository"
import {notFound} from "next/navigation"
import TopNavigation from "@/app/TopNavigation"
import _ from "lodash"
import Link from "next/link"
import UserPosts from "@/app/users/[id]/UserPosts"
import {userPermission} from "@/app/helpers/permissions_helpers"
import {getCurrentUser} from "@/app/helpers/session_helper"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UserShowPage({params}: { params: { id: string } }) {
  const rawCurrentUser = await getCurrentUser()
  const currentUser = rawCurrentUser &&  _.pick(rawCurrentUser, "name", "email", "id")
  const rawUser = await getUserWithPosts(params.id) || notFound()
  const rawPosts = rawUser.posts
  const posts = rawPosts.map(post => _.pick(post, "title", "published", "id"))
  const user = {...(_.pick(rawUser, "name", "email", "id")), posts}

  return (
    <TopNavigation title="Show User" current="users">
      <div className="absolute top-0 right-0">
        {userPermission("update", user, currentUser) &&
        <Link href={`/users/${user.id}/edit`}
              className="inline-block rounded-md bg-orange-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Edit user
        </Link>
        }
      </div>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
            </div>
            <div>
              <div className="px-4 py-6 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Posts</dt>
                <UserPosts posts={user.posts}/>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </TopNavigation>
  )
}
