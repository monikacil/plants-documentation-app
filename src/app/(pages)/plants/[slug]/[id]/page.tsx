import PlantDetailsPage from "@/app/components/PlantDetailsPage";

export default async function Page({ params }: { params: Promise<{ id: string, slug: string }> }) {
  return (
    <>
      <PlantDetailsPage params={ params } />
    </>
  );
}
