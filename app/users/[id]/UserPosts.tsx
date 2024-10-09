import {Post} from "@prisma/client"

export default function UserPosts({posts}: { posts: Pick<Post, "title" | "id" | "published">[] }) {
  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-4 pl-4">
      <div className="py-2 px-4 border rounded">
      <table className="w-full">
        <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left">Status</th>
          <th className="text-left">Title</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {posts.map((post, i) => (
          <tr key={i} className="h-12 border-b border-gray-200 last:border-none">
            <td className="h-6 w-20 text-gray-400">{post.published ? "published" : "draft"}</td>
            <td className="w-auto truncate font-medium">{post.title}</td>
            <td className="w-20">
              <a href={`/posts/${post.id}`} className="font-medium text-orange-600 hover:text-orange-500">
                Show
              </a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>


{/*
      <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
        {posts.map((post, i) => (
          <li key={i} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="flex-shrink-0 text-gray-400">{post.published ? "published" : "draft"}</span>
                <span className="truncate font-medium">{post.title}</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a href={`/posts/${post.id}`} className="font-medium text-orange-600 hover:text-orange-500">
                Show
              </a>
            </div>
          </li>
        ))}
      </ul>
*/}
    </dd>
  )
}
