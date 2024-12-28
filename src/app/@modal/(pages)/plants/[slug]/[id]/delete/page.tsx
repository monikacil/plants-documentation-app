import ConfirmDeletePlant from '@/app/components/plants/ConfirmDeletePlant'
import { Collections } from '@/app/types/plantTypes'

type Props = {
  params: Promise<{ slug: string, id: string }>
}

export default async function Page({ params }: Props) {
  const collection = (await params).slug as Collections
  const plantId = (await params).id

  return (
    <ConfirmDeletePlant collection={ collection } id={ plantId } />
  )
}
