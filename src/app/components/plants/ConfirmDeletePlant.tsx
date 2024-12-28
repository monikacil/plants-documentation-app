"use client"

import ConfirmationModal from "../common/ConfirmationModal";
import { Collections } from "@/app/types/plantTypes";
import { deletePlant } from "@/app/actions/plant.actions";

type Props = {
  collection: Collections,
  id: string
}

export default function ConfirmDeletePlant({ collection, id }: Props) {

  const handleDelete = deletePlant.bind(null, collection, id)

  return (
    <ConfirmationModal onConfirmClick={ handleDelete } title="Delete Plant">
      This action will delete data
    </ConfirmationModal>
  );
}
