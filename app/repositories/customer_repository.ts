import {prisma} from "@/app/helpers/prisma_helpers"
import {Prisma} from "@prisma/client"
import {ParseStringAsNumber} from "@/app/helpers/type_helpers"

export function newCustomer(): Prisma.CustomerCreateInput {
  return({firstName: "", lastName: ""})
}

export function getCustomers() {
  const customers = prisma.customer.findMany()
  return customers
}

export function getCustomer(id: number | string) {
  const numericId = ParseStringAsNumber(id)
  if (!numericId) throw new Error("id is required")

  return prisma.customer.findUnique({
    where: {id: numericId}
  })
}

export function deleteCustomer(id: number | string) {
  const numericId = ParseStringAsNumber(id)
  if (!numericId) throw new Error("id is required")

  return prisma.customer.delete({
    where: {id: numericId}
  })
}

export async function deleteCustomers() {
  await prisma.customer.deleteMany({})
}

export async function createCustomer(customer: Prisma.CustomerCreateInput) {
  return prisma.customer.create({data: customer})
}

export async function updateCustomer(customer: Prisma.CustomerUpdateInput, customerId: number) {
  return prisma.customer.update({where: {id: customerId}, data: customer})
}

