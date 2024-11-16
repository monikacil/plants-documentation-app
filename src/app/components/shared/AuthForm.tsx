"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import ZodErrors from "./ZodErrors";

const initForm = {
  password: [],
  email: [],
  form: []
}

interface Props {
  btnText: string,
  headerText: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authAction: (prevState: any, formData: FormData) => Promise<any>
}

export default function AuthForm({ btnText, headerText, authAction }: Props) {

  const [state, formAction, isPending] = useActionState(authAction, { errors: initForm })

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          { headerText }
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={ formAction } className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
               <ZodErrors error={state?.errors.email} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <ZodErrors error={state?.errors.password} />
            </div>
          </div>
          <div>
            <ZodErrors error={state?.message} />
          </div>
          <div>
            <SubmitButton disabled={ isPending } text={ btnText } />
          </div>
        </form>
      </div>
    </div>
  )
}
