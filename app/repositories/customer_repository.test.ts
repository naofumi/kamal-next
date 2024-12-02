import {
  createCustomer,
  deleteCustomer,
  deleteCustomers,
  getCustomer,
  getCustomers, updateCustomer
} from "@/app/repositories/customer_repository"
import {Customer} from "@prisma/client"

beforeEach(async () => {
  await deleteCustomers()
})

describe('getCustomers()', () => {
  beforeEach(async () => {
    await createCustomer({firstName: "Sazae", lastName: "Fuguta"})
    await createCustomer({firstName: "Katsuo", lastName: "Isono"})
  })

  it('returns a list of customers', async () => {
    const customers = await getCustomers();

    expect(customers.length).toEqual(2)
    expect(customers[0]).toMatchObject({"firstName": "Sazae"})
  })
})

describe('getCustomer()', () => {
  beforeEach(async () => {
    await createCustomer({firstName: "Sazae", lastName: "Fuguta"})
    await createCustomer({firstName: "Katsuo", lastName: "Isono"})
  })

  it('returns the specified customer if correct id as number', async () => {
    const customers = await getCustomers();
    const customerId = customers[0].id

    const customer = await getCustomer(customerId)
    expect(customer?.firstName).toEqual("Sazae")
  })

  it('returns the specified customer if correct id as string', async () => {
    const customers = await getCustomers();
    const customerId = customers[0].id

    const customer = await getCustomer(customerId.toString())
    expect(customer?.firstName).toEqual("Sazae")
  })

  it('returns the null if non-existing id', async () => {
    const customer = await getCustomer(9999)
    expect(customer).toBeNull()
  })

  it('throws error if id is blank string', async () => {
    expect(() => getCustomer("")).toThrow("id is required")
  })
})

describe('deleteCustomer()', () => {
  let customerOne: Customer
  let customerTwo: Customer

  beforeEach(async () => {
    customerOne = await createCustomer({firstName: "Sazae", lastName: "Fuguta"})
    customerTwo = await createCustomer({firstName: "Katsuo", lastName: "Isono"})
  })

  it('successfully deletes the customer with numeric Id', async () => {
    const id = customerOne.id
    await deleteCustomer(id)

    const customers = await getCustomers()
    expect(customers).toHaveLength(1)
    expect(customers.map(c => c.id)).not.toContainEqual(customerOne.id)
    expect(customers.map(c => c.id)).toContainEqual(customerTwo.id)
  })

  it('successfully deletes the customer with string Id', async () => {
    const id = customerOne.id
    await deleteCustomer(id.toString())

    const customers = await getCustomers()
    expect(customers).toHaveLength(1)
    expect(customers.map(c => c.id)).not.toContainEqual(customerOne.id)
    expect(customers.map(c => c.id)).toContainEqual(customerTwo.id)
  })

  it('throws error if id is blank string', async () => {
    expect(() => deleteCustomer("")).toThrow("id is required")
  })
})

describe('deleteCustomers()', () => {
  beforeEach(async () => {
    await createCustomer({firstName: "Sazae", lastName: "Fuguta"})
  })

  it('deletes all customers', async () => {
    await deleteCustomers()

    const customers = await getCustomers();
    expect(customers.length).toEqual(0)
  })
})


describe('createCustomer()', () => {
  it('creates a new Customer', async () => {
    await createCustomer({firstName: "Sazae", lastName: "Fuguta"})

    const customers = await getCustomers();
    expect(customers.length).toEqual(1)
    expect(customers[0]).toMatchObject({"firstName": "Sazae"})
  })
})

describe('updateCustomer()', () => {
  beforeEach(async () => {
    await deleteCustomers()

    await createCustomer({firstName: "Sazae", lastName: "Fuguta"})
  })

  it('updates an existing Customer', async () => {
    const customer = (await getCustomers())[0]

    await updateCustomer({firstName: "Updated FirstName"}, customer.id)

    const updatedCustomer = (await getCustomers())[0]
    expect(updatedCustomer.firstName).toEqual("Updated FirstName")
    expect(updatedCustomer.lastName).toEqual("Fuguta")
  })
})
