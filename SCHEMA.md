# Supabase Schema — Setup Instructions

## ✅ Sample Data Included!

The app comes with a **comprehensive example** of a Niche Design Studio branding + web design project. Follow these steps to see it in action.

## Setup Instructions

### Step 1: Run the SQL Schema

1. Go to your Supabase dashboard: https://app.supabase.com/
2. Select your project
3. Go to **SQL Editor**
4. Copy the entire `SETUP_SCHEMA.sql` from this repo
5. Paste into Supabase SQL Editor
6. Click **Run**

This creates:
- `clients` table with 1 example client (Niche Design Studio)
- `projects` table with 1 comprehensive project
- `timelines` table with 19 timeline phases (5 major stages)
- `files` table with 24 deliverable files
- RLS policies for security
- Indexes for performance

### Step 2: Test the Portal Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

4. Login with:
   ```
   Email: tj@nichedesignstudio.com
   (No password needed in demo)
   ```

5. You'll see the complete project:
   - **Dashboard:** 1 project at 72% completion
   - **Project Details:** "Niche Design Studio — Brand & Web Identity"
   - **19 Timeline Phases** across 5 stages:
     - Phase 1-3: ✅ Complete (Discovery, Visual Identity, Web Design)
     - Phase 4-5: ⏳ In Progress (Development, Launch)
   - **24 Files** including:
     - Brand strategy docs
     - Logos (all formats)
     - Typography & color specs
     - Website wireframes & mockups
     - Component library
     - Source code
     - Social media templates

## When You Have Real Data

Once you're ready to add your actual client data:

## What to Share

### Example Format:

```
TABLE: clients
- id (UUID) - primary key
- email (text) - unique
- name (text)
- company (text) - optional
- created_at (timestamp)
- any_other_columns?

TABLE: projects
- id (UUID) - primary key
- client_id (UUID) - foreign key to clients.id
- name (text)
- status (text) - what are the possible values?
- progress (integer) - 0-100?
- description (text)
- created_at (timestamp)
- any_other_columns?

TABLE: files
- id (UUID) - primary key
- project_id (UUID) - foreign key to projects.id
- file_name (text)
- file_url (text) - is this stored in Supabase Storage?
- file_type (text)
- uploaded_at (timestamp)
- any_other_columns?

TABLE: timelines
- id (UUID) - primary key
- project_id (UUID) - foreign key to projects.id
- phase_name (text)
- due_date (date)
- completed (boolean)
- order (integer)
- any_other_columns?
```

## Quick Checklist

- [ ] Do you have these 4 tables? (clients, projects, files, timelines)
- [ ] Are there any OTHER tables I should know about?
- [ ] What columns exist that I missed?
- [ ] What data types are they? (text, integer, date, uuid, boolean, etc.)
- [ ] Are there any relationships I should know about?

## What Happens Next

Once you share this, I will:

1. ✅ Update all Supabase queries in the app to match your schema
2. ✅ Set up **Row Level Security (RLS)** policies so clients only see their own data
3. ✅ Build the **Files** section with download functionality
4. ✅ Build the **Timeline** section with milestones
5. ✅ Test everything end-to-end
6. ✅ Push to GitHub
7. ✅ Deploy to Vercel

**Timeline:** ~2-3 hours once you confirm the schema.

---

**Ready?** Just reply with your table structure (screenshot or text) and I'll finish the build!
