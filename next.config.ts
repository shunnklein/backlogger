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
  
  // from https://env.t3.gg/docs/nextjs :
  // if you turn on `output: "standalone"`, you need to make sure to include `transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"]`
};

export default nextConfig;
