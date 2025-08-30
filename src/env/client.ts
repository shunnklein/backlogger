'use client'

import { createEnv } from "@t3-oss/env-nextjs";
// use zod when we start adding client envs
// import { z } from "zod";
 
/**
 * Represents a build-time checked object for environment variables in a Next.js application.
 * 
 * This `env` object is configured to validate and enforce the structure of environment variables
 * at build time. The `createEnv` function ensures that:
 * 
 * - **Client-side environment variables**: These are prefixed with `NEXT_PUBLIC_` and are validated
 *   using the specified schema (e.g., `z.string().startsWith("<...>")`). These variables are exposed
 *   to the browser and must follow the defined rules.
 * 
 * - **Runtime environment variables**: These are sourced from `process.env` and are replaced by
 *   Next.js during the build process. This ensures that the environment variables are statically
 *   injected into the client-side code, making them available at runtime.
 * 
 * By using this approach, you can catch misconfigurations or missing environment variables early
 * during the build process, improving the reliability and predictability of your application.
 */
export const env = createEnv({
  client: {
    // NEXT_PUBLIC_<...>: z.string().startsWith("<...>"),
  },
  runtimeEnv: {
    // NEXT_PUBLIC_<...>: process.env.NEXT_PUBLIC_<...>
},
});