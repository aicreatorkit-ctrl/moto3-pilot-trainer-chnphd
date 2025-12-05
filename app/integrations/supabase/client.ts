
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = "https://kwtqtrjyzdmgjxezdaof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHF0cmp5emRtZ2p4ZXpkYW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODk2NDIsImV4cCI6MjA4MDM2NTY0Mn0.BX-coYrewdUFT2VyiIMHwllNZ5edqRRnAiQf4ofKzSk";

console.log('[Supabase Client] Initializing module...');

// Ensure window exists before anything else
const ensureWindow = () => {
  if (typeof window === 'undefined') {
    console.warn('[Supabase Client] window undefined, creating it');
    // @ts-expect-error - Create window
    global.window = global as any;
  }
  
  if (typeof window !== 'undefined') {
    if (!window.addEventListener) {
      // @ts-expect-error - Polyfill
      window.addEventListener = () => {};
    }
    if (!window.removeEventListener) {
      // @ts-expect-error - Polyfill
      window.removeEventListener = () => {};
    }
    if (!window.dispatchEvent) {
      // @ts-expect-error - Polyfill
      window.dispatchEvent = () => true;
    }
  }
};

// Safe AsyncStorage wrapper
const SafeAsyncStorage = {
  getItem: async (key: string) => {
    try {
      ensureWindow();
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] getItem error:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      ensureWindow();
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('[SafeAsyncStorage] setItem error:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      ensureWindow();
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] removeItem error:', error);
    }
  },
};

// Lazy initialization
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

const initializeSupabase = (): ReturnType<typeof createClient<Database>> => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  console.log('[Supabase Client] Creating client...');
  
  try {
    ensureWindow();

    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: SafeAsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
    });
    
    console.log('[Supabase Client] ✅ Client created successfully');
    return supabaseInstance;
  } catch (error) {
    console.error('[Supabase Client] ❌ Error creating client:', error);
    return createDummyClient();
  }
};

// Dummy client fallback
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
              console.log('[Supabase Client] Dummy unsubscribe');
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
      insert: () => ({ error: new Error('Supabase not initialized') }),
      update: () => ({ error: new Error('Supabase not initialized') }),
      delete: () => ({ error: new Error('Supabase not initialized') }),
    }),
  } as any;
};

// Export proxy for lazy initialization
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (_target, prop) => {
    try {
      const client = initializeSupabase();
      const value = client[prop as keyof typeof client];
      
      if (typeof value === 'function') {
        return value.bind(client);
      }
      
      return value;
    } catch (error) {
      console.error('[Supabase Client] Error accessing property:', prop, error);
      return () => {
        console.warn(`[Supabase Client] Method ${String(prop)} not available`);
        return Promise.resolve({ data: null, error: new Error('Supabase not initialized') });
      };
    }
  }
});

export default supabase;

console.log('[Supabase Client] ✅ Module loaded');
