"use client"

import ConfirmationModal from "../common/ConfirmationModal";
import { Collections } from "@/app/types/plantTypes";
import { deletePlant } from "@/app/actions/plant.actions";
import { redirect, useRouter } from "next/navigation";

type Props = {
  collection: Collections,
  id: string
}

export default function ConfirmDeletePlant({ collection, id }: Props) {
  const router = useRouter()

  const handleDelete = () => {
    deletePlant(collection, id).then(() => {
      router.back()
      redirect(`/plants/${collection}`)
    })
  }

  return (
    <ConfirmationModal onConfirmClick={ handleDelete } title="Delete Plant">
      This action will delete data
    </ConfirmationModal>
  );
}
