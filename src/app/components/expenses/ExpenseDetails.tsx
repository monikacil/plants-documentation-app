"use client";

import ActionButtons from "../table/ActionButtons";
import { ExpenseDocument } from "@/app/types/expenses.types";

type Props = {
  expense?: ExpenseDocument;
};

export default function PlantDetails({ expense }: Props) {
  const route = `/expenses/${expense?._id}`;

  return (
    <div className="flex gap-2">
      Expense details
      <ActionButtons route={route} />
    </div>
  );
}
