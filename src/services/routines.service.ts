
import { supabase, getCurrentUser } from '@/src/config/supabase';
import { Database } from '@/src/types/database.types';

type Routine = Database['public']['Tables']['routines']['Row'];
type RoutineInsert = Database['public']['Tables']['routines']['Insert'];
type RoutineCompletion = Database['public']['Tables']['routine_completions']['Row'];
type RoutineCompletionInsert = Database['public']['Tables']['routine_completions']['Insert'];

/**
 * Service CRUD per Routine Pre/Post Allenamento
 */
export class RoutinesService {
  // Ottieni tutte le routine dell'utente
  static async getRoutines(type?: 'pre_workout' | 'post_workout'): Promise<Routine[]> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.log('Error fetching routines:', error);
      return [];
    }
  }

  // Crea una nuova routine
  static async createRoutine(routine: RoutineInsert): Promise<Routine | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('routines')
        .insert({ ...routine, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error creating routine:', error);
      return null;
    }
  }

  // Aggiorna una routine
  static async updateRoutine(id: string, updates: Partial<RoutineInsert>): Promise<Routine | null> {
    try {
      const { data, error } = await supabase
        .from('routines')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error updating routine:', error);
      return null;
    }
  }

  // Elimina una routine
  static async deleteRoutine(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('routines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.log('Error deleting routine:', error);
      return false;
    }
  }

  // Registra completamento routine
  static async completeRoutine(completion: RoutineCompletionInsert): Promise<RoutineCompletion | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('routine_completions')
        .insert({ ...completion, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error completing routine:', error);
      return null;
    }
  }

  // Ottieni completamenti per una routine
  static async getCompletions(routineId: string, dateRange?: { start: string; end: string }): Promise<RoutineCompletion[]> {
    try {
      let query = supabase
        .from('routine_completions')
        .select('*')
        .eq('routine_id', routineId)
        .order('date', { ascending: false });

      if (dateRange) {
        query = query.gte('date', dateRange.start).lte('date', dateRange.end);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.log('Error fetching completions:', error);
      return [];
    }
  }
}
