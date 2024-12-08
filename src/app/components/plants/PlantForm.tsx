'use client'

import Form from 'next/form'
import { useActionState } from "react";
import { usePathname } from "next/navigation";

import ExtraPlantFields from './ExtraPlantFields';
import { Collections, Plant } from '@/app/types/plantTypes';
import Input from '../common/form/Input';
import SubmitButton from '../common/SubmitButton';

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
        <Input name="species" defaultValue={plant?.species} />
        <Input name="variety" defaultValue={ plant?.variety } />
        {collection !== 'collected' ? <ExtraPlantFields plant={ plant } />: null}
        <SubmitButton disabled={isPending} text={isPending ? "Saving..." : "Save"} />
        {state?.error && <div className="text-red-500">{ state?.error }</div>}
      </Form>
    </>
  )
}