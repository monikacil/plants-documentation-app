import { Suspense } from "react";

import { fetchPlantsPages, getPlants } from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";

import PlantTable from "@/app/components/plants/PlantTable";
import Search from "@/app/components/common/Search";
import { BasicPagination } from "@/app/components/common/BasicPagination";
import TableSceleton from "@/app/components/skeletons/TableSceleton";
import Link from "next/link";
import BasicButton from "@/app/components/common/BasicButton";

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
      <nav>
        <Link href={`/plants/${collection}/add`}><BasicButton>Add new plant</BasicButton></Link>
      </nav>
        <Search placeholder="Search for plant..." />
        <Suspense key={query + currentPage} fallback={<TableSceleton />}>
          <PlantTable plantsList={ plantsList } collection={ collection } />
        </Suspense>
        <BasicPagination totalPages={ totalPages } />
      </>
    )
}
