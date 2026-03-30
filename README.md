# Netra-Anveshan AI Research Institute Portal

Production-ready Next.js portal and ERP dashboard for Netra-Anveshan AI Research Institute.

## Current State (30 March 2026)

- Public website routes are implemented and styled.
- Staff portal authentication uses Supabase Auth.
- Admin ERP includes CRUD flows for datasets, publications, access requests, and projects.
- Logging is file-based (JSON entries) with request correlation IDs and geo enrichment.
- Docker deployment is configured with health checks and security hardening.
- Container deployment target is HTTP on port 80 via `docker-compose` (`80:3000`).

## Tech Stack

- Next.js 16.0.5 (App Router)
- React 19.1.0
- TypeScript 5.x (strict mode)
- Tailwind CSS 3.x
- Supabase JS client 2.x
- Docker multi-stage build (Node 20.11 Alpine)

## Main Features

- Public pages:
	- `/`
	- `/about`
	- `/research`
	- `/facilities`
	- `/contact`
	- `/privacy-policy`
- Staff login page:
	- `/portal`
- Protected admin pages:
	- `/admin`
	- `/admin/datasets`
	- `/admin/datasets/[id]`
	- `/admin/publications`
	- `/admin/requests`
	- `/admin/projects`
	- `/admin/profile`

## Environment Variables

Create `.env.local` and define:

- `NODE_ENV`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `INTERNAL_API_URL` (optional for dataset processing page)
- `DEPLOY_TARGET_PATH` (optional utility variable)
- `ENABLE_FEATURE_FLAGS`

Important:
- `docker-compose.yml` references `${...}` environment interpolation and also uses `env_file: .env.local`.
- If shell interpolation warnings appear during `docker compose`, export vars in shell or use `.env` in addition to `.env.local`.

## Local Development

Install and run:

```bash
npm install
npm run dev
```

Local app URL:

- `http://localhost:8080`

## Production (Node process)

```bash
npm run build
npm run start
```

Configured start port:

- `80` via `next start -p 80`

## Docker Deployment

Build and run with compose:

```bash
docker compose up -d --build
```

Check status:

```bash
docker ps
docker logs -f netra-anveshan-portal
```

Expected port mapping:

- `0.0.0.0:80->3000/tcp`

## Health Check

Healthcheck is enabled in `docker-compose.yml`:

- Command: `wget -qO /dev/null http://127.0.0.1:3000/`
- Interval: `30s`
- Timeout: `5s`
- Retries: `5`
- Start period: `20s`

## Logging

### Where logs are written

- Global: `logs/app.log`
- Website routes:
	- `logs/website/page.json`
	- `logs/website/about.json`
	- `logs/website/research.json`
	- `logs/website/facilities.json`
	- `logs/website/contact.json`
	- `logs/website/portal.json`
- Admin routes:
	- `logs/admin/admin.json`
	- `logs/admin/admindatasets.json`
	- `logs/admin/adminpublications.json`
	- `logs/admin/adminrequests.json`
	- `logs/admin/adminprojects.json`
	- `logs/admin/adminprofile.json`
- Container mirror log:
	- `logs/docker/container.log`

### Log schema highlights

- `timestamp`, `level`, `event`, `message`
- `request_id`, `trace_id`
- `method`, `path`, `status_code`, `latency_ms`
- `ip`, `user_agent`
- Geo fields:
	- `country`, `city`, `latitude`, `longitude`, `timezone`

### If `logs/` folder is deleted

- The folder is recreated automatically when the app writes logs again.
- In Docker mode, host bind mount `./logs:/app/logs` will recreate path on next run.
- Old log history is lost if deleted.

## Upload Handling

Upload API endpoint:

- `POST /api/uploads`

Allowed categories:

- `datasets`, `publications`, `requests`, `projects`

Files are saved under:

- `uploads/<category>/timestamp_filename`

Current UI notice states uploads are for documentation/demo purpose only.

## Database

Primary tables:

- `datasets`
- `publications`
- `access_requests`
- `research_projects`
- `staff_users`

Schema source:

- `database-schema.sql`

Supabase migration history is in:

- `supabase/migrations/*`

## Security Controls Already Present

- Protected admin routes via session check in `ProtectedRoute`.
- Docker hardening:
	- `cap_drop: ALL`
	- `security_opt: no-new-privileges:true`
	- `tmpfs: /tmp`
- Sensitive field masking in logger (`token`, `password`, `authorization`, etc.).

## Known Gaps and Important Notes

- Contact details are not fully consistent across UI files:
	- `app/contact/page.tsx` uses `+91 9914173314`
	- `components/Footer.tsx` and `app/privacy-policy/page.tsx` still show `(555) 123-4000`
- `app/admin/datasets/[id]/page.tsx` contains explicit TODO/FIXME notes and direct pass-through behavior for internal API filters.
- GeoIP currently relies on `ipapi.co`; local/private IPs return no geo data.

## Troubleshooting

### Port 80 conflict

Symptom:

- `Bind for 0.0.0.0:80 failed: port is already allocated`

Fix:

```bash
docker ps
docker stop <container-using-port-80>
docker compose up -d
```

### App works locally but not from other machine

Check:

```bash
hostname -I
curl -I http://127.0.0.1
curl -I http://<server-ip>
sudo ufw status
```

Allow firewall if needed:

```bash
sudo ufw allow 80/tcp
```

### Verify health

```bash
docker inspect netra-anveshan-portal --format '{{json .State.Health}}'
```

## Full Technical Reference

For file-by-file and module-by-module documentation, see `DOCUMENTATION.md`.
