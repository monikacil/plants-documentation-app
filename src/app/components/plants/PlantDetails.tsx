"use client"

import { Collections, PlantDocument } from "@/app/types/plant.types";
import ActionButtons from "../table/ActionButtons";

type Props = {
  plant: PlantDocument,
  collection: Collections
}

export default function PlantDetails({ plant, collection }: Props) {
  const url = `/plants/${ collection }/${ plant?._id }`
  return (
    <div className="flex gap-2">
      <ActionButtons url={ url } />
    </div>
  );
}
