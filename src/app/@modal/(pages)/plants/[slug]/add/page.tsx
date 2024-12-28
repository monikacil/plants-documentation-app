import { addPlant } from '@/app/actions/plant.actions'
import BasicModal from '@/app/components/common/BasicModal'
import PlantForm from '@/app/components/plants/PlantForm'
import { Collections } from '@/app/types/plantTypes'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const collection = (await params).slug as Collections

  return (
    <BasicModal title="Add plant">
      <PlantForm collection={ collection } plantAction = { addPlant } />
    </BasicModal>
  )
}
