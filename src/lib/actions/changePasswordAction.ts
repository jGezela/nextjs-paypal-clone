"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { usersTable } from "@/db/schema";
import { changePasswordSchema } from "@/lib/schemas/changePasswordSchema";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const db = drizzle(process.env.DATABASE_URL!);

export async function changePasswordAction(
  formData: z.infer<typeof changePasswordSchema>
) {
  try {
    const newHashedPassword = await bcrypt.hash(formData.password, 10);
    const session = await getServerSession(authOptions);

    await db
      .update(usersTable)
      .set({ password: newHashedPassword })
      .where(eq(usersTable.id, Number(session?.user.id)));

    return { success: true };
  } catch (e: any) {
    console.error("Change password error: ", e);
    return {
      success: false,
      error: "Something went wrong! Please try again later.",
    };
  }
}
