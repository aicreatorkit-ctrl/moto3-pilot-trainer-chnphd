
import { useState, useEffect } from 'react';
import { AuthService } from '@/src/services/auth.service';
import { Session } from '@supabase/supabase-js';

/**
 * Hook per gestire lo stato di autenticazione
 */
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica sessione iniziale
    AuthService.getSession().then(({ session }) => {
      setSession(session);
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
    const { data, error } = await AuthService.signIn(email, password);
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await AuthService.signUp(email, password, fullName);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await AuthService.signOut();
    return { error };
  };

  return {
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
