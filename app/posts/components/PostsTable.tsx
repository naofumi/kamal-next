import {Post, User} from "@prisma/client"
import Link from "next/link"
import {deletePostAction} from "@/app/posts/actions"
import {postPermission} from "@/app/helpers/permissions_helpers"

export default function PostsTable({posts, currentUser}:
                                     { posts: (Post & { author: User })[], currentUser: User | null }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <table className="w-full divide-y divide-gray-300">
        <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
            Title
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Author
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span>Published</span>
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Show</span>
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Delete</span>
          </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {posts.map((post, i) => (
          <tr key={i}>
            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              {post.title}
            </td>
            <td className="truncate w-32 whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <Link href={`users/${post.author.id}`} className="text-orange-600 hover:text-orange-900">
                {post.author.name}
              </Link>
            </td>
            <td className="w-12 relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
              <span className="text-gray-400">{post.published ? "Published" : "Draft"}</span>
            </td>
            <td className="w-12 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <Link href={`/posts/${post.id}`} className="text-orange-600 hover:text-orange-900">
                Show<span className="sr-only">, {post.title}</span>
              </Link>
            </td>
            {postPermission("delete", post, currentUser)
              ? <>
                <td className="w-12 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <form action={deletePostAction.bind(null, post.id)}>
                    <button className="p-1 bg-red-600 rounded text-white">
                      Delete<span className="sr-only">{post.title}</span>
                    </button>
                  </form>
                </td>
              </>
              : <>
                <td></td>
                <td></td>
              </>}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
