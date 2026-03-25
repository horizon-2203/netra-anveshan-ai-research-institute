-- Netra-Anveshan AI Research Institute - Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID functions used by this schema
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  dataset_type VARCHAR(50),           -- "NLP", "Computer Vision", "RL"
  model_architecture VARCHAR(50),      -- "Transformer", "CNN", "GAN"
  size_gb NUMERIC,
  parameters_count BIGINT,             -- e.g., 7B, 175B
  training_framework VARCHAR(50),      -- "PyTorch", "TensorFlow", "JAX"
  file_format VARCHAR(20),             -- "HDF5", "Parquet", "JSONL"
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- publications table
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  abstract TEXT,
  published_date DATE,
  status TEXT DEFAULT 'draft',
  arxiv_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- access_requests table
CREATE TABLE IF NOT EXISTS access_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  request_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- research_projects table
CREATE TABLE IF NOT EXISTS research_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  research_area VARCHAR(100),
  team_lead TEXT,
  status TEXT DEFAULT 'planning',
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- staff_users table
-- Stores intended ERP staff identities and designations.
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- No seed/sample data is inserted by this script.
-- Data creation is handled manually via ERP and Supabase Auth setup.

-- Enable Row Level Security (RLS)
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public datasets are viewable by everyone" ON datasets
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public publications are viewable by everyone" ON publications
  FOR SELECT USING (status = 'published');

-- Create policies for authenticated users (full access)
CREATE POLICY "Authenticated users can do everything with datasets" ON datasets
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything with publications" ON publications
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything with requests" ON access_requests
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything with projects" ON research_projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view staff users" ON staff_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_datasets_type ON datasets(dataset_type);
CREATE INDEX idx_datasets_created ON datasets(created_at DESC);
CREATE INDEX idx_publications_status ON publications(status);
CREATE INDEX idx_publications_date ON publications(published_date DESC);
CREATE INDEX idx_requests_status ON access_requests(status);
CREATE INDEX idx_projects_status ON research_projects(status);
CREATE INDEX idx_staff_users_email ON staff_users(email);

-- Success message
SELECT 'Database schema created successfully!' as message;
