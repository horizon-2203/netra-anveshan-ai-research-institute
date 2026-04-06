#!/bin/sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

pick_node_bin() {
  if command -v node >/dev/null 2>&1; then
    NODE_CANDIDATE=$(command -v node)
    NODE_MAJOR=$("$NODE_CANDIDATE" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
    if [ "$NODE_MAJOR" -ge 18 ]; then
      echo "$NODE_CANDIDATE"
      return 0
    fi
  fi

  if [ -n "${SUDO_USER:-}" ]; then
    NVM_NODE="/home/${SUDO_USER}/.nvm/versions/node/v20.11.0/bin/node"
    if [ -x "$NVM_NODE" ]; then
      echo "$NVM_NODE"
      return 0
    fi
  fi

  echo "Unable to locate a Node.js >= 18 runtime. Install Node 20.11.0 or update scripts/dev-port80.sh." >&2
  exit 1
}

NODE_BIN=$(pick_node_bin)
exec "$NODE_BIN" "$PROJECT_ROOT/node_modules/next/dist/bin/next" dev -p 80 -H 0.0.0.0
