-- Ensure authenticated users can perform CRUD on ERP tables.

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE datasets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE publications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE access_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE research_projects TO authenticated;
GRANT SELECT ON TABLE staff_users TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'datasets' AND policyname = 'Authenticated datasets insert'
  ) THEN
    CREATE POLICY "Authenticated datasets insert" ON datasets
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'datasets' AND policyname = 'Authenticated datasets update'
  ) THEN
    CREATE POLICY "Authenticated datasets update" ON datasets
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'datasets' AND policyname = 'Authenticated datasets delete'
  ) THEN
    CREATE POLICY "Authenticated datasets delete" ON datasets
      FOR DELETE TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'publications' AND policyname = 'Authenticated publications insert'
  ) THEN
    CREATE POLICY "Authenticated publications insert" ON publications
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'publications' AND policyname = 'Authenticated publications update'
  ) THEN
    CREATE POLICY "Authenticated publications update" ON publications
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'publications' AND policyname = 'Authenticated publications delete'
  ) THEN
    CREATE POLICY "Authenticated publications delete" ON publications
      FOR DELETE TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'access_requests' AND policyname = 'Authenticated requests insert'
  ) THEN
    CREATE POLICY "Authenticated requests insert" ON access_requests
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'access_requests' AND policyname = 'Authenticated requests update'
  ) THEN
    CREATE POLICY "Authenticated requests update" ON access_requests
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'access_requests' AND policyname = 'Authenticated requests delete'
  ) THEN
    CREATE POLICY "Authenticated requests delete" ON access_requests
      FOR DELETE TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_projects' AND policyname = 'Authenticated projects insert'
  ) THEN
    CREATE POLICY "Authenticated projects insert" ON research_projects
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_projects' AND policyname = 'Authenticated projects update'
  ) THEN
    CREATE POLICY "Authenticated projects update" ON research_projects
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_projects' AND policyname = 'Authenticated projects delete'
  ) THEN
    CREATE POLICY "Authenticated projects delete" ON research_projects
      FOR DELETE TO authenticated USING (true);
  END IF;
END $$;
