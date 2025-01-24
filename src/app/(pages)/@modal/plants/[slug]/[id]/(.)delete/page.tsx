import { Collections } from "@/app/types/plant.types";

import PlantsDeleteModal from "@/app/components/plants/PlantsDeleteModal";

export default async function InterceptedPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const slug = (await params).slug as Collections;
  const id = (await params).id;

  return <PlantsDeleteModal id={id} collection={slug} />;
}
