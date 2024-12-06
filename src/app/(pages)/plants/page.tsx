'use client'
import Link from "next/link";
import { useState } from "react";
import AddPlantModal from "@/app/components/plants/AddPlantModal";

export default function Plants() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Link href="/plants/collected" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Collection
      </Link>
        <Link href="/plants/sold" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Sold plants
      </Link>
        <Link href="/plants/purchased" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Purchased plants
      </Link>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Open modal</button>
      </div>
      {isModalOpen ? <AddPlantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      </AddPlantModal> : null}
    </div>
  );
}
