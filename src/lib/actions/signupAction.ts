"use server";

import "dotenv/config";
import { z } from "zod";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/node-postgres";

import { usersTable, userBalanceTable } from "@/db/schema";
import { signupSchema } from "@/lib/schemas/signupSchema";

const db = drizzle(process.env.DATABASE_URL!);

export async function signupAction(formData: z.infer<typeof signupSchema>) {
  try {
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const [user] = await db
      .insert(usersTable)
      .values({
        ...formData,
        dateOfBirth: formData.dateOfBirth.toLocaleDateString("en-CA"),
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });
    await db.insert(userBalanceTable).values({
      userId: user.id,
    });
    return { success: true };
  } catch (e: any) {
    console.error("Signup form error: ", e);
    if (e.constraint === "users_email_unique") {
      return { success: false, error: "User with this email already exists!" };
    }
    return {
      success: false,
      error: "Something went wrong! Please try again later.",
    };
  }
}
