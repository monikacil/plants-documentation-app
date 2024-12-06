'use client'
import Modal from '../common/Modal';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void
}

export default function AddPlantModal({ isOpen, onClose }: ModalProps) {

  return (
    <>
     <Modal title="Add plant" isOpen={isOpen} onClose={onClose}>
        <p>
            Modal
        </p>
      </Modal>
    </>
  )
}