#!/bin/sh
set -eu

LOG_DIR="/app/logs/docker"
LOG_FILE="$LOG_DIR/container.log"

mkdir -p "$LOG_DIR"

# Mirror runtime stdout/stderr into logs folder while preserving docker logs stream.
node server.js 2>&1 | tee -a "$LOG_FILE"
