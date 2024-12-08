'use client'

import Form from 'next/form'
import { useActionState } from "react";
import { usePathname } from "next/navigation";

import { Button, Field, Input, Label } from "@headlessui/react"
import ExtraPlantFields from './ExtraPlantFields';
import { Collections, Plant } from '@/app/types/plantTypes';

interface Args {
  collection: Collections,
  _id?: string | undefined
}

interface Props {
  plant?: Plant,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plantAction: (extraArgs:Args, prevState: any, formData: FormData) => Promise<any>
}

export default function PlantForm({ plant, plantAction }: Props) {
  const url = usePathname()
  const collection = url.split('/')[2] as Collections

  const [state, formAction, isPending] = useActionState(plantAction.bind(null, { collection: collection, _id: plant?._id }), null)


  return (
    <>
      <Form action={formAction} className="">
        <Field>
          <Label className="data-[disabled]:opacity-50">Species</Label>
          <Input name="species" defaultValue={ plant?.species } className="data-[disabled]:bg-gray-100" />
        </Field>
         <Field>
          <Label className="data-[disabled]:opacity-50">Variety</Label>
          <Input name="variety" defaultValue={ plant?.variety } className="data-[disabled]:bg-gray-100" />
        </Field>
        {collection !== 'collected' ? <ExtraPlantFields plant={ plant } />: null}
        <Button disabled={isPending} type="submit">Save</Button>
        {isPending && <p>Please wait...</p>}
        {state?.error && <p className="text-red-500">{ state?.error }</p>}
      </Form>
    </>
  )
}