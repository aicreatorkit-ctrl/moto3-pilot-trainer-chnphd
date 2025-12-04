
import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured } from '@/src/config/supabase';
import { AuthService } from '@/src/services/auth.service';
import { Session } from '@supabase/supabase-js';

/**
 * Hook per gestire lo stato di autenticazione
 * Funziona anche senza Supabase configurato
 */
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      try {
        console.log('useAuth: Checking Supabase configuration');
        const checkConfig = isSupabaseConfigured();
        
        if (!mounted) return;
        
        setConfigured(checkConfig);
        
        if (!checkConfig) {
          console.log('useAuth: Supabase non configurato - modalità offline');
          setLoading(false);
          return;
        }

        console.log('useAuth: Loading session');
        // Carica sessione iniziale solo se Supabase è configurato
        const { session: initialSession, error } = await AuthService.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('useAuth: Error loading session:', error);
        } else {
          console.log('useAuth: Session loaded', initialSession ? 'with user' : 'no user');
          setSession(initialSession);
        }
        
        setLoading(false);

        // Ascolta cambiamenti
        const { data } = AuthService.onAuthStateChange((_event, newSession) => {
          if (!mounted) return;
          console.log('useAuth: Auth state changed', _event);
          setSession(newSession);
        });
        
        subscription = data.subscription;
      } catch (error) {
        console.error('useAuth: Initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!configured) {
      return { data: null, error: new Error('Supabase non configurato') };
    }
    const { data, error } = await AuthService.signIn(email, password);
    return { data, error };
  }, [configured]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (!configured) {
      return { data: null, error: new Error('Supabase non configurato') };
    }
    const { data, error } = await AuthService.signUp(email, password);
    return { data, error };
  }, [configured]);

  const signOut = useCallback(async () => {
    if (!configured) {
      return { error: new Error('Supabase non configurato') };
    }
    const { error } = await AuthService.signOut();
    return { error };
  }, [configured]);

  return {
    session,
    user: session?.user ?? null,
    loading,
    configured,
    signIn,
    signUp,
    signOut,
  };
};
