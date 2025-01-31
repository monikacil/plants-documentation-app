import PlantCarePage from "@/app/components/PlantCarePage";
import { SearchParams } from "@/app/types/others.types";

export default async function Page({ searchParams }: SearchParams) {
  return <PlantCarePage searchParams={searchParams} />;
}
