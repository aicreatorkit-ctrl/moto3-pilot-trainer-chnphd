
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/types/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use the actual Supabase credentials from the integration folder
const SUPABASE_URL = 'https://kwtqtrjyzdmgjxezdaof.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHF0cmp5emRtZ2p4ZXpkYW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODk2NDIsImV4cCI6MjA4MDM2NTY0Mn0.BX-coYrewdUFT2VyiIMHwllNZ5edqRRnAiQf4ofKzSk';

// Verifica se Supabase è configurato
export const isSupabaseConfigured = (): boolean => {
  const hasUrl = SUPABASE_URL && SUPABASE_URL !== '' && !SUPABASE_URL.includes('your-project');
  const hasKey = SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== '' && !SUPABASE_ANON_KEY.includes('your-anon');
  return !!(hasUrl && hasKey);
};

// Crea il client Supabase
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper per verificare la connessione
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) {
    console.log('Supabase non configurato');
    return false;
  }
  
  try {
    const { error } = await supabase.from('profiles').select('count').limit(1);
    return !error;
  } catch (error) {
    console.log('Supabase connection error:', error);
    return false;
  }
};

// Helper per ottenere l'utente corrente
export const getCurrentUser = async () => {
  if (!supabase) {
    console.log('Supabase non configurato - nessun utente');
    return null;
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.log('Error getting current user:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.log('Error getting current user:', error);
    return null;
  }
};
