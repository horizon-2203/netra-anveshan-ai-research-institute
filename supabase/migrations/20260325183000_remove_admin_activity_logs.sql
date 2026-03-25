-- Remove DB-based admin activity logging; filesystem logging is used instead.
DROP TRIGGER IF EXISTS trg_log_datasets_activity ON datasets;
DROP TRIGGER IF EXISTS trg_log_publications_activity ON publications;
DROP TRIGGER IF EXISTS trg_log_access_requests_activity ON access_requests;
DROP TRIGGER IF EXISTS trg_log_research_projects_activity ON research_projects;

DROP FUNCTION IF EXISTS log_admin_activity();

DROP INDEX IF EXISTS idx_admin_activity_logs_created_at;

DROP POLICY IF EXISTS "Authenticated users can read activity logs" ON admin_activity_logs;
DROP POLICY IF EXISTS "Authenticated users can insert activity logs" ON admin_activity_logs;

DROP TABLE IF EXISTS admin_activity_logs;
