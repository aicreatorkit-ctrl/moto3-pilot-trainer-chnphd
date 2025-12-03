
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/styles/commonStyles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'racing';
}

/**
 * Card component riutilizzabile con varianti
 */
export const Card: React.FC<CardProps> = ({ children, style, variant = 'default' }) => {
  const cardStyle = variant === 'elevated' 
    ? styles.cardElevated 
    : variant === 'racing'
    ? styles.cardRacing
    : styles.card;

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    ...shadows.large,
  },
  cardRacing: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
    ...shadows.medium,
  },
});
