
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/src/config/supabase';
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
    const checkConfig = isSupabaseConfigured();
    setConfigured(checkConfig);
    
    if (!checkConfig) {
      console.log('Supabase non configurato - modalità offline');
      setLoading(false);
      return;
    }

    // Carica sessione iniziale solo se Supabase è configurato
    AuthService.getSession()
      .then(({ session }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error loading session:', error);
        setLoading(false);
      });

    // Ascolta cambiamenti
    const { data: { subscription } } = AuthService.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!configured) {
      return { data: null, error: new Error('Supabase non configurato') };
    }
    const { data, error } = await AuthService.signIn(email, password);
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!configured) {
      return { data: null, error: new Error('Supabase non configurato') };
    }
    const { data, error } = await AuthService.signUp(email, password, fullName);
    return { data, error };
  };

  const signOut = async () => {
    if (!configured) {
      return { error: new Error('Supabase non configurato') };
    }
    const { error } = await AuthService.signOut();
    return { error };
  };

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
