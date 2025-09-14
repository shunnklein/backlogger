# Technology Stack

## Core Framework
- **Next.js 15.5.0** with App Router and TypeScript
- **React 19.1.0** with React DOM
- **Node.js 24.x** (strict engine requirement)
- **npm 11.x** (strict engine requirement)

### Modern React 19 Features & Patterns
- **Server Components**: Leverage React Server Components for improved performance
- **Server Functions**: Use server actions for form handling and data mutations
- **SSR & Hydration**: Server-side rendering with selective hydration
- **Streaming**: Progressive page loading with React Suspense
- **Concurrent Features**: React 19 concurrent rendering capabilities
- **App Router**: Next.js App Router for file-based routing with layouts

## Database & ORM
- **Prisma 6.15.0** with PostgreSQL adapter
- **PostgreSQL** database (via `DATABASE_URL` env var)
- Prisma Client generated to `src/generated/prisma-client`
- Database migrations in `prisma/migrations/`

### Database Environment Goals
- **Production vs Local Split**: Need to implement healthy separation between development and production databases
- **Target**: Seamless dev experience with local database + protected production environment
- **Status**: Not yet implemented - requires environment configuration work

## Styling & UI
- **Tailwind CSS 4.x** for styling
- **PostCSS** for CSS processing (inherited from boilerplate, needs evaluation)
- Responsive design with mobile-first approach

### UI/UX Best Practices & Goals
- **Accessibility**: Implement pragmatic accessibility standards (WCAG guidelines)
- **Component Libraries**: Establish reusable component patterns for consistency
- **Design Standards**: Maintain coherent design system and style guidelines
- **Style Metaprogramming**: Follow best practices for CSS architecture and maintainability
- **Developer Experience**: Prioritize healthy dev experience with design tooling

### Current Status
- PostCSS configuration exists but hasn't been reviewed or customized for project needs
- Design system and component library patterns need to be established
- Accessibility standards need to be integrated into development workflow

## Development Tools
- **TypeScript 5.x** with strict mode enabled
- **ESLint 9.x** with Next.js configuration
- **Prettier 3.6.2** with experimental ternaries
- **dotenvx** for encrypted version-controlled environment variable management

## Environment Management
- **@t3-oss/env-nextjs** for type-safe environment variables
- **Zod** for runtime validation
- Separate client/server env validation in `src/env/`

## Build Configuration
- **Turbopack** enabled for dev and build (inherited from boilerplate, needs evaluation)
- **Typed routes** enabled in Next.js config
- **Typed environment variables** experimental feature
- ESLint ignored during builds (use `npm run lint` separately)

## Development Principles

### Configuration Philosophy
- **Configuration as Code**: Prefer version-controlled configuration over dynamic behavior
- **Declarative over Imperative**: Favor declarative configuration and infrastructure
- **Version-Controlled Documentation**: Keep all documentation pragmatically in version control
- **Reproducible Environments**: Ensure consistent development environments across platforms

### Developer Tool Parity
- **CLI Processes & VS Code First-Class**: Both CLI processes and VS Code are first-class developer tools
- **Synchronized Capabilities**: Keep behavior, expectations, and abilities in sync between environments
- **Feature Parity**: Ensure all development workflows work equally well in both CLI processes and VS Code
- **Consistent Experience**: Maintain consistent developer experience across tooling choices

### Software Adoption Philosophy
- **Embrace Trusted Solutions**: Not afraid to pull in trusted software and learn it
- **Prevent Duplicate Work**: Prefer existing solutions that solve hard problems well
- **Best Practices First**: Always propose best practices when facing problems
- **Learning-Oriented**: Willing to invest time learning tools that provide long-term value

### Project Management & Tracking
- **GitHub Projects**: Use GitHub Projects for task and progress tracking
- **GitHub Issues**: Track todos, plans, and feature requests through issues
- **Transparent Planning**: Keep project planning visible and accessible to all contributors
- **Issue-Driven Development**: Link commits and PRs to relevant issues for traceability

### Git & Collaboration Standards
- **Enterprise Git Habits**: Follow enterprise-level commit, branch, and message structure
- **Structured Commits**: Use conventional commit messages and clear branch naming
- **Code Review Culture**: Thorough review processes with constructive feedback
- **OSS Community Engagement**: Actively contribute upstream improvements when beneficial

## DevOps & Infrastructure

### Cross-Platform Development Support
- **Windows Development**: Full native Windows development support with testing
- **Linux Development**: Primary development and deployment target
- **Nix Ephemeral Strategy**: All Nix behavior must have manual Windows equivalents
- **Defensive Testing**: Keep Windows/Linux environments in sync with comprehensive testing
- **Platform Parity**: Ensure feature parity across development environments

### CI/CD & Automation
- **GitHub Actions** for continuous integration and deployment
- **Enterprise-scale CI/CD strategies** for production-ready workflows
- **Cross-platform testing** for Windows and Linux environments
- **Automated testing** integration with build pipelines
- **Code quality gates** with linting, formatting, and type checking

### Development Environment
- **Nix flakes** for reproducible development tool pinning (Linux)
- **Manual equivalents** for all Nix operations on Windows
- **Infrastructure as Code** for consistent environment provisioning
- **Containerization** strategies for deployment consistency

### Code Review & Collaboration
- **Graphite.dev integration** for advanced stacked PR workflows
- **AI-assisted code review** with Diamond (Graphite's AI reviewer)
- **Automated PR management** and review assignment
- **Stacked pull requests** for better code organization

### Current Status
- Cross-platform development environment setup needs implementation
- GitHub Actions workflows need to be implemented
- Nix flake configuration for dev environment pinning not yet set up
- Infrastructure as Code patterns need to be established
- Graphite integration for advanced PR workflows to be evaluated

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack  
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint with TypeScript support
npm run format       # Format code with Prettier
```

### Database
```bash
npx prisma generate  # Generate Prisma client (runs on postinstall)
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio
```

## Path Aliases
- `@src/*` → `./src/*`
- `db` → `./src/prismaClientSingleton.ts`
- `db/*` → `./src/generated/prisma-client/*`