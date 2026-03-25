-- Activity logs for admin dashboard recent activity feed
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  action TEXT NOT NULL,
  record_id UUID,
  actor_id UUID,
  actor_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'admin_activity_logs'
      AND policyname = 'Authenticated users can read activity logs'
  ) THEN
    CREATE POLICY "Authenticated users can read activity logs" ON admin_activity_logs
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'admin_activity_logs'
      AND policyname = 'Authenticated users can insert activity logs'
  ) THEN
    CREATE POLICY "Authenticated users can insert activity logs" ON admin_activity_logs
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at
  ON admin_activity_logs(created_at DESC);

CREATE OR REPLACE FUNCTION log_admin_activity() RETURNS TRIGGER AS $$
DECLARE
  v_action TEXT;
  v_record_id UUID;
  v_actor_id UUID;
  v_actor_email TEXT;
BEGIN
  v_action := lower(TG_OP);
  v_actor_id := auth.uid();

  BEGIN
    v_actor_email := nullif(current_setting('request.jwt.claim.email', true), '');
  EXCEPTION WHEN OTHERS THEN
    v_actor_email := NULL;
  END;

  IF TG_OP = 'DELETE' THEN
    v_record_id := OLD.id;
  ELSE
    v_record_id := NEW.id;
  END IF;

  INSERT INTO admin_activity_logs(table_name, action, record_id, actor_id, actor_email)
  VALUES (TG_TABLE_NAME, v_action, v_record_id, v_actor_id, v_actor_email);

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_log_datasets_activity ON datasets;
CREATE TRIGGER trg_log_datasets_activity
AFTER INSERT OR UPDATE OR DELETE ON datasets
FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

DROP TRIGGER IF EXISTS trg_log_publications_activity ON publications;
CREATE TRIGGER trg_log_publications_activity
AFTER INSERT OR UPDATE OR DELETE ON publications
FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

DROP TRIGGER IF EXISTS trg_log_access_requests_activity ON access_requests;
CREATE TRIGGER trg_log_access_requests_activity
AFTER INSERT OR UPDATE OR DELETE ON access_requests
FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

DROP TRIGGER IF EXISTS trg_log_research_projects_activity ON research_projects;
CREATE TRIGGER trg_log_research_projects_activity
AFTER INSERT OR UPDATE OR DELETE ON research_projects
FOR EACH ROW EXECUTE FUNCTION log_admin_activity();
