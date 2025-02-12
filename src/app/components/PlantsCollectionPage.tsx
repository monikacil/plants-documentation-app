import { getPlantsPages, getPlants } from "@/actions/plant.actions";
import { Collections, PlantTableType } from "@/types/plant.types";

import TableWrapper from "@/components/table/TableWrapper";
import Table from "@/components/table/Table";
import getPageSearchParams from "../lib/pagesHelper";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string;
  }>;
};

export default async function PlantsCollectionPage({
  params,
  searchParams,
}: Props) {
  const collection = (await params).slug as Collections;
  const { query, currentPage, limit, sort } = await getPageSearchParams(
    searchParams
  );
  const totalPages = await getPlantsPages(query, collection, limit);
  const plantsList: PlantTableType[] = await getPlants(
    collection,
    query,
    currentPage,
    limit,
    sort
  );

  return (
    <TableWrapper
      pages={totalPages}
      link={{ href: `/plants/${collection}/add`, text: "Add Plant" }}
    >
      <Table elementsList={plantsList}></Table>
    </TableWrapper>
  );
}
