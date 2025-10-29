-- Migration for Better Auth schema conversion
-- This migration converts the existing NextAuth schema to Better Auth schema

-- Update Account table structure
ALTER TABLE "prisma"."Account" DROP CONSTRAINT "Account_pkey";
ALTER TABLE "prisma"."Account" ADD COLUMN "id" TEXT;
ALTER TABLE "prisma"."Account" ADD COLUMN "accountId" TEXT;
UPDATE "prisma"."Account" SET "id" = gen_random_uuid()::TEXT WHERE "id" IS NULL;
UPDATE "prisma"."Account" SET "accountId" = "providerAccountId" WHERE "accountId" IS NULL;
ALTER TABLE "prisma"."Account" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "prisma"."Account" ALTER COLUMN "accountId" SET NOT NULL;
ALTER TABLE "prisma"."Account" ADD PRIMARY KEY ("id");

-- Rename and restructure Account columns
ALTER TABLE "prisma"."Account" RENAME COLUMN "refresh_token" TO "refreshToken";
ALTER TABLE "prisma"."Account" RENAME COLUMN "access_token" TO "accessToken";
ALTER TABLE "prisma"."Account" RENAME COLUMN "expires_at" TO "expiresAt";
ALTER TABLE "prisma"."Account" RENAME COLUMN "id_token" TO "idToken";
ALTER TABLE "prisma"."Account" RENAME COLUMN "provider" TO "providerId";

-- Add new Account columns for Better Auth
ALTER TABLE "prisma"."Account" ADD COLUMN "accessTokenExpiresAt" TIMESTAMP(3);
ALTER TABLE "prisma"."Account" ADD COLUMN "refreshTokenExpiresAt" TIMESTAMP(3);
ALTER TABLE "prisma"."Account" ADD COLUMN "password" TEXT;

-- Convert expiresAt from INTEGER to TIMESTAMP if needed
-- (This depends on your current data - you may need to handle this conversion)

-- Drop old columns that are not needed
ALTER TABLE "prisma"."Account" DROP COLUMN IF EXISTS "type";
ALTER TABLE "prisma"."Account" DROP COLUMN IF EXISTS "token_type";
ALTER TABLE "prisma"."Account" DROP COLUMN IF EXISTS "session_state";

-- Create unique constraint for Better Auth
ALTER TABLE "prisma"."Account" ADD CONSTRAINT "Account_providerId_accountId_key" UNIQUE ("providerId", "accountId");

-- Update Session table structure
ALTER TABLE "prisma"."Session" DROP CONSTRAINT IF EXISTS "Session_sessionToken_key";
ALTER TABLE "prisma"."Session" ADD COLUMN "id" TEXT;
ALTER TABLE "prisma"."Session" ADD COLUMN "ipAddress" TEXT;
ALTER TABLE "prisma"."Session" ADD COLUMN "userAgent" TEXT;
UPDATE "prisma"."Session" SET "id" = gen_random_uuid()::TEXT WHERE "id" IS NULL;
ALTER TABLE "prisma"."Session" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "prisma"."Session" ADD PRIMARY KEY ("id");

-- Rename Session columns
ALTER TABLE "prisma"."Session" RENAME COLUMN "sessionToken" TO "token";
ALTER TABLE "prisma"."Session" RENAME COLUMN "expires" TO "expiresAt";

-- Recreate unique constraint on token
ALTER TABLE "prisma"."Session" ADD CONSTRAINT "Session_token_key" UNIQUE ("token");

-- Create Verification table for Better Auth
CREATE TABLE "prisma"."Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- Create unique index for Verification
CREATE UNIQUE INDEX "Verification_identifier_value_key" ON "prisma"."Verification"("identifier", "value");