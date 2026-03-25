-- Map expected staff roster into staff_users and link to auth.users when present.

ALTER TABLE IF EXISTS staff_users
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS department TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'staff_users'
      AND column_name = 'role_title'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'staff_users'
      AND column_name = 'role'
  ) THEN
    ALTER TABLE staff_users RENAME COLUMN role_title TO role;
  END IF;
END $$;

ALTER TABLE IF EXISTS staff_users
  ADD COLUMN IF NOT EXISTS role TEXT;

ALTER TABLE IF EXISTS staff_users
  DROP COLUMN IF EXISTS is_active;

WITH roster AS (
  SELECT *
  FROM (
    VALUES
      ('dr.shreyansh.samir@netra-anveshan.org.in', 'Dr. Shreyansh Samir', 'Senior Researcher', 'Research lead in large-scale AI systems.'),
      ('dr.milind.rai@netra-anveshan.org.in', 'Dr. Milind Rai', 'Research Scientist', 'Applied AI research and experimentation.'),
      ('utpal.kant@netra-anveshan.org.in', 'Utpal Kant', 'Lead Developer', 'Leads ERP platform and integration work.'),
      ('nitish.kumar@netra-anveshan.org.in', 'Nitish Kumar', 'Senior Developer', 'Builds and maintains core product features.'),
      ('dr.bheem.shukla@netra-anveshan.org.in', 'Dr. Bheem Shukla', 'Professor', 'Academic collaboration and mentorship.'),
      ('dr.samay.raina@netra-anveshan.org.in', 'Dr. Samay Raina', 'Assistant Professor', 'Supports academic AI programs.'),
      ('rahul.verma@netra-anveshan.org.in', 'Rahul Verma', 'Assistant Developer', 'Supports tooling and implementation tasks.'),
      ('intern@netra-anveshan.org.in', NULL, 'Research Intern', 'Intern profile for training and onboarding.')
  ) AS t(email, full_name, role, bio)
)
INSERT INTO staff_users (auth_user_id, full_name, email, role, department, bio, updated_at)
SELECT
  au.id,
  COALESCE(r.full_name, 'Intern') AS full_name,
  r.email,
  r.role,
  CASE
    WHEN r.role ILIKE '%Researcher%' THEN 'Research'
    WHEN r.role ILIKE '%Developer%' THEN 'Engineering'
    WHEN r.role ILIKE '%Professor%' THEN 'Academic'
    WHEN r.role ILIKE '%Intern%' THEN 'Training'
    ELSE 'General'
  END AS department,
  r.bio,
  NOW()
FROM roster r
LEFT JOIN auth.users au ON au.email = r.email
ON CONFLICT (email)
DO UPDATE SET
  auth_user_id = EXCLUDED.auth_user_id,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  bio = EXCLUDED.bio,
  updated_at = NOW();

UPDATE staff_users
SET role = 'Staff'
WHERE role IS NULL OR role = '';

ALTER TABLE IF EXISTS staff_users
  ALTER COLUMN role SET NOT NULL;
