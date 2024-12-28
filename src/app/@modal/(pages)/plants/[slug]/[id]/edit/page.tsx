import { editPlant, getPlant } from '@/app/actions/plant.actions'
import BasicModal from '@/app/components/common/BasicModal'
import PlantForm from '@/app/components/plants/PlantForm'
import { Collections, Plant } from '@/app/types/plantTypes'

type Props = {
  params: Promise<{ slug: string, id: string }>
}

export default async function Page({ params }: Props) {
  const collection = (await params).slug as Collections
  const plantId = (await params).id
  const plant: Plant = await getPlant(plantId, collection)

  return (
    <BasicModal title="Edit plant">
      <PlantForm plant={ plant } collection={ collection } plantAction = { editPlant } />
    </BasicModal>
  )
}
