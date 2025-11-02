import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "db";
import { env } from "@src/env/server";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  plugins: [
    // Allows Better Auth to write cookies from the server when authentication happens in Server Actions
    // Works by adding a `Set-Cookie` header to the response
    nextCookies(), // From docs: make sure this is the last plugin in the array
  ],
  advanced: {
    database: {
      generateId: false, // Prisma will handle ID generation with cuid(2)
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  // TODO: Read the Better Auth docs and configure:
  // - Social providers (Google, etc.)?
  // - Email/password authentication?
  // - Session configuration?
  // - Callbacks and hooks?
  // https://www.better-auth.com/docs
});
