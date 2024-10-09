import {z} from "zod"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email({message: "Invalid email"}),
})

export type ValidationUserErrors = ReturnType<typeof validateUser>["errors"]

export function validateUser(user: unknown) {
  const validatedFields = schema.safeParse(user)

  if (validatedFields.error) {
    const errors = validatedFields.error.flatten().fieldErrors
    return {validatedFields, errors}
  } else {
    return {validatedFields, errors: null}
  }
}
