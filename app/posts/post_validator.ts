import {z} from "zod"

const schema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1),
  content: z.string().nullable(),
  published: z.boolean().default(false),
  authorId: z.number()
})

export type ValidatePostErrors = ReturnType<typeof validatePost>["errors"]

export function validatePost(post: unknown) {
  const validatedFields = schema.safeParse(post)

  if (validatedFields.error) {
    const errors = validatedFields.error.flatten().fieldErrors
    return {validatedFields, errors}
  } else {
    return {validatedFields, errors: null}
  }
}
