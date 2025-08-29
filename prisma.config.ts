import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    // path: path.join("db", "migrations"),
    seed: "tsx prisma/seed.ts"
  },
//   views: {
//     path: path.join("db", "views"),
//   },
//   typedSql: {
//     path: path.join("db", "queries"),
//   }
} satisfies PrismaConfig;