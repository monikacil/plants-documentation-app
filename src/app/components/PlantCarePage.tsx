import {
  getPlantCarePages,
  getPlantCares,
} from "@/app/actions/plantCare.actions";
import Table from "@/app/components/table/Table";
import TableWrapper from "@/app/components/table/TableWrapper";
import { PlantCareDocument } from "@/app/types/plantCare.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";

export default async function PlantCarePage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(
    searchParams
  );
  const totalPages = await getPlantCarePages(query, limit);
  const plantCareList: PlantCareDocument[] = await getPlantCares(
    query,
    currentPage,
    limit,
    sort
  );

  return (
    <TableWrapper
      pages={totalPages}
      link={{ href: `/plantCare/add`, text: "Add Plant Care" }}
    >
      <Table elementsList={plantCareList}></Table>
    </TableWrapper>
  );
}
