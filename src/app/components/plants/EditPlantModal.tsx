'use client'
import { Plant } from '@/app/types/plantTypes';
import Modal from '../common/Modal';
import PlantForm from './PlantForm';
import { editPlant } from '@/app/actions/plant.actions';

export default function EditPlantModal({ plant } :{ plant: Plant }) {
  return (
    <>
      <Modal title="Add plant">
        <PlantForm plant={ plant } plantAction = { editPlant } />
      </Modal>
    </>
  )
}