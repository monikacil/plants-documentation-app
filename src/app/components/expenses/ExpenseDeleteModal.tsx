"use client";

import { deleteExpense } from "@/app/actions/expenses.actions";
import ConfirmationModal from "../common/ConfirmationModal";
import ModalWrapper from "../modal/ModalWrapper";
import { redirect } from "next/navigation";

type Props = {
  id: string;
  withRoute?: boolean;
};

export default function ExpenseDeleteModal({ id, withRoute = false }: Props) {
  const route = "/expenses";

  function handleClick() {
    deleteExpense(id);
    redirect(route);
  }

  return (
    <ModalWrapper title="Delete Expense" route={withRoute ? route : undefined}>
      <ConfirmationModal title="Delete Expense" confirmClick={handleClick}>
        This action will remove the expense from the list.
      </ConfirmationModal>
    </ModalWrapper>
  );
}
