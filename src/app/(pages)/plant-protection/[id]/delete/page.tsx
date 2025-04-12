import PlantProtectionPage from "@/components/PlantProtectionPage";
import { SearchParams } from "@/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <PlantProtectionPage searchParams={searchParams} />;
}
