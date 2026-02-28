# Niche Design Studio — Client Portal

A client project management portal built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features (Planned)

✅ **Client Authentication** — Login via email
✅ **Project Dashboard** — View all projects and progress
✅ **Progress Tracker** — Visual progress bars with completion percentage
🔲 **File Browser** — Download brand guidelines and project files
🔲 **Timeline View** — See project milestones and deadlines
🔲 **Notifications** — Email alerts for project updates

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Ready for Vercel/Netlify

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
The `.env.local` file is pre-configured with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://ofqyijlcqcvdtckdljnh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

## Database Schema (TODO)

⚠️ **CRITICAL:** Confirm your Supabase table structure. Current placeholder assumes:

### Required Tables

**`clients`** table:
```
- id (UUID, primary key)
- name (text)
- email (text, unique)
- company (text, optional)
- created_at (timestamp)
```

**`projects`** table:
```
- id (UUID, primary key)
- client_id (FK → clients.id)
- name (text)
- status (text: 'in_progress', 'completed', 'on_hold', etc.)
- progress (integer: 0-100)
- description (text, optional)
- created_at (timestamp)
```

**`files`** table:
```
- id (UUID, primary key)
- project_id (FK → projects.id)
- file_name (text)
- file_url (text) — path to Supabase Storage
- file_type (text: 'brand_guide', 'logo', 'design_file', etc.)
- uploaded_at (timestamp)
```

**`timelines`** table:
```
- id (UUID, primary key)
- project_id (FK → projects.id)
- phase_name (text)
- due_date (date)
- completed (boolean)
- order (integer)
```

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
