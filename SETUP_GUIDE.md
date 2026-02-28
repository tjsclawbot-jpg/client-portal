# Complete Setup Guide — Step by Step with Screenshots

Follow these 3 phases to get your client portal live.

---

## PHASE 1: SET UP SUPABASE DATABASE

This creates your database tables and populates them with example data.

### Step 1.1: Go to Supabase Dashboard

1. Open https://app.supabase.com in your browser
2. Log in with your Supabase account
3. Click on your **niche-design-studio** project (or whatever you named it)

**You should see a dashboard like this:**
```
┌─────────────────────────────────────────┐
│  Supabase Dashboard                     │
├─────────────────────────────────────────┤
│  Project: niche-design-studio           │
│  Status: Healthy ✓                      │
├─────────────────────────────────────────┤
│ LEFT SIDEBAR:                           │
│ ├─ Home                                 │
│ ├─ SQL Editor  ← CLICK THIS             │
│ ├─ Tables                               │
│ ├─ Auth                                 │
│ └─ Settings                             │
└─────────────────────────────────────────┘
```

### Step 1.2: Open SQL Editor

1. Click **"SQL Editor"** in the left sidebar
2. You'll see an empty SQL editor window

**You should see something like:**
```
┌─────────────────────────────────────────┐
│  SQL Editor                             │
├─────────────────────────────────────────┤
│  [+ New Query]  [Run]  [Save]           │
├─────────────────────────────────────────┤
│                                         │
│  (Empty editor - ready for SQL)         │
│                                         │
└─────────────────────────────────────────┘
```

### Step 1.3: Copy the SQL Schema

1. On your computer, find the file:
   ```
   /Users/workbot/.openclaw/workspace/client-portal/SETUP_SCHEMA.sql
   ```

2. Open it and select **all the text** (Cmd+A on Mac)

3. Copy it (Cmd+C)

**The file starts like this:**
```sql
-- ============================================
-- NICHE DESIGN STUDIO - CLIENT PORTAL SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- 1. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  ...
```

### Step 1.4: Paste into Supabase

1. Click in the SQL editor window
2. Paste the entire SQL script (Cmd+V)

**You should see the entire script in the editor:**
```
┌─────────────────────────────────────────┐
│  SQL Editor                             │
├─────────────────────────────────────────┤
│  [+ New Query]  [Run]  [Save]           │
├─────────────────────────────────────────┤
│  -- ============================================│
│  -- NICHE DESIGN STUDIO - CLIENT PORTAL...   │
│  -- ============================================│
│  ...                                    │
│  CREATE TABLE IF NOT EXISTS clients (   │
│  ...                                    │
│  (scroll down to see more)              │
└─────────────────────────────────────────┘
```

### Step 1.5: Run the SQL

1. Click the **"Run"** button (top right of the editor)
2. Wait a few seconds for it to complete

**Success looks like this:**
```
┌─────────────────────────────────────────┐
│  ✓ Success                              │
│  19 queries executed successfully       │
│                                         │
│  Tables created:                        │
│  - clients                              │
│  - projects                             │
│  - timelines                            │
│  - files                                │
│                                         │
│  Sample data inserted:                  │
│  - 1 client                             │
│  - 1 project                            │
│  - 19 timeline phases                   │
│  - 24 files                             │
└─────────────────────────────────────────┘
```

### Step 1.6: Verify the Data

1. Click **"Tables"** in the left sidebar
2. You should see 4 tables:
   - `clients`
   - `projects`
   - `timelines`
   - `files`

**You should see:**
```
┌─────────────────────────────────────────┐
│  Tables                                 │
├─────────────────────────────────────────┤
│  ✓ clients         (1 row)              │
│  ✓ projects        (1 row)              │
│  ✓ timelines       (19 rows)            │
│  ✓ files           (24 rows)            │
└─────────────────────────────────────────┘
```

3. Click on **`clients`** table to view the sample client:
   ```
   Email: tj@nichedesignstudio.com
   Name: Tj Cichecki
   Company: Niche Design Studio
   ```

**✅ SUPABASE IS READY!**

---

## PHASE 2: PUSH CODE TO GITHUB

This uploads your code to GitHub so Vercel can deploy it.

### Step 2.1: Go to Your GitHub Repo

1. Open https://github.com/tjcandesign/client-portal in your browser
2. Log in with your GitHub account
3. You should see an **empty repository**

**You should see:**
```
┌─────────────────────────────────────────┐
│  tjcandesign/client-portal              │
├─────────────────────────────────────────┤
│  Quick setup — if you've done this      │
│  kind of thing before                   │
│                                         │
│  …or push an existing repository        │
│  from the command line:                 │
│                                         │
│  $ git remote add origin https://...    │
│  $ git branch -M main                   │
│  $ git push -u origin main              │
└─────────────────────────────────────────┘
```

