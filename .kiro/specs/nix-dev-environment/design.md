# Design Document

## Overview

This design implements a Nix flake-based development environment for the Backlogger project that provides reproducible tooling while maintaining cross-platform compatibility. The solution uses Nix flakes to pin specific versions of Node.js 24.x, npm 11.x, PostgreSQL client, and other development tools, while ensuring all functionality has documented Windows equivalents.

The design follows the project's "Nix ephemeral strategy" by treating Nix as an optional enhancement rather than a hard dependency, ensuring Windows developers can achieve the same environment through manual tool installation.

## Architecture

### Flake Structure

```
flake.nix                 # Main flake definition
├── inputs                # Pinned nixpkgs and other dependencies  
├── outputs              # Development shells and packages
│   ├── devShells        # Development environment definitions
│   └── packages         # Custom derivations (if needed)
└── flake.lock           # Locked dependency versions
```

### Development Environment Layers

1. **Base System Tools**: Node.js 24.x, npm 11.x, PostgreSQL client (psql)
2. **Development Utilities**: git, curl, jq for common development tasks
3. **Project Integration**: Respect existing configuration files and npm workflows
4. **Cross-Platform Parity**: Document Windows equivalents for all tools

## Components and Interfaces

### Flake Inputs

```nix
inputs = {
  nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  flake-utils.url = "github:numtide/flake-utils";
};
```

**Rationale**: 
- `nixpkgs-unstable` provides access to Node.js 24.x and latest tool versions
- `flake-utils` simplifies multi-system support (x86_64-linux, aarch64-darwin, etc.)

### Development Shell Configuration

`mkShellNoCC` provides a clean shell environment without C compiler toolchain, which is perfect for JavaScript development environments:

```nix
devShells.default = pkgs.mkShellNoCC {
  buildInputs = with pkgs; [
    # Core development tools (must be explicitly added)
    nodejs_24        # Node.js 24.x (includes npm and npx)
    postgresql       # PostgreSQL client (psql command)
    
    # Version control and collaboration
    git             # Version control
    gh              # GitHub CLI for PR management
    graphite-cli    # Graphite CLI for stacked PRs
    
    # Development utilities
    curl            # HTTP client for API testing
    jq              # JSON processing for scripts
  ];
  
  shellHook = ''
    # Validate Node.js and npm versions match package.json
    echo "Development environment ready!"
    echo "Node.js: $(node --version)"
    echo "npm: $(npm --version)"
    echo "PostgreSQL client: $(psql --version)"
    echo "GitHub CLI: $(gh --version)"
    echo "Graphite CLI: $(gt --version)"
  '';
};
```

**What mkShellNoCC includes:**
- Basic shell (bash)
- Core POSIX utilities (ls, cat, grep, etc.)
- Clean environment without C compiler toolchain

**What we explicitly add:**
- Node.js 24.x with npm and npx
- PostgreSQL client for database operations
- Git for version control
- GitHub CLI (gh) for PR and issue management
- Graphite CLI for stacked PR workflows
- curl and jq for development scripts

**Benefits of mkShellNoCC:**
- Lighter weight than mkShell (no C compiler)
- Faster shell startup
- Cleaner environment for JavaScript development
- Can still add C compiler later if needed for native npm modules

### Version Validation System

The flake will include a validation mechanism to ensure Node.js and npm versions match package.json engines:

```nix
# Custom derivation to validate versions
validateVersions = pkgs.writeShellScriptBin "validate-versions" ''
  EXPECTED_NODE=$(jq -r '.engines.node' package.json)
  EXPECTED_NPM=$(jq -r '.engines.npm' package.json)
  ACTUAL_NODE=$(node --version)
  ACTUAL_NPM=$(npm --version)
  
  # Version comparison logic
  # Exit with error if versions don't match
'';
```

## Data Models

### Package.json Integration

The flake will read and respect the following package.json fields:

