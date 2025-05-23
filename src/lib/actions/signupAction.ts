"use server";

import "dotenv/config";
import { z } from "zod";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/node-postgres";

import { usersTable } from "@/db/schema";
import { signupSchema } from "@/lib/schemas/signupSchema";

const db = drizzle(process.env.DATABASE_URL!);

export async function signupAction(formData: z.infer<typeof signupSchema>) {
  try {
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    await db.insert(usersTable).values({
      ...formData,
      dateOfBirth: formData.dateOfBirth.toISOString().split("T")[0],
      password: hashedPassword,
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: "Signup failed!" };
  }
}
