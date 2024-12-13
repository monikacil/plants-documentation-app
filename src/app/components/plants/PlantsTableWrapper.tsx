import { addPlant} from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";

import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlantsTableWrapper({ data, collection }: { data: Plant[], collection: Collections }) {
  return (
    <>
      <div className="py-4 flex flex-col md:flex-row-reverse gap-3 justify-between">
        <PlantModal collection={collection} title="Add Plant" color="success" plantAction={addPlant} />
      </div>
      <div>
        <PlantTable collection={ collection } data={ data } />
      </div>
    </>

  )
}