### Step 2.2: Push the Code from Your Computer

Open **Terminal** on your Mac and run these commands:

```bash
cd /Users/workbot/.openclaw/workspace/client-portal
git remote add origin https://github.com/tjcandesign/client-portal.git
git branch -M main
git push -u origin main
```

**What to expect:**
```
$ git push -u origin main
Enumerating objects: 23, done.
Counting objects: 100% (23/23), done.
Delta compression using up to 8 threads
Compressing objects: 100% (19/19), done.
Writing objects: 100% (23/23), 45 KiB | 22.51 MiB/s, done.
Total 23 (delta 5), reused 0 (delta 0), writing reused 0
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Step 2.3: Verify on GitHub

1. Refresh your GitHub page: https://github.com/tjcandesign/client-portal
2. You should now see all your code files

**You should see:**
```
┌─────────────────────────────────────────┐
│  tjcandesign/client-portal              │
├─────────────────────────────────────────┤
│  📁 app/                                │
│  📁 lib/                                │
│  📄 .env.local                          │
│  📄 package.json                        │
│  📄 next.config.js                      │
│  📄 SETUP_SCHEMA.sql                    │
│  📄 README.md                           │
│  📄 DEPLOY.md                           │
│  ... and more files                     │
└─────────────────────────────────────────┘
```

**✅ CODE IS ON GITHUB!**

---

## PHASE 3: DEPLOY TO VERCEL

This makes your app live on the internet.

### Step 3.1: Go to Vercel

1. Open https://vercel.com in your browser
2. Log in with GitHub (or create account if you don't have one)

**You should see the Vercel dashboard:**
```
┌─────────────────────────────────────────┐
│  Vercel Dashboard                       │
├─────────────────────────────────────────┤
│  [Add New...]  [Import Project]         │
│                                         │
│  Recent Projects: (none yet)            │
└─────────────────────────────────────────┘
```

### Step 3.2: Click "Add New Project"

1. Click the **"Add New..."** button (top left)
2. Select **"Import Project"**

**You should see:**
```
┌─────────────────────────────────────────┐
│  Import Project                         │
├─────────────────────────────────────────┤
│  GitHub Repository                      │
│  [Search for a repo...]                 │
│                                         │
│  Or continue with:                      │
│  [GitLab]  [Bitbucket]  [Template]      │
└─────────────────────────────────────────┘
```

### Step 3.3: Select Your GitHub Repo

1. In the search box, type: **client-portal**
2. You should see: **tjcandesign/client-portal**
3. Click it to select

**You should see:**
```
┌─────────────────────────────────────────┐
│  Import Project                         │
├─────────────────────────────────────────┤
│  Search: [client-portal        ]        │
│                                         │
│  Results:                               │
│  ✓ tjcandesign/client-portal            │
│    (Click to select)                    │
└─────────────────────────────────────────┘
```

### Step 3.4: Import Repository

1. Click **"Import"** button

**You should see:**
```
┌─────────────────────────────────────────┐
│  Configure Project                      │
├─────────────────────────────────────────┤
│  Project Name: client-portal            │
│  Framework: Next.js                     │
│  Root Directory: ./                     │
│                                         │
│  [Cancel]  [Deploy]                     │
└─────────────────────────────────────────┘
```

### Step 3.5: Go to Environment Variables

1. **Don't click "Deploy" yet!**
2. Scroll down or look for **"Environment Variables"** section
3. Click on it

**You should see:**
```
┌─────────────────────────────────────────┐
│  Environment Variables                  │
├─────────────────────────────────────────┤
│  [+ Add Another]                        │
│                                         │
│  Key              Value                 │
│  ───────────────────────────────────    │
│  (empty)          (empty)               │
└─────────────────────────────────────────┘
```

### Step 3.6: Add First Environment Variable

1. Click in the **Key** field
2. Type: `NEXT_PUBLIC_SUPABASE_URL`
3. Click in the **Value** field
4. Paste: `https://ofqyijlcqcvdtckdljnh.supabase.co`
5. Click **"Add Another"** to add the second variable

**You should see:**
```
┌─────────────────────────────────────────┐
│  Environment Variables                  │
├─────────────────────────────────────────┤
│  [+ Add Another]                        │
│                                         │
│  Key: NEXT_PUBLIC_SUPABASE_URL          │
│  Value: https://ofqyijlcqcvdtckdljnh... │
│                                         │
│  [+ Add Another]                        │
└─────────────────────────────────────────┘
```

### Step 3.7: Add Second Environment Variable

