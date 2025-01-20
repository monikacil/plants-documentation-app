import { editPlant, getPlant } from "@/app/actions/plant.actions"
import ModalWrapper from "@/app/components/modal/ModalWrapper"
import PlantForm from "@/app/components/plants/PlantForm"
import { Collections, PlantTableType } from "@/app/types/plant.types"

export default async function ParallelRoutePage({ params }: { params: Promise<{ slug: string, id: string }> }) {
  const slug = (await params).slug as Collections
  const id = (await params).id
  const plant: PlantTableType = await getPlant(id, slug)

  return (
    <ModalWrapper title="Edit Plant" route={`/plants/${ slug }`}>
      <PlantForm plant={ plant } collection={slug} action={ editPlant } />
    </ModalWrapper>
  )
}
