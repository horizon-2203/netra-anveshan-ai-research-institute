# Netra-Anveshan AI Research Institute Portal

A Next.js 16.0.5 web portal for Netra-Anveshan AI Research Institute featuring a public website, staff login portal, and protected admin ERP dashboard for managing AI datasets, research publications, and collaboration requests.

---

## 📋 Current Project Status (March 25, 2026)

### ✅ Completed Work

**Visual & Content Updates (March 23-25):**
- **About page**: Removed Satyamev emblem, added tiger hero image on right, expanded snapshots to 3-column layout
- **Research page**: Added researchimg.jpeg on right side, removed background image, reduced metrics to realistic 1-year values (papers: 7, citations: 320, researchers: 12), redesigned collaboration section with colab.jpeg on left
- **Contact page**: Removed background image, added cntus.jpeg on right, updated phone to +91 9914173314, removed sample placeholders from form
- **Theme**: Reduced heavy gradients, shifted to solid backgrounds for "official-looking" design

**Branding & Infrastructure (March 24-25):**
- **Global rename**: NorthStar → Netra-Anveshan across ALL files (package.json, .env.local, database-schema.sql, DOCUMENTATION.md, README.md, etc.)
- **Asset integration**: 9 custom images from home directory into /public/ folder
- **Server recovery**: Fixed 500 error by clearing .next cache and restarting dev server
- **Route verification**: All major routes tested and returning HTTP 200

**Documentation (March 25):**
- Updated DOCUMENTATION.md with database schema explanation in simple language
- Updated README.md with comprehensive user types and access levels
- Removed ARCHITECTURE_DOCUMENTATION.md (consolidated info)
- Added detailed database tables explanation

**Security Audit (March 25):**
- Analyzed 5 vulnerability classes: RCE, env leakage, SQL injection, file uploads, SSRF
- Documented findings in security section below
- Identified high-risk patterns in app/admin/datasets/[id]/page.tsx

### 🔄 Pending / In Progress

**Current Backend State:**
- Supabase CLI installed and linked to project `iuiqewnunafevgpulroh`
- Schema migration pushed successfully via `supabase db push`
- Tables now exist: datasets, publications, access_requests, research_projects, staff_users
- Seed/sample inserts are intentionally removed from schema

**Recommended Final Steps:**
1. Add intended 6 staff users in Supabase Authentication → Users
2. Test admin pages with real data from ERP forms
3. Visual QA on mobile/tablet for new hero layouts
4. Security hardening patches (input sanitization, removed debug panel)

---

## 🗄️ Database Structure (Explained Simply)

The database is like a digital filing cabinet storing 4 types of information:

### 1. **DATASETS Table** (AI डेटासेट)
**What it stores:** Data/files for AI research

| Field | Example | Purpose |
|-------|---------|---------|
| name | "ImageNet Large Scale" | Dataset name |
| dataset_type | "Computer Vision" | Type: NLP, CV, RL |
| size_gb | 150 | File size in GB |
| parameters_count | NULL | # of parameters (for models) |
| model_architecture | "CNN" | Architecture: CNN, Transformer, GAN |
| training_framework | "PyTorch" | Framework used |
| file_format | "HDF5" | Format: HDF5, Parquet, JSONL |
| is_public | true/false | Public or private? |
| created_at | 2026-03-15 10:30:00 | When added |

**Used by:** Admin staff to manage, public can view public ones

### 2. **PUBLICATIONS Table** (प्रकाशन)
**What it stores:** Research papers written by the institute

| Field | Example |
|-------|---------|
| title | "Deep Learning Advances in Computer Vision" |
| authors | "Dr. Chen, Dr. Yamamoto" |
| abstract | "This paper presents novel approaches..." |
| published_date | 2026-03-15 |
| status | "published" or "draft" |
| arxiv_url | "https://arxiv.org/abs/2603.12345" |
| github_url | "https://github.com/..." |

**Used by:** Admin to publish research, public can view published papers

### 3. **ACCESS_REQUESTS Table** (एक्सेस अनुरोध)
**What it stores:** Requests from external people wanting to use datasets

| Field | Example |
|-------|---------|
| name | "Dr. Sarah Johnson" |
| email | "sjohnson@mit.edu" |
| organization | "MIT" |
| request_type | "Dataset Access" or "Collaboration" |
| message | "Requesting access to ImageNet for..." |
| status | "pending", "approved", or "rejected" |
| created_at | 2026-03-20 14:22:00 |

