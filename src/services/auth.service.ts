
import { supabase } from '@/src/config/supabase';

/**
 * Servizio per gestire l'autenticazione
 * Funziona solo se Supabase è configurato
 */
export const AuthService = {
  /**
   * Ottieni la sessione corrente
   */
  async getSession() {
    if (!supabase) {
      console.log('AuthService: Supabase non configurato');
      return { session: null, error: null };
    }
    
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('AuthService: Error getting session:', error);
      }
      return { session: data.session, error };
    } catch (error) {
      console.error('AuthService: Exception getting session:', error);
      return { session: null, error };
    }
  },

  /**
   * Accedi con email e password
   */
  async signIn(email: string, password: string) {
    if (!supabase) {
      console.log('AuthService: Supabase non configurato');
      return { data: null, error: new Error('Supabase non configurato') };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('AuthService: Error signing in:', error);
      }
      return { data, error };
    } catch (error) {
      console.error('AuthService: Exception signing in:', error);
      return { data: null, error };
    }
  },

  /**
   * Registra un nuovo utente
   */
  async signUp(email: string, password: string, fullName: string) {
    if (!supabase) {
      console.log('AuthService: Supabase non configurato');
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
        console.error('AuthService: Error signing up:', error);
      }
      return { data, error };
    } catch (error) {
      console.error('AuthService: Exception signing up:', error);
      return { data: null, error };
    }
  },

  /**
   * Esci
   */
  async signOut() {
    if (!supabase) {
      console.log('AuthService: Supabase non configurato');
      return { error: new Error('Supabase non configurato') };
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthService: Error signing out:', error);
      }
      return { error };
    } catch (error) {
      console.error('AuthService: Exception signing out:', error);
      return { error };
    }
  },

  /**
   * Ascolta i cambiamenti dello stato di autenticazione
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (!supabase) {
      console.log('AuthService: Supabase non configurato');
      return { data: { subscription: { unsubscribe: () => console.log('No subscription to unsubscribe') } } };
    }
    
    return supabase.auth.onAuthStateChange(callback);
  },
};
