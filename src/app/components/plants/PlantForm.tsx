'use client'

import { useActionState, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from 'flowbite-react';
import Form from 'next/form'

import { Collections, PlantExtraArgs, PlantTableType } from '@/app/types/plant.types';

import Input from '../form/Input';
import BasicButton from '../common/BasicButton';
import FormDatepicker from '../form/FormDatepicker';

type Props = {
  plant?: PlantTableType,
  collection: Collections,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plantAction: (extraArgs: PlantExtraArgs, prevState: any, formData: FormData) => Promise<any>
}

const initForm: PlantTableType = {
  _id: '',
  species: '',
  variety: '',
  price: '',
  date: new Date().toString(),
  passport: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  country: ''
}

export default function PlantForm({ plant, collection, plantAction }: Props) {
  const [state, formAction, isPending] = useActionState(plantAction.bind(null, { collection: collection, _id: plant?._id.toString() }), null)
  const [plantForm, setPlantForm] = useState(plant ? plant : initForm)

  return (
    <>
      <Form action={formAction}>
        <div className="font-semibold mb-3">Plant Info</div>
        <div className={ collection !== 'collected' ? "lg:grid lg:grid-cols-2 gap-4" : ""}>
          <Input
            name="species"
            label="Species"
            value={plantForm?.species}
            errors={!plantForm.species ? state?.errors?.species : null}
            onChange={(value) => { setPlantForm({ ...plantForm, species: value }) }}
          />
          <Input
            name="variety"
            label="Variety"
            value={plantForm?.variety}
            errors={!plantForm.variety ? state?.errors?.variety : null}
            onChange={(value) => { setPlantForm({ ...plantForm, variety: value }) }}
          />
        </div>
        {collection !== 'collected' ?
        <>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2">
              <FormDatepicker
                name="date"
                label="Pick date"
                maxDate={ new Date() }
                value={ new Date(plantForm.date) }
                onChange={(value) => { setPlantForm({ ...plantForm, date: value ? value.toString() : new Date().toString() }) }}
              />
              <Input
                name="price"
                label="Price"
                value={plantForm?.price}
                errors={!plantForm.price ? state?.errors?.price : null}
                onChange={(value) => { setPlantForm({ ...plantForm, price: value }) }}
                />
            </div>
            <Input
              name="passport"
              label="Passport number"
              value={plantForm?.passport}
              errors={!plantForm.passport ? state?.errors?.passport : null}
              onChange={(value) => { setPlantForm({ ...plantForm, passport: value }) }}
            />
          </div>
          <div className="font-semibold mt-5 mb-3">{ collection === 'purchased' ? "Seller" : "Buyer" } Info</div>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Name"
              value={plantForm?.name}
              errors={!plantForm.name ? state?.errors?.name : null}
              onChange={(value) => { setPlantForm({ ...plantForm, name: value }) }}
              />
            <div className="grid grid-cols-4 gap-2">
              <Input
                className="col-span-3"
                name="address"
                label="Address"
                value={plantForm?.address}
                errors={!plantForm.address ? state?.errors?.address : null}
                onChange={(value) => { setPlantForm({ ...plantForm, address: value }) }}
              />
              <Input
                className="col-span-1"
                name="country"
                label="Country"
                value={plantForm?.country}
                errors={!plantForm.country ? state?.errors?.country : null}
                onChange={(value) => { setPlantForm({ ...plantForm, country: value }) }}
              />
            </div>
            <Input
              name="phone"
              label="Phone Number"
              value={plantForm?.phone}
              errors={!plantForm.phone ? state?.errors?.phone : null}
              onChange={(value) => { setPlantForm({ ...plantForm, phone: value }) }}
            />
            <Input
              name="email"
              label="Email"
              value={plantForm?.email}
              errors={!plantForm.email ? state?.errors?.email : null}
              onChange={(value) => { setPlantForm({ ...plantForm, email: value }) }}
            />
          </div>
        </>: null }
        <BasicButton type="submit" disabled={isPending} isProcessing={isPending} className="my-5">Save Plant</BasicButton>
        {state?.error &&
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">{ state?.error }</span>
        </Alert>}
      </Form>
    </>
  )
}
