import { fetchPlantsPages, getPlants } from "@/app/actions/plant.actions";
import { Collections, PlantTableType } from "@/app/types/plant.types";

import PlantTable from "@/app/components/plants/PlantTable";
import { PAGINATION_LIMIT } from "@/app/lib/constants";
import TableWrapper from "@/app/components/table/TableWrapper";

type Props = {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const collection = (await params).slug as Collections
  const searchedParams = await searchParams;
  const query = searchedParams?.query || '';
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = PAGINATION_LIMIT
  const totalPages = await fetchPlantsPages(query, collection, limit)
  const sortBy = searchedParams?.sortBy || undefined
  const order = searchedParams?.order || "asc"
  let sort = undefined
  if (sortBy) {
    sort = [{key: sortBy, direction: order}]
  }

  const plantsList: PlantTableType[] = await getPlants(collection, query, currentPage, limit, sort)

  return (
    <TableWrapper query={query} currentPage={currentPage} pages={totalPages} link={{href: `/plants/${collection}/add`, text: "Add Plant"}}>
      <PlantTable plantsList={ plantsList } collection={ collection } />
    </TableWrapper>
    )
}
