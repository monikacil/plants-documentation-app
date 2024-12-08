'use client'
import Modal from '../common/Modal';
import PlantForm from './PlantForm';
import { Collections, Plant } from '@/app/types/plantTypes';

interface Args {
  collection: Collections,
  _id?: string | undefined
}

interface ModalProps {
  title: string,
  color: string,
  plant?: Plant,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plantAction: (extraArgs:Args, prevState: any, formData: FormData) => Promise<any>

}

export default function PlantModal ({ title, color, plant, plantAction }: ModalProps) {
  return (
    <>
      <Modal title={ title } color={color}>
        <PlantForm plant={ plant } plantAction = { plantAction } />
      </Modal>
    </>
  )
}