// Import the PrismaClient class from the generated Prisma client
import { PrismaClient } from "@/generated/prisma-client/client";
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from "@/env/server";

type GetDbParams = {
  connectionString: string
}

/**
 * Creates and returns a singleton instance of the PrismaClient configured with a custom
 * PrismaPg adapter. This function uses the new Prisma adapter strategy, where a custom
 * database connection pool (PrismaPg) is passed as the adapter to PrismaClient.
 *
 * The new adapter strategy allows for greater flexibility in managing database connections
 * by decoupling the connection pool implementation from PrismaClient. In this case, the
 * PrismaPg adapter is used to handle database connections, enabling advanced configurations
 * or optimizations specific to the PostgreSQL database.
 *
 * @param {GetDbParams} params - The parameters required to configure the database connection.
 * @param {string} params.connectionString - The connection string used to connect to the database.
 * @returns {PrismaClient} A configured instance of PrismaClient using the PrismaPg adapter.
 */
function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaPg({ connectionString }, { schema: 'prisma' })
  const prismaClient = new PrismaClient({ adapter: pool })

  return prismaClient
}

const prismaClient = getDb({ connectionString: env.DATABASE_URL })
export default prismaClient