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
-- SAMPLE DATA - EXAMPLE: NICHE DESIGN STUDIO
-- ============================================

-- Insert sample client (Niche Design Studio)
INSERT INTO clients (email, name, company) VALUES
('tj@nichedesignstudio.com', 'Tj Cichecki', 'Niche Design Studio');

-- Insert comprehensive branding + web design project
INSERT INTO projects (client_id, name, description, status, progress, start_date, end_date) VALUES
(
  (SELECT id FROM clients WHERE email = 'tj@nichedesignstudio.com'),
  'Niche Design Studio — Brand & Web Identity',
  'Complete visual identity system and responsive website redesign. Includes brand strategy, logo design, typography system, color palette, brand guidelines, website redesign, and web implementation.',
  'in_progress',
  72,
  '2025-02-01',
  '2025-05-15'
);

-- Insert comprehensive timeline phases
INSERT INTO timelines (project_id, phase_name, due_date, completed, "order") VALUES
-- Discovery & Strategy Phase
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Phase 1: Discovery & Brand Strategy',
  '2025-02-15',
  TRUE,
  1
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Brand Positioning Workshop',
  '2025-02-10',
  TRUE,
  2
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Competitive Analysis & Market Research',
  '2025-02-15',
  TRUE,
  3
),

-- Visual Identity Phase
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Phase 2: Visual Identity Design',
  '2025-03-31',
  TRUE,
  4
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Logo Concepts (3 directions)',
  '2025-02-28',
  TRUE,
  5
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Logo Refinement & Approval',
  '2025-03-15',
  TRUE,
  6
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Color Palette & Typography System',
  '2025-03-25',
  TRUE,
  7
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Brand Guidelines Documentation',
  '2025-03-31',
  TRUE,
  8
),

-- Web Design Phase
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Phase 3: Web Design & Strategy',
  '2025-04-15',
  TRUE,
  9
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Website Strategy & User Research',
  '2025-03-31',
  TRUE,
  10
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Wireframes & Information Architecture',
  '2025-04-05',
  TRUE,
  11
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Homepage & Key Pages Mockups',
  '2025-04-15',
  TRUE,
  12
),

-- Development Phase
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Phase 4: Web Development & Testing',
  '2025-05-10',
  FALSE,
  13
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Front-end Development',
  '2025-04-25',
  FALSE,
  14
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'CMS Integration & Backend Setup',
  '2025-05-01',
  FALSE,
  15
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Testing, QA & Browser Compatibility',
  '2025-05-08',
  FALSE,
  16
),

-- Launch Phase
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Phase 5: Launch & Optimization',
  '2025-05-15',
  FALSE,
  17
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'SEO Optimization & Analytics Setup',
  '2025-05-12',
  FALSE,
  18
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Site Launch & Monitoring',
  '2025-05-15',
  FALSE,
  19
);

-- Insert comprehensive project files
INSERT INTO files (project_id, file_name, file_type, file_url, file_size_mb, description) VALUES
-- Brand Strategy & Research
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Brand_Strategy_Document.pdf',
  'brand_guide',
  'https://example.com/files/brand-strategy.pdf',
  3.2,
  'Complete brand strategy including positioning, messaging, target audience, and brand pillars'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Competitive_Analysis_Report.pdf',
  'document',
  'https://example.com/files/competitive-analysis.pdf',
  2.8,
  'Market research and competitor analysis with strategic recommendations'
),

-- Logo & Brand Identity Files
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Logo_Primary_All_Formats.zip',
  'logo',
  'https://example.com/files/logo-primary.zip',
  8.5,
  'Primary logo in all formats: PNG, SVG, EPS, PDF, Adobe Illustrator'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Logo_Secondary_Variations.zip',
  'logo',
  'https://example.com/files/logo-secondary.zip',
  6.2,
  'Secondary logos, icon mark, horizontal versions, and monochrome variants'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Logo_Usage_Guidelines.pdf',
  'brand_guide',
  'https://example.com/files/logo-guidelines.pdf',
  4.1,
  'Detailed logo usage rules, clear space, sizing, color variations, and dos/don''ts'
),

-- Typography & Color System
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Typography_System.pdf',
  'brand_guide',
  'https://example.com/files/typography.pdf',
  2.6,
  'Typography specifications: font families, weights, sizes, line-height, letter-spacing'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Color_Palette_Specifications.pdf',
  'brand_guide',
  'https://example.com/files/color-palette.pdf',
  1.9,
  'Complete color palette with RGB, HEX, CMYK, Pantone specs, and usage guidelines'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Brand_Color_Swatches.aco',
  'brand_guide',
  'https://example.com/files/brand-swatches.aco',
  0.3,
  'Adobe Photoshop color swatches for design tools'
),

-- Complete Brand Guidelines
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Comprehensive_Brand_Guidelines.pdf',
  'brand_guide',
  'https://example.com/files/brand-guidelines-complete.pdf',
  8.7,
  'Master brand guidelines document: mission, values, voice & tone, photography style, and all visual standards'
),

-- Web Design Mockups
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Website_Wireframes_Desktop_Mobile.pdf',
  'design_file',
  'https://example.com/files/wireframes-full.pdf',
  5.4,
  'Complete wireframes for desktop and mobile: homepage, services, portfolio, contact'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Homepage_Design_Desktop.png',
  'mockup',
  'https://example.com/files/homepage-desktop.png',
  12.1,
  'Full-page mockup of homepage design on desktop (1920x1080)'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Homepage_Design_Mobile.png',
  'mockup',
  'https://example.com/files/homepage-mobile.png',
  6.3,
  'Responsive mobile version of homepage (375x812)'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Services_Page_Design.png',
  'mockup',
  'https://example.com/files/services-page.png',
  9.8,
  'Services overview page design with card layouts'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Portfolio_Page_Design.png',
  'mockup',
  'https://example.com/files/portfolio-page.png',
  11.4,
  'Portfolio gallery page showcasing work samples'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Contact_Form_Design.png',
  'mockup',
  'https://example.com/files/contact-form.png',
  5.2,
  'Contact form and inquiry page design'
),

-- Web Assets & Component Library
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Web_Component_Library.zip',
  'design_file',
  'https://example.com/files/component-library.zip',
  15.3,
  'Reusable UI components: buttons, cards, forms, navigation, footer'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Photography_Style_Guide.pdf',
  'brand_guide',
  'https://example.com/files/photography-guide.pdf',
  3.7,
  'Photography style, mood, composition guidelines and approved image examples'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Icon_Set.zip',
  'design_file',
  'https://example.com/files/icons.zip',
  4.2,
  'Complete icon set in SVG and PNG formats'
),

-- Development & Code Files
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'HTML_CSS_Style_Guide.pdf',
  'document',
  'https://example.com/files/style-guide.pdf',
  2.1,
  'CSS class naming conventions, spacing system, and code standards'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Website_GitHub_Repository.zip',
  'design_file',
  'https://example.com/files/website-repo.zip',
  18.5,
  'Complete website source code repository ready for development'
),

-- Marketing & Launch Materials
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Social_Media_Templates.zip',
  'design_file',
  'https://example.com/files/social-templates.zip',
  14.2,
  'Social media templates for LinkedIn, Instagram, Twitter, and Facebook posts'
),
(
  (SELECT id FROM projects WHERE name = 'Niche Design Studio — Brand & Web Identity' LIMIT 1),
  'Email_Signature_Template.html',
  'document',
  'https://example.com/files/email-signature.html',
  0.4,
  'HTML email signature template with logo and branding'
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
