
import { supabase, isSupabaseConfigured } from '@/src/config/supabase';

/**
 * Servizio per gestire le routine
 * Funziona solo se Supabase è configurato
 */
export const RoutinesService = {
  /**
   * Ottiene tutte le routine di un tipo specifico
   */
  getRoutines: async (type: 'pre_workout' | 'post_workout') => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile caricare routine');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Error fetching routines:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.log('Exception fetching routines:', error);
      return [];
    }
  },

  /**
   * Ottiene una routine specifica
   */
  getRoutine: async (id: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile caricare routine');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log('Error fetching routine:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.log('Exception fetching routine:', error);
      return null;
    }
  },

  /**
   * Crea una nuova routine
   */
  createRoutine: async (routine: any) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile creare routine');
      return { data: null, error: new Error('Supabase non configurato') };
    }

    try {
      const { data, error } = await supabase
        .from('routines')
        .insert(routine)
        .select()
        .single();

      if (error) {
        console.log('Error creating routine:', error);
      }

      return { data, error };
    } catch (error) {
      console.log('Exception creating routine:', error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Aggiorna una routine esistente
   */
  updateRoutine: async (id: string, updates: any) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile aggiornare routine');
      return { data: null, error: new Error('Supabase non configurato') };
    }

    try {
      const { data, error } = await supabase
        .from('routines')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.log('Error updating routine:', error);
      }

      return { data, error };
    } catch (error) {
      console.log('Exception updating routine:', error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Elimina una routine
   */
  deleteRoutine: async (id: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile eliminare routine');
      return { error: new Error('Supabase non configurato') };
    }

    try {
      const { error } = await supabase
        .from('routines')
        .delete()
        .eq('id', id);

      if (error) {
        console.log('Error deleting routine:', error);
      }

      return { error };
    } catch (error) {
      console.log('Exception deleting routine:', error);
      return { error: error as Error };
    }
  },
};
