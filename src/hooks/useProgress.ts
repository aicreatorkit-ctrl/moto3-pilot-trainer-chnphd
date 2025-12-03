
import { useState, useEffect } from 'react';
import { ProgressService } from '@/src/services/progress.service';
import { ProgressMetrics } from '@/src/types';

/**
 * Hook per caricare dati di progresso
 */
export const useProgress = (dateRange: { start: string; end: string }) => {
  const [metrics, setMetrics] = useState<ProgressMetrics>({
    weight: [],
    hrv: [],
    sleep: [],
    energy: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, [dateRange.start, dateRange.end]);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await ProgressService.getProgressMetrics(dateRange);
      setMetrics(data);
    } catch (error) {
      console.log('Error loading progress metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading,
    refresh: loadMetrics,
  };
};
