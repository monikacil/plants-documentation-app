import { getPlantsPages, getPlants } from "@/app/actions/plant.actions";
import { Collections, PlantTableType } from "@/app/types/plant.types";

import { PAGINATION_LIMIT } from "@/app/lib/constants";
import TableWrapper from "@/app/components/table/TableWrapper";
import Table from "@/app/components/table/Table";

type Props = {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function PlantsCollectionPage({ params, searchParams }: Props) {
  const collection = (await params).slug as Collections
  const searchedParams = await searchParams;
  const query = searchedParams?.query || '';
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = PAGINATION_LIMIT
  const totalPages = await getPlantsPages(query, collection, limit)
  const sortBy = searchedParams?.sortBy || undefined
  const order = searchedParams?.order || undefined
  let sort;
  if (sortBy && order) {
    sort = [{ key: sortBy, direction: order }]
  }

  const plantsList: PlantTableType[] = await getPlants(collection, query, currentPage, limit, sort)

  return (
    <TableWrapper pages={ totalPages } link={{ href: `/plants/${collection}/add`, text: "Add Plant" }}>
      <Table elementsList={ plantsList }></Table>
    </TableWrapper>
    )
}
