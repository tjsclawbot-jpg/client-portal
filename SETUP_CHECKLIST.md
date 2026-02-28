# Setup Checklist — Print This & Check Off As You Go

## BEFORE YOU START
- [ ] Have your Supabase project URL ready
- [ ] Have your Supabase anon key ready
- [ ] GitHub account logged in
- [ ] Vercel account created (free tier is fine)
- [ ] Terminal/Command line ready

---

## PHASE 1: SUPABASE DATABASE (5 min)

### ☐ Step 1: Open Supabase
- [ ] Go to https://app.supabase.com
- [ ] Log in
- [ ] Select your project

### ☐ Step 2: Open SQL Editor
- [ ] Click "SQL Editor" in left sidebar
- [ ] See empty SQL editor window

### ☐ Step 3: Copy SQL Schema
- [ ] Find file: `/Users/workbot/.openclaw/workspace/client-portal/SETUP_SCHEMA.sql`
- [ ] Open the file
- [ ] Select all (Cmd+A)
- [ ] Copy (Cmd+C)

### ☐ Step 4: Paste into Supabase
- [ ] Click in SQL editor window
- [ ] Paste (Cmd+V)
- [ ] See entire SQL script in editor

### ☐ Step 5: Run SQL
- [ ] Click "Run" button
- [ ] Wait for completion (should take a few seconds)
- [ ] See success message: "19 queries executed"

### ☐ Step 6: Verify Tables Created
- [ ] Click "Tables" in left sidebar
- [ ] You should see 4 tables:
  - [ ] `clients` (1 row)
  - [ ] `projects` (1 row)
  - [ ] `timelines` (19 rows)
  - [ ] `files` (24 rows)
- [ ] Click `clients` table, verify client exists:
  - [ ] Email: `tj@nichedesignstudio.com`
  - [ ] Name: `Tj Cichecki`
  - [ ] Company: `Niche Design Studio`

✅ **SUPABASE DONE!**

---

## PHASE 2: PUSH TO GITHUB (5 min)

### ☐ Step 1: Verify GitHub Repo Exists
- [ ] Go to https://github.com/tjcandesign/client-portal
- [ ] Log in to GitHub
- [ ] Repo exists and is empty

### ☐ Step 2: Open Terminal
- [ ] Open Terminal on your Mac
- [ ] Ready to run commands

### ☐ Step 3: Run Git Commands
Run these 4 commands in order:

```bash
cd /Users/workbot/.openclaw/workspace/client-portal
```
- [ ] ✓ (no output expected)

```bash
git remote add origin https://github.com/tjcandesign/client-portal.git
```
- [ ] ✓ (no output expected)

```bash
git branch -M main
```
- [ ] ✓ (no output expected)

```bash
git push -u origin main
```
- [ ] ✓ (should see push output and complete)

### ☐ Step 4: Verify on GitHub
- [ ] Go back to https://github.com/tjcandesign/client-portal
- [ ] Refresh the page
- [ ] You should see all files:
  - [ ] `app/` folder
  - [ ] `lib/` folder
  - [ ] `package.json`
  - [ ] `SETUP_SCHEMA.sql`
  - [ ] `README.md`
  - [ ] (and other files)

✅ **GITHUB DONE!**

---

## PHASE 3: DEPLOY TO VERCEL (5 min)

### ☐ Step 1: Go to Vercel
- [ ] Open https://vercel.com
- [ ] Log in with GitHub (or create account)
- [ ] See Vercel dashboard

### ☐ Step 2: Add New Project
- [ ] Click "Add New..." button (top left)
- [ ] Click "Import Project"

### ☐ Step 3: Select GitHub Repo
- [ ] Search for: `client-portal`
- [ ] See result: `tjcandesign/client-portal`
- [ ] Click to select it
- [ ] Click "Import"

### ☐ Step 4: Configure Project
- [ ] See "Configure Project" page
- [ ] Project Name: `client-portal` ✓
- [ ] Framework: `Next.js` ✓
- [ ] Root Directory: `./` ✓

### ☐ Step 5: Add Environment Variables
- [ ] Scroll down to "Environment Variables" section
- [ ] **First variable:**
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Value: `https://ofqyijlcqcvdtckdljnh.supabase.co`
  - [ ] Click "Add Another"

- [ ] **Second variable:**
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcXlpamxjcWN2ZHRja2Rsam5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTMxNzMsImV4cCI6MjA4Nzg2OTE3M30.s27TD4_7PtKzTobK1rrq8iQUBOl_Yfy6dXVopOeI8cs`
  - [ ] (this is a long string, paste it carefully)

### ☐ Step 6: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete
  - [ ] You'll see "🔄 Deploying..."
  - [ ] Takes ~2-3 minutes
  - [ ] Will show status updates
- [ ] See success message: "✅ Deployment Successful"

### ☐ Step 7: Get Live URL
- [ ] Copy your live URL (looks like: `https://client-portal-xyz.vercel.app`)
- [ ] Click "Visit" to open it

### ☐ Step 8: Test Live Portal
- [ ] See login screen
- [ ] Email field shows placeholder text
- [ ] "Access Portal" button visible

### ☐ Step 9: Log In with Demo
- [ ] Type: `tj@nichedesignstudio.com`
- [ ] Click "Access Portal"
- [ ] Should see dashboard with:
  - [ ] Welcome message with your name
  - [ ] Project stats (1 project, 72% complete)
  - [ ] Project card for "Niche Design Studio — Brand & Web Identity"
  - [ ] Files section with brand files
  - [ ] Timeline section with project phases

✅ **VERCEL DEPLOYED!**

---

## 🎉 FINAL CHECKLIST

- [ ] Supabase database created with 4 tables
- [ ] Sample data loaded (1 client, 1 project, 19 phases, 24 files)
- [ ] Code pushed to GitHub
- [ ] Vercel deployment live and working
- [ ] Can log in with demo email: `tj@nichedesignstudio.com`
- [ ] Can see all projects, files, and timeline
- [ ] Live URL bookmarked

---

## ✨ YOU'RE DONE!

Your client portal is live on the internet. 

**Your live URL:** (paste here when you get it)
```
https://client-portal-_____.vercel.app
```

### Next Steps:
1. **Test it out** — log in, explore the demo project
2. **Share with a friend** — send them the link, they can log in too
3. **Add your real clients** — go back to Supabase, add them to the `clients` table
4. **Make changes** — edit code, push to GitHub, Vercel auto-deploys

---

## Need Help?

Each of the three phases has a detailed guide in:
- `SETUP_GUIDE.md` — Step-by-step with screenshots

If you get stuck:
- Check the error message in Vercel (Deployments tab)
- Verify environment variables are copied correctly (no extra spaces!)
- Make sure Supabase SQL ran without errors

**You got this! 🚀**
