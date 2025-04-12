import TableWrapper from "@/components/table/TableWrapper";
import { PlantProtectionDocument } from "@/types/plantProtection.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";
import tableConfig from "@/tablesConfig/plantProtectionTable.json";
import TableGenerator from "./table/TableGenerator";
import { getPlantProtectionPages, getPlantProtections } from "@/actions/plantProtection.actions";

export default async function PlantProtectionPage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(searchParams);
  const totalPages = await getPlantProtectionPages(query, limit);
  const plantProtectionList: PlantProtectionDocument[] = await getPlantProtections(
    query,
    currentPage,
    limit,
    sort
  );

  const plantProtection = await Promise.all(
    plantProtectionList.map(async (ProtectionPlantProtection: PlantProtectionDocument) => {
      return { ...ProtectionPlantProtection, date: new Date(ProtectionPlantProtection.date) };
    })
  );

  console.log(tableConfig);

  return (
    <TableWrapper
      title='List of Plant Protection'
      pages={totalPages}
      link={{ href: `/plant-protection/add`, text: "Add Plant Protection" }}
    >
      <TableGenerator
        tableConfig={tableConfig}
        data={plantProtection}
      ></TableGenerator>
    </TableWrapper>
  );
}
