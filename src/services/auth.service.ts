
import { supabase, isSupabaseConfigured } from '@/src/config/supabase';

/**
 * Servizio per gestire l'autenticazione
 * Funziona solo se Supabase è configurato
 */
export const AuthService = {
  /**
   * Effettua il login
   */
  signIn: async (email: string, password: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile effettuare login');
      return { data: null, error: new Error('Supabase non configurato') };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.log('Login error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.log('Login exception:', error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Registra un nuovo utente
   */
  signUp: async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile registrarsi');
      return { data: null, error: new Error('Supabase non configurato') };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        console.log('SignUp error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.log('SignUp exception:', error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Effettua il logout
   */
  signOut: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile effettuare logout');
      return { error: new Error('Supabase non configurato') };
    }

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.log('SignOut error:', error);
      }
      
      return { error };
    } catch (error) {
      console.log('SignOut exception:', error);
      return { error: error as Error };
    }
  },

  /**
   * Ottiene la sessione corrente
   */
  getSession: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - nessuna sessione');
      return { session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.log('GetSession error:', error);
      }
      
      return { session: data.session, error };
    } catch (error) {
      console.log('GetSession exception:', error);
      return { session: null, error: error as Error };
    }
  },

  /**
   * Ascolta i cambiamenti dello stato di autenticazione
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - nessun listener');
      return { data: { subscription: { unsubscribe: () => {} } } };
    }

    try {
      return supabase.auth.onAuthStateChange(callback);
    } catch (error) {
      console.log('OnAuthStateChange exception:', error);
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
};
