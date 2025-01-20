"use client"

import ActionButtons from "../table/ActionButtons";
import { ExpenseDocument } from "@/app/types/expenses.types";

export default function PlantDetails({ expense }: { expense: ExpenseDocument}) {
  const url = `/expenses/${ expense?._id }`
  return (
    <div className="flex gap-2">
      Expense details
      <ActionButtons url={ url } />
    </div>
  );
}
