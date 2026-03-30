# Netra-Anveshan ERP - Comprehensive Technical Documentation

Last audited: 30 March 2026
Audit scope: Full project pass across source code, API routes, middleware, logging, scripts, Docker, SQL schema, and Supabase migrations.

## 1. Project Purpose

This repository implements:
- A public institute website.
- A staff login portal.
- A protected ERP-style admin panel backed by Supabase.
- File-based operational logging with request tracing and optional IP geolocation.

## 2. Runtime Architecture

### Frontend and app framework
- Next.js App Router in `app/`.
- React client components for interactive pages.
- Tailwind CSS for styling.

### Authentication and data
- Supabase client initialized in `lib/supabase/client.ts`.
- Portal login uses `supabase.auth.signInWithPassword`.
- Admin section is gated by `components/ProtectedRoute.tsx`.

### API endpoints
- `app/api/logs/route.ts`: receives structured logs from middleware/client and forwards to logger.
- `app/api/uploads/route.ts`: receives file uploads for allowed categories and writes to disk.

### Request logging pipeline
1. `middleware.ts` generates/propagates request IDs and logs request start/end.
2. Middleware forwards payloads to `/api/logs`.
3. `app/api/logs/route.ts` enriches with geo data and calls `logger.log`.
4. `lib/logger.ts` sanitizes sensitive content and writes JSON logs via `scripts/write_log.py`.
5. Route-specific and global log files are stored in `logs/`.

### Docker runtime
- Multi-stage build in `Dockerfile`.
- Production launch script: `scripts/start-with-logs.sh`.
- Compose service with healthcheck and hardening in `docker-compose.yml`.

## 3. Code File Inventory (Acknowledgement of Each Code/Config File)

This section maps every authored code/config/script/SQL file reviewed during audit.

### 3.1 Root configuration and project meta
- `package.json`: scripts (`dev:8080`, `start:80`), dependencies, engine.
- `next.config.js`: standalone output, permissive CORS header for `/api/*`, image remote patterns.
- `tsconfig.json`: strict TS setup and `@/*` path alias.
- `tailwind.config.ts`: design tokens and animation definitions.
- `postcss.config.js`: Tailwind + Autoprefixer.
- `next-env.d.ts`: Next generated typing references.
- `.gitignore`: excludes env files, logs, node_modules, build artifacts.
- `.dockerignore`: excludes local/dev artifacts from image context.
- `.env.local`: runtime env values (contains secrets; keep private).

### 3.2 App Router pages and layouts
- `app/layout.tsx`: global metadata and root HTML shell.
- `app/globals.css`: design system variables, utility classes, custom components.
- `app/page.tsx`: homepage sections, hero, team, mission, news.
- `app/about/page.tsx`: about hero, snapshots, leadership, research divisions.
- `app/research/page.tsx`: tabbed research divisions, stats, projects, collaboration CTA.
- `app/facilities/page.tsx`: infra stats, specs, labs.
- `app/contact/page.tsx`: contact info and client-only simulated form submission.
- `app/portal/page.tsx`: staff login, auth events logging, redirect to `/admin`.
- `app/privacy-policy/page.tsx`: long-form privacy policy page.
- `app/admin/layout.tsx`: protected admin shell with sidebar and theme toggle.
- `app/admin/page.tsx`: dashboard counts and logging status card.
- `app/admin/profile/page.tsx`: edits Supabase auth user metadata.
- `app/admin/datasets/page.tsx`: datasets table + CRUD modal + optional file upload in Add mode.
- `app/admin/datasets/[id]/page.tsx`: server component for dataset detail and internal processing call.
- `app/admin/publications/page.tsx`: publications CRUD modal + Add-mode upload.
- `app/admin/requests/page.tsx`: access request CRUD + top-level upload notice section.
- `app/admin/projects/page.tsx`: projects CRUD + top-level upload notice section.

### 3.3 API routes
- `app/api/logs/route.ts`: log ingest endpoint, geo enrichment, call to logger.
- `app/api/uploads/route.ts`: multipart file upload API with category allowlist.

### 3.4 Components
- `components/Navbar.tsx`: responsive nav with optional theme toggle and portal button.
- `components/Footer.tsx`: global footer with links and contact details.
- `components/ThemeToggle.tsx`: localStorage-based light/dark toggle.
- `components/ProtectedRoute.tsx`: client-side session check and redirect.
- `components/AdminSidebar.tsx`: admin nav and sign-out action.
- `components/AdminCrudModal.tsx`: reusable modal wrapper for admin forms.

### 3.5 Libraries
- `lib/utils.ts`: class merge helper (`cn`).
- `lib/supabase/client.ts`: Supabase client instance creation from public env vars.
- `lib/geoip.ts`: external IP geolocation fetch + cache + private IP guard.
- `lib/logger.ts`: structured logger, secret masking, route-based file dispatch, Python file writer integration.

### 3.6 Middleware
- `middleware.ts`: request lifecycle logging, request ID propagation, `/api/logs` forwarding, static asset skip logic.

