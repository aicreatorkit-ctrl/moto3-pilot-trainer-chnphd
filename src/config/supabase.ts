
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

// Lazy initialization of Supabase client to avoid "window is not defined" errors
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;
let initializationAttempted = false;

export const getSupabase = () => {
  if (!supabaseInstance && !initializationAttempted) {
    initializationAttempted = true;
    console.log('[Supabase Config] Initializing client...');
    
    try {
      if (!isSupabaseConfigured()) {
        console.warn('[Supabase Config] Not configured, creating dummy client');
        return createDummyClient();
      }
      
      supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      });
      console.log('[Supabase Config] ✅ Client initialized successfully');
    } catch (error) {
      console.error('[Supabase Config] ❌ Error initializing client:', error);
      return createDummyClient();
    }
  }
  
  return supabaseInstance || createDummyClient();
};

// Create a dummy client that won't crash the app
const createDummyClient = () => {
  console.warn('[Supabase Config] Using dummy client');
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            unsubscribe: () => {
              console.log('[Supabase Config] Dummy unsubscribe called');
            } 
          } 
        } 
      }),
    },
    from: () => ({
      select: () => ({ 
        limit: () => ({ 
          error: new Error('Supabase not configured') 
        }) 
      }),
    }),
  } as any;
};

// Export a direct reference that gets initialized on first access
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (_target, prop) => {
    try {
      const client = getSupabase();
      const value = client[prop as keyof typeof client];
      
      // If it's a function, bind it to the client
      if (typeof value === 'function') {
        return value.bind(client);
      }
      
      return value;
    } catch (error) {
      console.error('[Supabase Config] Error accessing client property:', prop, error);
      // Return a safe fallback
      return () => {
        console.warn(`[Supabase Config] Method ${String(prop)} called but client not initialized`);
        return Promise.resolve({ data: null, error: new Error('Supabase not initialized') });
      };
    }
  }
});

// Helper per verificare la connessione
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Config] Non configurato');
    return false;
  }
  
  try {
    const client = getSupabase();
    const { error } = await client.from('profiles').select('count').limit(1);
    return !error;
  } catch (error) {
    console.log('[Supabase Config] Connection error:', error);
    return false;
  }
};

// Helper per ottenere l'utente corrente
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Config] Non configurato - nessun utente');
    return null;
  }
  
  try {
    const client = getSupabase();
    const { data: { user }, error } = await client.auth.getUser();
    if (error) {
      console.log('[Supabase Config] Error getting current user:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.log('[Supabase Config] Error getting current user:', error);
    return null;
  }
};
