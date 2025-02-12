import PlantCarePage from "@/components/PlantCarePage";
import { SearchParams } from "@/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <PlantCarePage searchParams={searchParams} />;
}
