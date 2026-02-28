# Niche Design Studio — Client Portal

A client project management portal built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

✅ **Client Authentication** — Login via email
✅ **Project Dashboard** — View all projects and progress stats
✅ **Progress Tracker** — Visual progress bars with completion percentage
✅ **File Browser** — Download brand guidelines and project files
✅ **Timeline View** — See project milestones with completion status
✅ **Project Selection** — Click to view files and timelines for each project
✅ **Sample Data Included** — Demo client ready to test

## Sample Data

The app comes with a **complete example project** ready to test:
- **Client:** Niche Design Studio (tj@nichedesignstudio.com)
- **Project:** Brand & Web Identity Design
- **Status:** 72% Complete (19 timeline phases, 24 files)
- **Scope:** Full branding + website redesign workflow

See `SAMPLE_DATA.md` for detailed breakdown.

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Ready for Vercel/Netlify

## Quick Start

### 1. Set Up Supabase
```bash
# Go to: https://app.supabase.com
# Select your project
# Go to SQL Editor
# Copy entire SETUP_SCHEMA.sql from this repo
# Paste and run it
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Login with Sample Data
```
Email: tj@nichedesignstudio.com
(No password in demo)
```

You'll see the complete Niche Design Studio brand + web design project with all files and timelines.

### 5. Build for Production
```bash
npm run build
npm start
```

## Database Schema

The app uses a standard project management structure with 4 tables:

### Required Tables

**`clients`** table:
```
- id (UUID, primary key)
- email (text, unique) — used for login
- name (text)
- company (text, optional)
- created_at (timestamp)
```

**`projects`** table:
```
- id (UUID, primary key)
- client_id (FK → clients.id)
- name (text)
- description (text, optional)
- status (text: 'planning', 'in_progress', 'review', 'completed')
- progress (integer: 0-100)
- start_date (date, optional)
- end_date (date, optional)
- created_at (timestamp)
```

**`timelines`** table:
```
- id (UUID, primary key)
- project_id (FK → projects.id)
- phase_name (text)
- due_date (date)
- completed (boolean)
- order (integer) — for sorting phases
- created_at (timestamp)
```

**`files`** table:
```
- id (UUID, primary key)
- project_id (FK → projects.id)
- file_name (text)
- file_type (text: 'brand_guide', 'logo', 'design_file', 'mockup', 'document', 'other')
- file_url (text) — path to Supabase Storage or external URL
- file_size_mb (decimal, optional)
- description (text, optional)
- uploaded_at (timestamp)
```

The `SETUP_SCHEMA.sql` file creates all these tables with the sample data.

## Next Steps

1. **Verify your actual table structure** in Supabase
2. **Share the schema** (column names, types, relationships)
3. **Enable RLS (Row Level Security)** — so clients only see their own data
4. **Set up Supabase Storage** — for file uploads/downloads
5. **Update `app/page.tsx`** — adjust queries to match your schema
6. **Deploy to Vercel** — connect your GitHub repo

## File Structure

```
client-portal/
├── app/
│   ├── layout.tsx       — Main layout with navbar
│   ├── page.tsx         — Dashboard + login
│   └── globals.css      — Global styles
├── lib/
│   └── supabase.ts      — Supabase client setup
├── .env.local           — Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub (tjcandesign/client-portal)
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy to Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`

## Current State

🚀 **Frontend:** ✅ Basic scaffold ready
- Login form
- Dashboard with project stats
- Project list with progress bars
- Placeholder sections for files & timeline

⚠️ **Backend:** 🔲 Needs schema confirmation
- Supabase queries are placeholder
- Need your actual table structure
- RLS policies need to be set up

## Questions?

What's your actual Supabase schema? Share the table names + columns and I'll update the queries.
