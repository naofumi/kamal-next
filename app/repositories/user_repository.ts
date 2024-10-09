import {prisma} from "@/app/helpers/prisma_helpers"
import {Prisma} from "@prisma/client"
import {ParseStringAsNumber} from "@/app/helpers/type_helpers"

export function newUser(): Prisma.UserCreateInput {
  return({name: "", email: ""})
}

export function getUsers() {
  const users = prisma.user.findMany()
  return users
}

export function getUser(id: number | string) {
  const numericId = ParseStringAsNumber(id)
  if (!numericId) throw new Error("id is required")

  return prisma.user.findUnique({
    where: {id: numericId}
  })
}

export function getUserWithPosts(id: number | string) {
  const numericId = ParseStringAsNumber(id)
  if (!numericId) throw new Error("id is required")

  return prisma.user.findUnique({
    include: {
      posts: true,
    },
    where: {id: numericId}
  })
}

export function deleteUser(id: number | string) {
  const numericId = ParseStringAsNumber(id)
  if (!numericId) throw new Error("id is required")

  return prisma.user.delete({
    where: {id: numericId}
  })
}

export async function deleteUsers() {
  await prisma.user.deleteMany({})
}

export async function createUser(user: Prisma.UserCreateInput) {
  return prisma.user.create({data: user})
}

export async function updateUser(user: Prisma.UserUpdateInput, userId: number) {
  return prisma.user.update({where: {id: userId}, data: user})
}

