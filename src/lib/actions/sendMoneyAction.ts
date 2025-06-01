"use server";

import "dotenv/config";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { usersTable, userBalanceTable, userHistoryTable } from "@/db/schema";
import { sendMoneySchema } from "@/lib/schemas/sendMoneySchema";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const db = drizzle(process.env.DATABASE_URL!);

export async function sendMoneyAction(
  formData: z.infer<typeof sendMoneySchema>
) {
  try {
    // Destination user
    const [destinationUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, formData.email));
    if (!destinationUser) {
      return {
        success: false,
        error:
          "The recipient of the money was not found! Please check that the email address you provided is correct.",
      };
    }

    const [destinationUserBalance] = await db
      .select()
      .from(userBalanceTable)
      .where(eq(userBalanceTable.userId, destinationUser.id));
    const destUserNewBalance =
      Number(destinationUserBalance.balance) + formData.amount;
    await db
      .update(userBalanceTable)
      .set({ balance: String(destUserNewBalance) })
      .where(eq(userBalanceTable.userId, destinationUser.id));

    // User
    const session = await getServerSession(authOptions);
    const [user] = await db
      .select()
      .from(userBalanceTable)
      .where(eq(userBalanceTable.userId, Number(session?.user.id)));
    const userNewBalance = Number(user.balance) - formData.amount;
    if (userNewBalance < 0) {
      return {
        success: false,
        error: "You do not have enough funds in your account to send money!",
      };
    }
    await db
      .update(userBalanceTable)
      .set({ balance: String(userNewBalance) })
      .where(eq(userBalanceTable.userId, Number(session?.user.id)));

    // Send notification
    await db.insert(userHistoryTable).values([
      {
        fromUserId: Number(session?.user.id),
        toUserId: Number(destinationUser.id),
        amount: String(formData.amount),
        type: "SEND",
        note: formData.note,
        status: "SUCCESS",
      },
      {
        fromUserId: Number(session?.user.id),
        toUserId: Number(destinationUser.id),
        amount: String(formData.amount),
        type: "RECEIVED",
        note: formData.note,
        status: "SUCCESS",
      },
    ]);

    return { success: true };
  } catch (e: any) {
    console.error("Send money form error: ", e);
    return {
      success: false,
      error: "Something went wrong! Please try again later.",
    };
  }
}
