'use client'

import { Button, Field, Input, Label } from "@headlessui/react"
import { addPlant } from "@/app/actions/plant.actions"

import { usePathname } from "next/navigation";
import { useActionState } from "react";

export default function AddPlantForm() {
  const url = usePathname()
  const collection = url.split('/')[2]

  const [state, formAction, isPending] = useActionState(addPlant.bind(null, collection), null)

  return (
    <>
      <form action={formAction} className="flex gap-4">
        <Field>
          <Label className="data-[disabled]:opacity-50">Species</Label>
          <Input name="species" className="data-[disabled]:bg-gray-100" />
        </Field>
         <Field>
          <Label className="data-[disabled]:opacity-50">Variety</Label>
          <Input name="variety" className="data-[disabled]:bg-gray-100" />
        </Field>
        <Button disabled={isPending} type="submit">Save</Button>
        {isPending && <p>Please wait...</p>}
        {state?.error && <p className="text-red-500">{ state?.error }</p>}
      </form>
    </>
  )
}