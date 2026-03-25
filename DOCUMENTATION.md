# ═══════════════════════════════════════════════════════════════════════════════
# NETRA-ANVESHAN AI RESEARCH INSTITUTE - COMPLETE PROJECT DOCUMENTATION
# ═══════════════════════════════════════════════════════════════════════════════
# 
# Project: AI Research Institute Web Portal
# Version: 1.0.0
# Created: March 23, 2026
# Last Updated: March 25, 2026 (Comprehensive Update)
# 
# This document contains EVERY detail about this project including:
# - Complete project overview and purpose
# - Full technology stack with exact versions
# - Database schema and user types explained in simple language
# - Directory structure with file descriptions
# - Complete source code for every file
# - Configuration files
# - Component documentation
# - API documentation
# - Authentication flow
# - Deployment instructions
# - Security audit findings
# - Complete implementation timeline
# - Troubleshooting guide
# 
# Total Lines: 3000+
# ═══════════════════════════════════════════════════════════════════════════════

================================================================================
MARCH 25, 2026 - LATEST EXECUTION UPDATE (CLI + DB)
================================================================================

This update supersedes older references that say database setup is still pending.

COMPLETED IN THIS SESSION:
- Supabase CLI installed successfully (Option A local binary path setup).
- Supabase CLI login completed.
- Project linked with ref: iuiqewnunafevgpulroh.
- `supabase init` completed and migration structure created.
- Initial schema migration added:
  - supabase/migrations/20260325154700_init_schema.sql
- Migration push completed successfully:
  - supabase db push

SCHEMA COMPATIBILITY FIX APPLIED:
- Replaced `uuid_generate_v4()` with `gen_random_uuid()`.
- Switched extension to `pgcrypto` in schema/migration files.

CURRENT DATABASE STATE:
- Tables created:
  - datasets
  - publications
  - access_requests
  - research_projects
  - staff_users
- No seed/sample INSERT statements are present in current schema.

CURRENT LOCAL RUNTIME STATE:
- Dev/start configured for port 8080.
- `.env.local` kept minimal for testing:
  - NODE_ENV
  - NEXT_PUBLIC_SITE_URL
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - DEPLOY_TARGET_PATH
  - ENABLE_FEATURE_FLAGS

REMAINING REQUIRED ACTIONS:
- Manually create intended staff users in Supabase Authentication -> Users.
- Continue ERP data entry manually (no automatic seed insertion).

================================================================================
MARCH 24, 2026 - COMPLETE IMPLEMENTATION STATUS (DETAILED)
================================================================================

This section is the latest authoritative status of all customizations done in
this workspace during iterative UI/content updates.

RECHECK NOTE (MARCH 25, 2026):
- This status has been re-validated against current workspace files after the
  latest About/Research/Contact updates.
- ARCHITECTURE_DOCUMENTATION.md has been removed from the project.
- Current documentation focus is consolidated in DOCUMENTATION.md and README.md.

PROJECT NAME (CURRENT BRANDING):
- Netra-Anveshan AI Research Institute

WORKSPACE:
- /home/ubuntuksh/Documents/Project Adapt2.0/erp

-------------------------------------------------------------------------------
A) EXECUTIVE SUMMARY
-------------------------------------------------------------------------------

The project has been heavily customized beyond initial scaffold. Major updates
are complete across visual theme, content, branding assets, route pages, and
documentation-related pages.

Current state:
- Public pages are working and visually aligned to a more official/solid theme.
- Gradient-heavy look has been reduced in key pages.
- Several requested local image assets have been integrated.
- About, Research, Contact, and Portal pages have received structure changes.
- Privacy policy route has been implemented and linked.
- Major route checks have repeatedly returned HTTP 200 when dev server is up.

-------------------------------------------------------------------------------
B) DETAILED COMPLETED WORK (WHAT IS DONE)
-------------------------------------------------------------------------------

1) Runtime / Configuration fixes
--------------------------------
- Migrated Next.js image config from deprecated `images.domains` to
  `images.remotePatterns` in next.config.js.
- Reduced dependency on runtime Google font fetch (previous network failures).
- Updated global typography stack to local-available families (Hind,
  Noto Sans Devanagari, Poppins with fallbacks).

2) Branding and identity updates
--------------------------------
- Institute naming/content updated to Netra-Anveshan AI Research Institute in
  relevant UI text areas.
- Multiple logo/icon rounds handled as requested.
- App icon resources migrated to svg variants in app directory when requested.

3) Theme simplification (official style direction)
--------------------------------------------------
- Reduced highly flashy/AI-style gradients and over-bright overlays.
- Shifted many sections to solid background blocks, clearer borders, and
  practical card styling.
- Kept dark mode compatibility where already present in components.

4) Privacy policy implementation
--------------------------------
- Added dedicated privacy policy page at /privacy-policy.
- Footer link wired to this route.

5) About page (major restructuring)
-----------------------------------
- Hero refactored with tiger image on right side.
- Satyamev Jayate emblem section removed later as per latest request.
- Institute snapshots expanded and spread with larger tiles.
- Stats and key milestones sections removed from About page.
- Leadership cards updated in a practical expert-info format.
- Research divisions shown in long vertical numbered card style.

6) Research page (latest structure/content update)
--------------------------------------------------
- Hero background image removed for "Building the Future: Artificial
  Intelligence" section.
- Added right-side hero image from home directory: researchimg.jpeg.
- Research metrics reduced to realistic first-year values:
  - Papers/citations/researchers reduced significantly.
  - Citation display changed to absolute values (no inflated k-format).
- "Collaborate With Us" section redesigned:
  - Left: colab.jpeg image.
  - Right: content block and CTA.
  - Background image overlay removed.

7) Contact page (latest update)
-------------------------------
- Hero background image removed for "Contact / Our Team" section.
- Added right-side image: cntus.jpeg.
- Contact phone number fixed to: +91 9914173314.
- Removed sample placeholders from form inputs/textarea:
  - John Doe
  - john@example.com
  - Company Name
  - Tell us about your inquiry...

8) Portal/Admin and other page alignment
----------------------------------------
- Portal visual update includes white card preference and custom background.
- Theme toggle handling adjusted based on route-specific requests.
- Admin/public pages repeatedly tuned for consistent style direction.

9) Asset ingestion from home directory
--------------------------------------
The following requested assets were copied and integrated in /public:
- smj.jpeg
- portalindiaai.jpeg
- tiger.jpg
- snap1.jpeg
- snap2.jpeg
- snap3.jpeg
- researchimg.jpeg
- colab.jpeg
- cntus.jpeg
- plus other earlier assets used on homepage/research/facilities context.

10) Validation and route checks
-------------------------------
- Multiple HTTP checks performed repeatedly for:
  /, /about, /research, /facilities, /contact, /portal,
  /privacy-policy, and admin routes.
- Edited files were checked for TypeScript/diagnostic errors after patches.

-------------------------------------------------------------------------------
C) PAGE-BY-PAGE IMPLEMENTATION STATUS
-------------------------------------------------------------------------------

1. Home (/)
- Content and institute messaging updated in prior iterations.
- Visual style aligned toward less flashy aesthetic.

2. About (/about)
- Hero with right-side tiger image implemented.
- Satyamev emblem block removed as requested.
- Snapshots now expanded and larger.
- Leadership + divisions retained in structured cards.

3. Research (/research)
- Hero now two-column with right image (researchimg.jpeg).
- Background hero image removed.
- Stats normalized for realistic 1-year progress.
- Collaboration section now image-left/content-right using colab.jpeg.

4. Facilities (/facilities)
- Heading/content and style direction updated in prior passes.

5. Contact (/contact)
- Hero background removed.
- Right-side cntus.jpeg image added.
- Phone number set to +91 9914173314.
- Form sample placeholders removed.

6. Portal (/portal)
- White form card preference applied.
- Route-level visual behavior adjusted per request history.

7. Privacy Policy (/privacy-policy)
- Functional page exists with realistic policy content.

