
/**
 * Costanti dell'applicazione
 */

export const APP_NAME = 'Race Performance Tracker';
export const APP_VERSION = '1.0.0';

// Racing theme colors
export const RACING_COLORS = {
  red: '#FF4444',
  black: '#2C2C2C',
  cyan: '#00D9FF',
  white: '#FFFFFF',
};

// Performance zones
export const PERFORMANCE_ZONES = {
  optimal: { min: 8, max: 10, color: '#00C853' },
  good: { min: 6, max: 7, color: '#FFD700' },
  warning: { min: 4, max: 5, color: '#FF9500' },
  danger: { min: 0, max: 3, color: '#FF3B30' },
};

// Default values
export const DEFAULT_NUTRITION_TARGETS = {
  calories: 2500,
  protein: 150,
  carbs: 250,
  fats: 80,
};

// Date formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Supabase check - always configured with actual credentials
export const isSupabaseConfigured = () => {
  return true; // Always true since we have actual credentials
};
