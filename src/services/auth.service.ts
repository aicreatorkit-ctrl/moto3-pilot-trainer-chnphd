
import { supabase } from '@/src/config/supabase';

/**
 * Service per gestire l'autenticazione
 * Single-user MVP: email + password
 */
export class AuthService {
  // Login
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log('Sign in error:', error);
      return { data: null, error };
    }
  }

  // Registrazione (per setup iniziale)
  static async signUp(email: string, password: string, fullName: string) {
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
      
      if (error) throw error;
      
      // Crea il profilo
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'pilot',
        });
      }
      
      return { data, error: null };
    } catch (error) {
      console.log('Sign up error:', error);
      return { data: null, error };
    }
  }

  // Logout
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.log('Sign out error:', error);
      return { error };
    }
  }

  // Ottieni sessione corrente
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.log('Get session error:', error);
      return { session: null, error };
    }
  }

  // Ascolta cambiamenti di auth
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
