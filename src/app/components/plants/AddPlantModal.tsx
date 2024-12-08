'use client'
import { addPlant } from '@/app/actions/plant.actions';
import Modal from '../common/Modal';
import PlantForm from './PlantForm';

export default function PlantModal() {
  return (
    <>
      <Modal title="Add plant">
        <PlantForm plantAction = { addPlant } />
      </Modal>
    </>
  )
}