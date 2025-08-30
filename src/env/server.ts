import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
/**
 * Represents a build-time checked object for environment variables.
 * 
 * This object is created using `createEnv` and ensures that the required
 * environment variables are validated at build time. The `server` property
 * defines the expected environment variables for the server-side, such as
 * `DATABASE_URL`, which must be a valid URL starting with "postgresql://".
 * 
 * The `experimental__runtimeEnv` property is populated with the actual
 * runtime environment variables from `process.env`.
 * 
 * This approach helps catch configuration errors early during development
 * or build time, ensuring that the application has the necessary environment
 * variables properly set before deployment.
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.url().startsWith("postgresql://"),
  },
  experimental__runtimeEnv: process.env,
});