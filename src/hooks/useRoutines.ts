
import { useState, useEffect } from 'react';
import { RoutinesService } from '@/src/services/routines.service';
import { Database } from '@/src/types/database.types';

type Routine = Database['public']['Tables']['routines']['Row'];

/**
 * Hook per gestire le routine
 */
export const useRoutines = (type?: 'pre_workout' | 'post_workout') => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRoutines = async () => {
    try {
      const data = await RoutinesService.getRoutines(type);
      setRoutines(data);
    } catch (error) {
      console.log('Error loading routines:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRoutines();
  }, [type]);

  const refresh = () => {
    setRefreshing(true);
    loadRoutines();
  };

  const createRoutine = async (routine: Database['public']['Tables']['routines']['Insert']) => {
    const newRoutine = await RoutinesService.createRoutine(routine);
    if (newRoutine) {
      setRoutines([newRoutine, ...routines]);
    }
    return newRoutine;
  };

  const updateRoutine = async (id: string, updates: Partial<Database['public']['Tables']['routines']['Insert']>) => {
    const updated = await RoutinesService.updateRoutine(id, updates);
    if (updated) {
      setRoutines(routines.map(r => r.id === id ? updated : r));
    }
    return updated;
  };

  const deleteRoutine = async (id: string) => {
    const success = await RoutinesService.deleteRoutine(id);
    if (success) {
      setRoutines(routines.filter(r => r.id !== id));
    }
    return success;
  };

  return {
    routines,
    loading,
    refreshing,
    refresh,
    createRoutine,
    updateRoutine,
    deleteRoutine,
  };
};
