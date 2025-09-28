{
  description = "Backlogger development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfreePredicate = pkg: builtins.elem (nixpkgs.lib.getName pkg) [
              "graphite-cli"
            ];
          };
        };
      in
      {
        devShells.default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [
            # Core development tools
            nodejs_24        # Node.js 24.x (includes npm and npx)
            postgresql       # PostgreSQL client (psql command)
            git             # Version control
            
            # Collaboration tools
            gh              # GitHub CLI for PR management
            graphite-cli    # Graphite CLI for stacked PR workflows
            
            # Development utilities
            curl            # HTTP client for API testing
            jq              # JSON processing for scripts
          ];

          shellHook = ''
            # Save current pager settings
            OLD_PAGER="$PAGER"
            OLD_LESS="$LESS"
            
            # Temporarily disable pager for shell hook output
            export PAGER=""
            export LESS=""
            
            echo "� TBacklogger development environment"
            echo ""
            
            # Display tool versions (with error handling to prevent hanging)
            echo "📦 Tool Versions:"
            echo "  Node.js: $(node --version 2>/dev/null || echo "not available")"
            echo "  npm: $(npm --version 2>/dev/null || echo "not available")"
            echo "  PostgreSQL client: $(psql --version 2>/dev/null | head -n1 || echo "not available")"
            echo "  GitHub CLI: $(timeout 3 gh --version 2>/dev/null | head -n1 || echo "not available")"
            echo "  Graphite CLI: $(timeout 3 gt --version 2>/dev/null | head -n1 || echo "not available")"
            echo "  curl: $(curl --version 2>/dev/null | head -n1 || echo "not available")"
            echo "  jq: $(jq --version 2>/dev/null || echo "not available")"
            echo ""
            
            # Version validation against package.json engines
            if [ -f "package.json" ]; then
              echo "🔍 Validating versions against package.json engines..."
              
              # Extract expected versions from package.json
              EXPECTED_NODE=$(jq -r '.engines.node // "not specified"' package.json)
              EXPECTED_NPM=$(jq -r '.engines.npm // "not specified"' package.json)
              
              # Get actual versions
              ACTUAL_NODE=$(node --version | sed 's/v//')
              ACTUAL_NPM=$(npm --version)
              
              # Validation flags
              NODE_VALID=true
              NPM_VALID=true
              
              echo "  Expected Node.js: $EXPECTED_NODE"
              echo "  Actual Node.js: v$ACTUAL_NODE"
              
              # Validate Node.js version (extract major version and compare)
              if [[ "$EXPECTED_NODE" =~ ^([0-9]+)\.x$ ]]; then
                EXPECTED_NODE_MAJOR="''${BASH_REMATCH[1]}"
                ACTUAL_NODE_MAJOR=$(echo "$ACTUAL_NODE" | cut -d. -f1)
                if [[ "$ACTUAL_NODE_MAJOR" != "$EXPECTED_NODE_MAJOR" ]]; then
                  NODE_VALID=false
                fi
              fi
              
              echo "  Expected npm: $EXPECTED_NPM"
              echo "  Actual npm: $ACTUAL_NPM"
              
              # Validate npm version (extract major version and compare)
              if [[ "$EXPECTED_NPM" =~ ^([0-9]+)\.x$ ]]; then
                EXPECTED_NPM_MAJOR="''${BASH_REMATCH[1]}"
                ACTUAL_NPM_MAJOR=$(echo "$ACTUAL_NPM" | cut -d. -f1)
                if [[ "$ACTUAL_NPM_MAJOR" != "$EXPECTED_NPM_MAJOR" ]]; then
                  NPM_VALID=false
                fi
              fi
              
              echo ""
              
              # Display validation results
              if [ "$NODE_VALID" = true ] && [ "$NPM_VALID" = true ]; then
                echo "✅ All versions match package.json engines requirements"
              else
                echo "❌ Version mismatch detected!"
                echo ""
                if [ "$NODE_VALID" = false ]; then
                  echo "🔴 Node.js version mismatch:"
                  echo "   Expected: $EXPECTED_NODE"
                  echo "   Actual: v$ACTUAL_NODE"
                  echo "   The project requires Node.js $EXPECTED_NODE for compatibility"
                fi
                if [ "$NPM_VALID" = false ]; then
                  echo "🔴 npm version mismatch:"
                  echo "   Expected: $EXPECTED_NPM"
                  echo "   Actual: $ACTUAL_NPM"
                  echo "   The project requires npm $EXPECTED_NPM for compatibility"
                fi
                echo ""
                echo "💡 To fix version mismatches:"
                echo "   1. Run 'nix flake update' to get latest package versions"
                echo "   2. If issues persist, check the flake.nix configuration"
                echo "   3. Ensure package.json engines match available Nix packages"
                echo ""
                echo "⚠️  Continuing with mismatched versions may cause issues"
              fi
            else
              echo "⚠️  package.json not found - skipping version validation"
            fi
            
            echo ""
            echo "🎮 Ready to develop Backlogger!"
            echo "   Run 'npm run dev' to start the development server"
            
            # Restore pager settings for user's shell session
            export PAGER="$OLD_PAGER"
            export LESS="$OLD_LESS"
          '';
        };
      });
}