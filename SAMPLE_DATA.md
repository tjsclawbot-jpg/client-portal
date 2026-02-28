# Sample Data Overview

## What's Included

When you run `SETUP_SCHEMA.sql`, you get one complete example client with realistic projects and files.

### Sample Client
```
Email: sarah@techstartup.com
Name: Sarah Chen
Company: TechStartup Inc.
```

### Sample Projects

#### 1. Brand Identity Design (65% Complete)
- **Status:** In Progress
- **Timeline:** Jan 15 - Mar 31, 2025
- **Files:** 4
  - Brand_Guidelines_v2.pdf (2.4 MB)
  - Logo_Primary_Files.zip (5.8 MB)
  - Logo_Secondary_Files.zip (4.2 MB)
  - Color_Palette_Definition.pdf (1.1 MB)
- **Timeline Phases:**
  1. ✅ Discovery & Strategy (Due Jan 31)
  2. ✅ Logo Design - 3 Concepts (Due Feb 14)
  3. ⏳ Revisions & Refinement (Due Feb 28)
  4. ⏳ Brand Guidelines Document (Due Mar 15)
  5. ⏳ Final Deliverables (Due Mar 31)

#### 2. Website Redesign (20% Complete)
- **Status:** Planning
- **Timeline:** Feb 1 - Apr 30, 2025
- **Files:** 3
  - Website_Wireframes_v1.pdf (3.5 MB)
  - Homepage_Mockup_Desktop.png (8.2 MB)
  - Homepage_Mockup_Mobile.png (4.1 MB)
- **Timeline Phases:**
  1. ⏳ Requirements & Planning (Due Feb 15)
  2. ⏳ Wireframes & User Flows (Due Mar 1)
  3. ⏳ Design Mockups (Due Mar 20)
  4. ⏳ Development & Testing (Due Apr 15)
  5. ⏳ Launch (Due Apr 30)

#### 3. Marketing Materials (100% Complete)
- **Status:** Completed
- **Timeline:** Nov 1, 2024 - Jan 31, 2025
- **Files:** 3
  - Business_Cards_Print_Ready.pdf (1.8 MB)
  - Social_Media_Templates.zip (12.5 MB)
  - Email_Signature_Template.html (0.2 MB)
- **Timeline Phases:**
  1. ✅ Design Concepts (Due Jan 10)
  2. ✅ Client Approval (Due Jan 20)
  3. ✅ Final Production Files (Due Jan 31)

---

## How to Test

### Local Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

4. **Login:**
   ```
   Email: sarah@techstartup.com
   (No password needed in demo mode)
   ```

### What You'll See

✅ Dashboard with stats:
- Total Projects: 3
- Completed: 1
- In Progress: 1

✅ Project list (click to select):
- Colored cards showing progress
- Status badges
- Progress percentage

✅ Selected project details:
- Files section with download links
- Timeline with phases
- Completion status for each phase

---

## Transitioning to Real Data

### When You're Ready

1. **Delete sample data:**
   ```sql
   DELETE FROM clients;
   ```

2. **Add your actual client:**
   ```sql
   INSERT INTO clients (email, name, company) VALUES
   ('client@company.com', 'Client Name', 'Company Name');
   ```

3. **Add their projects, files, timelines** the same way

4. **The portal automatically shows their data** when they login with their email

---

## File Browser Details

Files in the sample data are referenced with dummy URLs (they won't actually download). To make downloads work:

1. **Upload files to Supabase Storage:**
   ```
   Bucket: project-files
   Path: /[project-id]/[file-name]
   ```

2. **Update the file URL in database:**
   ```sql
   UPDATE files 
   SET file_url = 'https://[project-id].supabase.co/storage/v1/object/public/project-files/[path]'
   WHERE id = '[file-id]';
   ```

Or I can help you set up automated file uploads once you have your first real client!

---

## Data Structure

### Tables

```
clients
├── id (UUID)
├── email (TEXT, unique)
├── name (TEXT)
├── company (TEXT)
└── created_at (TIMESTAMP)

projects
├── id (UUID)
├── client_id (FK → clients.id)
├── name (TEXT)
├── description (TEXT)
├── status (planning|in_progress|review|completed)
├── progress (INTEGER 0-100)
├── start_date (DATE)
├── end_date (DATE)
└── created_at (TIMESTAMP)

timelines
├── id (UUID)
├── project_id (FK → projects.id)
├── phase_name (TEXT)
├── due_date (DATE)
├── completed (BOOLEAN)
├── order (INTEGER)
└── created_at (TIMESTAMP)

files
├── id (UUID)
├── project_id (FK → projects.id)
├── file_name (TEXT)
├── file_type (brand_guide|logo|design_file|mockup|document|other)
├── file_url (TEXT)
├── file_size_mb (DECIMAL)
├── description (TEXT)
└── uploaded_at (TIMESTAMP)
```

---

## Customization Ideas

Once you have the portal live with sample data, you can add:

- **Password authentication** (currently email-only for demo)
- **Client notifications** when projects update
- **Comments** on projects or files
- **Progress photos** from photoshoots
- **Invoice/billing** section
- **Feedback form** for clients
- **Social media previews** in design projects
- **Asset downloads** for marketing materials

Just let me know what you'd like to add!
