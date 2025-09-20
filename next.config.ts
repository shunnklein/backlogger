import type { NextConfig } from "next";

// These imports will typecheck that the env files match the shape expected by typescript
import "@src/env/server";

// TODO: Read the full next js config docs and bring this project up to date with best practices
const nextConfig: NextConfig = {
  experimental: {
    // This is kinda an unnecessary feature because we are already using `t3-oss`
    // to validate env vars at build time, but it's here to just give a little
    // intellisense help when actually using `process.env.*` in the code.
    typedEnv: true,
  },
  typedRoutes: true,
  eslint: {
    // In this repo use `npm run lint` to run the full lint
    // Vscode should show you lint errors as you type
    // and pull request restrictions will run the full lint too
    ignoreDuringBuilds: true,
  },

  /* Note for the t3-oss npm package, from https://env.t3.gg/docs/nextjs :
   * > if you turn on `output: "standalone"`, you need to make sure to include `transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"]`
   */
};

export default nextConfig;
