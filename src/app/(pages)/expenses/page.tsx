import ExpensesPage from "@/components/ExpensesPage";
import { SearchParams } from "@/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <ExpensesPage searchParams={searchParams} />;
}
