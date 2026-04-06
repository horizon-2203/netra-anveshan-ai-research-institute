#!/usr/bin/env bash
set -e
trap 'echo "[setup] Failed at line ${LINENO}." >&2' ERR

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
NODE_VERSION="20.11.0"
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
export NVM_DIR

resolve_realpath() {
  TARGET_PATH=$1
  if command -v readlink >/dev/null 2>&1; then
    readlink -f "$TARGET_PATH" 2>/dev/null || echo "$TARGET_PATH"
    return
  fi

  echo "$TARGET_PATH"
}

ensure_nvm() {
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    return 0
  fi

  echo "[setup] nvm not found. Installing nvm..."
  mkdir -p "$NVM_DIR"
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
}

load_nvm() {
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "[setup] nvm init script not found at $NVM_DIR/nvm.sh" >&2
    exit 1
  fi

  # nvm internals are not strictly nounset-safe on all distros/shell setups.
  set +u
  # shellcheck disable=SC1090
  set +e
  . "$NVM_DIR/nvm.sh"
  LOAD_STATUS=$?
  set -e

  if [ "$LOAD_STATUS" -ne 0 ]; then
    echo "[setup] Failed to load nvm from $NVM_DIR/nvm.sh" >&2
    exit 1
  fi

  if ! command -v nvm >/dev/null 2>&1; then
    echo "[setup] nvm command is unavailable after loading nvm.sh" >&2
    exit 1
  fi

  echo "[setup] nvm loaded."
}

ensure_node() {
  if command -v node >/dev/null 2>&1; then
    CURRENT_VERSION=$(node -v | sed 's/^v//')
    if [ "$CURRENT_VERSION" = "$NODE_VERSION" ]; then
      echo "[setup] Node $NODE_VERSION already active."
      return 0
    fi
  fi

  echo "[setup] Installing Node $NODE_VERSION via nvm..."
  nvm install "$NODE_VERSION"
  nvm alias default "$NODE_VERSION"
  nvm use "$NODE_VERSION"
}

install_deps() {
  echo "[setup] Installing npm dependencies using lockfile..."
  cd "$PROJECT_ROOT"
  npm ci
}

enable_port80_binding() {
  NODE_PATH=$(command -v node)
  NODE_PATH=$(resolve_realpath "$NODE_PATH")

  if command -v getcap >/dev/null 2>&1; then
    if getcap "$NODE_PATH" 2>/dev/null | grep -q cap_net_bind_service; then
      echo "[setup] Port 80 bind capability already present on node binary."
      return 0
    fi
  fi

  echo "[setup] Enabling low-port bind capability for Node (requires sudo)..."
  if ! command -v setcap >/dev/null 2>&1; then
    echo "[setup] setcap not found. Installing libcap2-bin..."
    sudo apt-get update
    sudo apt-get install -y libcap2-bin
  fi

  sudo setcap 'cap_net_bind_service=+ep' "$NODE_PATH"

  if command -v getcap >/dev/null 2>&1; then
    if getcap "$NODE_PATH" 2>/dev/null | grep -q cap_net_bind_service; then
      echo "[setup] Node can now bind to port 80 without sudo."
      return 0
    fi
  fi

  echo "[setup] Warning: capability could not be verified. Run this manually:" >&2
  echo "sudo setcap 'cap_net_bind_service=+ep' $NODE_PATH" >&2
}

echo "[setup] Step 1/5: ensure nvm"
ensure_nvm

echo "[setup] Step 2/5: load nvm"
load_nvm

echo "[setup] Step 3/5: ensure Node $NODE_VERSION"
ensure_node

echo "[setup] Step 4/5: install dependencies"
install_deps

echo "[setup] Step 5/5: enable port 80 binding"
enable_port80_binding

echo "[setup] Complete. Run: npm run dev"
