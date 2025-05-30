import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { userBalanceTable } from "@/db/schema";
import { getServerSession } from "next-auth";

import { SidebarTrigger } from "@/components/ui/sidebar";
import DashBoardBalance from "@/components/dashboard/dashboardBalance";

import { authOptions } from "@/lib/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const db = drizzle(process.env.DATABASE_URL!);
  const [{ balance }] = await db.select().from(userBalanceTable).where(eq(userBalanceTable.userId, Number(session?.user.id)));

  return (
    <section>
      <header className="mb-5 flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <DashBoardBalance accountBalance={balance} />
    </section>
  );
}