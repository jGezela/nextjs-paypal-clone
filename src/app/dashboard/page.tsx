import { or, and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { getServerSession } from "next-auth";
import { drizzle } from "drizzle-orm/node-postgres";
import { userBalanceTable, userHistoryTable, usersTable } from "@/db/schema";

import DashBoardBalance from "@/components/dashboard/dashboardBalance";

import { authOptions } from "@/lib/authOptions";
import DashBoardHistory from "@/components/dashboard/dashboardHistory";

const fromUserAlias = alias(usersTable, "from_user");
const toUserAlias = alias(usersTable, "to_user");

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const db = drizzle(process.env.DATABASE_URL!);
  const [{ balance }] = await db
    .select()
    .from(userBalanceTable)
    .where(eq(userBalanceTable.userId, Number(session?.user.id)));

  const recentActivity = await db
    .select({
      amount: userHistoryTable.amount,
      type: userHistoryTable.type,
      note: userHistoryTable.note,
      status: userHistoryTable.status,
      createdAt: userHistoryTable.createdAt,
      fromUser: {
        firstName: fromUserAlias.firstName,
        lastName: fromUserAlias.lastName,
      },
      toUser: {
        firstName: toUserAlias.firstName,
        lastName: toUserAlias.lastName,
      },
    })
    .from(userHistoryTable)
    .leftJoin(fromUserAlias, eq(userHistoryTable.fromUserId, fromUserAlias.id))
    .leftJoin(toUserAlias, eq(userHistoryTable.toUserId, toUserAlias.id))
    .where(
      or(
        and(
          eq(userHistoryTable.type, "SEND"),
          eq(userHistoryTable.fromUserId, Number(session?.user.id))
        ),
        and(
          eq(userHistoryTable.type, "RECEIVED"),
          eq(userHistoryTable.toUserId, Number(session?.user.id))
        )
      )
    )
    .limit(5);

  return (
    <section>
      <header className="mb-5 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <DashBoardBalance accountBalance={balance} />
        <DashBoardHistory accountHistory={recentActivity} />
      </div>
    </section>
  );
}
