-- Clear all existing ERP table data.
-- Requested to remove previously present sample/person entries.
TRUNCATE TABLE
  datasets,
  publications,
  access_requests,
  research_projects,
  staff_users
RESTART IDENTITY CASCADE;
