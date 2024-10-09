import {Post, User} from "@prisma/client"
import {createUser, deleteUsers} from "@/app/repositories/user_repository"
import {postPermission, userPermission} from "@/app/helpers/permissions_helpers"
import {createPost, deletePosts} from "@/app/repositories/post_repository"

describe('postPermissions', () => {
  let author: User
  let otherUser: User
  let post: Post

  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()
    author = await createUser({name: "Author", email: "author@example.com"})
    otherUser = await createUser({name: "Other Test User", email: "other-user@example.com"})
    post = await createPost({title: "Post title", content: null, published: false}, {authorId: author.id})
  })

  it('any User can create a new Post', () => {
    const result = postPermission("create", null, otherUser)
    expect(result).toBe(true)
  })

  it('fails if currentUser is null', () => {
    const result = postPermission("create", null, null)
    expect(result).toBe(false)
  })

  it('Author can manage own post', () => {
    const result = postPermission("manage", post, author)
    expect(result).toBe(true)
  })

  it('User cannot manage post by other User', () => {
    const result = postPermission("manage", post, otherUser)
    expect(result).toBe(false)
  })

  it('Author can update own post', () => {
    const result = postPermission("update", post, author)
    expect(result).toBe(true)
  })

  it('User cannot update post by other user', () => {
    const result = postPermission("update", post, otherUser)
    expect(result).toBe(false)
  })

  it('Author can delete own Post', () => {
    const result = postPermission("delete", post, author)
    expect(result).toBe(true)
  })

  it('User cannot delete Post by other User', () => {
    const result = postPermission("delete", post, otherUser)
    expect(result).toBe(false)
  })
})

describe('userPermissions', () => {
  let currentUser: User
  let otherUser: User

  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()
    currentUser = await createUser({name: "Current User", email: "test@example.com"})
    otherUser = await createUser({name: "Other Test User", email: "other-test@example.com"})
  })

  it('any User can create a new User', () => {
    const result = userPermission("create", null, currentUser)
    expect(result).toBe(true)
  })

  it('fails if currentUser is null', () => {
    const result = userPermission("create", null, null)
    expect(result).toBe(false)
  })

  it('any User can manage themselves', () => {
    const result = userPermission("manage", currentUser, currentUser)
    expect(result).toBe(true)
  })

  it('User cannot manage other User', () => {
    const result = userPermission("manage", otherUser, currentUser)
    expect(result).toBe(false)
  })

  it('any User can update themselves', () => {
    const result = userPermission("update", currentUser, currentUser)
    expect(result).toBe(true)
  })

  it('User cannot update other User', () => {
    const result = userPermission("update", otherUser, currentUser)
    expect(result).toBe(false)
  })

  it('any User can delete themselves', () => {
    const result = userPermission("delete", currentUser, currentUser)
    expect(result).toBe(true)
  })

  it('User cannot delete other User', () => {
    const result = userPermission("delete", otherUser, currentUser)
    expect(result).toBe(false)
  })
})
