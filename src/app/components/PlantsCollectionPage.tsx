import { getPlantsPages, getPlants } from "@/actions/plant.actions";
import { Collections, PlantTableType } from "@/types/plant.types";

import TableWrapper from "@/components/table/TableWrapper";
import getPageSearchParams from "../lib/pagesHelper";
import TableGenerator from "./table/TableGenerator";
import tableConfig from "@/tablesConfig/plantsTable.json";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string;
  }>;
};

export default async function PlantsCollectionPage({ params, searchParams }: Props) {
  const collection = (await params).slug as Collections;
  const { query, currentPage, limit, sort } = await getPageSearchParams(searchParams);
  const totalPages = await getPlantsPages(query, collection, limit);
  const plantsList: PlantTableType[] = await getPlants(collection, query, currentPage, limit, sort);
  const collectionTableConfig =
    tableConfig.find((config) => config[collection])?.[collection] || null; // Fallback to null if not found

  console.log(collectionTableConfig);

  if (!collectionTableConfig) {
    throw new Error(`No configuration found for collection: ${collection}`);
  }

  const plants = await Promise.all(
    plantsList.map(async (plant: PlantTableType) => {
      return { ...plant, date: new Date(plant.date) };
    })
  );

  return (
    <TableWrapper
      title='Plants'
      pages={totalPages}
      link={{ href: `/plants/${collection}/add`, text: "Add Plant" }}
    >
      <TableGenerator
        tableConfig={collectionTableConfig}
        data={plants}
      ></TableGenerator>{" "}
    </TableWrapper>
  );
}
