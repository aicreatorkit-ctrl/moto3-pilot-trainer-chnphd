
import { useState, useEffect, useCallback } from 'react';
import { ProgressService } from '@/src/services/progress.service';
import { isSupabaseConfigured } from '@/src/config/constants';

interface DateRange {
  start: string;
  end: string;
}

interface ProgressMetrics {
  sleep: { date: string; value: number }[];
  energy: { date: string; value: number }[];
  weight: { date: string; value: number }[];
  hrv: { date: string; value: number }[];
}

/**
 * Hook per gestire i dati di progresso
 * Funziona anche senza Supabase (restituisce dati vuoti)
 */
export const useProgress = (dateRange: DateRange) => {
  const [metrics, setMetrics] = useState<ProgressMetrics>({
    sleep: [],
    energy: [],
    weight: [],
    hrv: [],
  });
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  const loadMetrics = useCallback(async () => {
    const isConfigured = isSupabaseConfigured();
    setConfigured(isConfigured);
    
    if (!isConfigured) {
      console.log('Supabase non configurato - nessun dato di progresso');
      setMetrics({
        sleep: [],
        energy: [],
        weight: [],
        hrv: [],
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await ProgressService.getMetrics(dateRange.start, dateRange.end);
      setMetrics(data || {
        sleep: [],
        energy: [],
        weight: [],
        hrv: [],
      });
    } catch (error) {
      console.log('Error loading progress metrics:', error);
      setMetrics({
        sleep: [],
        energy: [],
        weight: [],
        hrv: [],
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange.start, dateRange.end]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  return {
    metrics,
    loading,
    configured,
    refresh: loadMetrics,
  };
};
