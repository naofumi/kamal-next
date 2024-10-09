import {getUsers} from "@/app/repositories/user_repository"
import TopNavigation from "@/app/TopNavigation"
import EditPostForm from "./EditPostForm"
import {notFound} from "next/navigation"
import {getPost} from "@/app/repositories/post_repository"
import _ from "lodash"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostPage({params}: { params: { id: string } }) {
  // 必要以上の情報を漏洩しないように、必要なプロパティを明示的に宣言する
  const postRaw = await getPost(params.id) || notFound()
  const post = _.pick(postRaw, "id", "title", "content", "author", "published", "authorId")
  const usersRaw = await getUsers()
  const users = usersRaw.map((user) => _.pick(user, "id", "name", "email"))

  return (
    <TopNavigation title="Edit Post" current="posts">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        <Link href={`/posts/${post.id}`} className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          form="edit-post-form"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Update Post
        </button>
      </div>
      <EditPostForm post={post} users={users}/>
    </TopNavigation>
  )
}
