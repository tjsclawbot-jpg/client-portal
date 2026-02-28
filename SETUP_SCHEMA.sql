-- ============================================
-- NICHE DESIGN STUDIO - CLIENT PORTAL SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- 1. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('planning', 'in_progress', 'review', 'completed')) DEFAULT 'planning',
  progress INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. TIMELINES TABLE
CREATE TABLE IF NOT EXISTS timelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_name TEXT NOT NULL,
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. FILES TABLE
CREATE TABLE IF NOT EXISTS files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT CHECK (file_type IN ('brand_guide', 'logo', 'design_file', 'mockup', 'document', 'other')),
  file_url TEXT,
  file_size_mb DECIMAL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SAMPLE DATA - EXAMPLE CLIENT
-- ============================================

-- Insert sample client
INSERT INTO clients (email, name, company) VALUES
('sarah@techstartup.com', 'Sarah Chen', 'TechStartup Inc.');

-- Get the client ID (you'll reference this)
-- Save this ID to use below - typically it's: 12345678-1234-1234-1234-123456789012

-- For demo purposes, we'll use this hardcoded ID in the inserts below
-- In real usage, you'd get the actual UUID

-- Insert sample projects for the example client
INSERT INTO projects (client_id, name, description, status, progress, start_date, end_date) VALUES
(
  (SELECT id FROM clients WHERE email = 'sarah@techstartup.com'),
  'Brand Identity Design',
  'Complete visual identity system including logo, color palette, typography, and brand guidelines.',
  'in_progress',
  65,
  '2025-01-15',
  '2025-03-31'
),
(
  (SELECT id FROM clients WHERE email = 'sarah@techstartup.com'),
  'Website Redesign',
  'Modern, responsive website redesign with focus on user experience and conversion optimization.',
  'planning',
  20,
  '2025-02-01',
  '2025-04-30'
),
(
  (SELECT id FROM clients WHERE email = 'sarah@techstartup.com'),
  'Marketing Materials',
  'Business cards, letterhead, social media templates, and marketing collateral.',
  'completed',
  100,
  '2024-11-01',
  '2025-01-31'
);

-- Insert sample timelines
INSERT INTO timelines (project_id, phase_name, due_date, completed, "order") VALUES
-- Brand Identity phases
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Discovery & Strategy',
  '2025-01-31',
  TRUE,
  1
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Logo Design (3 Concepts)',
  '2025-02-14',
  TRUE,
  2
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Revisions & Refinement',
  '2025-02-28',
  FALSE,
  3
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Brand Guidelines Document',
  '2025-03-15',
  FALSE,
  4
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Final Deliverables',
  '2025-03-31',
  FALSE,
  5
),

-- Website Redesign phases
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Requirements & Planning',
  '2025-02-15',
  FALSE,
  1
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Wireframes & User Flows',
  '2025-03-01',
  FALSE,
  2
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Design Mockups',
  '2025-03-20',
  FALSE,
  3
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Development & Testing',
  '2025-04-15',
  FALSE,
  4
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Launch',
  '2025-04-30',
  FALSE,
  5
),

-- Marketing Materials phases
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Design Concepts',
  '2025-01-10',
  TRUE,
  1
),
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Client Approval',
  '2025-01-20',
  TRUE,
  2
),
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Final Production Files',
  '2025-01-31',
  TRUE,
  3
);

-- Insert sample files
INSERT INTO files (project_id, file_name, file_type, file_url, file_size_mb, description) VALUES
-- Brand Identity files
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Brand_Guidelines_v2.pdf',
  'brand_guide',
  'https://example.com/files/brand-guidelines.pdf',
  2.4,
  'Complete brand guidelines including logo usage, color palette, and typography rules'
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Logo_Primary_Files.zip',
  'logo',
  'https://example.com/files/logos-primary.zip',
  5.8,
  'Primary logo in various formats (PNG, SVG, EPS, PDF)'
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Logo_Secondary_Files.zip',
  'logo',
  'https://example.com/files/logos-secondary.zip',
  4.2,
  'Secondary and icon variations'
),
(
  (SELECT id FROM projects WHERE name = 'Brand Identity Design' LIMIT 1),
  'Color_Palette_Definition.pdf',
  'document',
  'https://example.com/files/color-palette.pdf',
  1.1,
  'Detailed color specifications (RGB, HEX, CMYK, Pantone)'
),

-- Website Redesign files
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Website_Wireframes_v1.pdf',
  'design_file',
  'https://example.com/files/wireframes.pdf',
  3.5,
  'Initial wireframes for desktop and mobile views'
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Homepage_Mockup_Desktop.png',
  'mockup',
  'https://example.com/files/homepage-desktop.png',
  8.2,
  'Full-page mockup of homepage design'
),
(
  (SELECT id FROM projects WHERE name = 'Website Redesign' LIMIT 1),
  'Homepage_Mockup_Mobile.png',
  'mockup',
  'https://example.com/files/homepage-mobile.png',
  4.1,
  'Mobile responsive version of homepage'
),

-- Marketing Materials files
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Business_Cards_Print_Ready.pdf',
  'document',
  'https://example.com/files/business-cards.pdf',
  1.8,
  'Print-ready business card files'
),
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Social_Media_Templates.zip',
  'design_file',
  'https://example.com/files/social-templates.zip',
  12.5,
  'Editable templates for LinkedIn, Twitter, Instagram, and Facebook'
),
(
  (SELECT id FROM projects WHERE name = 'Marketing Materials' LIMIT 1),
  'Email_Signature_Template.html',
  'document',
  'https://example.com/files/email-signature.html',
  0.2,
  'HTML email signature template'
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES (Optional but recommended)
-- ============================================
-- These ensure clients only see their own data

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows reading data
-- In production, you'd tie this to authenticated users
-- For now, we'll keep it simple for testing

CREATE POLICY "Allow client to view own data" ON clients
  FOR SELECT USING (true);

CREATE POLICY "Allow viewing projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow viewing timelines" ON timelines
  FOR SELECT USING (true);

CREATE POLICY "Allow viewing files" ON files
  FOR SELECT USING (true);

-- ============================================
-- INDEXES (for performance)
-- ============================================
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_timelines_project_id ON timelines(project_id);
CREATE INDEX idx_files_project_id ON files(project_id);
CREATE INDEX idx_clients_email ON clients(email);

-- ============================================
-- DONE!
-- ============================================
-- Now you have:
-- 1 Example Client: sarah@techstartup.com
-- 3 Projects: Brand Identity (65% done), Website (20% done), Marketing Materials (100% done)
-- 13 Timeline phases with completion status
-- 10 Sample files across all projects

-- To test the portal:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Update the Next.js app with this schema
-- 3. Log in as: sarah@techstartup.com
-- 4. See all projects and files populate
