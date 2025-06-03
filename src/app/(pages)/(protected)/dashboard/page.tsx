"use client";
import { FaBug, FaLeaf, FaMoneyBillWave, FaShoppingBasket, } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import Card from "@/app/components/dashboard/Card";

export default function Dashboard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
      <Card
        title="Rośliny w kolekcji"
        size="sm"
        height="md"
        icon={ <FaLeaf className="text-green-500"/> }
      >42</Card>
      <Card
        title="Sprzedane w tym roku"
        size="lg"
        icon={ <GiReceiveMoney className="text-emerald-500"/> }
      >12 / 640 zł</Card>
      <Card
        title="Kupione rośliny"
        size="md"
        icon={ <FaShoppingBasket className="text-indigo-500"/> }
      >8 (ostatnia: Calathea Orbifolia)</Card>
      <Card
        title="Wydatki na akcesoria"
        size="md"
        icon={ <FaMoneyBillWave className="text-yellow-500"/> }
      >312zł</Card>
      <Card
        title="Ostatnia ochrona"
        size="lg"
        icon={ <FaBug className="text-red-500"/> }
      >10 maja 2025 (oprysk na przędziorka)</Card>
      <Card
        title="Rośliny w kolekcji"
        size="sm"
        icon={ <FaLeaf className="text-green-500"/> }
      >42</Card>
    </section>
  );
}
