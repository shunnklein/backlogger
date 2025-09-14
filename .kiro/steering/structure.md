# Project Structure

## Root Level Organization
```
├── .git/               # Git version control metadata
├── .github/            # GitHub workflows, templates, and configuration
├── .kiro/              # Kiro IDE configuration and spec-driven development
├── .vscode/            # VS Code style workspace settings
├── node_modules/       # npm dependencies (generated)
├── prisma/             # Database schema and migrations
├── src/                # Application source code
├── README.md           # Main project documentation
├── readmeFromPrismaTemplate.md  # Temporary - will be merged with README.md
├── package-lock.json   # npm lockfile (generated)
└── [config files]      # TypeScript, Node.js, Next.js, Tailwind, etc.
```

## Source Code Structure (`src/`)
```
src/
├── app/                # Next.js App Router pages and layouts
│   ├── api/           # API routes
│   ├── posts/         # Post-related pages
│   ├── users/         # User-related pages
│   ├── setup/         # Setup/onboarding pages
│   ├── layout.tsx     # Root layout component
│   ├── page.tsx       # Homepage
│   ├── Header.tsx     # Shared header component
│   └── globals.css    # Global styles
├── env/               # Environment variable validation
│   ├── client.ts      # Client-side env vars (experimental, may be removed)
│   ├── server.ts      # Server-side env vars
│   └── README.txt     # Environment setup docs
├── generated/         # Generated code (do not edit manually)
│   └── prisma-client/ # Generated Prisma client
│       ├── internal/  # Internal Prisma client files
│       ├── models/    # Generated model types
│       ├── client.ts  # Main Prisma client
│       ├── enums.ts   # Generated enums
│       └── models.ts  # Model definitions
└── prismaClientSingleton.ts  # Database client singleton
```

## Database Structure (`prisma/`)
```
prisma/
├── migrations/        # Database migration files
├── schema.prisma     # Prisma schema definition
└── seed.ts          # Database seeding script
```

## Routing Conventions
- **App Router**: All routes in `src/app/` directory
- **Dynamic routes**: Use `[id]` folder naming (e.g., `posts/[id]/page.tsx`)
- **API routes**: Place in `src/app/api/` with `route.ts` files
- **Nested layouts**: Each directory can have its own `layout.tsx`

## Component Organization
- **Page components**: Named `page.tsx` in route directories
- **Layout components**: Named `layout.tsx` for route-specific layouts
- **Shared components**: Place in `src/app/` root or create `components/` directory
- **API handlers**: Named `route.ts` in API route directories

## File Naming Conventions
- **Pages**: `page.tsx`
- **Layouts**: `layout.tsx`
- **API routes**: `route.ts`
- **Components**: PascalCase (e.g., `Header.tsx`)
- **Utilities**: camelCase (e.g., `prismaClientSingleton.ts`)

## Import Patterns & Path Aliases

### TypeScript Path Aliases (from tsconfig.json)
- `@src/*` → `./src/*` - Access any file in the src directory
  - Example: `import { env } from "@src/env/server"`
- `db` → `./src/prismaClientSingleton.ts` - Database client singleton
  - Example: `import db from "db"`
- `db/*` → `./src/generated/prisma-client/*` - Generated Prisma client files
  - Example: `import type { User, Post } from "db/models"`

### Database & Type Imports
- **Database client**: Import as `db` from `"db"`
- **Prisma types**: Import from `"db/models"` for model types (User, Post, etc.)
- **Prisma enums**: Import from `"db/enums"` for generated enums
- **Custom types**: Can also import directly from `"db/models.ts"` or `"db/enums.ts"`

### General Patterns
- Prefer named exports over default exports for utilities
- Use `"use client"` directive for client components when needed
- Use path aliases consistently instead of relative imports for src files

## Database Access
- **Single client instance**: Use `src/prismaClientSingleton.ts`
- **Generated client**: Located in `src/generated/prisma-client/`
- **Type definitions**: Import model types from `"db/models"` (User, Post, etc.)
- **Generated enums**: Import from `"db/enums"` for schema enums
- **Migrations**: Auto-generated in `prisma/migrations/`
- **Schema changes**: Always run `npx prisma generate` after schema updates