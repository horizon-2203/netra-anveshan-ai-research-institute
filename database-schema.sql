-- Netra-Anveshan AI Research Institute - Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  research_area VARCHAR(100),
  team_lead TEXT,
  status TEXT DEFAULT 'planning',
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for datasets
INSERT INTO datasets (name, description, dataset_type, model_architecture, size_gb, parameters_count, training_framework, file_format, is_public) VALUES
('ImageNet Large Scale', 'Large-scale image classification dataset', 'Computer Vision', 'CNN', 150, NULL, 'PyTorch', 'HDF5', true),
('GPT Training Corpus', 'Massive text corpus for language model training', 'NLP', 'Transformer', 570, 175000000000, 'PyTorch', 'JSONL', false),
('RL Benchmark Suite', 'Reinforcement learning benchmark environments', 'Reinforcement Learning', 'DQN', 45, NULL, 'TensorFlow', 'Parquet', true),
('Medical Imaging Dataset', 'CT and MRI scans for medical AI', 'Computer Vision', 'U-Net', 230, NULL, 'PyTorch', 'HDF5', false);

-- Insert sample data for publications
INSERT INTO publications (title, authors, abstract, published_date, status, arxiv_url) VALUES
('Deep Learning Advances in Computer Vision', 'Dr. Chen, Dr. Yamamoto', 'This paper presents novel approaches to computer vision using deep learning.', '2026-03-15', 'published', 'https://arxiv.org/abs/2603.12345'),
('Next Generation NLP Models', 'Dr. Singh, Dr. Torres', 'We introduce a new family of language models with improved efficiency.', '2026-02-20', 'published', 'https://arxiv.org/abs/2602.54321'),
('AI Safety Framework v2.0', 'Dr. Chen, M. Torres', 'A comprehensive framework for ensuring AI safety in production systems.', '2026-01-10', 'draft', NULL),
('Reinforcement Learning in Robotics', 'Dr. Yamamoto', 'Applications of RL algorithms in robotic control systems.', '2025-12-05', 'published', 'https://arxiv.org/abs/2512.98765');

-- Insert sample data for access_requests
INSERT INTO access_requests (name, email, organization, request_type, message, status) VALUES
('Dr. Sarah Johnson', 'sjohnson@mit.edu', 'MIT', 'Dataset Access', 'Requesting access to ImageNet dataset for research', 'pending'),
('Prof. Michael Lee', 'mlee@stanford.edu', 'Stanford', 'Collaboration', 'Interested in collaborating on NLP research', 'approved'),
('Dr. Emily Rodriguez', 'erodriguez@berkeley.edu', 'Berkeley', 'Partnership', 'Proposal for research partnership', 'pending'),
('John Smith', 'jsmith@google.com', 'Google Research', 'Dataset Access', 'Need GPT training corpus for evaluation', 'rejected');

-- Insert sample data for research_projects
INSERT INTO research_projects (name, description, research_area, team_lead, status, start_date) VALUES
('Aurora ML Framework', 'Next-generation machine learning framework', 'Machine Learning', 'Dr. Chen', 'Active', '2025-06-01'),
('Next-Gen NLP Models', 'Advanced natural language processing models', 'NLP', 'Dr. Yamamoto', 'Active', '2025-08-15'),
('Computer Vision Pipeline', 'End-to-end computer vision processing pipeline', 'Computer Vision', 'M. Torres', 'Planning', '2026-01-01'),
('AI Safety Framework', 'Comprehensive AI safety and ethics framework', 'Ethics & Safety', 'Dr. Chen', 'Active', '2025-04-20');

-- Enable Row Level Security (RLS)
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_projects ENABLE ROW LEVEL SECURITY;

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

-- Create indexes for better performance
CREATE INDEX idx_datasets_type ON datasets(dataset_type);
CREATE INDEX idx_datasets_created ON datasets(created_at DESC);
CREATE INDEX idx_publications_status ON publications(status);
CREATE INDEX idx_publications_date ON publications(published_date DESC);
CREATE INDEX idx_requests_status ON access_requests(status);
CREATE INDEX idx_projects_status ON research_projects(status);

-- Success message
SELECT 'Database schema created successfully!' as message;
