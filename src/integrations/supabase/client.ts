// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zvhfrthqqqeuyaysryhk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2aGZydGhxcXFldXlheXNyeWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjQ3MDYsImV4cCI6MjA1OTcwMDcwNn0.MpEE-CZcuABf-3KxFyCirswBEQfIRMdSKX7ukCHB9qc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);