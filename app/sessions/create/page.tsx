import {createSession} from "@/app/sessions/actions"
import {headers} from "next/headers"
import {getUsers} from "@/app/repositories/user_repository"
import _ from "lodash"

export default async function CreateSessionPage() {
  const referer = headers().get("referer")
  const usersRaw = await getUsers()
  const users = usersRaw.map((user) => {
    return _.pick(user, "name", "id")
  })

  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="text-5xl font-bold mb-8">Log in</h1>
      <p className="text-lg leading-8 mb-8">Try logging in as any user</p>
      <form action={createSession}>
        <input type="hidden" name="referer" value={referer || undefined}/>
        <div className="flex gap-x-4 flex-wrap gap-y-2 border rounded border-gray-200 p-4">
          {users.map((user, i: number) => (
            <button key={i} type="submit" name="userId" value={user.id}
                    className="p-1 bg-orange-600 text-white font-bold border rounded">Login as {user.name}</button>
          ))}
        </div>

      </form>
    </div>
  )
}
