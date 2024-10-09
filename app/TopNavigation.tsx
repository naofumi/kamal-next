import {ReactNode} from "react"
import Link from "next/link"
import {getCurrentUser} from "@/app/helpers/session_helper"
import {destroySession} from "@/app/sessions/actions"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"
import {seedAll} from "@/app/repositories/seed"

async function seedAllAction() {
  "use server"

  await seedAll()
  revalidatePath("/")
  redirect("/users")
}

export default async function TopNavigation({children, title, current}: {
  children: ReactNode,
  title?: string,
  current: "home" | "users" | "posts"
}) {
  const pageLinks = [
    {url: "/", title: "Home", symbol: "home"},
    {url: "/users", title: "Users", symbol: "users"},
    {url: "/posts", title: "Posts", symbol: "posts"},
  ]
  const currentUser = await getCurrentUser()

  return (
    <div className="min-h-full">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {/*{!--Current: "border-orange-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --}*/}
                {pageLinks.map((pageLink, i) => (
                  <Link key={i}
                        href={pageLink.url}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pageLink.symbol === current ? "border-orange-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                        aria-current="page">{pageLink.title}</Link>
                ))}
              </div>
            </div>
            <div className="flex space-x-8">
              <div className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <form action={seedAllAction} className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                  <button type="submit" className="border rounded bg-red-600 py-1 px-2 text-white font-bold">Reset Seeds</button>
                </form>
                {currentUser
                  ? <form action={destroySession} className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <span className="me-4 text-lg text-orange-600 text-bold">Hello {currentUser.name} !</span>
                    <button type="submit">Logout</button>
                  </form>
                  : <Link href={`/sessions/create`} className="inline-flex items-center px-1 pt-1 text-sm font-bold">
                    DEMO: Login to Edit
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <header>
            <div>
              {title && <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{title}</h1>}
            </div>
          </header>
          <main>
            <div className="py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
