import type { NextConfig } from "next";

// These imports will typecheck that the env files match the shape expected by typescript
import "@src/env/server";
import "@src/env/client";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    //
    typedEnv: true,
  },
  typedRoutes: true,
  eslint: {
    // In this repo use `npm run lint` to run the full lint
    // Vscode should show you lint errors as you type
    // and pull request restrictions will run the full lint too
    "ignoreDuringBuilds": true,
  },

  // from https://env.t3.gg/docs/nextjs :
  // if you turn on `output: "standalone"`, you need to make sure to include `transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"]`
};

export default nextConfig;
