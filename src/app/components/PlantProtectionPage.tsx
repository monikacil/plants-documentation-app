import TableWrapper from "@/app/components/table/TableWrapper";
import { PlantProtectionDocument } from "@/app/mongoose/types/protection.types.ts";
import { SearchParams } from "@/app/mongoose/types/others.types";
import getPageSearchParams from "../lib/pagesHelper";
import tableConfig from "@/app/tablesConfig/plantProtectionTable.json";
import TableGenerator from "./table/TableGenerator";
import { getPlantProtectionPages, getPlantProtections } from "@/app/actions/plantProtection.actions";

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

  return (
    <TableWrapper
      title='List of Plant Protection'
      pages={ totalPages }
      link={ { href: `/plant-protection/add`, text: "Add Plant Protection" } }
    >
      <TableGenerator
        tableConfig={ tableConfig }
        data={ plantProtection }
      ></TableGenerator>
    </TableWrapper>
  );
}
