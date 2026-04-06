# Netra-Anveshan AI Research Institute Portal

Comprehensive Next.js + Supabase portal with public pages, staff login, protected admin ERP, structured file logging, Docker packaging, and migration-managed database schema.

Last verified: 30 March 2026

## Deployment Fixes Applied (30 March 2026)

- Dev script now runs through `scripts/dev-port80.sh` to force a Node.js >= 18 runtime even when launched via `sudo npm run dev`.
- Docker image now bakes required runtime/public variables into `/app/.env.local` during build.
- Logs are initialized and persisted inside container at `/app/logs` (no host bind dependency).
- Middleware and log ingest now guarantee geo keys on every request log: `country`, `city`, `latitude`, `longitude`, `timezone`.
- Legacy `logs/geoip/geoip.json` artifact has been removed.

## 1. What This Project Is

This repository contains:
- Public institute website routes.
- Staff portal (`/portal`) using Supabase Auth.
- Protected admin ERP for managing datasets, publications, requests, and projects.
- Structured JSON logging pipeline with request IDs and optional GeoIP enrichment.
- Dockerized production runtime for portable deployment via image export/import.

## 2. Exact Runtime and Tool Versions

### Core runtime
- Node.js engine: `20.11.0` (declared in `package.json`)
- Next.js: `16.0.5`
- React: `19.1.0`
- React DOM: `19.1.0`
- TypeScript: `^5.5.3`

### Main dependencies
- `@supabase/supabase-js`: `^2.49.1`
- `tailwindcss`: `^3.4.11`
- `postcss`: `^8.4.47`
- `autoprefixer`: `^10.4.20`
- `lucide-react`: `^0.451.0`
- `uuid`: `^11.1.0`
- `zod`: `^3.23.8`
- `react-hook-form`: `^7.53.0`
- `sonner`: `^1.5.0`
- `class-variance-authority`: `^0.7.0`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^2.5.2`

### Dev dependencies
- `eslint`: `^9.9.0`
- `eslint-config-next`: `16.0.5`
- `@types/node`: `^22.5.5`
- `@types/react`: `^19.1.12`
- `@types/react-dom`: `^19.1.9`

## 3. Routes

### Public
- `/`
- `/about`
- `/research`
- `/facilities`
- `/contact`
- `/privacy-policy`
- `/portal`

### Protected admin
- `/admin`
- `/admin/profile`
- `/admin/datasets`
- `/admin/datasets/[id]`
- `/admin/publications`
- `/admin/requests`
- `/admin/projects`

### Educational API lab routes
- `/api/edu/echo/[id]` (GET, POST, OPTIONS)
- `/api/edu/trace/[...segments]` (GET, POST, PUT, DELETE)

Examples:

```bash
curl -sS 'http://localhost/api/edu/echo/student-101?module=input&module=validation'
curl -sS -X POST 'http://localhost/api/edu/echo/student-202' \
  -H 'content-type: application/json' \
  -d '{"topic":"server-side-flow","risk":"input-handling"}'
curl -sS 'http://localhost/api/edu/trace/lab/week1/scenario-a?stage=recon'
```

## 4. Key Architecture

### Authentication
- Supabase client lives in `lib/supabase/client.ts`.
- `/portal` signs in using `supabase.auth.signInWithPassword`.
- Admin area is guarded by `components/ProtectedRoute.tsx`.

### Logging pipeline
1. `middleware.ts` creates request lifecycle events.
2. Middleware forwards payload to `/api/logs`.
3. `app/api/logs/route.ts` extracts client IP and enriches geo fields.
4. `lib/logger.ts` masks sensitive fields and writes structured JSON entries.
5. `scripts/write_log.py` persists logs to `/app/logs` targets.

### Upload pipeline
1. UI sends multipart form-data to `POST /api/uploads`.
2. API validates category allowlist.
3. Filename is sanitized.
4. File is written to `uploads/<category>/timestamp_name`.

## 5. Environment Variables

### Public/runtime keys currently wired
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Internal/runtime keys
- `INTERNAL_API_URL`
- `NODE_ENV`
- `LOG_LEVEL`

Note:
- Current Docker setup bakes/sets the required Supabase vars inside image and compose.
- Project can run from loaded image archive without needing external `.env` file at runtime.

## 6. Local Run

```bash
npm install
npm run dev
```

### Fresh machine one-command bootstrap (without Docker)

After cloning, run:

```bash
npm run setup
```

What it does:
- Installs `nvm` if missing.
- Installs and activates Node `20.11.0` (same as `package.json` engine).
- Runs `npm ci` using lockfile versions.
- Grants Node capability to bind port 80 (`cap_net_bind_service`) on the resolved real Node binary.
- `npm run dev` prefers the pinned nvm Node `20.11.0`, avoiding system-node capability mismatches.

Then run normally:

```bash
npm run dev
npm run build
npm run start
```

One-go production command (foreground process):

```bash
npm run prod:up
```

This runs setup + build + start using the pinned Node `20.11.0` scripts.

App binds to:
- `http://localhost:80`

