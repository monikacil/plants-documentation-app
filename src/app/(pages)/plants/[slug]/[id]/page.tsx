import PlantDetailsPage from "@/components/PlantDetailsPage";

type Props = {
  params: Promise<{ id: string; slug: string }>;
};

export default async function Page({ params }: Props) {
  return (
    <>
      <PlantDetailsPage params={params} />
    </>
  );
}
