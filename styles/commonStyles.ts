
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Main backgrounds
  background: '#F8F9FA',
  backgroundDark: '#0A0E27',
  
  // Text colors
  text: '#1A1D29',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Primary brand colors
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#60A5FA',
  
  // Accent colors
  secondary: '#EF4444',
  accent: '#10B981',
  warning: '#F59E0B',
  info: '#06B6D4',
  purple: '#8B5CF6',
  
  // Card and surface colors
  card: '#FFFFFF',
  cardDark: '#1F2937',
  surface: '#F3F4F6',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  
  // Border and divider
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Gradient colors
  gradientStart: '#3B82F6',
  gradientEnd: '#8B5CF6',
  
  // Special highlights
  highlight: '#FEF3C7',
  highlightBlue: '#DBEAFE',
  highlightGreen: '#D1FAE5',
  highlightRed: '#FEE2E2',
  highlightPurple: '#EDE9FE',
};

export const gradients = {
  primary: ['#3B82F6', '#2563EB'],
  success: ['#10B981', '#059669'],
  warning: ['#F59E0B', '#D97706'],
  error: ['#EF4444', '#DC2626'],
  purple: ['#8B5CF6', '#7C3AED'],
  blue: ['#06B6D4', '#0891B2'],
  sunset: ['#F59E0B', '#EF4444'],
  ocean: ['#3B82F6', '#06B6D4'],
  forest: ['#10B981', '#059669'],
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  colored: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  }),
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...shadows.medium,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    ...shadows.large,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  textSmall: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
});