If low ports are restricted by host policy/capabilities, use `sudo npm run dev` or grant bind capability to Node runtime.

## 7. Docker Run (local machine)

```bash
docker compose up -d --build
docker compose ps
docker logs --tail 100 netra-anveshan-portal
```

Ports:
- Host `80` -> Container `3000`

## 8. Image Export / Transfer Deployment Workflow

### Build and package
```bash
docker compose build
docker save netra-anveshan-portal:latest | gzip > erp.tar.gz
sha256sum erp.tar.gz
```

### Transfer
```bash
scp erp.tar.gz docker-compose.yml <user>@<host>:~/
```

### Deploy on target host
```bash
docker load -i ~/erp.tar.gz
docker compose down
docker compose up -d --no-build
docker compose ps
```

### Verify
```bash
curl -I http://127.0.0.1:80
docker logs --tail 120 netra-anveshan-portal
```

## 9. Logging Locations and Behavior

Inside container (`/app/logs`):
- `app.log` (global)
- `website/*.json`
- `admin/*.json`
- `docker/container.log`

Healthcheck noise control:
- Middleware filters internal GET `/` healthchecks with `wget`/localhost pattern.

Geo fields in each structured log entry:
- `country`, `city`, `latitude`, `longitude`, `timezone`

Important behavior:
- Public IP can resolve geo data.
- Private/local IP ranges (`127.x`, `10.x`, `192.168.x`, `172.16-31.x`) intentionally return no geo data.

## 10. Security and Hardening Notes

- Container runs as non-root (`node`).
- Runtime directories are pre-created with writable ownership (`/app/logs`, `/app/uploads`).
- Compose hardening:
  - `no-new-privileges:true`
  - `cap_drop: ALL`
  - `tmpfs: /tmp`
- Sensitive keys/tokens are masked in logger before file persistence.

## 11. Pseudocode Snapshots (High-Level)

### Middleware
```text
on request:
  if static asset or /api/logs -> pass through
  requestId = incoming header or generated UUID
  clientIp = normalize(from x-forwarded-for/x-real-ip/...)
  if internal healthcheck pattern -> pass through without logging
  log request_received -> /api/logs
  response = next()
  log request_completed -> /api/logs
  return response
```

### Log API
```text
POST /api/logs:
  parse json body
  ip = normalize(body.ip or forwarding headers)
  geo = getGeoDataForIp(ip)
  logger.log({...body, ip, geo fields, request/trace IDs})
  return {ok: true}
```

### GeoIP
```text
if ip missing or private/local -> return undefined
if ip in cache and not expired -> return cached
fetch https://ipapi.co/<ip>/json/
map city/country/lat/long/timezone
cache for 6 hours
return data
```

### Logger
```text
build structured log object
mask sensitive keys/patterns recursively
print sanitized json to stdout
write sanitized json via python script to app.log + route file
```

## 12. Known Functional Constraints

- `/admin/datasets/[id]` uses direct internal API pass-through patterns and should be hardened further for strict production policy.
- Contact phone text is inconsistent between some pages/components.
- Geo for private networks is expected to be null.

## 13. Current Repository Hygiene

- Runtime logs are ignored by git.
- Deployment archives should remain untracked (`*.tar.gz`).
- PEM key files are ignored (`*.pem`).

## 14. Full Deep Technical Reference

See `DOCUMENTATION.md` for:
- Complete file-by-file inventory.
- Per-file pseudocode/logic map.
- SQL and migration details.
- Detailed deployment and operations playbook.
