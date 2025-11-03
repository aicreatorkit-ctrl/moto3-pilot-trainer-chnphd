
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Main backgrounds
  background: '#F8F9FA',
  backgroundDark: '#0A0E27',
  
  // Text colors
  text: '#1A1D29',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Primary brand colors - Racing inspired
  primary: '#E10600', // Racing red
  primaryDark: '#B30500',
  primaryLight: '#FF1E00',
  
  // Accent colors
  secondary: '#FFD700', // Gold for championship
  accent: '#00D9FF', // Cyan for tech/data
  warning: '#FF9500',
  info: '#0A84FF',
  purple: '#8B5CF6',
  
  // Card and surface colors
  card: '#FFFFFF',
  cardDark: '#1F2937',
  surface: '#F3F4F6',
  surfaceElevated: '#FFFFFF',
  
  // Status colors
  success: '#00C853',
  error: '#FF3B30',
  
  // Border and divider
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Gradient colors
  gradientStart: '#E10600',
  gradientEnd: '#FF6B00',
  
  // Special highlights
  highlight: '#FFF8E1',
  highlightBlue: '#E3F2FD',
  highlightGreen: '#E8F5E9',
  highlightRed: '#FFEBEE',
  highlightPurple: '#F3E5F5',
  highlightGold: '#FFF9C4',
  
  // Racing specific
  racingRed: '#E10600',
  racingGold: '#FFD700',
  racingBlack: '#1A1D29',
  racingWhite: '#FFFFFF',
  racingCarbon: '#2C2C2C',
  
  // Performance zones
  zoneOptimal: '#00C853',
  zoneWarning: '#FF9500',
  zoneDanger: '#FF3B30',
  zoneRecovery: '#0A84FF',
};

export const gradients = {
  primary: ['#E10600', '#B30500'],
  racing: ['#E10600', '#FF6B00'],
  championship: ['#FFD700', '#FFA000'],
  success: ['#00C853', '#00E676'],
  warning: ['#FF9500', '#FF6D00'],
  error: ['#FF3B30', '#D32F2F'],
  purple: ['#8B5CF6', '#7C3AED'],
  blue: ['#0A84FF', '#0066CC'],
  cyan: ['#00D9FF', '#00B8D4'],
  sunset: ['#FF6B00', '#E10600'],
  ocean: ['#0A84FF', '#00D9FF'],
  forest: ['#00C853', '#00E676'],
  carbon: ['#2C2C2C', '#1A1D29'],
  gold: ['#FFD700', '#FFA000'],
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  colored: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  }),
  racing: {
    shadowColor: '#E10600',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...shadows.medium,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    ...shadows.large,
  },
  cardRacing: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.racingRed,
    ...shadows.medium,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  textSmall: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  buttonSecondaryText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 20,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    fontSize: 17,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
});
