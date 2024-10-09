import {getPosts} from "@/app/repositories/post_repository"
import TopNavigation from "@/app/TopNavigation"
import PostsTable from "@/app/posts/components/PostsTable"
import Link from "next/link"
import {postPermission} from "@/app/helpers/permissions_helpers"
import {getCurrentUser} from "@/app/helpers/session_helper"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostsPage() {
  const posts = await getPosts();
  const currentUser = await getCurrentUser()

  return (
    <TopNavigation title="Posts" current="posts">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        {postPermission("create", null, currentUser) && <Link href={`posts/create`}
               className="inline-block rounded-md bg-orange-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Create new post
        </Link>}
      </div>
      <PostsTable posts={posts} currentUser={currentUser} />
    </TopNavigation>
  )
}
