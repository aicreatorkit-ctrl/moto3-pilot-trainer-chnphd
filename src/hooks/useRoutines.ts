
import { useState, useEffect } from 'react';
import { RoutinesService } from '@/src/services/routines.service';
import { isSupabaseConfigured } from '@/src/config/constants';

/**
 * Hook per gestire le routine
 * Funziona anche senza Supabase (restituisce array vuoto)
 */
export const useRoutines = (type: 'pre_workout' | 'post_workout') => {
  const [routines, setRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    loadRoutines();
  }, [type]);

  const loadRoutines = async () => {
    const isConfigured = isSupabaseConfigured();
    setConfigured(isConfigured);
    
    if (!isConfigured) {
      console.log('Supabase non configurato - nessuna routine da caricare');
      setRoutines([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await RoutinesService.getRoutines(type);
      setRoutines(data || []);
    } catch (error) {
      console.log('Error loading routines:', error);
      setRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadRoutines();
  };

  return {
    routines,
    loading,
    configured,
    refresh,
  };
};
