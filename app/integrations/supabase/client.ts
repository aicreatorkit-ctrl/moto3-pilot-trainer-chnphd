import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://kwtqtrjyzdmgjxezdaof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHF0cmp5emRtZ2p4ZXpkYW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODk2NDIsImV4cCI6MjA4MDM2NTY0Mn0.BX-coYrewdUFT2VyiIMHwllNZ5edqRRnAiQf4ofKzSk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
