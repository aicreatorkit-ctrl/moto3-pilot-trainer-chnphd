
import { supabase, getCurrentUser } from '@/src/config/supabase';
import { Database } from '@/src/types/database.types';

type NutritionPlan = Database['public']['Tables']['nutrition_plans']['Row'];
type NutritionPlanInsert = Database['public']['Tables']['nutrition_plans']['Insert'];
type DailyNutrition = Database['public']['Tables']['daily_nutrition']['Row'];
type DailyNutritionInsert = Database['public']['Tables']['daily_nutrition']['Insert'];

/**
 * Service CRUD per Nutrizione
 */
export class NutritionService {
  // Ottieni piano attivo
  static async getActivePlan(): Promise<NutritionPlan | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      const { data, error } = await supabase
        .from('nutrition_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log('Error fetching active plan:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in getActivePlan:', error);
      return null;
    }
  }

  // Crea piano nutrizionale
  static async createPlan(plan: NutritionPlanInsert): Promise<NutritionPlan | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      // Disattiva altri piani se questo è attivo
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

      if (error) {
        console.log('Error creating plan:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in createPlan:', error);
      return null;
    }
  }

  // Ottieni nutrizione di oggi
  static async getTodayNutrition(): Promise<DailyNutrition | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log('Error fetching today nutrition:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in getTodayNutrition:', error);
      return null;
    }
  }

  // Salva nutrizione giornaliera
  static async saveDailyNutrition(nutrition: DailyNutritionInsert): Promise<DailyNutrition | null> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return null;
      }

      const { data, error } = await supabase
        .from('daily_nutrition')
        .upsert({ ...nutrition, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.log('Error saving daily nutrition:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.log('Error in saveDailyNutrition:', error);
      return null;
    }
  }

  // Ottieni storico nutrizione
  static async getNutritionHistory(dateRange: { start: string; end: string }): Promise<DailyNutrition[]> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log('User not authenticated');
        return [];
      }

      const { data, error } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', dateRange.start)
        .lte('date', dateRange.end)
        .order('date', { ascending: true });

      if (error) {
        console.log('Error fetching nutrition history:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.log('Error in getNutritionHistory:', error);
      return [];
    }
  }
}
