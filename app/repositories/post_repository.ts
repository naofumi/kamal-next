import {prisma} from "@/app/helpers/prisma_helpers"
import {Prisma} from "@prisma/client"

export function newPost(): Omit<Prisma.PostCreateInput, "authorId" | "author"> {
  return({title: "", content: null, published: false})
}

export function getPosts() {
  return prisma.post.findMany({
    include: {author: true}
  })
}

export function getPost(id: number | string) {
  const numericId = typeof id === "string" ? parseInt(id) : id

  return prisma.post.findUnique({
    include: {author: true},
    where: {id: numericId}
  })
}

export function deletePost(id: number | string) {
  const numericId = typeof id === "string" ? parseInt(id) : id

  return prisma.post.delete({
    where: {id: numericId}
  })
}

export async function deletePosts() {
  await prisma.post.deleteMany({})
}

export async function createPost(post: Prisma.PostCreateWithoutAuthorInput, {authorId}: { authorId: number }) {
  return prisma.post.create({
    data: {
      ...post,
      author: {
        connect: {id: authorId}
      }
    }
  })
}

export async function updatePost(post: Prisma.PostUpdateInput, postId: number) {
  return prisma.post.update({where: {id: postId}, data: post})
}