**Flow:** Public fills form → Status "pending" → Admin approves/rejects → Status updated

### 4. **RESEARCH_PROJECTS Table** (अनुसंधान परियोजनाएं)
**What it stores:** Active research work your team is doing

| Field | Example |
|-------|---------|
| name | "Aurora ML Framework" |
| description | "Next-generation ML framework" |
| research_area | "Machine Learning" or "NLP" |
| team_lead | "Dr. Chen" |
| status | "Active", "Planning", or "Completed" |
| start_date | 2025-06-01 |

**Used by:** Admin staff to track ongoing research

---

## 👥 User Types & Access Levels

### PUBLIC VISITORS (Anyone from Internet) 🌐
Can see but CANNOT edit:
- ✅ Home page
- ✅ About page (institute info, leadership)
- ✅ Research page (projects, collaboration)
- ✅ Facilities page (infrastructure details)
- ✅ Contact page (contact form, phone number)
- ✅ Privacy Policy

**Can do:** Submit contact forms, request dataset access

### STAFF MEMBERS (Login Required) 🔐
All staff have equal access level. Login at `/portal`:

**Example Email Addresses:**
```
Researchers:
- dr.shreyansh.samir@netra-anveshan.org.in
- dr.milind.rai@netra-anveshan.org.in

Developers:
- utpal.kant@netra-anveshan.org.in
- nitish.kumar@netra-anveshan.org.in

Professors:
- dr.bheem.shukla@netra-anveshan.org.in
- dr.samay.raina@netra-anveshan.org.in
```

**Admin Dashboard Access:**

