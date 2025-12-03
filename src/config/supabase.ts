
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/types/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANTE: L'utente deve configurare queste variabili
// Istruzioni: Vai su Supabase Dashboard > Settings > API
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Crea il client Supabase con storage personalizzato per React Native
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
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    return !error;
  } catch (error) {
    console.log('Supabase connection error:', error);
    return false;
  }
};

// Helper per ottenere l'utente corrente
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.log('Error getting current user:', error);
    return null;
  }
  return user;
};
