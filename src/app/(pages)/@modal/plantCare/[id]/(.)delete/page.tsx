import { deletePlantProtection } from "@/actions/plantProtection.actions";
import DeleteElementModal from "@/components/modal/DeleteElementModal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;

  return (
    <DeleteElementModal
      id={id}
      title='Delete Plant Protection'
      action={deletePlantProtection}
      route='/plant-protection'
    />
  );
}
