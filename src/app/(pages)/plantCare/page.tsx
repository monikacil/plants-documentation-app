import {
  getPlantCarePages,
  getPlantCares,
} from "@/app/actions/plantCare.actions";
import Table from "@/app/components/table/Table";
import TableWrapper from "@/app/components/table/TableWrapper";
import { PAGINATION_LIMIT } from "@/app/lib/constants";
import { SearchParams } from "@/app/types/others.types";
import { PlantCareDocument } from "@/app/types/plantCare.types";

export default async function Page({ searchParams }: SearchParams) {
  const searchedParams = await searchParams;
  const query = searchedParams?.query || "";
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = PAGINATION_LIMIT;
  const totalPages = await getPlantCarePages(query, limit);
  const sortBy = searchedParams?.sortBy || undefined;
  const order = searchedParams?.order || "asc";
  let sort = undefined;
  if (sortBy) {
    sort = [{ key: sortBy, direction: order }];
  }

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
