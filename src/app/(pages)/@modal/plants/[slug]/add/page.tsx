import { addPlant } from "@/app/actions/plant.actions"
import ModalWrapper from "@/app/components/modal/ModalWrapper"
import PlantForm from "@/app/components/plants/PlantForm"
import { Collections } from "@/app/types/plant.types"

export default async function ParallelRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug as Collections
  return (
    <ModalWrapper title="Add Plant" route={`/plants/${ slug }`}>
      <PlantForm collection={slug} action={ addPlant } />
    </ModalWrapper>
  )
}
