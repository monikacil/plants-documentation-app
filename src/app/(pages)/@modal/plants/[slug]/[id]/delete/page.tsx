import { Collections } from "@/types/plant.types";

import { deletePlant } from "@/actions/plant.actions";
import DeleteElementModal from "@/components/modal/DeleteElementModal";

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const slug = (await params).slug as Collections;
  const id = (await params).id;

  return (
    <DeleteElementModal
      id={id}
      slug={slug}
      title="Delete Plant Care"
      action={deletePlant}
      route={`/plants/${slug}`}
      withRoute
    />
  );
}
