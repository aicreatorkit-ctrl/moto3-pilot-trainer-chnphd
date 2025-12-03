
import { supabase, getCurrentUser } from '@/src/config/supabase';
import { Database } from '@/src/types/database.types';

type NutritionPlan = Database['public']['Tables']['nutrition_plans']['Row'];
type NutritionPlanInsert = Database['public']['Tables']['nutrition_plans']['Insert'];
type DailyNutrition = Database['public']['Tables']['daily_nutrition']['Row'];
type DailyNutritionInsert = Database['public']['Tables']['daily_nutrition']['Insert'];

/**
 * Service CRUD per Diario Alimentare
 */
export class NutritionService {
  // Ottieni tutti i piani nutrizionali
  static async getPlans(): Promise<NutritionPlan[]> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('nutrition_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.log('Error fetching nutrition plans:', error);
      return [];
    }
  }

  // Ottieni piano attivo
  static async getActivePlan(): Promise<NutritionPlan | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('nutrition_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error fetching active plan:', error);
      return null;
    }
  }

  // Crea piano nutrizionale
  static async createPlan(plan: NutritionPlanInsert): Promise<NutritionPlan | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      // Se il piano è attivo, disattiva gli altri
      if (plan.is_active) {
        await supabase
          .from('nutrition_plans')
          .update({ is_active: false })
          .eq('user_id', user.id);
      }

      const { data, error } = await supabase
        .from('nutrition_plans')
        .insert({ ...plan, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error creating nutrition plan:', error);
      return null;
    }
  }

  // Aggiorna piano
  static async updatePlan(id: string, updates: Partial<NutritionPlanInsert>): Promise<NutritionPlan | null> {
    try {
      const { data, error } = await supabase
        .from('nutrition_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error updating nutrition plan:', error);
      return null;
    }
  }

  // Registra nutrizione giornaliera
  static async logDailyNutrition(nutrition: DailyNutritionInsert): Promise<DailyNutrition | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('daily_nutrition')
        .insert({ ...nutrition, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Error logging daily nutrition:', error);
      return null;
    }
  }

  // Ottieni nutrizione per data
  static async getDailyNutrition(date: string): Promise<DailyNutrition | null> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      return data;
    } catch (error) {
      console.log('Error fetching daily nutrition:', error);
      return null;
    }
  }

  // Ottieni storico nutrizione
  static async getNutritionHistory(dateRange: { start: string; end: string }): Promise<DailyNutrition[]> {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', dateRange.start)
        .lte('date', dateRange.end)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.log('Error fetching nutrition history:', error);
      return [];
    }
  }
}
