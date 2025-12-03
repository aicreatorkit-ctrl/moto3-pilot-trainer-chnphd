
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/types/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANTE: L'utente deve configurare queste variabili
// Istruzioni: Vai su Supabase Dashboard > Settings > API
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Verifica se Supabase è configurato
export const isSupabaseConfigured = (): boolean => {
  const hasUrl = SUPABASE_URL && SUPABASE_URL !== '' && !SUPABASE_URL.includes('your-project');
  const hasKey = SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== '' && !SUPABASE_ANON_KEY.includes('your-anon');
  return !!(hasUrl && hasKey);
};

// Crea il client Supabase solo se configurato
export const supabase = isSupabaseConfigured() 
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

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
