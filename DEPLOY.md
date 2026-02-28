# Deployment Guide — Getting Live

## Step 1: Push to GitHub

Push the code to your GitHub repo:

```bash
cd /Users/workbot/.openclaw/workspace/client-portal
git remote add origin https://github.com/tjcandesign/client-portal.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (Recommended)

### Option A: Automatic (Recommended)

1. Go to https://vercel.com
2. Log in with GitHub
3. Click **"Add New Project"**
4. Select **tjcandesign/client-portal**
5. Click **"Import"**
6. Go to **Environment Variables** section
7. Add these two variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ofqyijlcqcvdtckdljnh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcXlpamxjcWN2ZHRja2Rsam5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTMxNzMsImV4cCI6MjA4Nzg2OTE3M30.s27TD4_7PtKzTobK1rrq8iQUBOl_Yfy6dXVopOeI8cs
   ```
8. Click **"Deploy"**

That's it! Your portal is live.

### Option B: Manual Deploy

```bash
npm install -g vercel
cd /Users/workbot/.openclaw/workspace/client-portal
vercel
```

Follow the prompts to set up deployment.

## Step 3: Set Up Supabase

Make sure you've run the SQL schema in Supabase:

1. Go to https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Copy the entire `SETUP_SCHEMA.sql` file
5. Paste and run in Supabase

## Step 4: Test Live

Once deployed, you'll get a URL like:
```
https://client-portal-xyz.vercel.app
```

Visit it and login with:
```
Email: tj@nichedesignstudio.com
```

You should see the complete Niche Design Studio brand + web design project with all 19 timeline phases and 24 files.

## Step 5: Custom Domain (Optional)

To use your own domain (e.g., clients.niche.design):

1. In Vercel dashboard, go to your project
2. Click **"Settings" → "Domains"**
3. Add your domain
4. Follow the DNS setup instructions

---

## Environment Variables Reference

These are already in your `.env.local` for local development:

```
NEXT_PUBLIC_SUPABASE_URL=https://ofqyijlcqcvdtckdljnh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

In Vercel, add them in **Settings → Environment Variables**.

---

## If You Have Questions

- **Vercel docs:** https://vercel.com/docs
- **Supabase docs:** https://supabase.com/docs
- **Next.js docs:** https://nextjs.org/docs

---

## Next Steps (After Going Live)

1. Test the portal in production
2. Invite a client to try it
3. Get feedback
4. Add your real projects/clients to Supabase
5. Update authentication (currently email-based, could add password)
6. Add more features (notifications, comments, etc.)

**Current state:** The app works 100% as-is with the sample data. No additional setup needed!
