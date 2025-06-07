"use server";

import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { usersTable } from "@/db/schema";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const db = drizzle(process.env.DATABASE_URL!);

export async function deleteAccountAction() {
  try {
    const session = await getServerSession(authOptions);

    await db
      .delete(usersTable)
      .where(eq(usersTable.id, Number(session?.user.id)));

    return { success: true };
  } catch (e: any) {
    console.error("Deleting account error: ", e);
    return {
      success: false,
      error: "Something went wrong! Please try again later.",
    };
  }
}
