"use client";

import ConfirmationModal from "../common/Confirmation";
import ModalWrapper from "../modal/ModalWrapper";
import { redirect } from "next/navigation";
import { deletePlantCare } from "@/actions/plantCare.actions";

type Props = {
  id: string;
  withRoute?: boolean;
};

export default function PlantCareDeleteModal({ id, withRoute = false }: Props) {
  const route = "/plantCare";

  function handleClick() {
    deletePlantCare(id);
    redirect(route);
  }

  return (
    <ModalWrapper
      title="Delete Plant Care"
      route={withRoute ? route : undefined}
    >
      <ConfirmationModal confirmClick={handleClick}>
        This action will remove the plant care from the list.
      </ConfirmationModal>
    </ModalWrapper>
  );
}
