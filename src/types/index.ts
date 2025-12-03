
// Export centralizzato di tutti i types
export * from './database.types';

// Types per UI e business logic
export interface TimerState {
  isRunning: boolean;
  seconds: number;
  intervalId?: NodeJS.Timeout;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ProgressMetrics {
  weight: ChartDataPoint[];
  hrv: ChartDataPoint[];
  sleep: ChartDataPoint[];
  energy: ChartDataPoint[];
}

export interface ExportOptions {
  dateRange: {
    start: string;
    end: string;
  };
  includeRoutines: boolean;
  includeNutrition: boolean;
  includeMorningChecks: boolean;
  includeWorkouts: boolean;
}
