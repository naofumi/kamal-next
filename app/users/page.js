import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UsersIndexPage() {
  const users = await prisma.user.findMany()

  return (
    <>
    <h1>Users Index</h1>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user, i) => (
        <tr key={i}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}
