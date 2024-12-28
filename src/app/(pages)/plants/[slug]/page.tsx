import { Suspense } from "react";

import { addPlant, fetchPlantsPages, getPlants } from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";

import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";
import Search from "@/app/components/common/Search";
import { BasicPagination } from "@/app/components/common/BasicPagination";
import TableSceleton from "@/app/components/skeletons/TableSceleton";

type Props = {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const collection = (await params).slug as Collections
  const searchedParams = await searchParams;
  const query = searchedParams?.query || '';
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = 5
  const totalPages = await fetchPlantsPages(query, collection, limit)
  const plantsList:Plant[] = await getPlants(collection, query, currentPage, limit)


  return (
      <>
        <div className="py-4 flex flex-col md:flex-row-reverse gap-3 justify-between">
          <PlantModal collection={collection} title="Add Plant" color="success" plantAction={addPlant} />
        </div>
        <Search placeholder="Search for plant..." />
        <Suspense key={query + currentPage} fallback={<TableSceleton />}>
          <PlantTable plantsList={ plantsList } collection={ collection } query={ query } currentPage={ currentPage } limit={ limit } />
        </Suspense>
        <BasicPagination totalPages={ totalPages } />
      </>
    )
}
