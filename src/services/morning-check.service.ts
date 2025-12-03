
import { supabase, getCurrentUser } from '@/src/config/supabase';
import { Database } from '@/src/types/database.types';

type MorningCheck = Database['public']['Tables']['morning_checks']['Row'];
type MorningCheckInsert = Database['public']['Tables']['morning_checks']['Insert'];

/**
 * Service CRUD per Check Mattutina
 */
export class MorningCheckService {
  // Registra check mattutina
  static async createCheck(check: MorningCheckInsert): Promise<MorningCheck | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('morning_checks')
        .insert({ ...check, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error creating morning check:', error);
      return null;
    }
  }

  // Ottieni check per data
  static async getCheckByDate(date: string): Promise<MorningCheck | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('morning_checks')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.log('Error fetching morning check:', error);
      return null;
    }
  }

  // Ottieni storico checks
  static async getChecksHistory(dateRange: { start: string; end: string }): Promise<MorningCheck[]> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('morning_checks')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', dateRange.start)
        .lte('date', dateRange.end)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.log('Error fetching checks history:', error);
      return [];
    }
  }

  // Aggiorna check
  static async updateCheck(id: string, updates: Partial<MorningCheckInsert>): Promise<MorningCheck | null> {
    try {
      const { data, error } = await supabase
        .from('morning_checks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error updating morning check:', error);
      return null;
    }
  }
}
