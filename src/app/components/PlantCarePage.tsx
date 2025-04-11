import { getPlantCarePages, getPlantCares } from "@/actions/plantCare.actions";
import TableWrapper from "@/components/table/TableWrapper";
import { PlantCareDocument } from "@/types/plantCare.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";
import tableConfig from "@/tablesConfig/plantCareTable.json";
import TableGenerator from "./table/TableGenerator";

export default async function PlantCarePage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(searchParams);
  const totalPages = await getPlantCarePages(query, limit);
  const plantCareList: PlantCareDocument[] = await getPlantCares(query, currentPage, limit, sort);

  const plantCare = await Promise.all(
    plantCareList.map(async (care: PlantCareDocument) => {
      return { ...care, date: new Date(care.date) };
    })
  );

  return (
    <TableWrapper
      pages={totalPages}
      link={{ href: `/plantCare/add`, text: "Add Plant Care" }}
    >
      <TableGenerator
        tableConfig={tableConfig}
        data={plantCare}
      ></TableGenerator>
    </TableWrapper>
  );
}
