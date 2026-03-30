# Netra-Anveshan ERP - Deep Technical Documentation

Audit Date: 30 March 2026
Audit Method: Full repository pass over tracked code/config/sql/script files + deployment behavior verification.

---

## 1. Executive Summary

This project is a Next.js 16 App Router application that combines:
- Public institute website pages.
- Supabase-backed staff authentication portal.
- Protected admin ERP modules (datasets, publications, requests, projects, profile).
- Structured application logging pipeline with request tracing and GeoIP enrichment.
- Dockerized production runtime with image export/import deployment workflow.

Current repository branch: `main`
Remote: `origin` -> `git@github.com:horizon-2203/netra-anveshan-ai-research-institute.git`

---

## 2. Exact Version and Build Matrix

### Runtime and language
- Node.js (engine): `20.11.0`
- Next.js: `16.0.5`
- React: `19.1.0`
- React DOM: `19.1.0`
- TypeScript: `^5.5.3`

### Core dependencies
- `@supabase/supabase-js`: `^2.49.1`
- `@hookform/resolvers`: `^3.9.0`
- `react-hook-form`: `^7.53.0`
- `zod`: `^3.23.8`
- `uuid`: `^11.1.0`
- `lucide-react`: `^0.451.0`
- `sonner`: `^1.5.0`
- `class-variance-authority`: `^0.7.0`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^2.5.2`

### UI and typography packages
- `@fontsource/hind`: `^5.2.8`
- `@fontsource/noto-sans-devanagari`: `^5.2.8`
- `@fontsource/poppins`: `^5.2.7`
- Radix UI family packages present (accordion, dialog, select, tabs, toast, etc.)

### Dev toolchain
- `eslint`: `^9.9.0`
- `eslint-config-next`: `16.0.5`
- `postcss`: `^8.4.47`
- `autoprefixer`: `^10.4.20`
- `tailwindcss`: `^3.4.11`

---

## 3. Deployment Topology

### Compose service characteristics
- Service: `web`
- Image: `netra-anveshan-portal:latest`
- Build source: local `Dockerfile`
- Pull behavior: `pull_policy: never`
- Port map: host `80` -> container `3000`
- Restart policy: `unless-stopped`
- Healthcheck: GET `/` on `127.0.0.1:3000` every 30s

### Container hardening
- non-root runtime user: `node`
- security options: `no-new-privileges:true`
- capabilities dropped: `ALL`
- tmpfs mounted at `/tmp`

### Build-time public env handling
`Dockerfile` builder stage sets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

This is critical because client-side portal login requires correct build-time public vars.

---

## 4. Architecture and Data Flow

### 4.1 Request lifecycle (high level pseudocode)

```text
Incoming HTTP request
  -> Next middleware checks path
  -> request id/trace id computed
  -> internal healthcheck requests optionally skipped
  -> request_received payload sent to /api/logs
  -> route/page executes
  -> request_completed payload sent to /api/logs
  -> response returned
```

### 4.2 Log ingest flow pseudocode

```text
POST /api/logs
  parse request body
  extract client ip from body/header chain
  normalize ip
  attempt geo lookup for public ip
  merge request metadata + geo fields
  logger.log(sanitized entry)
  return ok
```

### 4.3 Logger write flow pseudocode

```text
logger.log(entry)
  fill defaults and trace ids
  merge flat geo fields from entry or entry.geo
  mask secrets recursively
  print structured JSON to stdout
  choose route-specific file target
  invoke python writer with payload
  append to /app/logs files
```

### 4.4 Upload flow pseudocode

```text
POST /api/uploads (multipart)
  validate category in allowlist
  validate file exists
  sanitize file name
  mkdir uploads/<category>
  write binary
  return relative path
