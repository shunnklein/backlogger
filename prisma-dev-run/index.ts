#!/usr/bin/env node

import { spawn } from "node:child_process";
import { unstable_startServer } from "@prisma/dev";

// Parse command line arguments
const args = process.argv.slice(2);
const separatorIndex = args.indexOf("--");

if (separatorIndex === -1) {
  console.error("Usage: prisma-dev-run -- <command>");
  console.error("Example: prisma-dev-run -- next dev");
  process.exit(1);
}

const command = args.slice(separatorIndex + 1);

if (command.length === 0) {
  console.error("Error: No command provided after --");
  console.error("Usage: prisma-dev-run -- <command>");
  process.exit(1);
}

let server: Awaited<ReturnType<typeof unstable_startServer>> | undefined;

try {
  // Start local Prisma Postgres server
  console.log("Starting local Prisma Postgres server...");
  server = await unstable_startServer({
    name: "default",
    persistenceMode: "stateless",
  });

  const databaseUrl = server.database.connectionString;
  console.log("Database ready:", databaseUrl);

  // Spawn child process with DATABASE_URL
  console.log(`Running migrations: prisma migrate dev`);
  const migrateChild = spawn("prisma migrate dev", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    shell: true,
  });

  // Wait for child process to exit
  await new Promise<void>((resolve) => {
    migrateChild.on("exit", (code, signal) => {
      if (signal || (code && code !== 0)) {
        process.exit(1);
      } else {
        resolve();
      }
    });
  });

  // Spawn child process with DATABASE_URL
  console.log(`Running: ${command.join(" ")}\n`);

  const child = spawn(command.join(" "), {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    shell: true,
  });

  // Forward catchable user/control signals to child process
  // Excluded: SIGKILL/SIGSTOP (uncatchable), hardware errors (SIGSEGV, SIGBUS, etc.),
  // process-specific (SIGCHLD, SIGPIPE), and obscure/unused signals
  const signals: NodeJS.Signals[] = [
    // Termination signals
    "SIGINT",
    "SIGTERM",
    "SIGQUIT",
    "SIGHUP",
    "SIGABRT",
    // Terminal control
    "SIGTSTP",
    "SIGTTIN",
    "SIGTTOU",
    "SIGCONT",
    "SIGWINCH",
    // User-defined
    "SIGUSR1",
    "SIGUSR2",
    // Timers and profiling
    "SIGALRM",
    "SIGVTALRM",
    "SIGPROF",
    // Resource limits
    "SIGXCPU",
    "SIGXFSZ",
    // Power failure
    "SIGPWR",
    // Windows OS specific
    "SIGBREAK",
  ];

  for (const signal of signals) {
    process.on(signal, () => {
      child.kill(signal);
    });
  }

  // Wait for child process to exit
  await new Promise<void>((resolve) => {
    child.on("exit", (code, signal) => {
      if (signal) {
        process.exit(1);
      } else {
        process.exit(code ?? 0);
      }
      resolve();
    });
  });
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
} finally {
  // Cleanup: close the Prisma server
  if (server) {
    await server.close();
  }
}
