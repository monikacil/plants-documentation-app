import PlantProtectionPage from "@/app/components/PlantProtectionPage";
import { SearchParams } from "@/app/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <PlantProtectionPage searchParams={searchParams} />;
}
