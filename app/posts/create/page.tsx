import TopNavigation from "@/app/TopNavigation"
import {newPost} from "@/app/repositories/post_repository"
import CreatePostForm from "@/app/posts/create/CreatePostForm"
import {getUsers} from "@/app/repositories/user_repository"
import Link from "next/link"
import _ from "lodash"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CreatePostPage() {
  const post = newPost()
  const rawUsers = await getUsers()
  const users = rawUsers.map(user => _.pick(user, ["name", "id"]))


  return (
    <TopNavigation title="Create New Post" current="posts">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        <Link href="/posts" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          form="create-post-form"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Create Post
        </button>
      </div>
      <CreatePostForm post={post} users={users}/>
    </TopNavigation>
  )
}
