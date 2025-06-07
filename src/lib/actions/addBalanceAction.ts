"use server";

import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { userBalanceTable } from "@/db/schema";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const db = drizzle(process.env.DATABASE_URL!);

export async function addBalanceAction() {
  try {
    const session = await getServerSession(authOptions);

    const [userBalance] = await db
      .select()
      .from(userBalanceTable)
      .where(eq(userBalanceTable.userId, Number(session?.user.id)));

    if (!userBalance) {
      return { success: false, error: "User balance not found." };
    }

    const newBalance = Number(userBalance.balance) + 100;

    await db
      .update(userBalanceTable)
      .set({ balance: newBalance.toString() })
      .where(eq(userBalanceTable.userId, Number(session?.user.id)));

    return { success: true };
  } catch (e: any) {
    console.error("Adding balance error: ", e);
    return {
      success: false,
      error: "Something went wrong! Please try again later.",
    };
  }
}
