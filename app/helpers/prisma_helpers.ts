import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
  result: {
    customer: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(customer) {
          return `${customer.firstName} ${customer.lastName}`
        },
      },
    },
  },
})