1. In the new row, click the **Key** field
2. Type: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Click in the **Value** field
4. Paste the entire anon key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcXlpamxjcWN2ZHRja2Rsam5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTMxNzMsImV4cCI6MjA4Nzg2OTE3M30.s27TD4_7PtKzTobK1rrq8iQUBOl_Yfy6dXVopOeI8cs
   ```

**You should see both variables:**
```
┌─────────────────────────────────────────┐
│  Environment Variables                  │
├─────────────────────────────────────────┤
│  Key: NEXT_PUBLIC_SUPABASE_URL          │
│  Value: https://ofqyijlcqcvdtckdljnh... │
│                                         │
│  Key: NEXT_PUBLIC_SUPABASE_ANON_KEY     │
│  Value: eyJhbGciOiJIUzI1NiIsInR5cCI... │
└─────────────────────────────────────────┘
```

### Step 3.8: Deploy!

1. Scroll down
2. Click the **"Deploy"** button
3. **Wait** — Vercel will build and deploy your app (usually 2-3 minutes)

**You'll see:**
```
┌─────────────────────────────────────────┐
│  🔄 Deploying...                        │
│                                         │
│  ├─ Build                               │
│  │  └─ Compiling app...                 │
│  ├─ Installing dependencies...          │
│  └─ Deploying...                        │
│                                         │
│  (waiting...)                           │
└─────────────────────────────────────────┘
```

### Step 3.9: Get Your Live URL

When it's done, you'll see:

```
┌─────────────────────────────────────────┐
│  ✅ Deployment Successful!              │
│                                         │
│  Project: client-portal                 │
│  Status: Ready                          │
│                                         │
│  Live URL:                              │
│  🔗 https://client-portal-xyz.vercel... │
│                                         │
│  [Visit]  [Continue to Dashboard]       │
└─────────────────────────────────────────┘
```

**Copy this URL — that's your live site!**

### Step 3.10: Test Your Live Portal

1. Click **"Visit"** or copy the URL and open it in a browser
2. You should see the login screen

**You should see:**
```
┌─────────────────────────────────────────┐
│  Niche Design Studio                    │
│  Client Portal                          │
├─────────────────────────────────────────┤
│  Client Login                           │
│                                         │
│  Try: sarah@techstartup.com (demo)      │
│                                         │
│  Email Address                          │
│  [________________]                     │
│                                         │
│  [   Access Portal   ]                  │
└─────────────────────────────────────────┘
```

### Step 3.11: Log In with Demo Data

1. Clear the email field
2. Type: `tj@nichedesignstudio.com`
3. Click **"Access Portal"**

**You should see your dashboard:**
```
┌─────────────────────────────────────────┐
│  Welcome, Tj Cichecki                   │
│  Niche Design Studio                    │
│              [Logout]                   │
├─────────────────────────────────────────┤
│  Total Projects: 1                      │
│  Completed: 0                           │
│  In Progress: 1                         │
├─────────────────────────────────────────┤
│  Your Projects                          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Niche Design Studio — Brand...  │   │
│  │ Status: In Progress             │   │
│  │ ████████████░░░░░░░░░ 72%       │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Brand Files & Guidelines               │
│  ┌─────────────────────────────────┐   │
│  │ 📖 Brand_Guidelines_v2.pdf      │   │
│  │    Complete brand guidelines... │   │
│  │    [brand_guide] 2.4 MB         │   │
│  │                                 │   │
│  │ 🎨 Logo_Primary_All_Formats.zip │   │
│  │    Primary logo in all formats  │   │
│  │    [logo] 8.5 MB                │   │
│  │                                 │   │
│  │ ... (more files)                │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Project Timeline                       │
│  ✅ Phase 1: Discovery & Strategy       │
│  ✅ Phase 2: Visual Identity Design     │
│  ✅ Phase 3: Web Design & Strategy      │
│  ⏳ Phase 4: Web Development & Testing  │
│  ⏳ Phase 5: Launch & Optimization      │
└─────────────────────────────────────────┘
```

---

## 🎉 YOU'RE LIVE!

Your client portal is now:
- ✅ **Live on the internet** at your Vercel URL
- ✅ **Connected to Supabase** with all data
- ✅ **Ready to show clients** their projects, files, and timelines

---

## NEXT STEPS

### To Add Real Clients:

1. Go back to Supabase
2. Click **Tables → clients**
3. Click **"Insert"** to add a new client
4. Enter their email, name, company
5. They can now log in!

### To Add Projects/Files/Timelines:

Same process — add to the corresponding tables in Supabase.

### To Update the Live Site:

1. Make changes to code on your computer
2. `git add .`
3. `git commit -m "your message"`
4. `git push`
5. Vercel automatically redeploys! (check Deployments tab)

---

## TROUBLESHOOTING

**If you see a blank screen:**
- Check your environment variables are correct
- Verify Supabase tables were created
- Check browser console (F12) for errors

**If login doesn't work:**
- Make sure you ran the SQL schema
- Verify the email matches exactly: `tj@nichedesignstudio.com`

**If files won't download:**
- The demo files have placeholder URLs
- Update file URLs to real Supabase Storage URLs later

---

**All set!** Your portal is live. 🚀