| Section | What Staff Can Do |
|---------|------------------|
| **Dashboard** | View stats (# of datasets, publications, requests, projects), see recent activity log, check system status (GPU, Storage, Database, API) |
| **AI Datasets** | List all datasets, add/edit/delete, mark as public/private, view details, process with filters |
| **Publications** | List papers, add/edit publication details, mark as draft/published, manage ArXiv/GitHub links |
| **Access Requests** | See all external requests, approve/reject, view status, contact requesters |
| **Research Projects** | Create/edit/delete projects, update status, manage team leads and members |

**Cannot do:** Delete other staff accounts, access server files, see private notes from other staff

---

## 🔐 Security Audit Findings (March 25, 2026)

### Vulnerability Assessment Summary

| Vulnerability Class | Status | Risk Level | Details |
|-------------------|--------|-----------|---------|
| **RCE (Remote Code Execution)** | ❌ Not observed | Low | No eval(), exec(), child_process usage found |
| **SQL Injection** | ❌ Not observed | Low | All DB queries use Supabase parameterized builders (.from().select()) |
| **File Uploads** | ❌ Not observed | Low | No multipart form handlers or file upload endpoints |
| **Environment Variable Leakage** | ⚠️ Potential Risk | Medium | Verbose console.error() logging with request params, headers, stack traces in [app/admin/datasets/[id]/page.tsx](app/admin/datasets/[id]/page.tsx) |
| **SSRF (Server-Side Request Forgery)** | ⚠️ Potential Risk | Medium | Unsanitized `id` parameter passed to INTERNAL_API_URL without validation |

### High-Risk File: `app/admin/datasets/[id]/page.tsx`

**Issues Found:**
1. **Line 5-7:** Explicit TODO comment: "Add input sanitization before production deployment"
2. **Line 77-85:** Development-only debug panel echoing `searchParams` directly in JSX (information disclosure)
3. **Line 110-124:** Direct parameter pass-through to internal API without validation:
   ```typescript
   const response = await fetch(
     `${internalApiUrl}/datasets/${id}/process`,
     {
       body: JSON.stringify({
         datasetId: id,
         filters: params,  // ⚠️ Unsanitized pass-through
       }),
     }
   );
   ```
4. **Line 130-155:** Verbose error logging including response headers, request params, full stack traces

**Recommended Fixes:**
- ✅ Add input validation for dataset `id` parameter (allowlist pattern like `/^[a-f0-9\-]{36}$/`)
- ✅ Remove or gate debug panel behind localhost-only check
- ✅ Redact sensitive fields from console logs (remove env vars, headers)
- ✅ Implement SSRF protection (URL allowlist for INTERNAL_API_URL)
- ✅ Sanitize `filters` object before passing to internal API

### Safe Practices Observed ✅
- Supabase parameterized queries prevent SQL injection
- No direct command execution found
- Environment variables in .gitignore
- Session-based authentication with proper redirect
- RLS (Row-Level Security) policies configured for access control
- No sensitive keys exposed in client-side code (NEXT_PUBLIC prefix used correctly)

---

## 🏗️ Project Overview

This is a Next.js 16.0.5 application featuring:
- **Public-facing website** with information about the institute
- **Staff portal** with Supabase authentication
- **Protected ERP dashboard** for researchers, developers, and professors
- **AI Datasets management** with advanced processing endpoints
- **Publications, Access Requests, and Research Projects** tracking

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.0.5 |
| **UI Library** | React | 19.1.0 |
| **Styling** | Tailwind CSS | 3.4.11 |
| **Build Tool** | Turbopack | Built-in |
| **Authentication** | Supabase | 2.49.1 |
| **Database** | PostgreSQL (Supabase) | Latest |
| **UI Components** | Radix UI Primitives | Latest |
| **Icons** | Lucide React | Latest |
| **Language** | TypeScript | 5.5.3 |
| **Fonts** | @fontsource (Hind, Noto Sans Devanagari, Poppins) | Latest |

---

## 📦 Prerequisites

- **Node.js** 20.11.0 or higher
- **npm** 10.2.4 or higher
- **Supabase account** (free tier is sufficient)

---

## 🚀 Installation & Setup

### Step 1: Clone and Install
```bash
cd /home/ubuntuksh/Documents/Project\ Adapt2.0/erp
npm install
```

### Step 2: Configure Environment Variables
Edit `.env.local`:
```bash
# Next.js
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:8080

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_xxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx.xxxx.xxxx

# Deploy path tracking
DEPLOY_TARGET_PATH=/home/ubuntuksh/Documents/Project Adapt2.0/erp

# Feature flag
ENABLE_FEATURE_FLAGS=false
```

### Step 3: Set Up Database
Use either method below:

**Method A (CLI - currently used in this project):**
```bash
supabase login
supabase link --project-ref iuiqewnunafevgpulroh
supabase db push
```

**Method B (Dashboard SQL Editor):**

1. Go to your Supabase project dashboard
2. Click "SQL Editor"
3. Click "New Query"
4. Copy entire contents from [`database-schema.sql`](database-schema.sql)
5. Click "Run"

**Verify tables were created:**
```bash
# In Supabase, go to "Table Editor" and confirm you see:
- datasets
- publications
- access_requests
- research_projects
- staff_users
```

### Step 3B: Add Staff Login Users in Supabase Auth
After running [`database-schema.sql`](database-schema.sql), create auth users so portal login works.

1. Open Supabase Dashboard → Authentication → Users
2. Click "Add user" for each staff email
3. Set a temporary password (or send invite link)
4. Ask each user to reset password after first login

**Intended ERP users:**

| Name | Role | Email |
|------|------|-------|
| Dr. Shreyansh Samir | Senior Researcher | dr.shreyansh.samir@netra-anveshan.org.in |
| Dr. Milind Rai | Research Scientist | dr.milind.rai@netra-anveshan.org.in |
| Utpal Kant | Lead Developer | utpal.kant@netra-anveshan.org.in |
| Nitish Kumar | Senior Developer | nitish.kumar@netra-anveshan.org.in |
| Dr. Bheem Shukla | Professor | dr.bheem.shukla@netra-anveshan.org.in |
| Dr. Samay Raina | Assistant Professor | dr.samay.raina@netra-anveshan.org.in |

### Step 4: Run Development Server
```bash
npm run dev
```
Server will start on `http://localhost:8080`

### Step 5: Test the Application

**Test Public Pages:**
```bash
curl http://localhost:8080/
curl http://localhost:8080/about
curl http://localhost:8080/research
curl http://localhost:8080/contact
```

**Test Staff Login:**
1. Visit `http://localhost:8080/portal`
2. Use one of the staff emails (needs to be created in Supabase Auth)
3. Should redirect to `/admin` dashboard

---

## 📂 Project Structure

```
├── app/                                  # Next.js App Router
│   ├── layout.tsx                       # Root layout with navbar/footer
│   ├── page.tsx                         # Homepage
│   ├── globals.css                      # Global Tailwind styles
│   ├── about/page.tsx                   # About page (updated: hero layout, snapshots)
│   ├── research/page.tsx                # Research page (updated: 2-col hero, reduced stats)
│   ├── facilities/page.tsx              # Facilities page
│   ├── contact/page.tsx                 # Contact form (updated: cntus.jpeg, phone)
│   ├── portal/page.tsx                  # Staff login page
│   ├── privacy-policy/page.tsx          # Privacy policy page
│   │
│   └── admin/                           # 🔐 Protected admin section
│       ├── layout.tsx                   # Admin layout with sidebar
│       ├── page.tsx                     # Dashboard (stats, activity, system status)
│       │
│       ├── datasets/
│       │   ├── page.tsx                 # List all datasets with CRUD
│       │   └── [id]/page.tsx            # Dataset detail + processing ⚠️ HIGH-RISK
│       │
│       ├── publications/page.tsx        # Manage research papers
│       ├── requests/page.tsx            # Access request approval workflow
│       └── projects/page.tsx            # Research project tracking
│
├── components/                          # React components
│   ├── Navbar.tsx                      # Navigation bar
│   ├── Footer.tsx                      # Footer with links
│   ├── Hero.tsx                        # Hero section component
│   ├── AdminSidebar.tsx                # Admin navigation sidebar
│   ├── ProtectedRoute.tsx              # Auth wrapper for /admin routes
│   ├── ThemeToggle.tsx                 # Dark/light mode toggle
│   └── ui/                             # Radix UI components
│
├── lib/                                 # Utilities & helpers
│   ├── utils.ts                        # Helper functions (cn, formatting, etc.)
│   └── supabase/client.ts              # Supabase client configuration
│
├── public/                              # Static assets (updated with images)
│   ├── logo.svg                        # Institute logo
│   ├── tiger.jpg                       # About page hero image
│   ├── researchimg.jpeg                # Research page hero (right side)
│   ├── colab.jpeg                      # Research collab section (left side)
│   ├── cntus.jpeg                      # Contact page hero (right side)
│   ├── smj.jpeg                        # Admin sidebar logo
│   ├── portalindiaai.jpeg              # Portal login background
│   ├── snap1.jpeg, snap2.jpeg, snap3.jpeg  # About page snapshots
│   └── ... (other assets)
│
├── Configuration Files
├── next.config.js                      # Next.js build configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Dependencies (updated: name changed)
├── package-lock.json                   # Dependency lock file
├── .env.local                          # Environment variables (local)
├── .gitignore                          # Git ignore rules
│
├── Documentation
├── database-schema.sql                 # Complete Supabase SQL schema
├── README.md                           # This file
└── DOCUMENTATION.md                    # Comprehensive technical documentation
```

---

## 🎯 Features

### Public Pages
- **Homepage** (`/`): Mission statement, institute highlights, updates
- **About** (`/about`): Leadership profiles, research divisions, institute snapshots
- **Research** (`/research`): Current projects, collaboration opportunities, realistic metrics
- **Facilities** (`/facilities`): Computing infrastructure, data center specifications
- **Contact** (`/contact`): Contact information and inquiry form
- **Privacy Policy** (`/privacy-policy`): Legal privacy terms

### Staff Portal & Admin Dashboard
- **Portal Login** (`/portal`): Email/password Supabase authentication
- **Dashboard** (`/admin`): Overview statistics, recent activity log, system status
- **Datasets** (`/admin/datasets`): List, create, read, update, delete operations
- **Dataset Detail** (`/admin/datasets/[id]`): Metadata view, advanced processing, filters
- **Publications** (`/admin/publications`): Research paper management and publishing
- **Requests** (`/admin/requests`): Access request approval workflow
- **Projects** (`/admin/projects`): Research project tracking and management

---

## 📊 Database Tables Schema

```sql
-- datasets: Stores AI research datasets
CREATE TABLE datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  dataset_type VARCHAR(50),        -- NLP, Computer Vision, RL
  model_architecture VARCHAR(50),  -- Transformer, CNN, GAN
  size_gb NUMERIC,
  parameters_count BIGINT,
  training_framework VARCHAR(50),  -- PyTorch, TensorFlow, JAX
  file_format VARCHAR(20),         -- HDF5, Parquet, JSONL
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- publications: Stores research papers
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  authors TEXT,
  abstract TEXT,
  published_date DATE,
  status TEXT DEFAULT 'draft',  -- draft, published
  arxiv_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- access_requests: Stores external access requests
CREATE TABLE access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  request_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',  -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- research_projects: Stores research projects
CREATE TABLE research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  research_area VARCHAR(100),
  team_lead TEXT,
  status TEXT DEFAULT 'planning',  -- planning, active, completed
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

All tables have indexes and Row-Level Security (RLS) policies enabled.

---

## 🔧 Available NPM Commands

```bash
npm run dev          # Start development server on port 8080
npm run build        # Build for production
npm run start        # Start production server on port 8080
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

---

## 🌍 Environment Variables

```bash
# REQUIRED - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=              # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=  # Optional fallback publishable key
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # Public anon key (safe to expose)

# Local/Server path tracking
DEPLOY_TARGET_PATH=

# Feature toggle
ENABLE_FEATURE_FLAGS=false

# Next.js mode
NODE_ENV=development                   # development, production, test

# Note: .env.local is in .gitignore (won't be committed to Git)
```

---

## 📅 Implementation Timeline

| Date | Work Item | Status |
|------|-----------|--------|
| Mar 23-24 | UI updates (About, Research, Contact pages) | ✅ Complete |
| Mar 24 | Global branding rename (NorthStar → Netra-Anveshan) | ✅ Complete |
| Mar 24 | Asset integration (9 images) | ✅ Complete |
| Mar 25 | Server recovery (500 error fix) | ✅ Complete |
| Mar 25 | Security audit (5 vulnerability classes) | ✅ Complete |
| Mar 25 | Documentation comprehensive update | ✅ Complete |
| Mar 25 | Supabase CLI setup + db push migration | ✅ Complete |
| TBD | Security hardening patches | 🔄 Pending |
| TBD | Final visual QA across devices | 🔄 Pending |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 2. Go to https://vercel.com/new
# 3. Connect your GitHub repository
# 4. Add environment variables from .env.local
# 5. Click Deploy

# Done! Your app is live at: https://your-domain.vercel.app
```

### Deploy to Manual Node.js Server
```bash
npm run build
npm start
# Listening on http://localhost:80
```

### Deploy with Docker
```bash
docker build -t netra-anveshan .
docker run -p 80:3000 --env-file .env.local -v "$PWD/logs:/app/logs" -v "$PWD/uploads:/app/uploads" netra-anveshan
```

### Deploy by TAR.GZ on Another Machine
```bash
# On source machine
tar -czf erp-release.tgz erp

# Copy erp-release.tgz to target machine, then:
tar -xzf erp-release.tgz
cd erp

# Build and run on host port 80
docker compose up -d --build

# Check service and logs
docker compose ps
tail -f logs/app.log
tail -f logs/docker/container.log
```

---

## 🐛 Troubleshooting

### Issue: Server returns "500 Internal Server Error"
**Cause:** Stale `.next` cache from previous interrupted build
**Solution:**
```bash
rm -rf .next
npm run dev
```

### Issue: Admin pages show "Loading..." forever
**Cause:** Database not set up OR Supabase credentials are wrong
**Solution:**
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
2. Run `database-schema.sql` in Supabase SQL Editor
3. Verify tables exist in Supabase Table Editor
4. Check Supabase Authentication is enabled for your project

### Issue: "/admin/datasets" page shows error
**Cause:** Database connection failed or tables don't exist
**Solution:**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `database-schema.sql`
3. Run the SQL
4. Refresh the page

### Issue: Login page doesn't accept credentials
**Cause:** Supabase Auth not configured or user doesn't exist
**Solution:**
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user" 
3. Create user with one of the staff emails
4. Set a test password
5. Try logging in again

### Issue: Images not loading on pages
**Cause:** Image file not in `/public` directory
**Solution:**
1. Check image file exists in `/public/` folder
2. Verify path in code matches actual filename (case-sensitive)
3. Hard-refresh browser (Ctrl+Shift+R)

---

## 📞 Support & Questions

For detailed information:
1. **Database Schema:** See `database-schema.sql`
2. **Configuration:** See `.env.local` and `next.config.js`
3. **Security Details:** See "Security Audit Findings" section above
4. **Technical Docs:** See `DOCUMENTATION.md` for in-depth explanations
5. **TODO Comments:** Search for "TODO:" in code for pending work items

---

## 📝 Notes

- **Database schema** is now pushed to Supabase via CLI migration
- **Security hardening** recommended before production deployment
- **Dev server** runs on `http://localhost:8080`
- **Production build** can be deployed to Vercel, AWS, or any Node.js host

---

**Project:** Netra-Anveshan AI Research Institute Portal  
**Last Updated:** March 25, 2026  
**Version:** 1.0.0  
**Status:** Pre-Production (Auth Onboarding & Security Patches Pending)  
**Maintainer:** Development Team
