import CustomersClientComponent from "@/app/customers/components/CustomerClientComponent"
import {getCustomers} from "@/app/repositories/customer_repository"
import _ from "lodash"
import TopNavigation from "@/app/TopNavigation"

export default async function FriendsPage() {
  const rawCustomers = await getCustomers()
  const customers = rawCustomers.map(
    rawCustomer => _.pick(rawCustomer, "id", "firstName", "lastName", "fullName")
  )

  /*
  * In addition to the security benefits of picking just the fields that you
  * need in the view, if you use Computed Fields in Prisma, then this is necessary
  * to avoid warnings.
  * https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields
  *
  * If you just set the `customers` variable without picking like so,
  * ```
  * const customers = await getCustomers()
  * ```
  *
  * you will get the following warning in the console.
  *
  * ```
  * Warning: Only plain objects can be passed to Client Components from Server Components.
  * Objects with symbol properties like nodejs.util.inspect.custom are not supported.
  * ```
  *
  * This is because you can only send plain objects from Server Components to
  * Client Components. Return values from objects with Prisma Computed Fields
  * are no longer plain objects and raise this warning. To avoid this,
  * you HAVE to generate plain objects from the ones that Prisma returns.
  * */

  return (<TopNavigation title="Customers" current="customers">
    <div className="mt-16 mx-auto max-w-2xl">
      <div>
        <h2 className="mt-8 text-center text-xl font-bold">Server Component version</h2>
        <table className="mt-4 p-2 mx-auto border">
          <thead>
          <tr>
            <th className="p-2 border-b">First Name</th>
            <th className="p-2 border-b">Last Name</th>
            <th className="p-2 border-b">Full Name</th>
          </tr>
          </thead>

          <tbody>
          {customers.map((customer, index) => <tr key={index}>
            <td className="p-2">{customer.firstName}</td>
            <td className="p-2">{customer.lastName}</td>
            <td className="p-2">{customer.fullName}</td>
          </tr>)}
          </tbody>
        </table>
      </div>

      <div>
        {/*
        # Notes
        If you try to pass Prisma results with Computed Fields (rawCustomers) to a Client Component,
        Next.js will complain that you cannot pass anything other than plain objects to Client Components.
        https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields

        > Only plain objects, and a few built-ins, can be passed to Client Components
        > from Server Components. Classes or null prototypes are not supported.
      */}
        <CustomersClientComponent customers={rawCustomers}/>
      </div>

    </div>
  </TopNavigation>)
}
