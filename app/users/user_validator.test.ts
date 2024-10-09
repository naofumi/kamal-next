import {validateUser} from "@/app/users/user_validator"

const validUser = {name: "foo", email: "foo@example.com"}

describe('validateUser()', () => {
  it('success if valid user', async () => {
    const {validatedFields} = validateUser(validUser)

    expect(validatedFields.success).toBeTruthy()
  })

  it('error if name is blank', async () => {
    const {validatedFields, errors} = validateUser({...validUser, name: ""})

    expect(validatedFields.success).toBeFalsy()
    expect(errors?.name).toContain("String must contain at least 1 character(s)")
  })

  it('error if invalid email', async () => {
    const {validatedFields} = validateUser({...validUser, email: "foo-example.com"})

    expect(validatedFields.success).toBeFalsy()
    expect(validatedFields.error?.issues[0]).toMatchObject({message: "Invalid email", validation: "email", path: ["email"]})
  })
})
