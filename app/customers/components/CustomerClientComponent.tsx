"use client"

import {getCustomers} from "@/app/repositories/customer_repository"

export default function CustomersClientComponent({customers}: {customers: Awaited<ReturnType<typeof getCustomers>>}) {
  return <>
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
  </>
}
