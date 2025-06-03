"use client";

import ActionButtons from "../table/ActionButtons";

type Props = {
  plant: {
    _id: string;
  };
};

export default function PlantDetails({ plant }: Props) {
  const route = `/plants/${ plant?._id }`;
  return (
    <div className="flex gap-2">
      <ActionButtons route={ route }/>
    </div>
  );
}
