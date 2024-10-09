import {remark} from 'remark';
import html from 'remark-html';
import {notFound} from "next/navigation"
import {getPost} from "@/app/repositories/post_repository"
import TopNavigation from "@/app/TopNavigation"
import _ from "lodash"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function showPostPage({params}: { params: { id: string } }) {
  // 必要以上の情報を漏洩しないように、必要なプロパティを明示的に宣言する
  const postRaw = await getPost(params.id) || notFound()
  const post = _.pick(postRaw, "title", "content", "author", "published", "id")

  const contentHtml = post.content
    ? (await remark().use(html).process(post.content)).toString()
    : ""

  return (
    <TopNavigation title="" current="posts">
      <div className="absolute top-0 right-0 flex items-center justify-end gap-x-6">
        <Link href="/posts" className="text-sm font-semibold leading-6 text-gray-900">
          Return to List
        </Link>
        {post.published
          ? <div className="rounded-md border-2 border-orange-600 px-3 py-2 text-sm font-semibold text-orange-600">
            Published
          </div>
          : <div className="rounded-md border-2 border-gray-300 px-3 py-2 text-sm font-semibold text-gray-300">
            Draft
          </div>
        }
        <Link
          href={`/posts/${post.id}/edit`}
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Edit Post
        </Link>
      </div>
      <div className="mt-8 max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-center">{post.title}</h1>
        <div className="mt-8 max-w-2xl mx-auto text-center text-2xl text-gray-600">{post.author.name}</div>
        <div className="mt-16 max-w-2xl mx-auto">
          <div dangerouslySetInnerHTML={{__html: contentHtml}}/>
        </div>
      </div>
    </TopNavigation>
  )
}
