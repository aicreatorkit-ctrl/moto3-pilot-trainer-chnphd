
import { supabase, isSupabaseConfigured } from '@/src/config/supabase';

/**
 * Servizio per gestire i dati di progresso
 * Funziona solo se Supabase è configurato
 */
export const ProgressService = {
  /**
   * Ottiene le metriche di progresso per un range di date
   */
  getMetrics: async (startDate: string, endDate: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile caricare metriche');
      return {
        sleep: [],
        energy: [],
        weight: [],
        hrv: [],
      };
    }

    try {
      const { data, error } = await supabase
        .from('morning_checks')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) {
        console.log('Error fetching metrics:', error);
        return {
          sleep: [],
          energy: [],
          weight: [],
          hrv: [],
        };
      }

      // Trasforma i dati per i grafici
      const metrics = {
        sleep: data?.map(d => ({ date: d.date, value: d.sleep_quality || 0 })) || [],
        energy: data?.map(d => ({ date: d.date, value: d.energy_level || 0 })) || [],
        weight: data?.map(d => ({ date: d.date, value: d.weight || 0 })) || [],
        hrv: data?.map(d => ({ date: d.date, value: d.hrv || 0 })) || [],
      };

      return metrics;
    } catch (error) {
      console.log('Exception fetching metrics:', error);
      return {
        sleep: [],
        energy: [],
        weight: [],
        hrv: [],
      };
    }
  },

  /**
   * Salva una check mattutina
   */
  saveMorningCheck: async (checkData: any) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.log('Supabase non configurato - impossibile salvare check');
      return { data: null, error: new Error('Supabase non configurato') };
    }

    try {
      const { data, error } = await supabase
        .from('morning_checks')
        .insert(checkData)
        .select()
        .single();

      if (error) {
        console.log('Error saving morning check:', error);
      }

      return { data, error };
    } catch (error) {
      console.log('Exception saving morning check:', error);
      return { data: null, error: error as Error };
    }
  },
};
