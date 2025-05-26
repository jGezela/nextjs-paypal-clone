import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "@/db/schema";

import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const db = drizzle(process.env.DATABASE_URL!);

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email))
          .limit(1);
        if (!existingUser[0]) {
          return null;
        }

        const isPasswdCorrect = await bcrypt.compare(
          credentials.password,
          existingUser[0].password
        );
        if (!isPasswdCorrect) {
          return null;
        }

        return {
          id: existingUser[0].id.toString(),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 900,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
