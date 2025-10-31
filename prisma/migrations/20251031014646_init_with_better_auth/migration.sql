-- CreateSchema
create schema IF not exists "default";



-- CreateSchema
create schema IF not exists "managed_by_better_auth";



-- CreateTable
create table "managed_by_better_auth"."User" (
  "id" char(24) not null,
  "name" text not null,
  "email" text not null,
  "emailVerified" boolean not null default false,
  "image" text,
  "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) not null,
  constraint "User_pkey" primary key ("id")
);



-- CreateTable
create table "managed_by_better_auth"."Account" (
  "id" char(24) not null,
  "accountId" text not null,
  "providerId" text not null,
  "userId" char(24) not null,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp(3),
  "refreshTokenExpiresAt" timestamp(3),
  "scope" text,
  "password" text,
  "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) not null,
  constraint "Account_pkey" primary key ("id")
);



-- CreateTable
create table "managed_by_better_auth"."Session" (
  "id" char(24) not null,
  "expiresAt" timestamp(3) not null,
  "token" text not null,
  "ipAddress" text,
  "userAgent" text,
  "userId" char(24) not null,
  "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) not null,
  constraint "Session_pkey" primary key ("id")
);



-- CreateTable
create table "managed_by_better_auth"."Verification" (
  "id" char(24) not null,
  "identifier" text not null,
  "value" text not null,
  "expiresAt" timestamp(3) not null,
  "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) not null,
  constraint "Verification_pkey" primary key ("id")
);



-- CreateTable
create table "default"."Post" (
  "id" SERIAL not null,
  "title" text not null,
  "content" text,
  "published" boolean not null default false,
  "userId" char(24) not null,
  "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) not null,
  constraint "Post_pkey" primary key ("id")
);



-- CreateIndex
create unique index "User_email_key" on "managed_by_better_auth"."User" ("email");



-- CreateIndex
create index "Account_userId_idx" on "managed_by_better_auth"."Account" ("userId");



-- CreateIndex
create unique index "Session_token_key" on "managed_by_better_auth"."Session" ("token");



-- CreateIndex
create index "Session_userId_idx" on "managed_by_better_auth"."Session" ("userId");



-- CreateIndex
create index "Session_token_idx" on "managed_by_better_auth"."Session" ("token");



-- CreateIndex
create index "Verification_identifier_idx" on "managed_by_better_auth"."Verification" ("identifier");



-- AddForeignKey
alter table "managed_by_better_auth"."Account"
add constraint "Account_userId_fkey" foreign KEY ("userId") references "managed_by_better_auth"."User" ("id") on delete cascade on update cascade;



-- AddForeignKey
alter table "managed_by_better_auth"."Session"
add constraint "Session_userId_fkey" foreign KEY ("userId") references "managed_by_better_auth"."User" ("id") on delete cascade on update cascade;



-- AddForeignKey
alter table "default"."Post"
add constraint "Post_userId_fkey" foreign KEY ("userId") references "managed_by_better_auth"."User" ("id") on delete cascade on update cascade;
