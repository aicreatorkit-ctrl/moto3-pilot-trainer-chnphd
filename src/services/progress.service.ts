
import { MorningCheckService } from './morning-check.service';
import { NutritionService } from './nutrition.service';
import { RoutinesService } from './routines.service';
import { ProgressMetrics, ChartDataPoint } from '@/src/types';

/**
 * Service per aggregare dati di progresso da varie fonti
 */
export class ProgressService {
  // Ottieni metriche aggregate per dashboard
  static async getProgressMetrics(dateRange: { start: string; end: string }): Promise<ProgressMetrics> {
    try {
      // Fetch dati da varie tabelle
      const [morningChecks, nutritionHistory] = await Promise.all([
        MorningCheckService.getChecksHistory(dateRange),
        NutritionService.getNutritionHistory(dateRange),
      ]);

      // Trasforma in chart data
      const weight: ChartDataPoint[] = morningChecks
        .filter(c => c.weight !== null)
        .map(c => ({
          date: c.date,
          value: c.weight!,
          label: `${c.weight} kg`,
        }));

      const hrv: ChartDataPoint[] = morningChecks
        .filter(c => c.hrv !== null)
        .map(c => ({
          date: c.date,
          value: c.hrv!,
          label: `${c.hrv} ms`,
        }));

      const sleep: ChartDataPoint[] = morningChecks.map(c => ({
        date: c.date,
        value: c.sleep_quality,
        label: `${c.sleep_quality}/10`,
      }));

      const energy: ChartDataPoint[] = morningChecks.map(c => ({
        date: c.date,
        value: c.energy,
        label: `${c.energy}/10`,
      }));

      return { weight, hrv, sleep, energy };
    } catch (error) {
      console.log('Error fetching progress metrics:', error);
      return { weight: [], hrv: [], sleep: [], energy: [] };
    }
  }

  // Calcola statistiche settimanali
  static async getWeeklyStats(weekStart: string) {
    try {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const dateRange = {
        start: weekStart,
        end: weekEnd.toISOString().split('T')[0],
      };

      const morningChecks = await MorningCheckService.getChecksHistory(dateRange);
      
      // Calcola medie
      const avgSleep = morningChecks.reduce((sum, c) => sum + c.sleep_quality, 0) / morningChecks.length || 0;
      const avgEnergy = morningChecks.reduce((sum, c) => sum + c.energy, 0) / morningChecks.length || 0;
      const avgMood = morningChecks.reduce((sum, c) => sum + c.mood, 0) / morningChecks.length || 0;

      return {
        checksCompleted: morningChecks.length,
        avgSleep: Math.round(avgSleep * 10) / 10,
        avgEnergy: Math.round(avgEnergy * 10) / 10,
        avgMood: Math.round(avgMood * 10) / 10,
      };
    } catch (error) {
      console.log('Error calculating weekly stats:', error);
      return null;
    }
  }
}
