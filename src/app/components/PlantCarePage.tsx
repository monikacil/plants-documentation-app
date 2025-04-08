import { getPlantCarePages, getPlantCares } from "@/actions/plantCare.actions";
import Table from "@/components/table/Table";
import TableWrapper from "@/components/table/TableWrapper";
import { PlantCareDocument } from "@/types/plantCare.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";

export default async function PlantCarePage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(searchParams);
  const totalPages = await getPlantCarePages(query, limit);
  const plantCareList: PlantCareDocument[] = await getPlantCares(query, currentPage, limit, sort);

  return (
    <TableWrapper
      pages={totalPages}
      link={{ href: `/plantCare/add`, text: "Add Plant Care" }}
    >
      <Table elementsList={plantCareList}></Table>
    </TableWrapper>
  );
}
