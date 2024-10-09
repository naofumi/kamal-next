import {ValidationUserErrors} from "@/app/users/user_validator"
import { Prisma } from "@prisma/client"

export default function FormBody({user, errors}: {
  user: Prisma.UserCreateInput,
  errors: ValidationUserErrors
}) {
  return <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name || ""}
                className="!outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors?.name ? <div className="text-red-600">{errors?.name.join(", ")}</div> : null}
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
              <input
                id="email"
                name="email"
                type="text"
                defaultValue={user.email || ""}
                className="!outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors?.email ? <div className="text-red-600">{errors?.email.join(", ")}</div> : null}
        </div>
      </div>
    </div>
  </div>
}
