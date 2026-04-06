#!/bin/sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
PINNED_NODE_VERSION="20.11.0"

resolve_realpath() {
  TARGET_PATH=$1
  if command -v readlink >/dev/null 2>&1; then
    readlink -f "$TARGET_PATH" 2>/dev/null || echo "$TARGET_PATH"
    return
  fi

  echo "$TARGET_PATH"
}

pick_node_bin() {
  NVM_NODE_CANDIDATE="${HOME}/.nvm/versions/node/v${PINNED_NODE_VERSION}/bin/node"
  if [ -x "$NVM_NODE_CANDIDATE" ]; then
    echo "$NVM_NODE_CANDIDATE"
    return 0
  fi

  if [ -n "${SUDO_USER:-}" ]; then
    SUDO_NVM_NODE="/home/${SUDO_USER}/.nvm/versions/node/v${PINNED_NODE_VERSION}/bin/node"
    if [ -x "$SUDO_NVM_NODE" ]; then
      echo "$SUDO_NVM_NODE"
      return 0
    fi
  fi

  if command -v node >/dev/null 2>&1; then
    NODE_CANDIDATE=$(command -v node)
    NODE_MAJOR=$("$NODE_CANDIDATE" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
    if [ "$NODE_MAJOR" -ge 18 ]; then
      echo "$NODE_CANDIDATE"
      return 0
    fi
  fi

  echo "Unable to locate Node ${PINNED_NODE_VERSION} (or any Node.js >= 18). Run: npm run setup" >&2
  exit 1
}

NODE_BIN=$(pick_node_bin)
NODE_BIN=$(resolve_realpath "$NODE_BIN")
exec "$NODE_BIN" "$PROJECT_ROOT/node_modules/next/dist/bin/next" start -p 80 -H 0.0.0.0