### 3.7 Docker and scripts
- `Dockerfile`: multi-stage build + runtime setup + Python install + non-root user.
- `docker-compose.yml`: port mapping, envs, mounts, healthcheck, restart policy, security options.
- `scripts/start-with-logs.sh`: starts app and mirrors stdout/stderr into container log file.
- `scripts/write_log.py`: receives JSON payload on stdin and appends logs to target files.

### 3.8 Database and Supabase
- `database-schema.sql`: full schema, RLS setup, policies, indexes.
- `supabase/config.toml`: local Supabase CLI environment config.
- `supabase/migrations/20260325154700_init_schema.sql`: baseline schema migration.
- `supabase/migrations/20260325162000_clear_existing_data.sql`: truncate/reset migration.
- `supabase/migrations/20260325170000_admin_activity_logs.sql`: introduces DB activity logs + triggers.
- `supabase/migrations/20260325183000_remove_admin_activity_logs.sql`: removes activity logs table/triggers.
- `supabase/migrations/20260325192000_create_staff_accounts_and_profiles.sql`: staff roster/profile and auth linkage migration.
- `supabase/migrations/20260325200000_fix_authenticated_crud_policies.sql`: CRUD grants and policies for authenticated users.

### 3.9 Non-code files acknowledged (not source logic)
- `app/icon.svg`, `app/apple-icon.svg`.
- `public/*` static media.
- `geoip/*.mmdb` GeoLite database files.
- `uploads/*` user-uploaded sample files and placeholders.
- `logs/*` runtime logs.
- `LOG_COLLECTION_PLAYBOOK copy.md` generic logging playbook reference.

## 4. Feature Behavior Details

### 4.1 Public site
- Static/informational pages are rendered as client components with theme hydration from localStorage.
- Navbar and Footer are reused across public pages.

### 4.2 Auth flow
- User signs in via `/portal` using Supabase password auth.
- On success, router navigates to `/admin`.
- `ProtectedRoute` checks session and redirects unauthenticated users back to `/portal`.

### 4.3 Admin CRUD
- Datasets/publications/requests/projects all perform Supabase read/write operations directly from client pages.
- Admin modal component is shared by most CRUD pages.
- Dataset and publication pages show file upload input only in Add mode.

### 4.4 Upload flow
- Upload endpoint validates category against allowlist.
- Filename is sanitized to safe characters.
- File is stored under `uploads/<category>/`.

### 4.5 Logging behavior
- Two middleware events per request: `request_received`, `request_completed`.
- API log ingest can enrich IP geo fields.
- Logger masks sensitive keys/patterns and writes JSON lines.
- Route-specific logs are split into website/admin files for easier analysis.

## 5. Data Model Summary

Core tables:
- `datasets`: catalog entries for AI datasets.
- `publications`: research publication records.
- `access_requests`: inbound access/collaboration requests.
- `research_projects`: internal research project tracker.
- `staff_users`: roster/profile metadata linked to auth users.

RLS:
- Public read policies for public datasets and published publications.
- Authenticated users have broad CRUD policies for ERP entities.

## 6. Docker and Deployment Details

Compose service `web` (`container_name: netra-anveshan-portal`):
- Image/build target: `netra-anveshan-portal:latest`.
- Host mapping: `80:3000`.
- Volumes:
  - `./logs:/app/logs`
  - `./uploads:/app/uploads`
- Health check:
  - `wget -qO /dev/null http://127.0.0.1:3000/`
- Security:
  - `cap_drop: ALL`
  - `no-new-privileges:true`
  - `tmpfs: /tmp`
- Restart policy: `unless-stopped`.

## 7. Operational Notes

### Logs folder deletion behavior
- If `logs/` is deleted, it is recreated when logger writes again.
- In Docker mode, bind mount path is recreated by Docker/host path creation.
- Historical entries are permanently removed if folder was deleted.

### Health check status
- Health check is present and active in compose.
- Container shows healthy when endpoint returns success.

## 8. Verified Inconsistencies and Risks

### 8.1 Contact information mismatch
- `app/contact/page.tsx` shows phone `+91 9914173314`.
- `components/Footer.tsx` and `app/privacy-policy/page.tsx` still show `(555) 123-4000`.

### 8.2 Dataset detail page hardening risk
File: `app/admin/datasets/[id]/page.tsx`
- Contains TODO/FIXME comments acknowledging missing sanitization.
- Passes `searchParams` directly in internal API payload.
- Internal API URL and token behavior should be hardened for production-grade SSRF/input controls.

### 8.3 Runtime logging density
- Healthcheck requests are logged repeatedly and can create high log volume.
- Consider reducing healthcheck logs to debug or filtering by user agent/path.

## 9. Recommended Next Engineering Steps

1. Normalize contact details across Contact, Footer, and Privacy pages.
2. Harden `app/admin/datasets/[id]/page.tsx` input validation and outbound request guardrails.
3. Decide final env management pattern for compose interpolation warnings (`.env` vs shell export).
4. Add explicit tests (or at least smoke checks) for admin CRUD and auth redirect flow.
5. Optionally reduce healthcheck log noise.

## 10. Documentation Alignment Status

This file and `README.md` were rewritten after full codebase pass.
They now reflect:
- Current routes.
- Current Docker/healthcheck behavior.
- Current logging implementation.
- Current schema/migration state.
- Current known gaps from actual code, not historical notes.
