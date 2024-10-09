import {
  createPost,
  deletePost,
  deletePosts,
  getPost,
  getPosts, newPost,
  updatePost
} from "@/app/repositories/post_repository"
import {Post, User} from "@prisma/client"
import {createUser, deleteUsers} from "@/app/repositories/user_repository"

beforeEach(async () => {
  await deletePosts()
  await deleteUsers()
})

describe('newPost()', () => {
  it('returns a new blank post', async () => {
    const post = newPost()

    expect(post.hasOwnProperty("id")).toBeFalsy()
    expect(post.title).toEqual("")
  })
})

describe('getPosts()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    const user = await createUser({name: "Test user", email: "test@example.com"})
    await createPost({
      title: "Star Woes",
      content: "A long time ago, in a galaxy far, far, away...",
      published: true,
    }, {authorId: user.id})
  })

  it('returns a list of posts with authors included', async () =>{
    const posts = await getPosts();

    expect(posts.length).toEqual(1)
    expect(posts[0]).toMatchObject({"title": "Star Woes"})
    expect(posts[0].author).toMatchObject({name: "Test user"})
  })
})

describe('getPost()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    const user = await createUser({name: "Test user", email: "test@example.com"})
    await createPost({
      title: "Star Woes",
      content: "A long time ago, in a galaxy far, far, away...",
      published: true,
    }, {authorId: user.id})
  })

  it ('returns the specified post and associated author if correct id as number', async () => {
    const posts = await getPosts();
    const postId = posts[0].id

    const post = await getPost(postId)
    expect(post?.title).toEqual("Star Woes")
    expect(post?.author.name).toEqual("Test user")
  })

  it ('returns the specified post if correct id as string', async () => {
    const posts = await getPosts();
    const postId = posts[0].id

    const post = await getPost(postId.toString())
    expect(post?.title).toEqual("Star Woes")
  })

  it ('returns null if non-existing id', async () => {
    const post = await getPost(9999)
    expect(post).toBeNull()
  })
})

describe('deletePost()', () => {
  let postOne: Post
  let postTwo: Post
  let author: User

  beforeEach(async () => {
    author = await createUser({name: "Test author", email: "test-author@example.com"})
    postOne = await createPost({title: "Test post 1", content: null, published: true}, {authorId: author.id})
    postTwo = await createPost({title: "Test post 2", content: null, published: false}, {authorId: author.id})
  })

  it ('successfully deletes the post with numeric Id', async () => {
    const id = postOne.id
    await deletePost(id)

    const users = await getPosts()
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject(postTwo)
  })

  it ('successfully deletes the user with string Id', async () => {
    const id = postOne.id
    await deletePost(id.toString())

    const users = await getPosts()
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject(postTwo)
  })
})

describe('deleteUsers()', () => {
  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()

    const user = await createUser({name: "Test user", email: "test@example.com"})
    await createPost({
      title: "Star Woes",
      content: "A long time ago, in a galaxy far, far, away...",
      published: true,
    }, {authorId: user.id})
  })

  it('deletes all posts', async () => {
    await deletePosts()

    const posts = await getPosts();
    expect(posts.length).toEqual(0)
  })
})


describe('createPost()', () => {
  it('creates a new Post', async () => {
    const author = await createUser({name: "Test user", email: "test-user@example.com"})
    await createPost({title: "Test title", content: null, published: false}, {authorId: author.id})

    const posts = await getPosts()
    expect(posts.length).toEqual(1)
    expect(posts[0]).toMatchObject({title: "Test title"})
    expect(posts[0].author.name).toEqual("Test user")
  })
})

describe('updatePost()', () => {
  let author: User
  let post: Post

  beforeEach(async () => {
    author = await createUser({name: "Test user", email: "test-user@example.com"})
    post = await createPost({title: "Test title", content: null, published: false}, {authorId: author.id})
  })

  it('updates an existing Post', async () => {
    await updatePost({title: "Test title 2"}, post.id)

    const updatedPost = await getPost(post.id)
    expect(updatedPost?.title).toEqual("Test title 2")
  })
})