```

---

## 5. Full Code/Config Inventory with Purpose and Pseudocode

Notes:
- Every tracked code/config/sql/script file is acknowledged below.
- Static images/icons are acknowledged in section 6.

### 5.1 Root and platform configs

#### `package.json`
Purpose:
- Defines scripts, dependency versions, and Node engine.

Pseudo:
```text
scripts.dev -> next dev -p 80
scripts.build -> next build
scripts.start -> next start -p 80
```

#### `next.config.js`
Purpose:
- Next output mode and API headers.

Pseudo:
```text
set output: standalone
set permissive CORS headers for /api/*
allow image remote patterns
```

#### `tsconfig.json`
Purpose:
- Strict TypeScript and import aliases.

Pseudo:
```text
strict true
moduleResolution bundler
paths '@/*' => './*'
```

#### `tailwind.config.ts`
Purpose:
- Tailwind content scan and theme extensions.

Pseudo:
```text
scan app/components/pages
extend colors/animations/tokens
```

#### `postcss.config.js`
Purpose:
- CSS processing plugin chain.

Pseudo:
```text
tailwindcss + autoprefixer
```

#### `.dockerignore`
Purpose:
- Excludes non-required files from Docker build context.

#### `.gitignore`
Purpose:
- Excludes generated artifacts, env files, runtime logs, and local secrets.

#### `Dockerfile`
Purpose:
- Multi-stage build and production runtime image assembly.

Pseudo:
```text
deps stage -> npm ci
builder stage -> copy app + set public env + next build
runner stage -> install python3 + copy standalone build + scripts
create /app/logs and /app/uploads writable by node
run start-with-logs.sh
```

#### `docker-compose.yml`
Purpose:
- Runtime orchestration, security controls, healthcheck, and ports.

Pseudo:
```text
service web:
  use netra-anveshan-portal:latest
  never pull from registry
  build from local Dockerfile if needed
  map 80:3000
  inject production envs
  apply healthcheck and hardening options
```

### 5.2 Middleware and APIs

#### `middleware.ts`
Purpose:
- Request instrumentation and forwarding to `/api/logs`.

Pseudo:
```text
if static or /api/logs -> next
extract ip from headers
if internal healthcheck pattern -> next
emit request_received
next response
emit request_completed
```

#### `app/api/logs/route.ts`
Purpose:
- Central log ingestion endpoint with geo enrichment.

Pseudo:
```text
body = json()
ip = normalized body/header ip
geo = getGeoDataForIp(ip)
logger.log(body + geo + request metadata)
```

#### `app/api/uploads/route.ts`
Purpose:
- Controlled file upload endpoint.

Pseudo:
```text
validate category in {datasets, publications, requests, projects}
sanitize filename
write to uploads/category
return success payload
```

### 5.3 Library modules

#### `lib/supabase/client.ts`
Purpose:
- Frontend Supabase client bootstrap with env fallbacks.

Pseudo:
```text
url = env NEXT_PUBLIC_SUPABASE_URL or fallback
anon = env anon/publishable or fallback
createClient(url, anon)
```

#### `lib/geoip.ts`
Purpose:
- Public-IP geolocation lookup with cache.

Pseudo:
```text
normalize ip
if private/local -> undefined
if cached -> return
fetch ipapi.co/ip/json
map country/city/lat/long/timezone
cache for 6h
```

#### `lib/logger.ts`
Purpose:
- Structured logger + PII masking + file sink routing.

Pseudo:
```text
build log entry defaults
mask sensitive keys/tokens recursively
route target by path (website/admin map)
spawn python writer with payload
```

#### `lib/utils.ts`
Purpose:
- Classname merge helper.

Pseudo:
```text
cn(...inputs) -> twMerge(clsx(inputs))
```

### 5.4 Scripts

#### `scripts/start-with-logs.sh`
Purpose:
- Launches Next standalone server and mirrors output into log file.

Pseudo:
```text
ensure /app/logs structure and files
start server.js
for each output line:
  re-ensure log structure
  append to /app/logs/docker/container.log
```

#### `scripts/write_log.py`
Purpose:
- Appends sanitized JSON lines to global and route files.

Pseudo:
```text
read json payload from stdin
for each target file:
  create parent directories
  append serialized entry + newline
```

### 5.5 App pages and admin modules

#### `app/layout.tsx`
Purpose:
- Root HTML shell, metadata, and global wrappers.

#### `app/globals.css`
Purpose:
- Global styles, theme variables, and utility classes.

#### `app/page.tsx`
Purpose:
- Homepage sections and institute overview blocks.

#### `app/about/page.tsx`
Purpose:
- About section content and institutional profile.

#### `app/research/page.tsx`
Purpose:
- Research overview, tabs/cards, collaboration section.

#### `app/facilities/page.tsx`
Purpose:
- Infrastructure and facilities presentation.

#### `app/contact/page.tsx`
Purpose:
- Contact UI + form state handling.

#### `app/portal/page.tsx`
Purpose:
- Staff authentication screen with Supabase sign-in.

Pseudo:
```text
on submit:
  call supabase.auth.signInWithPassword(email,password)
  on success -> route /admin
  on failure -> show error
```

#### `app/privacy-policy/page.tsx`
Purpose:
- Policy/legal content route.

#### `app/admin/layout.tsx`
Purpose:
- Admin shell and sidebar composition with route protection.

#### `app/admin/page.tsx`
Purpose:
- Dashboard overview cards and basic metrics.

#### `app/admin/profile/page.tsx`
Purpose:
- User profile metadata edit/update.

#### `app/admin/datasets/page.tsx`
Purpose:
- Dataset CRUD list/form flow and optional upload.

#### `app/admin/datasets/[id]/page.tsx`
Purpose:
- Dataset detail and internal processing flow.

Pseudo:
```text
read route id + search params
if INTERNAL_API_URL missing -> fallback dataset
else POST to internalApi/datasets/<id>/process
on failure -> fallback dataset
on success -> mapped dataset details
```

#### `app/admin/publications/page.tsx`
Purpose:
- Publication CRUD operations and upload trigger.

#### `app/admin/requests/page.tsx`
Purpose:
- Access request CRUD operations and upload trigger.

#### `app/admin/projects/page.tsx`
Purpose:
- Project CRUD operations and upload trigger.

### 5.6 Shared components

#### `components/Navbar.tsx`
Purpose:
- Top navigation, responsive menu, route links.

#### `components/Footer.tsx`
Purpose:
- Footer links and contact details.

#### `components/ThemeToggle.tsx`
Purpose:
- Light/dark mode toggle persisted in localStorage.

#### `components/ProtectedRoute.tsx`
Purpose:
- Client-side auth gate for admin routes.

Pseudo:
```text
check supabase session
if no session -> redirect /portal
else render children
```

#### `components/AdminSidebar.tsx`
Purpose:
- Admin navigation and logout action.

#### `components/AdminCrudModal.tsx`
Purpose:
- Generic reusable admin modal wrapper.

### 5.7 Database and Supabase files

#### `database-schema.sql`
Purpose:
- Full schema and policy baseline for PostgreSQL/Supabase.

Includes:
- `datasets`
- `publications`
- `access_requests`
- `research_projects`
- `staff_users`
- indexes and RLS policy scaffolding

#### `supabase/config.toml`
Purpose:
- Local Supabase CLI project settings.

#### `supabase/migrations/*`
Purpose:
- Incremental schema lifecycle (init/reset/activity-log add/remove/staff profile/policy fix).

### 5.8 Other tracked support files

- `LOG_COLLECTION_PLAYBOOK copy.md`: logging strategy reference note.
- `uploads/*`: seeded upload examples and keep files.
- `geoip/GeoLite2-City.mmdb`, `geoip/GeoLite2-Country.mmdb`: local geo database assets kept in repo.

---

## 6. Static Assets Acknowledgement

All tracked static media acknowledged under `public/` and app icons:
- `app/icon.svg`
- `app/apple-icon.svg`
- all images in `public/` (logos, banners, photos, themed content images)

No executable logic in these files; they are consumed by page/components for UI rendering.

---

## 7. Logging, Geo, and Healthcheck Behavior (Current)

### 7.1 Healthcheck log filtering
- Internal docker healthchecks are skipped when they match:
  - method `GET`
  - path `/`
  - user-agent includes `wget` or `healthcheck`
  - local host/ip pattern

### 7.2 Why geo can be null
- `lib/geoip.ts` intentionally skips private/local IP ranges.
- LAN/docker bridge IPs (`192.168.x.x`, `172.19.x.x`, `127.0.0.1`) are not geolocated.

### 7.3 When geo is present
- Public client IP in forwarded chain.
- External GeoIP API resolves successfully.

---

## 8. Detailed Operational Commands

### Local dev
```bash
npm install
npm run dev
```

### Local production-like test
```bash
docker compose up -d --build
docker compose ps
docker logs --tail 100 netra-anveshan-portal
```

### Export image for transfer
```bash
docker save netra-anveshan-portal:latest | gzip > erp.tar.gz
sha256sum erp.tar.gz
```

### Transfer package
```bash
scp erp.tar.gz docker-compose.yml <user>@<host>:~/
```

### Target host deploy from tar
```bash
docker load -i ~/erp.tar.gz
docker compose down
docker compose up -d --no-build
docker compose ps
```

### Log inspection
```bash
docker exec netra-anveshan-portal sh -lc 'ls -lah /app/logs'
docker exec netra-anveshan-portal sh -lc 'tail -n 50 /app/logs/app.log'
```

---

## 9. Known Gaps / Risk Register

1. `app/admin/datasets/[id]/page.tsx` still contains TODO/FIXME and permissive pass-through behavior.
2. Contact details mismatch persists between contact page and footer/privacy content.
3. Geo fields remain null for private IP traffic by design.

---

## 10. Cleanup and Repository Hygiene Actions (This Audit)

Performed/planned in this audit cycle:
- README rewritten with current architecture and operational steps.
- DOCUMENTATION rewritten with per-file coverage + pseudocode.
- `.gitignore` refined for deployment artifacts.
- Runtime log files cleared for clean baseline testing.
- Untracked deployment archive excluded from git.

---

## 11. Appendix A - Tracked Source/Config/SQL/Script Files

Authoritative tracked list (excluding node_modules) at audit time:

- `app/about/page.tsx`
- `app/admin/datasets/[id]/page.tsx`
- `app/admin/datasets/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/profile/page.tsx`
- `app/admin/projects/page.tsx`
- `app/admin/publications/page.tsx`
- `app/admin/requests/page.tsx`
- `app/api/logs/route.ts`
- `app/api/uploads/route.ts`
- `app/apple-icon.svg`
- `app/contact/page.tsx`
- `app/facilities/page.tsx`
- `app/globals.css`
- `app/icon.svg`
- `app/layout.tsx`
- `app/page.tsx`
- `app/portal/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/research/page.tsx`
- `components/AdminCrudModal.tsx`
- `components/AdminSidebar.tsx`
- `components/Footer.tsx`
- `components/Navbar.tsx`
- `components/ProtectedRoute.tsx`
- `components/ThemeToggle.tsx`
- `database-schema.sql`
- `docker-compose.yml`
- `Dockerfile`
- `.dockerignore`
- `.gitignore`
- `lib/geoip.ts`
- `lib/logger.ts`
- `lib/supabase/client.ts`
- `lib/utils.ts`
- `LOG_COLLECTION_PLAYBOOK copy.md`
- `middleware.ts`
- `next.config.js`
- `package.json`
- `package-lock.json`
- `postcss.config.js`
- `README.md`
- `scripts/start-with-logs.sh`
- `scripts/write_log.py`
- `supabase/config.toml`
- `supabase/.gitignore`
- `supabase/migrations/20260325154700_init_schema.sql`
- `supabase/migrations/20260325162000_clear_existing_data.sql`
- `supabase/migrations/20260325170000_admin_activity_logs.sql`
- `supabase/migrations/20260325183000_remove_admin_activity_logs.sql`
- `supabase/migrations/20260325192000_create_staff_accounts_and_profiles.sql`
- `supabase/migrations/20260325200000_fix_authenticated_crud_policies.sql`
- `tailwind.config.ts`
- `tsconfig.json`

(Static media files under `public/`, upload seed files under `uploads/`, and local geo db files under `geoip/` are intentionally retained and acknowledged.)
