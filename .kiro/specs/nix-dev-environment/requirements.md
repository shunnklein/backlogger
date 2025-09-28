# Requirements Document

## Introduction

This feature will establish a Nix flake-based development environment for the Backlogger project that provides reproducible tooling and dependencies while maintaining cross-platform compatibility. The system will use Nix flakes to define a development shell with Node.js 24.x, npm 11.x, PostgreSQL tools, and other development utilities. Following the project's "Nix ephemeral strategy," all Nix behavior must have manual Windows equivalents to ensure platform parity between Linux and Windows development environments.

## Requirements

### Requirement 1

**User Story:** As a developer, I want to enter a reproducible development environment using Nix flakes, so that I have consistent tooling and dependencies regardless of my host system.

#### Acceptance Criteria

1. WHEN a developer runs `nix develop` THEN the system SHALL provide a development shell with all required tools available
2. WHEN the flake is evaluated THEN the system SHALL use nixpkgs unstable as the primary package source
3. WHEN entering the development environment THEN the system SHALL make Node.js 24.x (with npm 11.x and npx) available from nixpkgs
4. WHEN entering the development environment THEN the system SHALL make PostgreSQL client (psql) available for database inspection and debugging during Prisma development
5. WHEN the development shell starts THEN the system SHALL preserve the ability to use npm for JavaScript dependency management
6. WHEN the flake is configured THEN the system SHALL enforce strict engine requirements matching package.json (Node.js 24.x, npm 11.x)

### Requirement 2

**User Story:** As a developer, I want the Nix flake to follow Node.js/npm best practices, so that the development environment integrates properly with JavaScript ecosystem conventions.

#### Acceptance Criteria

1. WHEN the flake provides Node.js THEN the system SHALL include npm and npx tools automatically
2. WHEN the development shell is active THEN the system SHALL allow package.json scripts to run normally via npm run
3. WHEN Node.js dependencies are managed THEN the system SHALL use package.json and package-lock.json as the source of truth for JavaScript dependencies
4. WHEN the flake provides development tools THEN the system SHALL make them available globally in the shell while preserving project-local npm dependencies
5. WHEN tools are run through flake apps THEN the system SHALL respect existing configuration files (eslint.config.ts, prettier config, tsconfig.json)
6. WHEN using npm within the Nix shell THEN the system SHALL support standard npm workflows like install, run, test, and build

### Requirement 3

**User Story:** As a developer on any platform, I want clear documentation and Windows equivalents for all Nix operations, so that I can maintain development environment parity regardless of my operating system.

#### Acceptance Criteria

1. WHEN the flake is implemented THEN the system SHALL include documentation in README.md about Nix setup requirements for Linux users
2. WHEN documentation is provided THEN the system SHALL include manual Windows equivalents for all Nix operations and tool installations
3. WHEN documentation is provided THEN the system SHALL include cross-platform troubleshooting guidance
4. WHEN Windows equivalents are documented THEN the system SHALL ensure feature parity between Nix and manual Windows setups

### Requirement 4

**User Story:** As a CI/CD system, I want to validate the Nix flake configuration, so that I can ensure the development environment remains functional and reproducible.

#### Acceptance Criteria

1. WHEN `nix flake check` is run THEN the system SHALL validate that all flake outputs are buildable
2. WHEN the flake check passes THEN the system SHALL confirm that the development shell can be entered successfully
3. WHEN CI runs flake validation THEN the system SHALL catch configuration errors before they affect developers
4. WHEN the flake is updated THEN the system SHALL ensure backwards compatibility through automated checks

### Requirement 5

**User Story:** As a developer, I want the Nix development environment to integrate seamlessly with existing project tooling, so that I can use familiar workflows while benefiting from reproducible environments.

#### Acceptance Criteria

1. WHEN the flake provides development tools THEN the system SHALL respect existing configuration files (eslint.config.ts, prettier config, tsconfig.json)
2. WHEN using Nix-provided tools THEN the system SHALL maintain compatibility with existing npm scripts and package.json workflows
3. WHEN the development environment is active THEN the system SHALL support all existing project commands (npm run dev, npm run build, npm run lint, etc.)
4. WHEN Prisma tools are provided via Nix THEN the system SHALL work with existing Prisma schema and migration workflows
5. WHEN TypeScript is provided via Nix THEN the system SHALL use the project's tsconfig.json and path aliases (@src/*, db, db/*)