import ExpensesPage from "@/app/components/ExpensesPage";
import { SearchParams } from "@/app/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <ExpensesPage searchParams={searchParams} />;
}