```json
{
  "engines": {
    "node": "24.x",
    "npm": "11.x"
  }
}
```

### Flake Lock Structure

```json
{
  "nodes": {
    "nixpkgs": {
      "locked": {
        "lastModified": "timestamp",
        "narHash": "hash",
        "rev": "commit-hash"
      }
    }
  }
}
```

This ensures reproducible builds by pinning exact nixpkgs commits.

## Error Handling

### Version Mismatch Detection

1. **Shell Hook Validation**: Check versions on shell entry
2. **CI Integration**: Automated version validation in GitHub Actions
3. **Clear Error Messages**: Descriptive output when versions don't match

```bash
# Example error output
Error: Node.js version mismatch
Expected: 24.x (from package.json)
Actual: 22.18.0 (from Nix)
Run 'nix flake update' to get latest versions
```

### Fallback Strategies

1. **Windows Documentation**: Complete manual installation guides
2. **Version Pinning**: Lock to specific working versions when needed
3. **Troubleshooting Guide**: Common issues and solutions

## Testing Strategy

### Automated Testing

1. **Flake Check**: `nix flake check` validates all outputs
2. **Shell Entry Test**: Verify development shell can be entered
3. **Version Validation**: Automated checks for Node.js/npm versions
4. **Integration Tests**: Test npm workflows within Nix environment

### CI Integration

```yaml
# GitHub Actions workflow snippet
- name: Validate Nix Environment
  run: |
    nix flake check
    nix develop --command node --version
    nix develop --command npm --version
    nix develop --command npm run build
```

### Cross-Platform Testing

1. **Linux Testing**: Primary Nix environment validation
2. **Windows Equivalent Testing**: Verify manual installation instructions work
3. **Documentation Validation**: Ensure Windows/Linux parity

## Implementation Phases

### Phase 1: Basic Flake Setup
- Create flake.nix with Node.js 24.x and PostgreSQL client
- Implement basic development shell
- Add version validation shell hook

### Phase 2: Integration & Documentation  
- Test with existing npm workflows
- Create Windows equivalent documentation
- Add CI validation

### Phase 3: Advanced Features
- Implement automated version synchronization
- Add troubleshooting documentation
- Optimize shell startup performance

## Cross-Platform Compatibility

### Windows Equivalents

| Nix Command | Windows Equivalent |
|-------------|-------------------|
| `nix develop` | Manual tool installation + environment setup |
| `nodejs_24` | Download Node.js 24.x from nodejs.org |
| `postgresql` | Install PostgreSQL client tools |
| `git` | Install Git for Windows |
| `gh` | Install GitHub CLI via winget or manual download |
| `graphite-cli` | Install via npm: `npm install -g @withgraphite/graphite-cli` |
| `curl`, `jq` | Install via Chocolatey or manual download |

### Documentation Structure

```markdown
## Development Environment Setup

### Linux/macOS (Nix)
1. Install Nix: `curl -L https://nixos.org/nix/install | sh`
2. Enter environment: `nix develop`

### Windows (Manual)
1. Install Node.js 24.x from nodejs.org
2. Install PostgreSQL client tools
3. Install Git for Windows
4. Install GitHub CLI: `winget install GitHub.cli`
5. Install Graphite CLI: `npm install -g @withgraphite/graphite-cli`
6. Install curl, jq via Chocolatey
```

## Security Considerations

1. **Pinned Dependencies**: Flake lock ensures reproducible, auditable dependencies
2. **Minimal Attack Surface**: Only include necessary development tools
3. **Version Validation**: Prevent accidental use of vulnerable tool versions
4. **Transparent Sources**: All tools come from official nixpkgs repository

## Performance Considerations

1. **Shell Startup Time**: Minimize shell hook execution time
2. **Download Optimization**: Leverage Nix binary cache for fast tool installation
3. **Incremental Updates**: `nix flake update` only updates when needed
4. **Resource Usage**: Development shell has minimal memory footprint