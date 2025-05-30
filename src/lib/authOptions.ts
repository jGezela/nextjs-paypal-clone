import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

export const authOptions = {
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
          name: existingUser[0].firstName + " " + existingUser[0].lastName,
          email: existingUser[0].email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  } as const,
  jwt: {
    maxAge: 900,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
};
