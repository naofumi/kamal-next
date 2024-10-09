import {
  createUser,
  deleteUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "@/app/repositories/user_repository"
import {User} from "@prisma/client"
import {deletePosts} from "@/app/repositories/post_repository"

beforeEach(async () => {
  await deletePosts()
  await deleteUsers()
})

describe('getUsers()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    await createUser({name: "Test user", email: "test@example.com"})
    await createUser({name: "Test user 2", email: "test2@example.com"})
  })

  it('returns a list of users', async () => {
    const users = await getUsers();

    expect(users.length).toEqual(2)
    expect(users[0]).toMatchObject({"name": "Test user"})
  })
})

describe('getUser()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    await createUser({name: "Test user", email: "test@example.com"})
    await createUser({name: "Test user 2", email: "test2@example.com"})
  })

  it ('returns the specified user if correct id as number', async () => {
    const users = await getUsers();
    const userId = users[0].id

    const user = await getUser(userId)
    expect(user?.name).toEqual("Test user")
  })

  it ('returns the specified user if correct id as string', async () => {
    const users = await getUsers();
    const userId = users[0].id

    const user = await getUser(userId.toString())
    expect(user?.name).toEqual("Test user")
  })

  it ('returns the null if non-existing id', async () => {
    const user = await getUser(9999)
    expect(user).toBeNull()
  })

  it ('throws error if id is blank string', async () => {
    expect(() => getUser("")).toThrow("id is required")
  })
})

describe('deleteUser()', () => {
  let userOne: User
  let userTwo: User

  beforeEach(async () => {
    userOne = await createUser({name: "Foo", email: "foo@example.com"})
    userTwo = await createUser({name: "Bar", email: "bar@example.com"})
  })

  it ('successfully deletes the user with numeric Id', async () => {
    const id = userOne.id
    await deleteUser(id)

    const users = await getUsers()
    expect(users).toHaveLength(1)
    expect(users).not.toContainEqual(userOne)
    expect(users).toContainEqual(userTwo)
  })

  it ('successfully deletes the user with string Id', async () => {
    const id = userOne.id
    await deleteUser(id.toString())

    const users = await getUsers()
    expect(users).toHaveLength(1)
    expect(users).not.toContainEqual(userOne)
    expect(users).toContainEqual(userTwo)
  })

  it ('throws error if id is blank string', async () => {
    expect(() => deleteUser("")).toThrow("id is required")
  })
})

describe('deleteUsers()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    await createUser({name: "Test user", email: "test@example.com"})
  })

  it('deletes all users', async () => {
    await deleteUsers()

    const users = await getUsers();
    expect(users.length).toEqual(0)
  })
})


describe('createUser()', () => {
  it('creates a new User', async () => {
    await createUser({name: "Foo", email: "foo@example.com"})

    const users = await getUsers();
    expect(users.length).toEqual(1)
    expect(users[0]).toMatchObject({"name": "Foo"})
  })
})

describe('updateUser()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    createUser({name: "Test user", email: "test@example.com"})
  })

  it('updates an existing User', async () => {
    const user = (await getUsers())[0]

    await updateUser({name: "Updated TestName"}, user.id)

    const updatedUser = (await getUsers())[0]
    expect(updatedUser.name).toEqual("Updated TestName")
  })
})
