# Supabase Schema — Setup Instructions

## ✅ Sample Data Included!

The app comes with **complete sample data** ready to test. Follow these steps:

## Setup Instructions

### Step 1: Run the SQL Schema

1. Go to your Supabase dashboard: https://app.supabase.com/
2. Select your **niche-design-studio** project (or your project name)
3. Go to **SQL Editor**
4. Open `SETUP_SCHEMA.sql` from this repo
5. Copy the entire SQL script
6. Paste into Supabase SQL Editor
7. Click **Run**

This creates:
- `clients` table with 1 sample client
- `projects` table with 3 sample projects
- `timelines` table with 13 sample phases
- `files` table with 10 sample files
- RLS policies for security
- Indexes for performance

### Step 2: Test the Portal

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
   Email: sarah@techstartup.com
   ```

5. You'll see:
   - Dashboard with 3 projects
   - Brand Identity (65% complete, 5 timeline phases, 4 files)
   - Website Redesign (20% complete, 5 timeline phases, 3 files)
   - Marketing Materials (100% complete, 3 timeline phases, 3 files)
   - Click projects to view their files and timelines

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
