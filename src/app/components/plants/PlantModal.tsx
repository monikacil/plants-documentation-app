'use client'

import BasicModal from '../common/BasicModal';
import PlantForm from './PlantForm';
import { Collections, Plant } from '@/app/types/plantTypes';

interface Args {
  collection: Collections,
  _id?: string | undefined
}

interface ModalProps {
  title: string,
  btnText?: string,
  color: string,
  plant?: Plant,
  collection: Collections,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plantAction: (extraArgs:Args, prevState: any, formData: FormData) => Promise<any>

}

export default function PlantModal({ title, btnText, color, plant, collection, plantAction }: ModalProps) {
  return (
    <>
      <BasicModal title={ title } btnText={ btnText } color={ color }>
        <PlantForm plant={plant} collection={ collection } plantAction = { plantAction } />
      </BasicModal>
    </>
  )
}
