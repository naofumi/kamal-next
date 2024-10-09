import {Post, User} from "@prisma/client"

type BaseAbility = "manage" | "read" | "create" | "update" | "delete"

export function postPermission(ability: BaseAbility, post: Post | null, currentUser: User | null): boolean {
  if (!currentUser) { return false }
  if (!post) { return true }

  if (["manage", "create", "update", "delete"].includes(ability)) {
    return post.authorId === currentUser.id
  } else if (["read"].includes(ability)) {
    return true
  } else {
    return false
  }
}

export function userPermission(ability: BaseAbility, user: User | null, currentUser: User | null): boolean {
  if (!currentUser) { return false }
  if (!user) { return true }

  if (["manage", "update", "delete"].includes(ability)) {
    return user?.id === currentUser?.id
  } else if (["read"].includes(ability)) {
    return true
  } else {
    return false
  }
}

