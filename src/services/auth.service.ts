
import { supabase } from '@/src/config/supabase';

export const authService = {
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://natively.dev/email-confirmed'
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { data: null, error };
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { data: null, error };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Sign out exception:', error);
      return { error };
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Get user error:', error);
        return { user: null, error };
      }
      
      return { user, error: null };
    } catch (error) {
      console.error('Get user exception:', error);
      return { user: null, error };
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return { session: null, error };
      }
      
      return { session, error: null };
    } catch (error) {
      console.error('Get session exception:', error);
      return { session: null, error };
    }
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
