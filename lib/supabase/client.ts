import { createClient } from '@supabase/supabase-js'

const FALLBACK_SUPABASE_URL = 'https://iuiqewnunafevgpulroh.supabase.co'
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_4m4yTKOOfYAh1slhhaoI1w_uNsAB5YF'
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1aXFld251bmFmZXZncHVscm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzA1OTMsImV4cCI6MjA4OTgwNjU5M30.TUSzN3MNQ1EjcqS2olG1nROTu1hS8SmriIKTpXp_iBM'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL
const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
	FALLBACK_SUPABASE_ANON_KEY ||
	FALLBACK_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
