
/**
 * Hook for exporting and importing app data
 */

import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { exportAppData, importAppData, exportAsCSV, shareData } from '@/utils/fileExport';

export interface UseDataExportResult {
  isExporting: boolean;
  isImporting: boolean;
  error: Error | null;
  exportData: () => Promise<void>;
  importData: (file: File) => Promise<void>;
  exportCSV: (data: Array<Record<string, unknown>>, filename: string) => Promise<void>;
  share: (options: { title?: string; text?: string; url?: string }) => Promise<void>;
  clearError: () => void;
}

export const useDataExport = (): UseDataExportResult => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportData = useCallback(async () => {
    setIsExporting(true);
    setError(null);
    try {
      await exportAppData();
      console.log('Data exported successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const importData = useCallback(async (file: File) => {
    if (Platform.OS !== 'web') {
      setError(new Error('Import is only supported on web platform'));
      return;
    }

    setIsImporting(true);
    setError(null);
    try {
      await importAppData(file);
      console.log('Data imported successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
    }
  }, []);

  const exportCSV = useCallback(async (
    data: Array<Record<string, unknown>>,
    filename: string
  ) => {
    setIsExporting(true);
    setError(null);
    try {
      await exportAsCSV(data, filename);
      console.log('CSV exported successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('CSV export error:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const share = useCallback(async (options: {
    title?: string;
    text?: string;
    url?: string;
  }) => {
    setError(null);
    try {
      await shareData(options);
      console.log('Data shared successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Share error:', error);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isExporting,
    isImporting,
    error,
    exportData,
    importData,
    exportCSV,
    share,
    clearError,
  };
};
