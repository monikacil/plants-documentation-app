import { Suspense } from "react";

import { fetchPlantsPages, getPlants } from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";

import PlantTable from "@/app/components/plants/PlantTable";
import Search from "@/app/components/common/Search";
import { BasicPagination } from "@/app/components/common/BasicPagination";
import TableSceleton from "@/app/components/skeletons/TableSceleton";
import Link from "next/link";
import BasicButton from "@/app/components/common/BasicButton";
import { PAGINATION_LIMIT } from "@/app/lib/constants";

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
  const limit = PAGINATION_LIMIT
  const totalPages = await fetchPlantsPages(query, collection, limit)
  const plantsList:Plant[] = await getPlants(collection, query, currentPage, limit)

  return (
      <>
      <nav className="flex justify-between mb-3">
        <Search placeholder="Search for plant..." />
        <Link href={`/plants/${collection}/add`} scroll={false}><BasicButton size="md">Add new plant</BasicButton></Link>
      </nav>
        <Suspense key={query + currentPage} fallback={<TableSceleton />}>
          <PlantTable plantsList={ plantsList } collection={ collection } />
      </Suspense>
      { totalPages > 1 ? <BasicPagination totalPages={ totalPages } /> : null }
      </>
    )
}
