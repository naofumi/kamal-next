import {User} from "@prisma/client"
import {createUser, deleteUsers} from "@/app/repositories/user_repository"
import {deletePosts, PostBody} from "@/app/repositories/post_repository"
import {validatePost} from "@/app/posts/post_validator"

describe('validatePost()', () => {
  let author: User
  let validPost: PostBody

  beforeEach(async () => {
    await deletePosts()
    await deleteUsers()
    author = await createUser({name: "Test author", email: "test-author@example.com"})
    validPost = {title: "Test title", content: null, published: false, authorId: author.id}
  })

  it('success if valid post', async () => {
    const {validatedFields} = validatePost(validPost)

    expect(validatedFields.success).toBeTruthy()
  })

  it('error if title is blank', async () => {
    const {validatedFields} = validatePost({...validPost, title: ""})

    expect(validatedFields.success).toBeFalsy()
    expect(validatedFields.error?.issues[0]).toMatchObject({message: "String must contain at least 1 character(s)", path: ["title"]})
  })

  it('error if authId is null', async () => {
    const post = {title: "Test title", content: null, published: false, authorId: null}
    const {validatedFields} = validatePost(post)

    expect(validatedFields.success).toBeFalsy()
    expect(validatedFields.error?.issues[0]).toMatchObject({message: "Expected number, received null", path: ["authorId"]})
  })
})
