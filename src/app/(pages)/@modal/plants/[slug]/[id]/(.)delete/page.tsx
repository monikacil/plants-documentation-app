import { deletePlant } from "@/app/actions/plant.actions";
import { Collections } from "@/app/types/plant.types";

import ConfirmationModal from "@/app/components/common/ConfirmationModal";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

export default async function InterceptedPage({ params }: { params: Promise<{ slug: string, id: string }> }) {
  const slug = (await params).slug as Collections
  const id = (await params).id

  async function handleConfirmClick() {
    'use server'
    await deletePlant(slug, id)
  }

  return (
    <ModalWrapper title="Delete Plant">
      <ConfirmationModal title="Delete plant" confirmClick={ handleConfirmClick }>
        This action will remove the plant from the list.
      </ConfirmationModal>
    </ModalWrapper>
  )
}
