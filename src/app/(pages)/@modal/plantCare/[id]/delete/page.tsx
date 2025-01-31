import PlantCareDeleteModal from "@/app/components/plantCare/PlantCareDeleteModal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;

  return <PlantCareDeleteModal id={id} withRoute />;
}
