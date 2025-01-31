import { deletePlantCare } from "@/app/actions/plantCare.actions";
import DeleteElementModal from "@/app/components/modal/DeleteElementModal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;

  return (
    <DeleteElementModal
      id={id}
      title="Delete Plant Care"
      action={deletePlantCare}
      route="/plantCare"
    />
  );
}
