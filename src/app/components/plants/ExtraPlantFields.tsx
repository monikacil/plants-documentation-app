'use client'
import { Plant } from "@/app/types/plantTypes"
import { Field, Input, Label } from "@headlessui/react"

export default function ExtraPlantFields({ plant }: { plant?: Plant | undefined }) {
  return (
    <>
      <Field>
        <Label className="data-[disabled]:opacity-50">Price</Label>
        <Input name="price" defaultValue={ plant?.price } className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Sale date</Label>
        <Input name="date" defaultValue={ plant?.date } className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Passport number</Label>
        <Input name="passport" defaultValue={ plant?.passport } className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Full name</Label>
        <Input name="name" defaultValue={ plant?.name } className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Address</Label>
        <Input name="address" defaultValue={ plant?.address } className="data-[disabled]:bg-gray-100" />
      </Field>
       <Field>
        <Label className="data-[disabled]:opacity-50">Country</Label>
        <Input name="country" defaultValue={ plant?.country } className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Phone number</Label>
        <Input name="phone" defaultValue={ plant?.phone } type="number" className="data-[disabled]:bg-gray-100" />
      </Field>
      <Field>
        <Label className="data-[disabled]:opacity-50">Email address</Label>
        <Input name="email" defaultValue={ plant?.email } type="email" className="data-[disabled]:bg-gray-100" />
      </Field>
    </>
  )
}