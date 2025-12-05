
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = "https://kwtqtrjyzdmgjxezdaof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHF0cmp5emRtZ2p4ZXpkYW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODk2NDIsImV4cCI6MjA4MDM2NTY0Mn0.BX-coYrewdUFT2VyiIMHwllNZ5edqRRnAiQf4ofKzSk";

console.log('[Supabase Client] Module loading...');
console.log('[Supabase Client] window type:', typeof window);
console.log('[Supabase Client] window.addEventListener type:', typeof window?.addEventListener);

// Create a safe AsyncStorage wrapper that ensures window exists
const SafeAsyncStorage = {
  getItem: async (key: string) => {
    try {
      // Ensure window exists before calling AsyncStorage
      if (typeof window === 'undefined') {
        console.warn('[SafeAsyncStorage] window is undefined, creating it');
        // @ts-expect-error - Create window if it doesn't exist
        global.window = global as any;
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] getItem error:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      // Ensure window exists before calling AsyncStorage
      if (typeof window === 'undefined') {
        console.warn('[SafeAsyncStorage] window is undefined, creating it');
        // @ts-expect-error - Create window if it doesn't exist
        global.window = global as any;
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('[SafeAsyncStorage] setItem error:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      // Ensure window exists before calling AsyncStorage
      if (typeof window === 'undefined') {
        console.warn('[SafeAsyncStorage] window is undefined, creating it');
        // @ts-expect-error - Create window if it doesn't exist
        global.window = global as any;
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] removeItem error:', error);
    }
  },
};

// Lazy initialization to avoid "window is not defined" errors
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;
let initializationAttempted = false;
let initializationPromise: Promise<ReturnType<typeof createClient<Database>>> | null = null;

const initializeSupabase = async (): Promise<ReturnType<typeof createClient<Database>>> => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    console.log('[Supabase Client] Initializing...');
    
    try {
      // Ensure window exists before creating client
      if (typeof window === 'undefined') {
        console.warn('[Supabase Client] window is undefined during initialization, creating it');
        // @ts-expect-error - Create window if it doesn't exist
        global.window = global as any;
      }

      // Add window event methods if they don't exist
      if (typeof window !== 'undefined') {
        if (typeof window.addEventListener === 'undefined') {
          // @ts-expect-error - Add addEventListener
          window.addEventListener = () => {};
        }
        if (typeof window.removeEventListener === 'undefined') {
          // @ts-expect-error - Add removeEventListener
          window.removeEventListener = () => {};
        }
        if (typeof window.dispatchEvent === 'undefined') {
          // @ts-expect-error - Add dispatchEvent
          window.dispatchEvent = () => true;
        }
      }

      supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storage: SafeAsyncStorage as any,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      });
      
      console.log('[Supabase Client] ✅ Initialized successfully');
      return supabaseInstance;
    } catch (error) {
      console.error('[Supabase Client] ❌ Error initializing:', error);
      // Return a dummy client to prevent crashes
      return createDummyClient();
    }
  })();

  return initializationPromise;
};

const getSupabaseClient = () => {
  if (!supabaseInstance && !initializationAttempted) {
    initializationAttempted = true;
    
    // Start initialization but don't wait for it
    initializeSupabase().catch(error => {
      console.error('[Supabase Client] Initialization failed:', error);
    });
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
      insert: () => ({ error: new Error('Supabase not initialized') }),
      update: () => ({ error: new Error('Supabase not initialized') }),
      delete: () => ({ error: new Error('Supabase not initialized') }),
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

console.log('[Supabase Client] Module loaded successfully');