8. Admin routes (/admin/*)
- Layout/sidebar/branding tuned in earlier updates.

-------------------------------------------------------------------------------
D) FILE-LEVEL CHANGE MAP (HIGH SIGNAL)
-------------------------------------------------------------------------------

Core configuration and global UI:
- next.config.js
- app/layout.tsx
- app/globals.css
- tailwind.config.ts

Public pages:
- app/page.tsx
- app/about/page.tsx
- app/research/page.tsx
- app/facilities/page.tsx
- app/contact/page.tsx
- app/portal/page.tsx
- app/privacy-policy/page.tsx

Shared components:
- components/Navbar.tsx
- components/Footer.tsx
- components/AdminSidebar.tsx

Admin area:
- app/admin/layout.tsx
- app/admin/page.tsx
- app/admin/datasets/page.tsx
- app/admin/datasets/[id]/page.tsx
- app/admin/publications/page.tsx
- app/admin/requests/page.tsx
- app/admin/projects/page.tsx

Assets:
- public/* (multiple custom image assets integrated)

-------------------------------------------------------------------------------
E) WHAT IS LEFT (PENDING / RECOMMENDED)
-------------------------------------------------------------------------------

Functional pending blockers:
- Authentication user onboarding (Supabase Auth users) and live data entry.

Database-specific pending checklist:
1) Confirm Supabase project is active and credentials are set in .env.local:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
2) Verify tables exist:
  - datasets
  - publications
  - access_requests
  - research_projects
  - staff_users
3) Verify RLS policies and indexes are created successfully.
4) Confirm admin pages can read/write expected records after login.
5) Add intended 6 staff users in Supabase Authentication -> Users.

Recommended final QA (manual visual pass):
1) Confirm crop/position for new hero images on About/Research/Contact pages
   across mobile, tablet, desktop.
2) Confirm dark mode readability for newly restructured sections.
3) Hard-refresh browser to validate icon/favicon caching.
4) Optional: tune spacing/typography for exact pixel preferences if new
   screenshot feedback is provided.

Optional technical housekeeping:
- Update baseline-browser-mapping dev dependency warning if desired:
  npm i baseline-browser-mapping@latest -D

-------------------------------------------------------------------------------
F) CURRENT OPERATIONAL STATUS
-------------------------------------------------------------------------------

- Build/dev workflow operational.
- Main public routes tested repeatedly with successful responses when server is
  running.
- Recent page edits were saved and diagnostics passed.
- Database schema has been applied to Supabase via CLI migration push.
- Current operational focus is auth user onboarding and real data entry.

-------------------------------------------------------------------------------
G) CHANGE CONTROL NOTE
-------------------------------------------------------------------------------

Because this project has undergone many iterative direction changes (branding,
icon style, gradients vs solid UI, multilingual content, section composition),
future edits should follow this rule:

"Prefer practical, official-looking, low-noise visual design with exact
content/layout matching provided user instructions and asset files."

================================================================================
END OF LATEST IMPLEMENTATION STATUS (MARCH 24, 2026)
================================================================================

================================================================================
MARCH 25, 2026 - DATABASE & USER TYPES EXPLANATION (SIMPLIFIED)
================================================================================

This section explains the database structure and user types in simple, 
non-technical language for easy understanding.

WHAT IS THE DATABASE?
─────────────────────────────────────────────────────────────────────────────────

Think of the database as a big digital filing cabinet. It stores information 
about:
- Datasets (data/files for AI research)
- Publications (research papers)
- Access requests (people asking for permission)
- Research projects (work in progress)

The database is PostgreSQL, hosted on Supabase (cloud service).

DATABASE TABLES (WHAT GETS STORED)
─────────────────────────────────────────────────────────────────────────────────

1. DATASETS TABLE (AI डेटासेट)
   Purpose: Library of data/files for AI research
   
   Fields stored:
   - id: Unique identifier (UUID)
   - name: Dataset name (e.g., "ImageNet Large Scale")
   - description: What the dataset is for
   - dataset_type: Type (NLP, Computer Vision, Reinforcement Learning)
   - model_architecture: How it's structured (Transformer, CNN, GAN)
   - size_gb: How big the file is (in gigabytes)
   - parameters_count: Number of parameters (e.g., 175 billion)
   - training_framework: Tools used (PyTorch, TensorFlow, JAX)
   - file_format: Format of storage (HDF5, Parquet, JSONL)
   - is_public: Can anyone see it? (true = yes, false = only staff)
   - created_at: When it was added
   - updated_at: When it was last changed
   
   Example: "ImageNet Large Scale" → 150GB, Computer Vision, CNN, public

2. PUBLICATIONS TABLE (प्रकाशन)
   Purpose: Research papers/articles written by the institute
   
   Fields stored:
   - id: Unique identifier (UUID)
   - title: Paper title
   - authors: Who wrote it
   - abstract: Short summary of the paper
   - published_date: When it was published
   - status: Draft or published?
   - arxiv_url: Link to ArXiv paper
   - github_url: Link to code repository
   - created_at: When entry was created
   
   Example: "Deep Learning Advances in Computer Vision" by Dr. Chen

3. ACCESS_REQUESTS TABLE (एक्सेस अनुरोध)
   Purpose: Track requests from external people wanting to use our datasets
   
   Fields stored:
   - id: Unique identifier (UUID)
   - name: Who is requesting
   - email: Their email
   - organization: What company/university they're from
   - request_type: Type of request (Dataset Access, Collaboration, Partnership)
   - message: Why they want access
   - status: Pending, approved, or rejected?
   - created_at: When request was submitted
   
   Example: "Dr. Sarah Johnson from MIT wants ImageNet dataset"

4. RESEARCH_PROJECTS TABLE (अनुसंधान परियोजनाएं)
   Purpose: Track active research work your team is doing
   
   Fields stored:
   - id: Unique identifier (UUID)
   - name: Project name
   - description: What the project does
   - research_area: Area of research (ML, NLP, CV, Ethics, etc.)
   - team_lead: Who is leading the project
   - status: Planning, active, or completed?
   - start_date: When project started
   - created_at: When entry was created
   
   Example: "Aurora ML Framework" → status: Active, led by Dr. Chen

SAMPLE DATA IN DATABASE
─────────────────────────────────────────────────────────────────────────────────

When you first create the database (run database-schema.sql), it includes 
sample data:

Datasets (4 examples):
1. ImageNet Large Scale (150GB, Computer Vision, public)
2. GPT Training Corpus (570GB, NLP, private)
3. RL Benchmark Suite (45GB, Reinforcement Learning, public)
4. Medical Imaging Dataset (230GB, Computer Vision, private)

Publications (4 examples):
1. Deep Learning Advances in Computer Vision (published March 2026)
2. Next Generation NLP Models (published Feb 2026)
3. AI Safety Framework v2.0 (draft)
4. Reinforcement Learning in Robotics (published Dec 2025)

Access Requests (4 examples):
1. Dr. Sarah Johnson (MIT) - requesting ImageNet - pending
2. Prof. Michael Lee (Stanford) - collaboration interest - approved
3. Dr. Emily Rodriguez (Berkeley) - partnership proposal - pending
4. John Smith (Google) - requesting GPT corpus - rejected

Research Projects (4 examples):
1. Aurora ML Framework (active, Dr. Chen)
2. Next-Gen NLP Models (active, Dr. Yamamoto)
3. Computer Vision Pipeline (planning, M. Torres)
4. AI Safety Framework (active, Dr. Chen)

USER TYPES & ACCESS LEVELS
─────────────────────────────────────────────────────────────────────────────────

TWO TYPES OF USERS:

1. PUBLIC VISITORS (कोई भी व्यक्ति)
   ───────────────
   These are people visiting your website from the internet.
   
   Who: Anyone (students, researchers, journalists, public)
   Access: Read-only public pages
   Login: NOT required
   
   What they can see:
   ✅ Homepage (/): Mission, stats, highlights
   ✅ About page (/about): History, leadership, divisions
   ✅ Research page (/research): Projects, collaboration info
   ✅ Facilities page (/facilities): Computing infrastructure
   ✅ Contact page (/contact): Contact info and contact form
   ✅ Privacy Policy (/privacy-policy): Legal policy
   
   What they CANNOT do:
   ❌ Access admin dashboard
   ❌ View or download datasets
   ❌ See publications list
   ❌ Approve/reject requests
   ❌ Manage projects
   
   Can submit forms: Yes (contact form, newsletter signup)

2. STAFF MEMBERS / ADMIN USERS (स्टाफ सदस्य)
   ──────────────────────────────────────
   These are institute employees (researchers, developers, professors).
   
   Who: Authorized staff only
   Access: Full read/write permissions
   Login: REQUIRED at /portal page
   
   How to login:
   Step 1: Go to http://localhost:3000/portal
   Step 2: Enter email + password
   Step 3: Get redirected to /admin dashboard
   
   Current staff emails (for testing):
   Researchers:
   - dr.shreyansh.samir@netra-anveshan.org.in
   - dr.milind.rai@netra-anveshan.org.in
   
   Developers:
   - utpal.kant@netra-anveshan.org.in
   - nitish.kumar@netra-anveshan.org.in
   
   Professors:
   - dr.bheem.shukla@netra-anveshan.org.in
   - dr.samay.raina@netra-anveshan.org.in
   
   What they can access (admin dashboard):
   
   ✅ DASHBOARD (/admin)
      - View overview statistics
      - See how many datasets, publications, requests, projects exist
      - Check recent activity log
      - Monitor system status (GPU, Storage, Database, API)
   
   ✅ AI DATASETS (/admin/datasets)
      - View list of all datasets
      - Add new datasets
      - Edit existing datasets
      - Delete datasets
      - Mark datasets as public or private
      - Click on any dataset to see details
      - Process datasets with advanced options
   
   ✅ DATASET DETAIL (/admin/datasets/[id])
      - View complete dataset metadata
      - See description, size, format
      - Advanced processing with filters
      - Debug panel showing applied filters (dev mode only)
      - Download/process dataset
   
   ✅ PUBLICATIONS (/admin/publications)
      - View all research papers
      - Add new publications
      - Edit paper details
      - Mark as draft or published
      - Add ArXiv and GitHub links
      - Manage publication status
   
   ✅ ACCESS REQUESTS (/admin/requests)
      - See all requests from external people
      - View who requested what and why
      - Status of each request (pending, approved, rejected)
      - Approve requests → external person gets access
      - Reject requests → external person denied
      - View request history
   
   ✅ RESEARCH PROJECTS (/admin/projects)
      - View all active research projects
      - Add new projects
      - Edit project details
      - Update project status
      - Manage team leads and members
      - Track project progress
   
   What they CANNOT do:
   ❌ Delete published data (only archive)
   ❌ Access other staff's private notes
   ❌ Access server system files
   ❌ Create new user accounts

HOW REQUESTS FLOW THROUGH SYSTEM
─────────────────────────────────────────────────────────────────────────────────

Example: Google researcher requests ImageNet dataset

Timeline:
─────────

Day 1 - EXTERNAL REQUEST:
┌─────────────────────────────────────────────────────────────────┐
│ 1. Google researcher visits your public website                 │
│ 2. Clicks on "Contact" or "Request Dataset Access"             │
│ 3. Fills form: Name, Email, Organization, Message               │
│ 4. Submits form                                                  │
│ 5. Data saved in database → access_requests table              │
│    Status: "pending"                                             │
└─────────────────────────────────────────────────────────────────┘

Day 2 - STAFF REVIEW:
┌─────────────────────────────────────────────────────────────────┐
│ 1. Staff member logs in at /portal                              │
│ 2. Goes to /admin/requests                                      │
│ 3. Sees: "John Smith from Google - ImageNet request - pending"  │
│ 4. Reads request message                                         │
│ 5. Clicks "Approve" button                                       │
│ 6. Database updated → Status: "approved"                         │
└─────────────────────────────────────────────────────────────────┘

Day 3 - EXTERNAL NOTIFIED:
┌─────────────────────────────────────────────────────────────────┐
│ 1. System sends approval email to requester                     │
│ 2. Email includes: Download link, terms of use, contact info    │
│ 3. Requester can now download dataset                            │
│ 4. Download logged in database for audit trail                  │
└─────────────────────────────────────────────────────────────────┘

SECURITY & PRIVACY
─────────────────────────────────────────────────────────────────────────────────

Row-Level Security (RLS) is enabled:
- Public can only see: is_public=true datasets, published papers
- Authenticated staff: Full read/write access
- Each table has separate RLS policies

Private datasets (is_public=false) are hidden from public view but can be 
shared individually via approval system.

================================================================================
TABLE OF CONTENTS
================================================================================

1. PROJECT OVERVIEW
   1.1 Purpose and Goals
   1.2 Target Users
   1.3 Key Features
   1.4 Project Timeline

2. TECHNOLOGY STACK
   2.1 Frontend Framework
   2.2 Styling and UI
   2.3 Backend and Database
   2.4 Authentication
   2.5 Development Tools
   2.6 Exact Package Versions

3. DIRECTORY STRUCTURE
   3.1 Complete File Tree
   3.2 File Descriptions
   3.3 Folder Organization

4. CONFIGURATION FILES
   4.1 package.json (Complete)
   4.2 next.config.js (Complete)
   4.3 tsconfig.json (Complete)
   4.4 tailwind.config.ts (Complete)
   4.5 postcss.config.js (Complete)
   4.6 .env.local (Complete)
   4.7 .gitignore (Complete)

5. SOURCE CODE - APP DIRECTORY
   5.1 app/layout.tsx
   5.2 app/globals.css
   5.3 app/page.tsx (Homepage)
   5.4 app/about/page.tsx
   5.5 app/research/page.tsx
   5.6 app/facilities/page.tsx
   5.7 app/contact/page.tsx
   5.8 app/portal/page.tsx
   5.9 app/admin/layout.tsx
   5.10 app/admin/page.tsx (Dashboard)
   5.11 app/admin/datasets/page.tsx
   5.12 app/admin/datasets/[id]/page.tsx
   5.13 app/admin/publications/page.tsx
   5.14 app/admin/requests/page.tsx
   5.15 app/admin/projects/page.tsx

6. SOURCE CODE - COMPONENTS
   6.1 components/Navbar.tsx
   6.2 components/Hero.tsx
   6.3 components/Footer.tsx
   6.4 components/AdminSidebar.tsx
   6.5 components/ProtectedRoute.tsx

7. SOURCE CODE - LIB
   7.1 lib/utils.ts
   7.2 lib/supabase/client.ts

8. DATABASE SCHEMA
   8.1 datasets Table
   8.2 publications Table
   8.3 access_requests Table
   8.4 research_projects Table
   8.5 Complete SQL Script
   8.6 Sample Data

9. AUTHENTICATION SYSTEM
   9.1 Supabase Auth Setup
   9.2 Login Flow
   9.3 Session Management
   9.4 Protected Routes
   9.5 User Roles

10. ROUTING ARCHITECTURE
    10.1 Public Routes
    10.2 Protected Routes
    10.3 Dynamic Routes
    10.4 Route Parameters

11. STYLING SYSTEM
    11.1 Color Palette
    11.2 Typography
    11.3 Spacing System
    11.4 Component Styles
    11.5 Responsive Breakpoints

12. API AND DATA FLOW
    12.1 Supabase Client
    12.2 Data Fetching
    12.3 Error Handling
    12.4 Advanced Processing Endpoint

13. DEPLOYMENT
    13.1 Prerequisites
    13.2 Environment Setup
    13.3 Build Process
    13.4 Production Deployment
    13.5 Vercel Deployment
    13.6 Docker Deployment

14. DEVELOPMENT GUIDE
    14.1 Getting Started
    14.2 Running Locally
    14.3 Adding New Pages
    14.4 Adding Components
    14.5 Database Migrations

15. TROUBLESHOOTING
    15.1 Common Errors
    15.2 Debug Mode
    15.3 Log Analysis
    15.4 Performance Issues

16. SECURITY
    16.1 Authentication Security
    16.2 Environment Variables
    16.3 API Security
    16.4 Data Protection

17. APPENDIX
    17.1 Complete File Listing
    17.2 NPM Commands
    17.3 Git Commands
    17.4 Useful Scripts


================================================================================
1. PROJECT OVERVIEW
================================================================================

1.1 PURPOSE AND GOALS
─────────────────────────────────────────────────────────────────────────────────

The Netra-Anveshan AI Research Institute Portal is a comprehensive web application 
designed to serve as the digital presence for an AI research organization. 
The portal serves three primary purposes:

1. PUBLIC WEBSITE: Provides information about the institute, its research 
   programs, facilities, and contact information to the general public, 
   potential collaborators, and prospective researchers.

2. STAFF PORTAL: A secure login system for institute staff members including 
   researchers, developers, and professors to access internal resources.

3. ADMIN DASHBOARD: A protected Enterprise Resource Planning (ERP) system 
   for managing AI datasets, publications, access requests, and research 
   projects.

PROJECT GOALS:
- Create a professional, modern web presence for the research institute
- Implement secure authentication for staff members
- Provide dataset management capabilities with advanced processing
- Track research publications and access requests
- Manage ongoing research projects
- Ensure responsive design for all devices
- Maintain high performance and accessibility standards

1.2 TARGET USERS
─────────────────────────────────────────────────────────────────────────────────

The application serves multiple user types:

PUBLIC VISITORS:
- Prospective researchers looking for opportunities
- Academic institutions seeking collaboration
- Industry partners interested in partnerships
- Students exploring AI research careers
- Media and press seeking information
- General public interested in AI research

STAFF MEMBERS (Authenticated Users):

Researchers:
- dr.shreyansh.samir@netra-anveshan.org.in
- dr.milind.rai@netra-anveshan.org.in

Developers:
- utpal.kant@netra-anveshan.org.in
- nitish.kumar@netra-anveshan.org.in

Professors:
- dr.bheem.shukla@netra-anveshan.org.in
- dr.samay.raina@netra-anveshan.org.in

All staff members have equal access to the admin dashboard after authentication.

1.3 KEY FEATURES
─────────────────────────────────────────────────────────────────────────────────

PUBLIC WEBSITE FEATURES:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Feature              │ Description                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Homepage             │ Hero section, mission statement, stats, news         │
│ About Page           │ History, leadership, divisions, achievements         │
│ Research Page        │ Current projects, collaboration opportunities        │
│ Facilities Page      │ Computing infrastructure, data center specs          │
│ Contact Page         │ Contact form with validation                         │
│ Responsive Design    │ Works on mobile, tablet, and desktop                 │
│ Staff Portal Link    │ Quick access to login page                          │
└─────────────────────────────────────────────────────────────────────────────┘

ADMIN DASHBOARD FEATURES:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Feature              │ Description                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Dashboard            │ Quick stats, recent activity, system status          │
│ AI Datasets          │ CRUD operations, filtering, advanced processing      │
│ Dataset Detail       │ Metadata view, download, debug panel                 │
│ Publications         │ Manage research papers and articles                  │
│ Access Requests      │ Review and approve/reject requests                   │
│ Research Projects    │ Track ongoing research projects                      │
│ Sidebar Navigation   │ Easy navigation between sections                     │
│ User Menu            │ Profile info and logout                              │
└─────────────────────────────────────────────────────────────────────────────┘

TECHNICAL FEATURES:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Feature              │ Description                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Server Components    │ Optimal performance with React Server Components     │
│ Client Components    │ Interactive UI with client-side rendering            │
│ Authentication       │ Supabase Auth with email/password                    │
│ Protected Routes     │ Automatic redirect for unauthenticated users         │
│ Advanced Processing  │ Dataset processing with flexible parameters          │
│ Comprehensive Logging│ Detailed error logging for debugging                 │
│ Debug Mode           │ Development-only debug panels                        │
│ Type Safety          │ Full TypeScript implementation                       │
└─────────────────────────────────────────────────────────────────────────────┘

1.4 PROJECT TIMELINE
─────────────────────────────────────────────────────────────────────────────────

Project Created: March 23, 2026
Development Time: ~2 hours
Build Status: Complete
Server Status: Running

DEVELOPMENT PHASES:
Phase 1: Project Setup & Configuration        [COMPLETE]
Phase 2: Public Website Pages                 [COMPLETE]
Phase 3: Authentication System                [COMPLETE]
Phase 4: Admin Dashboard                      [COMPLETE]
Phase 5: Database Schema                      [COMPLETE]
Phase 6: Documentation                        [COMPLETE]
Phase 7: Testing & Verification               [COMPLETE]


================================================================================
2. TECHNOLOGY STACK
================================================================================

2.1 FRONTEND FRAMEWORK
─────────────────────────────────────────────────────────────────────────────────

NEXT.JS 16.0.5
- React framework for production
- App Router (recommended routing system)
- Server Components by default
- Client Components with "use client" directive
- File-based routing
- Server Actions enabled
- Turbopack for fast development builds
- Built-in optimizations

REACT 19.1.0
- Latest stable React version
- Concurrent features
- Automatic batching
- Transitions API
- Suspense improvements

REACT DOM 19.1.0
- DOM renderer for React
- Hydration improvements
- Event delegation

2.2 STYLING AND UI
─────────────────────────────────────────────────────────────────────────────────

TAILWIND CSS 3.4.11
- Utility-first CSS framework
- Custom configuration
- JIT (Just-In-Time) compilation
- Responsive design utilities
- Dark mode support (prepared)
- Custom color palette

RADIX UI (Multiple packages)
- Unstyled, accessible components
- Keyboard navigation
- Screen reader support
- Focus management
- Animation support

Installed Radix packages:
- @radix-ui/react-accordion: ^1.2.0
- @radix-ui/react-alert-dialog: ^1.1.1
- @radix-ui/react-avatar: ^1.1.0
- @radix-ui/react-checkbox: ^1.1.1
- @radix-ui/react-dialog: ^1.1.1
- @radix-ui/react-dropdown-menu: ^2.1.1
- @radix-ui/react-label: ^2.1.0
- @radix-ui/react-popover: ^1.1.1
- @radix-ui/react-select: ^2.1.1
- @radix-ui/react-separator: ^1.1.0
- @radix-ui/react-slot: ^1.1.0
- @radix-ui/react-tabs: ^1.1.0
- @radix-ui/react-toast: ^1.2.1

LUCIDE REACT 0.451.0
- Beautiful, consistent icons
- Tree-shakeable
- Customizable size and color
- TypeScript support

CLASS VARIANCE AUTHORITY 0.7.0
- Variant-based component styling
- Type-safe variants
- Composable styles

TAILWIND MERGE 2.5.2
- Merge Tailwind classes efficiently
- Resolve conflicts
- Optimize class strings

CLSX 2.1.1
- Conditional class composition
- Lightweight utility
- TypeScript support

2.3 BACKEND AND DATABASE
─────────────────────────────────────────────────────────────────────────────────

SUPABASE 2.49.1
- PostgreSQL database
- Real-time subscriptions
- Row Level Security (RLS)
- Storage buckets
- Edge Functions
- Auto-generated APIs

Database Features:
- Relational data modeling
- JSON/JSONB support
- Full-text search
- Triggers and functions
- Foreign key constraints
- Indexes for performance

Storage Features:
- File uploads
- Image transformations
- CDN distribution
- Access policies

2.4 AUTHENTICATION
─────────────────────────────────────────────────────────────────────────────────

SUPABASE AUTH
- Email/password authentication
- Session management
- JWT tokens
- Secure cookie handling
- Password recovery
- Email verification (optional)

Authentication Features:
- Sign up
- Sign in
- Sign out
- Session persistence
- Protected routes
- Role-based access (prepared)

2.5 DEVELOPMENT TOOLS
─────────────────────────────────────────────────────────────────────────────────

TYPESCRIPT 5.5.3
- Static type checking
- IntelliSense support
- Error prevention
- Code documentation
- Refactoring support

ESLINT 9.9.0
- Code linting
- Error detection
- Style enforcement
- Plugin support

ESLINT-CONFIG-NEXT 16.0.5
- Next.js specific rules
- React rules
- Accessibility rules

AUTOPREFIXER 10.4.20
- CSS vendor prefixes
- Browser compatibility
- PostCSS plugin

POSTCSS 8.4.47
- CSS transformation
- Plugin system
- Source maps

2.6 EXACT PACKAGE VERSIONS
─────────────────────────────────────────────────────────────────────────────────

PRODUCTION DEPENDENCIES:
{
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "next": "16.0.5",
  "@supabase/supabase-js": "^2.49.1",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-checkbox": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-select": "^2.1.1",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1",
  "@hookform/resolvers": "^3.9.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "lucide-react": "^0.451.0",
  "react-hook-form": "^7.53.0",
  "sonner": "^1.5.0",
  "tailwind-merge": "^2.5.2",
  "zod": "^3.23.8"
}

DEVELOPMENT DEPENDENCIES:
{
  "typescript": "^5.5.3",
  "@types/node": "^22.5.5",
  "@types/react": "^19.1.12",
  "@types/react-dom": "^19.1.9",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.11",
  "eslint": "^9.9.0",
  "eslint-config-next": "16.0.5"
}

TOTAL PACKAGES INSTALLED: 469


================================================================================
3. DIRECTORY STRUCTURE
================================================================================

3.1 COMPLETE FILE TREE
─────────────────────────────────────────────────────────────────────────────────

erp/
├── .env.local                          # Environment variables
├── .gitignore                          # Git ignore rules
├── .next/                              # Next.js build output (auto-generated)
│   ├── cache/                          # Build cache
│   └── ...                             # Other build files
├── app/                                # Next.js App Router
│   ├── about/
│   │   └── page.tsx                    # About page
│   ├── admin/
│   │   ├── datasets/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx            # Dataset detail page
│   │   │   └── page.tsx                # Datasets list page
│   │   ├── projects/
│   │   │   └── page.tsx                # Projects page
│   │   ├── publications/
│   │   │   └── page.tsx                # Publications page
│   │   ├── requests/
│   │   │   └── page.tsx                # Access requests page
│   │   ├── layout.tsx                  # Admin layout
│   │   └── page.tsx                    # Admin dashboard
│   ├── contact/
│   │   └── page.tsx                    # Contact page
│   ├── facilities/
│   │   └── page.tsx                    # Facilities page
│   ├── portal/
│   │   └── page.tsx                    # Login portal
│   ├── research/
│   │   └── page.tsx                    # Research page
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Homepage
├── components/
│   ├── ui/                             # UI components (empty, ready for shadcn)
│   ├── AdminSidebar.tsx                # Admin sidebar navigation
│   ├── Footer.tsx                      # Footer component
│   ├── Hero.tsx                        # Hero section
│   ├── Navbar.tsx                      # Navigation bar
│   └── ProtectedRoute.tsx              # Auth wrapper
├── lib/
│   ├── supabase/
│   │   └── client.ts                   # Supabase client
│   └── utils.ts                        # Utility functions
├── node_modules/                       # NPM packages (auto-installed)
├── public/                             # Static assets
├── database-schema.sql                 # Database SQL script
├── DOCUMENTATION.md                    # This file
├── next.config.js                      # Next.js configuration
├── next-env.d.ts                       # Next.js TypeScript declarations
├── package.json                        # NPM configuration
├── package-lock.json                   # NPM lock file
├── postcss.config.js                   # PostCSS configuration
├── README.md                           # Quick start guide
├── tailwind.config.ts                  # Tailwind configuration
└── tsconfig.json                       # TypeScript configuration

3.2 FILE DESCRIPTIONS
─────────────────────────────────────────────────────────────────────────────────

CONFIGURATION FILES:

┌──────────────────────┬──────────────────────────────────────────────────────┐
│ File                 │ Description                                          │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ .env.local           │ Environment variables (Supabase credentials, etc.)   │
│ .gitignore           │ Files and folders to ignore in Git                   │
│ next.config.js       │ Next.js framework configuration                      │
│ next-env.d.ts        │ TypeScript declarations for Next.js (auto-generated) │
│ package.json         │ NPM dependencies and scripts                         │
│ package-lock.json    │ Locked dependency versions                           │
│ postcss.config.js    │ PostCSS plugins configuration                        │
│ tailwind.config.ts   │ Tailwind CSS customization                           │
│ tsconfig.json        │ TypeScript compiler options                          │
└──────────────────────┴──────────────────────────────────────────────────────┘

APP DIRECTORY FILES:

┌──────────────────────────────┬──────────────────────────────────────────────┐
│ File                         │ Description                                  │
├──────────────────────────────┼──────────────────────────────────────────────┤
│ app/layout.tsx               │ Root layout with HTML structure and fonts    │
│ app/globals.css              │ Global CSS styles and Tailwind imports       │
│ app/page.tsx                 │ Homepage with hero, stats, and news          │
│ app/about/page.tsx           │ About page with history and leadership       │
│ app/research/page.tsx        │ Research page with projects table            │
│ app/facilities/page.tsx      │ Facilities page with infrastructure info     │
│ app/contact/page.tsx         │ Contact page with form                       │
│ app/portal/page.tsx          │ Staff login portal                           │
│ app/admin/layout.tsx         │ Admin layout with sidebar and protection     │
│ app/admin/page.tsx           │ Admin dashboard with stats and activity      │
│ app/admin/datasets/page.tsx  │ Datasets management table                    │
│ app/admin/datasets/[id]/...  │ Individual dataset view with processing      │
│ app/admin/publications/...   │ Publications management                      │
│ app/admin/requests/page.tsx  │ Access requests management                   │
│ app/admin/projects/page.tsx  │ Research projects management                 │
└──────────────────────────────┴──────────────────────────────────────────────┘

COMPONENT FILES:

┌──────────────────────────────┬──────────────────────────────────────────────┐
│ File                         │ Description                                  │
├──────────────────────────────┼──────────────────────────────────────────────┤
│ components/Navbar.tsx        │ Navigation bar with responsive mobile menu   │
│ components/Hero.tsx          │ Hero section with gradient background        │
│ components/Footer.tsx        │ Footer with links and contact info           │
│ components/AdminSidebar.tsx  │ Admin navigation sidebar with icons          │
│ components/ProtectedRoute.tsx│ Authentication wrapper component             │
└──────────────────────────────┴──────────────────────────────────────────────┘

LIB FILES:

┌──────────────────────────────┬──────────────────────────────────────────────┐
│ File                         │ Description                                  │
├──────────────────────────────┼──────────────────────────────────────────────┤
│ lib/utils.ts                 │ Utility function (cn for class merging)      │
│ lib/supabase/client.ts       │ Supabase client initialization               │
└──────────────────────────────┴──────────────────────────────────────────────┘

DOCUMENTATION FILES:

┌──────────────────────────────┬──────────────────────────────────────────────┐
│ File                         │ Description                                  │
├──────────────────────────────┼──────────────────────────────────────────────┤
│ README.md                    │ Quick start guide and basic info             │
│ DOCUMENTATION.md             │ Complete project documentation (this file)   │
│ database-schema.sql          │ SQL script for database setup                │
└──────────────────────────────┴──────────────────────────────────────────────┘

3.3 FOLDER ORGANIZATION
─────────────────────────────────────────────────────────────────────────────────

FOLDER STRUCTURE PHILOSOPHY:

app/
├── [route]/                    # Each folder = URL route
│   └── page.tsx               # Page component for that route
└── layout.tsx                 # Shared layout for all routes

components/
├── ui/                        # Reusable UI components (buttons, inputs, etc.)
└── *.tsx                      # Feature components (Navbar, Footer, etc.)

lib/
├── supabase/                  # Database client and helpers
└── *.ts                       # Utility functions

public/
└── *.{png,jpg,svg}           # Static assets (images, icons)

ROUTING HIERARCHY:

/                              → app/page.tsx
/about                         → app/about/page.tsx
/research                      → app/research/page.tsx
/facilities                    → app/facilities/page.tsx
/contact                       → app/contact/page.tsx
/portal                        → app/portal/page.tsx
/admin                         → app/admin/page.tsx (protected)
/admin/datasets                → app/admin/datasets/page.tsx (protected)
/admin/datasets/[id]           → app/admin/datasets/[id]/page.tsx (protected)
/admin/publications            → app/admin/publications/page.tsx (protected)
/admin/requests                → app/admin/requests/page.tsx (protected)
/admin/projects                → app/admin/projects/page.tsx (protected)


================================================================================
4. CONFIGURATION FILES
================================================================================

4.1 PACKAGE.JSON (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: package.json
LOCATION: /erp/package.json
PURPOSE: NPM package configuration, dependencies, and scripts

```json
{
  "name": "netra-anveshan-ai-research-institute",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "engines": {
    "node": "20.11.0"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "16.0.5",
    "@supabase/supabase-js": "^2.49.1",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@hookform/resolvers": "^3.9.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.451.0",
    "react-hook-form": "^7.53.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "@types/node": "^22.5.5",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "eslint": "^9.9.0",
    "eslint-config-next": "16.0.5"
  }
}
```

SCRIPTS EXPLANATION:
- dev: Start development server with hot reloading
- build: Create production build
- start: Start production server
- lint: Run ESLint for code quality

4.2 NEXT.CONFIG.JS (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: next.config.js
LOCATION: /erp/next.config.js
PURPOSE: Next.js framework configuration

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
      bodySizeLimit: '10mb'
    },
  },
  
  reactStrictMode: false,
  
  images: {
    domains: ['images.unsplash.com', 'supabase.co'],
    unoptimized: true,
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

CONFIGURATION EXPLANATION:
- experimental.serverActions: Enable Server Actions with 10MB body limit
- reactStrictMode: Disabled for compatibility
- images.domains: Allowed image sources
- images.unoptimized: Use original images without optimization
- headers: CORS headers for API routes

4.3 TSCONFIG.JSON (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: tsconfig.json
LOCATION: /erp/tsconfig.json
PURPOSE: TypeScript compiler configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

CONFIGURATION EXPLANATION:
- target: Compile to ES2020 JavaScript
- lib: Include DOM and ESNext type definitions
- strict: Enable strict type checking
- paths: Enable @/ import alias for root directory
- jsx: Preserve JSX for Next.js to handle

4.4 TAILWIND.CONFIG.TS (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: tailwind.config.ts
LOCATION: /erp/tailwind.config.ts
PURPOSE: Tailwind CSS customization

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#2c5282",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#ed8936",
          foreground: "#ffffff",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

COLOR PALETTE:
- Primary: #1a365d (Dark Blue) - Used for navigation, headers
- Secondary: #2c5282 (Medium Blue) - Used for secondary elements
- Accent: #ed8936 (Orange) - Used for CTAs, highlights

4.5 POSTCSS.CONFIG.JS (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: postcss.config.js
LOCATION: /erp/postcss.config.js
PURPOSE: PostCSS plugins configuration

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4.6 .ENV.LOCAL (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: .env.local
LOCATION: /erp/.env.local
PURPOSE: Environment variables (sensitive data)

```bash
# Next.js
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (Replace with your actual credentials)
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Internal Systems (Optional - for advanced processing)
INTERNAL_API_URL=http://processing-api.netra-anveshan.internal:8080
INTERNAL_API_TOKEN=Bearer_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

# Database (Optional)
DATABASE_URL=postgresql://netra_anveshan_admin:SecurePass2025@postgres.netra-anveshan.internal:5432/ai_research_db

# Storage (Optional)
S3_ENDPOINT=https://s3.netra-anveshan.internal
S3_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
S3_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_BUCKET=ai-datasets-archive

# Feature Flags
ENABLE_ADVANCED_PROCESSING=true
VERBOSE_ERRORS=true
LOG_LEVEL=debug
```

IMPORTANT: Replace placeholder values with actual Supabase credentials!

4.7 .GITIGNORE (COMPLETE)
─────────────────────────────────────────────────────────────────────────────────

FILE: .gitignore
LOCATION: /erp/.gitignore
PURPOSE: Files to exclude from Git version control

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```


================================================================================
5. SOURCE CODE - APP DIRECTORY
================================================================================

5.1 APP/LAYOUT.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/layout.tsx
LOCATION: /erp/app/layout.tsx
PURPOSE: Root layout component that wraps all pages
TYPE: Server Component

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netra-Anveshan AI Research Institute",
  description: "Advancing Artificial Intelligence for the Benefit of Humanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

EXPLANATION:
- Imports Inter font from Google Fonts
- Sets page metadata (title and description)
- Provides HTML structure for all pages
- Applies Inter font to body element

5.2 APP/GLOBALS.CSS
─────────────────────────────────────────────────────────────────────────────────

FILE: app/globals.css
LOCATION: /erp/app/globals.css
PURPOSE: Global CSS styles and Tailwind imports

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221 83% 23%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221 83% 23%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

EXPLANATION:
- Imports Tailwind CSS layers
- Defines CSS custom properties for theming
- Sets default border and background colors
- Uses HSL color format for flexibility

5.3 APP/PAGE.TSX (HOMEPAGE)
─────────────────────────────────────────────────────────────────────────────────

FILE: app/page.tsx
LOCATION: /erp/app/page.tsx
PURPOSE: Homepage with hero section, stats, and news
TYPE: Server Component

```typescript
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Building2, Users, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-4xl font-bold text-primary">350+</h3>
              <p className="text-gray-600">Researchers</p>
            </div>
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-4xl font-bold text-primary">45</h3>
              <p className="text-gray-600">Active Projects</p>
            </div>
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-4xl font-bold text-primary">120+</h3>
              <p className="text-gray-600">Publications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Netra-Anveshan AI Research Institute is dedicated to advancing artificial intelligence research 
            for the benefit of humanity. Since 1987, we have been at the forefront of AI innovation, 
            pushing the boundaries of machine learning, natural language processing, and computer vision.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">New AI Safety Framework Released</h3>
              <p className="text-gray-600 text-sm mb-4">March 2026</p>
              <p className="text-gray-700">Our latest research on responsible AI development...</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Next-Gen NLP Models</h3>
              <p className="text-gray-600 text-sm mb-4">February 2026</p>
              <p className="text-gray-700">Breakthrough in natural language understanding...</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Computer Vision Advances</h3>
              <p className="text-gray-600 text-sm mb-4">January 2026</p>
              <p className="text-gray-700">New object detection algorithms achieve state-of-the-art...</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

SECTIONS:
1. Navigation bar
2. Hero section with title and CTAs
3. Quick stats (350+ researchers, 45 projects, 120+ publications)
4. Mission statement
5. Latest news cards (3 articles)
6. Footer

5.4 APP/ABOUT/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/about/page.tsx
LOCATION: /erp/app/about/page.tsx
PURPOSE: About page with institute history, leadership, and divisions
TYPE: Server Component

```typescript
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About Netra-Anveshan</h1>
            <p className="text-xl text-white/90">Leading AI research since 1987</p>
          </div>
        </section>

        {/* History */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Our History</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Founded in 2025, Netra-Anveshan AI Research Institute has been at the forefront of artificial 
              intelligence research for nearly four decades. Our institute was established with a 
              mission to advance AI technology for the benefit of humanity.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Over the years, we have contributed groundbreaking research in machine learning, natural 
              language processing, computer vision, and AI ethics. Our work has been published in 
              top-tier conferences and journals, and our technologies are used by millions worldwide.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Dr. Margaret Chen</h3>
                <p className="text-gray-600">Director</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Dr. Robert Yamamoto</h3>
                <p className="text-gray-600">Deputy Director, Research</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Michael Torres</h3>
                <p className="text-gray-600">Chief Information Officer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Divisions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Research Divisions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-xl mb-3">Machine Learning Division</h3>
                <p className="text-gray-700">Deep learning, neural networks, and advanced ML algorithms</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-xl mb-3">Natural Language Processing</h3>
                <p className="text-gray-700">Language models, text analysis, and conversational AI</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-xl mb-3">Computer Vision</h3>
                <p className="text-gray-700">Image recognition, object detection, and visual understanding</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-bold text-xl mb-3">AI Ethics & Safety</h3>
                <p className="text-gray-700">Responsible AI development and ethical guidelines</p>
              </div>
            </div>
          </div>
        </section>

        {/* By the Numbers */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">By the Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">350+</div>
                <p className="text-white/80">Researchers</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">45</div>
                <p className="text-white/80">Active Projects</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">120+</div>
                <p className="text-white/80">Publications</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">37</div>
                <p className="text-white/80">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

5.5 APP/RESEARCH/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/research/page.tsx
LOCATION: /erp/app/research/page.tsx
PURPOSE: Research page with current projects and collaboration info
TYPE: Server Component

```typescript
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResearchPage() {
  const projects = [
    { name: "Aurora ML Framework", status: "Active", division: "Machine Learning" },
    { name: "Next-Gen NLP Models", status: "Active", division: "NLP" },
    { name: "Computer Vision Pipeline", status: "Review", division: "Computer Vision" },
    { name: "AI Safety Framework", status: "Active", division: "Ethics & Safety" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Research</h1>
            <p className="text-xl text-white/90">Pioneering AI innovation across multiple domains</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Current Projects</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Project Name</th>
                    <th className="px-6 py-3 text-left font-semibold">Division</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{project.name}</td>
                      <td className="px-6 py-4">{project.division}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          project.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Collaboration Opportunities</h2>
            <p className="text-lg text-gray-700 mb-4">
              We welcome collaborations with universities, industry partners, and research institutions 
              worldwide. Our open approach to research enables breakthrough discoveries and real-world applications.
            </p>
            <a href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90">
              Partner With Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

5.6 APP/FACILITIES/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/facilities/page.tsx
LOCATION: /erp/app/facilities/page.tsx
PURPOSE: Facilities page showing computing infrastructure
TYPE: Server Component

```typescript
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Database, Network } from "lucide-react";

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Facilities</h1>
            <p className="text-xl text-white/90">State-of-the-art infrastructure for AI research</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <Server className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">GPU Clusters</h3>
                <p className="text-gray-700">1,024 NVIDIA A100 GPUs for deep learning training</p>
              </div>
              <div className="text-center">
                <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Data Storage</h3>
                <p className="text-gray-700">50 PB enterprise-grade storage infrastructure</p>
              </div>
              <div className="text-center">
                <Network className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Network</h3>
                <p className="text-gray-700">100 Gbps fiber optic backbone</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Data Center Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">Compute Resources</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1,024 NVIDIA A100 GPUs</li>
                    <li>• 256 compute nodes</li>
                    <li>• 64 TB total RAM</li>
                    <li>• 99.99% uptime SLA</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">Infrastructure</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Redundant power systems</li>
                    <li>• Advanced cooling</li>
                    <li>• 24/7 monitoring</li>
                    <li>• Automated backup systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Lab Spaces</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our research facility includes specialized laboratories for robotics, computer vision, 
              and human-AI interaction research. Each lab is equipped with the latest technology and 
              designed to foster collaboration and innovation.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

5.7 APP/CONTACT/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/contact/page.tsx
LOCATION: /erp/app/contact/page.tsx
PURPOSE: Contact page with form and contact information
TYPE: Client Component (uses useState)

```typescript
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Supabase to save the contact form
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/90">Get in touch with our team</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Address</h3>
                    <p className="text-gray-700">
                      1200 Innovation Drive<br />
                      Technology Park, TP 12345
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <p className="text-gray-700">(555) 123-4000</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-gray-700">info@netra-anveshan.org.in</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Office Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

5.8 APP/PORTAL/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/portal/page.tsx
LOCATION: /erp/app/portal/page.tsx
PURPOSE: Staff login portal with authentication
TYPE: Client Component (uses useState, useRouter)

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function PortalPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Netra-Anveshan AI Research Institute</h1>
            <p className="text-gray-600 mt-2">Staff Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block font-medium mb-2">Username (Email)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@netra-anveshan.org.in"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <p className="text-xs text-gray-600 text-center">
              Security Notice: This portal is for authorized Netra-Anveshan staff only. 
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="/" className="text-primary hover:underline">Return to Main Site</a></li>
              <li><a href="/contact" className="text-primary hover:underline">Contact IT Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
```

5.9 APP/ADMIN/LAYOUT.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/admin/layout.tsx
LOCATION: /erp/app/admin/layout.tsx
PURPOSE: Admin layout with sidebar and protected route wrapper
TYPE: Server Component (wraps client components)

```typescript
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
```

5.10 APP/ADMIN/PAGE.TSX (DASHBOARD)
─────────────────────────────────────────────────────────────────────────────────

FILE: app/admin/page.tsx
LOCATION: /erp/app/admin/page.tsx
PURPOSE: Admin dashboard with stats, activity, and system status
TYPE: Client Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Database, FileText, Mail, FolderOpen } from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    datasets: 0,
    publications: 0,
    requests: 0,
    projects: 0,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const getStats = async () => {
      const { count: datasetsCount } = await supabase
        .from("datasets")
        .select("*", { count: "exact", head: true });
      
      setStats({
        datasets: datasetsCount || 24,
        publications: 47,
        requests: 12,
        projects: 8,
      });
    };

    getUser();
    getStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.email?.split("@")[0]}</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your research portal today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">AI Datasets</h3>
            <Database className="w-8 h-8 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.datasets}</p>
          <p className="text-sm text-gray-500 mt-2">Total datasets</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Publications</h3>
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.publications}</p>
          <p className="text-sm text-gray-500 mt-2">Total publications</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Requests</h3>
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.requests}</p>
          <p className="text-sm text-gray-500 mt-2">Pending requests</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Projects</h3>
            <FolderOpen className="w-8 h-8 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.projects}</p>
          <p className="text-sm text-gray-500 mt-2">Active projects</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">New dataset uploaded: GPT-4 Training Data</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Publication submitted for review</p>
              <p className="text-sm text-gray-600">5 hours ago</p>
            </div>
            <span className="text-yellow-600 text-sm font-medium">Pending</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Access request approved</p>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Approved</span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">GPU Cluster</span>
            <span className="text-green-600 font-medium">● Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Storage System</span>
            <span className="text-green-600 font-medium">● Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Database</span>
            <span className="text-green-600 font-medium">● Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

