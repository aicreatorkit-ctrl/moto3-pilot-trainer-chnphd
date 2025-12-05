
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = "https://kwtqtrjyzdmgjxezdaof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHF0cmp5emRtZ2p4ZXpkYW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODk2NDIsImV4cCI6MjA4MDM2NTY0Mn0.BX-coYrewdUFT2VyiIMHwllNZ5edqRRnAiQf4ofKzSk";

// Lazy initialization to avoid "window is not defined" errors
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;
let initializationAttempted = false;

const getSupabaseClient = () => {
  if (!supabaseInstance && !initializationAttempted) {
    initializationAttempted = true;
    console.log('[Supabase Client] Initializing...');
    
    try {
      supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      });
      console.log('[Supabase Client] ✅ Initialized successfully');
    } catch (error) {
      console.error('[Supabase Client] ❌ Error initializing:', error);
      // Return a dummy client to prevent crashes
      return createDummyClient();
    }
  }
  
  return supabaseInstance || createDummyClient();
};

// Create a dummy client that won't crash the app
const createDummyClient = () => {
  console.warn('[Supabase Client] Using dummy client');
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      signOut: async () => ({ error: new Error('Supabase not initialized') }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            unsubscribe: () => {
              console.log('[Supabase Client] Dummy unsubscribe called');
            } 
          } 
        } 
      }),
    },
    from: () => ({
      select: () => ({ 
        limit: () => ({ 
          error: new Error('Supabase not initialized') 
        }) 
      }),
    }),
  } as any;
};

// Export a proxy that lazily initializes the client
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (_target, prop) => {
    try {
      const client = getSupabaseClient();
      const value = client[prop as keyof typeof client];
      
      // If it's a function, bind it to the client
      if (typeof value === 'function') {
        return value.bind(client);
      }
      
      return value;
    } catch (error) {
      console.error('[Supabase Client] Error accessing property:', prop, error);
      // Return a safe fallback
      return () => {
        console.warn(`[Supabase Client] Method ${String(prop)} called but client not initialized`);
        return Promise.resolve({ data: null, error: new Error('Supabase not initialized') });
      };
    }
  }
});

// Default export to satisfy Expo Router
export default supabase;
