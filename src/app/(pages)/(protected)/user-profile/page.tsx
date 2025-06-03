import Card from "@/app/components/dashboard/Card";
import { FaUser } from "react-icons/fa";
import { auth } from "@/auth.ts";

export default async function UserProfile() {
  const session = await auth();
  return (
    <section className="p-6">
      <Card
        title="User details"
        size="sm"
        height="lg"
        icon={ <FaUser className="text-blue-500"/> }
      >User name: { session?.user?.name }</Card>
    </section>
  );
}
