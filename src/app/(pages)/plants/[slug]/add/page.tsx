import PlantsCollectionPage from "@/app/components/PlantsCollectionPage";

type Props = {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  return <PlantsCollectionPage params= { params } searchParams={ searchParams } />
}
