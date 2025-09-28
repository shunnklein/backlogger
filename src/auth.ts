import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "db";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
      session({ session, user }) {
        session.user.id = user.id;
        return session;
      },
    },
  };
});
