import { Collections } from "@/app/types/plant.types";

import PlantsDeleteModal from "@/app/components/plants/PlantsDeleteModal";

type Props = {
  params: Promise<{ slug: string, id: string }>
}

export default async function InterceptedPage({ params }: Props) {
  const slug = (await params).slug as Collections
  const id = (await params).id

  return (
    <PlantsDeleteModal id={ id } collection={ slug } withRoute />
  )
}