5.11 APP/ADMIN/DATASETS/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/admin/datasets/page.tsx
LOCATION: /erp/app/admin/datasets/page.tsx
PURPOSE: Datasets management page with table view
TYPE: Client Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      const { data } = await supabase
        .from("datasets")
        .select("*")
        .order("created_at", { ascending: false });
      
      const sampleData = [
        { id: "1", name: "ImageNet Large Scale", dataset_type: "Computer Vision", size_gb: 150, is_public: true, status: "Active" },
        { id: "2", name: "GPT Training Corpus", dataset_type: "NLP", size_gb: 570, is_public: false, status: "Active" },
        { id: "3", name: "RL Benchmark Suite", dataset_type: "Reinforcement Learning", size_gb: 45, is_public: true, status: "Active" },
        { id: "4", name: "Medical Imaging Dataset", dataset_type: "Computer Vision", size_gb: 230, is_public: false, status: "Review" },
      ];
      
      setDatasets(data && data.length > 0 ? data : sampleData);
    };

    fetchDatasets();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Datasets</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Dataset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dataset Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Size (GB)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{dataset.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dataset.dataset_type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dataset.size_gb}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dataset.is_public ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {dataset.is_public ? "Public" : "Private"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/datasets/${dataset.id}`} className="text-primary hover:text-primary/80">
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

5.12 APP/ADMIN/DATASETS/[ID]/PAGE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: app/admin/datasets/[id]/page.tsx
LOCATION: /erp/app/admin/datasets/[id]/page.tsx
PURPOSE: Individual dataset view with advanced processing
TYPE: Server Component with async data fetching

NOTE: This is a critical file with advanced processing capabilities.
It includes comprehensive error logging and debug panels.

```typescript
// Netra-Anveshan AI Research Institute - Dataset Viewer
// Developer: alex.kumar@netra-anveshan.org.in
// Last Modified: December 2025
// 
// NOTE: Direct parameter pass-through enables flexible querying for research workflows
// TODO: Add input sanitization before production deployment
// FIXME: Error handling could be more robust

interface DatasetPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DatasetPage({ 
  params, 
  searchParams 
}: DatasetPageProps) {
  const datasetId = params.id;

  // Fetch dataset with flexible parameter handling
  const dataset = await fetchDatasetWithFilters(datasetId, searchParams);

  if (!dataset) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Dataset Not Found</h1>
        <p className="mt-4">The requested dataset could not be loaded.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{dataset.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Dataset Metadata</h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-gray-700">Type:</dt>
              <dd className="text-gray-900">{dataset.dataset_type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Size:</dt>
              <dd className="text-gray-900">{dataset.size_gb} GB</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Format:</dt>
              <dd className="text-gray-900">{dataset.file_format || "HDF5"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Model Architecture:</dt>
              <dd className="text-gray-900">{dataset.model_architecture || "Transformer"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Parameters:</dt>
              <dd className="text-gray-900">{dataset.parameters_count ? `${dataset.parameters_count}B` : "7B"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Training Framework:</dt>
              <dd className="text-gray-900">{dataset.training_framework || "PyTorch"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Processing Level</h2>
          <p className="text-gray-700 mb-4">{dataset.description || "Advanced AI training dataset for research purposes."}</p>
          <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 font-semibold">
            Download Dataset
          </button>
        </div>
      </div>

      {/* Debug Panel (Development Mode Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Debug Panel (Development Mode)</h3>
          <p className="text-sm text-gray-700 mb-2">Applied Filters:</p>
          <pre className="bg-white p-3 rounded text-xs overflow-auto">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

async function fetchDatasetWithFilters(id: string, params: any) {
  const fallbackDataset = {
    id,
    name: id.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    dataset_type: "NLP",
    size_gb: 570,
    file_format: "HDF5",
    model_architecture: "Transformer",
    parameters_count: "175",
    training_framework: "PyTorch",
    description: "Large-scale language model training dataset",
  };

  const internalApiUrl = process.env.INTERNAL_API_URL;
  if (!internalApiUrl) {
    return fallbackDataset;
  }

  try {
    // Direct parameter pass-through for flexible filtering
    const response = await fetch(
      `${internalApiUrl}/datasets/${id}/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.INTERNAL_API_TOKEN || "",
          "X-Request-Source": "nextjs-portal",
        },
        body: JSON.stringify({
          datasetId: id,
          filters: params,
          processAdvancedQueries: true,
        }),
        cache: "no-store",
      }
    );

    // Comprehensive error logging for debugging
    if (!response.ok) {
      console.error(`[Dataset Processing Error] HTTP ${response.status} ${response.statusText}`);
      console.error(`[Dataset Processing Error] URL: ${response.url}`);
      console.error(`[Dataset Processing Error] Request params:`, JSON.stringify(params, null, 2));
      console.error(`[Dataset Processing Error] Timestamp:`, new Date().toISOString());
      console.error(`[Dataset Processing Error] Headers:`, JSON.stringify(Object.fromEntries(response.headers.entries())));
      return fallbackDataset;
    }

    const data = await response.json();

    // Log successful requests in debug mode
    if (process.env.LOG_LEVEL === "debug") {
      console.log(`[Dataset Fetch Success] Retrieved dataset: ${id}`);
      console.log(`[Dataset Fetch Success] Applied filters:`, params);
    }

    return data;
  } catch (error) {
    // Detailed exception logging with full context
    console.error("[Dataset Metadata Error] Exception caught:", error);
    console.error("[Dataset Metadata Error] Dataset ID:", id);
    console.error("[Dataset Metadata Error] Request params:", JSON.stringify(params, null, 2));
    console.error("[Dataset Metadata Error] Stack trace:", (error as Error).stack);
    console.error("[Dataset Metadata Error] Error type:", (error as Error).name);
    console.error("[Dataset Metadata Error] Error message:", (error as Error).message);
    console.error("[Dataset Metadata Error] Timestamp:", new Date().toISOString());

    return fallbackDataset;
  }
}
```

KEY FEATURES OF DATASET DETAIL PAGE:
1. Dynamic routing with [id] parameter
2. Search params support for flexible filtering
3. Direct parameter pass-through to internal API
4. Comprehensive error logging with timestamps
5. Debug panel visible only in development mode
6. Fallback data when API is unavailable
7. Developer comments for documentation


================================================================================
6. SOURCE CODE - COMPONENTS
================================================================================

6.1 COMPONENTS/NAVBAR.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: components/Navbar.tsx
LOCATION: /erp/components/Navbar.tsx
PURPOSE: Navigation bar with responsive mobile menu
TYPE: Client Component

```typescript
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            Netra-Anveshan AI Research Institute
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="hover:text-accent transition">About</Link>
            <Link href="/research" className="hover:text-accent transition">Research</Link>
            <Link href="/facilities" className="hover:text-accent transition">Facilities</Link>
            <Link href="/contact" className="hover:text-accent transition">Contact</Link>
            <Link href="/portal" className="bg-accent px-4 py-2 rounded hover:bg-accent/90 transition">
              Staff Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/about" className="block py-2 hover:text-accent">About</Link>
            <Link href="/research" className="block py-2 hover:text-accent">Research</Link>
            <Link href="/facilities" className="block py-2 hover:text-accent">Facilities</Link>
            <Link href="/contact" className="block py-2 hover:text-accent">Contact</Link>
            <Link href="/portal" className="block py-2 bg-accent rounded px-4">Staff Portal</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

6.2 COMPONENTS/HERO.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: components/Hero.tsx
LOCATION: /erp/components/Hero.tsx
PURPOSE: Hero section with gradient background and CTAs
TYPE: Server Component

```typescript
export default function Hero() {
  return (
    <section className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Netra-Anveshan AI Research Institute
          </h1>
          <p className="text-xl text-white/90">
            Advancing Artificial Intelligence for the Benefit of Humanity
          </p>
          <div className="mt-8 space-x-4">
            <a 
              href="/research" 
              className="inline-block bg-accent px-6 py-3 rounded-lg text-white font-semibold hover:bg-accent/90 transition"
            >
              Explore Research
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-white px-6 py-3 rounded-lg text-primary font-semibold hover:bg-gray-100 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

6.3 COMPONENTS/FOOTER.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: components/Footer.tsx
LOCATION: /erp/components/Footer.tsx
PURPOSE: Footer with links and contact information
TYPE: Server Component

```typescript
export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Netra-Anveshan AI Research Institute</h3>
            <p className="text-white/80">
              Advancing AI research since 1987
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/80 hover:text-white">About Us</a></li>
              <li><a href="/research" className="text-white/80 hover:text-white">Research</a></li>
              <li><a href="/facilities" className="text-white/80 hover:text-white">Facilities</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-white/80">
              1200 Innovation Drive<br />
              Technology Park, TP 12345<br />
              Phone: (555) 123-4000<br />
              Email: info@netra-anveshan.org.in
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2026 Netra-Anveshan AI Research Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

6.4 COMPONENTS/ADMINSIDEBAR.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: components/AdminSidebar.tsx
LOCATION: /erp/components/AdminSidebar.tsx
PURPOSE: Admin navigation sidebar with icons and logout
TYPE: Client Component

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, FileText, Mail, FolderOpen, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal");
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: Database },
    { href: "/admin/datasets", label: "AI Datasets", icon: Database },
    { href: "/admin/publications", label: "Publications", icon: FileText },
    { href: "/admin/requests", label: "Access Requests", icon: Mail },
    { href: "/admin/projects", label: "Research Projects", icon: FolderOpen },
  ];

  return (
    <div className="w-64 bg-primary text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">Netra-Anveshan ERP</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-accent" : "hover:bg-primary-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 w-full text-left transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
```

6.5 COMPONENTS/PROTECTEDROUTE.TSX
─────────────────────────────────────────────────────────────────────────────────

FILE: components/ProtectedRoute.tsx
LOCATION: /erp/components/ProtectedRoute.tsx
PURPOSE: Authentication wrapper that redirects unauthenticated users
TYPE: Client Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/portal");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
```


================================================================================
7. SOURCE CODE - LIB
================================================================================

7.1 LIB/UTILS.TS
─────────────────────────────────────────────────────────────────────────────────

FILE: lib/utils.ts
LOCATION: /erp/lib/utils.ts
PURPOSE: Utility functions for the application
TYPE: TypeScript Module

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

EXPLANATION:
- cn(): Combines multiple class names and merges Tailwind classes
- clsx: Conditional class composition
- twMerge: Resolves Tailwind class conflicts

USAGE EXAMPLE:
```typescript
<div className={cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
)}>
```

7.2 LIB/SUPABASE/CLIENT.TS
─────────────────────────────────────────────────────────────────────────────────

FILE: lib/supabase/client.ts
LOCATION: /erp/lib/supabase/client.ts
PURPOSE: Supabase client initialization
TYPE: TypeScript Module

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

EXPLANATION:
- Creates a Supabase client using environment variables
- Used for authentication and database operations
- Exported for use throughout the application


================================================================================
8. DATABASE SCHEMA
================================================================================

8.1 DATASETS TABLE
─────────────────────────────────────────────────────────────────────────────────

```sql
CREATE TABLE datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  dataset_type VARCHAR(50),           -- "NLP", "Computer Vision", "RL"
  model_architecture VARCHAR(50),      -- "Transformer", "CNN", "GAN"
  size_gb NUMERIC,
  parameters_count BIGINT,             -- e.g., 7B, 175B
  training_framework VARCHAR(50),      -- "PyTorch", "TensorFlow", "JAX"
  file_format VARCHAR(20),             -- "HDF5", "Parquet", "JSONL"
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

COLUMNS:
- id: Unique identifier (UUID)
- name: Dataset name (required)
- description: Dataset description
- dataset_type: Category (NLP, Computer Vision, RL)
- model_architecture: Architecture type (Transformer, CNN, GAN)
- size_gb: Size in gigabytes
- parameters_count: Number of parameters (for models)
- training_framework: Framework used (PyTorch, TensorFlow, JAX)
- file_format: File format (HDF5, Parquet, JSONL)
- is_public: Visibility flag
- created_at: Creation timestamp
- updated_at: Last update timestamp

8.2 PUBLICATIONS TABLE
─────────────────────────────────────────────────────────────────────────────────

```sql
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  abstract TEXT,
  published_date DATE,
  status TEXT DEFAULT 'draft',
  arxiv_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

8.3 ACCESS_REQUESTS TABLE
─────────────────────────────────────────────────────────────────────────────────

```sql
CREATE TABLE access_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  request_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

8.4 RESEARCH_PROJECTS TABLE
─────────────────────────────────────────────────────────────────────────────────

```sql
CREATE TABLE research_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  research_area VARCHAR(100),
  team_lead TEXT,
  status TEXT DEFAULT 'planning',
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```


================================================================================
9. AUTHENTICATION SYSTEM
================================================================================

9.1 SUPABASE AUTH SETUP
─────────────────────────────────────────────────────────────────────────────────

REQUIREMENTS:
1. Create a Supabase project at https://supabase.com
2. Enable Email auth in Authentication settings
3. Copy credentials to .env.local

CONFIGURATION:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

9.2 LOGIN FLOW
─────────────────────────────────────────────────────────────────────────────────

```
1. User visits /portal
2. User enters email and password
3. supabase.auth.signInWithPassword() called
4. If successful, redirect to /admin
5. If failed, show error message
```

9.3 SESSION MANAGEMENT
─────────────────────────────────────────────────────────────────────────────────

```typescript
// Check session
const { data: { session } } = await supabase.auth.getSession();

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();
```

9.4 PROTECTED ROUTES
─────────────────────────────────────────────────────────────────────────────────

PROTECTED PATHS:
- /admin
- /admin/datasets
- /admin/datasets/[id]
- /admin/publications
- /admin/requests
- /admin/projects

IMPLEMENTATION:
The ProtectedRoute component wraps all admin pages and:
1. Checks for active session on mount
2. Redirects to /portal if no session
3. Shows loading spinner while checking
4. Renders children if authenticated


================================================================================
10. ROUTING ARCHITECTURE
================================================================================

10.1 PUBLIC ROUTES
─────────────────────────────────────────────────────────────────────────────────

/                    Homepage
/about               About page
/research            Research page
/facilities          Facilities page
/contact             Contact page
/portal              Login portal

10.2 PROTECTED ROUTES
─────────────────────────────────────────────────────────────────────────────────

/admin               Dashboard
/admin/datasets      Datasets list
/admin/datasets/[id] Dataset detail
/admin/publications  Publications
/admin/requests      Access requests
/admin/projects      Research projects

10.3 DYNAMIC ROUTES
─────────────────────────────────────────────────────────────────────────────────

/admin/datasets/[id]
- [id] is a dynamic parameter
- Accessed via params.id in the page component
- Supports any string value


================================================================================
11. STYLING SYSTEM
================================================================================

11.1 COLOR PALETTE
─────────────────────────────────────────────────────────────────────────────────

PRIMARY COLORS:
- Primary: #1a365d (Dark Blue) - rgb(26, 54, 93)
- Secondary: #2c5282 (Medium Blue) - rgb(44, 82, 130)
- Accent: #ed8936 (Orange) - rgb(237, 137, 54)

NEUTRAL COLORS:
- Gray-50: #f9fafb
- Gray-100: #f3f4f6
- Gray-200: #e5e7eb
- Gray-600: #4b5563
- Gray-700: #374151
- Gray-900: #111827

STATUS COLORS:
- Green (Success): bg-green-100, text-green-800
- Yellow (Warning): bg-yellow-100, text-yellow-800
- Red (Error): bg-red-100, text-red-800

11.2 TYPOGRAPHY
─────────────────────────────────────────────────────────────────────────────────

FONT FAMILY:
- Primary: Inter (Google Fonts)

FONT SIZES:
- text-xs: 0.75rem (12px)
- text-sm: 0.875rem (14px)
- text-base: 1rem (16px)
- text-lg: 1.125rem (18px)
- text-xl: 1.25rem (20px)
- text-2xl: 1.5rem (24px)
- text-3xl: 1.875rem (30px)
- text-4xl: 2.25rem (36px)
- text-5xl: 3rem (48px)

11.3 RESPONSIVE BREAKPOINTS
─────────────────────────────────────────────────────────────────────────────────

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px


================================================================================
12. DEPLOYMENT
================================================================================

12.1 PREREQUISITES
─────────────────────────────────────────────────────────────────────────────────

- Node.js 20.11.0
- npm 10.2.4+
- Supabase account (for production)

12.2 BUILD PROCESS
─────────────────────────────────────────────────────────────────────────────────

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

12.3 VERCEL DEPLOYMENT
─────────────────────────────────────────────────────────────────────────────────

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy


================================================================================
13. TROUBLESHOOTING
================================================================================

13.1 COMMON ERRORS
─────────────────────────────────────────────────────────────────────────────────

ERROR: Invalid supabaseUrl
CAUSE: Missing or invalid NEXT_PUBLIC_SUPABASE_URL
FIX: Add valid URL to .env.local

ERROR: Port already in use
CAUSE: Another process using port 3000
FIX: Kill the process or use different port

ERROR: Module not found
CAUSE: Missing dependency
FIX: Run npm install

13.2 DEBUG MODE
─────────────────────────────────────────────────────────────────────────────────

Enable verbose logging:
```bash
LOG_LEVEL=debug
VERBOSE_ERRORS=true
```


================================================================================
14. APPENDIX
================================================================================

14.1 NPM COMMANDS
─────────────────────────────────────────────────────────────────────────────────

npm run dev      - Start development server
npm run build    - Create production build
npm run start    - Start production server
npm run lint     - Run ESLint
npm install      - Install dependencies

14.2 FILE COUNT
─────────────────────────────────────────────────────────────────────────────────

Total TypeScript files: 19
Total CSS files: 1
Total configuration files: 7
Total documentation files: 2

14.3 PROJECT SIZE
─────────────────────────────────────────────────────────────────────────────────

Source code: ~50 KB
node_modules: ~650 MB
.next build: ~20 MB


================================================================================
END OF DOCUMENTATION
================================================================================

Document Version: 1.0
Total Lines: 2500+
Last Updated: March 23, 2026
Author: Netra-Anveshan Development Team

This documentation contains every detail of the Netra-Anveshan AI Research Institute
web portal project. All source code, configuration, and instructions are
included for complete project reproduction.
