
import { supabase, getCurrentUser } from '@/src/config/supabase';
import { Database } from '@/src/types/database.types';

type MorningCheck = Database['public']['Tables']['morning_checks']['Row'];
type MorningCheckInsert = Database['public']['Tables']['morning_checks']['Insert'];

/**
 * Service CRUD per Check Mattutina
 */
export class MorningCheckService {
  // Ottieni check di oggi
  static async getTodayCheck(): Promise<MorningCheck | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('morning_checks')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log('Error fetching today check:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in getTodayCheck:', error);
      return null;
    }
  }

  // Crea o aggiorna check mattutina
  static async saveCheck(check: MorningCheckInsert): Promise<MorningCheck | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      const { data, error } = await supabase
        .from('morning_checks')
        .upsert({ ...check, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.log('Error saving check:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in saveCheck:', error);
      return null;
    }
  }

  // Ottieni storico check
  static async getChecksHistory(dateRange: { start: string; end: string }): Promise<MorningCheck[]> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return [];
      }

      const { data, error } = await supabase
        .from('morning_checks')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', dateRange.start)
        .lte('date', dateRange.end)
        .order('date', { ascending: true });

      if (error) {
        console.log('Error fetching checks history:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.log('Error in getChecksHistory:', error);
      return [];
    }
  }

  // Elimina check
  static async deleteCheck(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('morning_checks')
        .delete()
        .eq('id', id);

      if (error) {
        console.log('Error deleting check:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.log('Error in deleteCheck:', error);
      return false;
    }
  }
}
