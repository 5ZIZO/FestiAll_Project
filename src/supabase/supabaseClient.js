import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://tztnarajaluaabpwispz.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dG5hcmFqYWx1YWFicHdpc3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MjAxODAsImV4cCI6MjAzNDE5NjE4MH0.8o8syOAQ6JbPIq_T6OynehWlasK7Hawi90IiFpQnd08";

const supabaseTestJhu = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);
export default supabaseTestJhu;
