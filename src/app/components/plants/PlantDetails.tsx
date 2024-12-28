"use client"

import { Plant, Collections } from "@/app/types/plantTypes";
import Link from "next/link";
import BasicButton from "../common/BasicButton";

type Props = {
  plant: Plant,
  collection: Collections
}

export default function PlantDetails({ plant, collection }: Props) {
  return (
    <div className="flex gap-2">
      <Link href={`/plants/${collection}/${plant._id}/edit`} scroll={false}><BasicButton color="teal">Edit</BasicButton></Link>
      <Link href={`/plants/${collection}/${plant._id}/delete`} scroll={false}><BasicButton color="red">Delete</BasicButton></Link>
    </div>
  );
}
