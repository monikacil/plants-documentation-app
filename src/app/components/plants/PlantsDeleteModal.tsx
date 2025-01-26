"use client";

import ConfirmationModal from "../common/ConfirmationModal";
import ModalWrapper from "../modal/ModalWrapper";
import { redirect } from "next/navigation";
import { deletePlant } from "@/app/actions/plant.actions";
import { Collections } from "@/app/types/plant.types";

type Props = {
  collection: Collections;
  id: string;
  withRoute?: boolean;
};

export default function PlantsDeleteModal({
  collection,
  id,
  withRoute = false,
}: Props) {
  const route = `/plants/${collection}`;

  function handleClick() {
    deletePlant(collection, id);
    redirect(route);
  }

  return (
    <ModalWrapper title="Delete Plant" route={withRoute ? route : undefined}>
      <ConfirmationModal title="Delete Plant" confirmClick={handleClick}>
        This action will remove the plant from the list.
      </ConfirmationModal>
    </ModalWrapper>
  );
}
