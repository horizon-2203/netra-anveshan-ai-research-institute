#!/bin/sh
set -eu

LOG_DIR="/app/logs/docker"
LOG_FILE="$LOG_DIR/container.log"

ensure_log_structure() {
	mkdir -p /app/logs/website /app/logs/admin /app/logs/docker
	touch /app/logs/app.log
	touch /app/logs/website/page.json
	touch /app/logs/website/about.json
	touch /app/logs/website/research.json
	touch /app/logs/website/facilities.json
	touch /app/logs/website/contact.json
	touch /app/logs/website/portal.json
	touch /app/logs/admin/admin.json
	touch /app/logs/admin/admindatasets.json
	touch /app/logs/admin/adminpublications.json
	touch /app/logs/admin/adminrequests.json
	touch /app/logs/admin/adminprojects.json
	touch /app/logs/admin/adminprofile.json
	touch "$LOG_FILE"
}

ensure_log_structure

# Mirror runtime stdout/stderr into logs folder while preserving docker logs stream.
# Recreate logs folder/file dynamically if deleted while container is running.
node server.js 2>&1 | while IFS= read -r line; do
	ensure_log_structure
	printf '%s\n' "$line" | tee -a "$LOG_FILE"
done
