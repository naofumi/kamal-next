import {ValidatePostErrors} from "@/app/posts/post_validator"
import {Prisma, User} from "@prisma/client"

export default function FormBody({post, errors, users}: {
  post: Prisma.PostCreateWithoutAuthorInput & {authorId?: number},
  errors: ValidatePostErrors,
  users: Pick<User, "name" | "id">[]
}) {
  console.dir(post.authorId)

  return <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="loauthorIdcation" className="block text-sm font-medium leading-6 text-gray-900">
            Author
          </label>
          <select
            id="authorId"
            name="authorId"
            defaultValue={post.authorId}
            className="sm:max-w-md mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="" key="blank"></option>
            {users.map((user, i: number) => (
              <option key={i} value={user.id}>
                {user.name}
              </option>))}
          </select>
        </div>
        {errors?.authorId ? <div className="text-red-600">{errors?.authorId.join(", ")}</div> : null}
        <div className="sm:col-span-4">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                name="published"
                type="hidden"
                value="0"
              />
              <input
                id="published"
                name="published"
                type="checkbox"
                aria-describedby="published"
                value="1"
                defaultChecked={post.published}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="published" className="font-medium text-gray-900">
                Published
              </label>
            </div>
          </div>
        </div>
        {errors?.published ? <div className="text-red-600">{errors?.published.join(", ")}</div> : null}

        <div className="sm:col-span-4">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={post.title}
                className="!outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors?.title ? <div className="text-red-600">{errors?.title.join(", ")}</div> : null}
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
            Content
          </label>
          <div className="mt-2">
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
              <textarea
                id="content"
                name="content"
                defaultValue={post.content || ""}
                className="!outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors?.content ? <div className="text-red-600">{errors?.content.join(", ")}</div> : null}
        </div>
      </div>
    </div>
  </div>
}
