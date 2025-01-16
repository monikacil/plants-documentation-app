"use client"

import ConfirmationModal from "../common/ConfirmationModal";
import { Collections } from "@/app/types/plant.types";
import { deletePlant } from "@/app/actions/plant.actions";
import { redirect } from "next/navigation";

type Props = {
  collection: Collections,
  id: string
}

export default function ConfirmDeletePlant({ collection, id }: Props) {

  const handleDelete = () => {
    deletePlant(collection, id).then(() => {
      redirect(`/plants/${ collection }`)
    })
  }

  return (
    <ConfirmationModal onConfirmClick={ handleDelete } title="Delete Plant">
      This action will delete data
    </ConfirmationModal>
  );
}
