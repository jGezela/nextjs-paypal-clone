import { or, and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { getServerSession } from "next-auth";
import { drizzle } from "drizzle-orm/node-postgres";
import { userHistoryTable, usersTable } from "@/db/schema";

import { CustomDataTable } from "@/components/customDataTable";

import {
  AccountHistory,
  customColumnsHistory,
} from "@/lib/tables/historyColumns";
import { authOptions } from "@/lib/authOptions";

const fromUserAlias = alias(usersTable, "from_user");
const toUserAlias = alias(usersTable, "to_user");

export default async function AccountHistoryPage() {
  const session = await getServerSession(authOptions);

  const db = drizzle(process.env.DATABASE_URL!);
  const userActivity = await db
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
    );

  return (
    <section>
      <header className="mb-5 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Account history</h1>
      </header>
      <CustomDataTable columns={customColumnsHistory} data={userActivity} />
    </section>
  );
}
