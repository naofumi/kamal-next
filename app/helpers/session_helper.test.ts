import {
  authenticate,
  authenticateAndReturnCurrentUser,
  getCurrentUser,
  getCurrentUserId, isAuthenticated
} from "@/app/helpers/session_helper"
import {createUser, deleteUsers} from "@/app/repositories/user_repository"
import {getIronSession} from "iron-session"
import {deletePosts} from "@/app/repositories/post_repository"
import {User} from "@prisma/client"

jest.mock("next/headers", () => {
  return {
    cookies: jest.fn()
  }
})

jest.mock("iron-session", () => {
  return {
    getIronSession: jest.fn(() => ({userId: 1}))
  }
})

beforeEach(async () => {
  await deletePosts()
  await deleteUsers()
})

afterEach(async () => {
  jest.clearAllMocks()
})

describe('getCurrentUserId()', () => {
  it('returns the current user id from the session', async () => {
    const userId = await getCurrentUserId()
    expect(userId).toEqual(1)
  })
})

describe('getCurrentUser()', () => {
  it("returns the correct User", async () => {
    const user = await createUser({name: "Test user", email: "test@example.com"})
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: user.id})

    const currentUser = await getCurrentUser()
    expect(currentUser?.id).toEqual(user.id)
  })

  it("returns null if session userId is undefined", async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: undefined})

    const currentUser = await getCurrentUser()
    expect(currentUser).toBeNull()
  })
})

describe('authenticate()', () => {
  it("returns void if session userId is defined", async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: 1})

    expect(authenticate()).resolves.not.toThrow()
  })

  it("redirects if session userId is undefined", async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: undefined})

    expect(authenticate()).rejects.toThrow("NEXT_REDIRECT")
  })
})

describe('authenticateAndReturnCurrentUser()', () => {
  let user: User
  beforeEach(async () => {
    user = await createUser({name: "Test user", email: "test@example.com"})
  })

  it('successfully returns current user if session userId is set', async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: user.id})

    expect(authenticateAndReturnCurrentUser()).resolves.toEqual(user)
  })

  it("redirects if session userId is undefined", async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: undefined})

    expect(authenticateAndReturnCurrentUser()).rejects.toThrow("NEXT_REDIRECT")
  })

  it("redirects if session userId doesn't exist", async () => {
    // @ts-expect-error mocks
    getIronSession.mockReturnValue({userId: 99999})

    expect(authenticateAndReturnCurrentUser()).rejects.toThrow("NEXT_REDIRECT")
  })
})

describe('isAuthenticated()', () => {
  it('returns true if userId is set in session', async () => {
    expect(isAuthenticated()).resolves.toBe(true)
  })
})
