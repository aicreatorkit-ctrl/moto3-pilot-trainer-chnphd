
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';

interface MacroCardProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

/**
 * Card per visualizzare macro nutrienti
 */
export const MacroCard: React.FC<MacroCardProps> = ({ label, current, target, unit, color }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isOver = current > target;

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.values}>
        <Text style={[styles.current, isOver && styles.over]}>{current}</Text>
        <Text style={styles.separator}>/</Text>
        <Text style={styles.target}>{target}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%`, backgroundColor: isOver ? colors.warning : color }
          ]} 
        />
      </View>
      <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  values: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  current: {
    ...typography.title,
    color: colors.text,
    fontWeight: '800',
  },
  over: {
    color: colors.warning,
  },
  separator: {
    ...typography.heading,
    color: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  target: {
    ...typography.heading,
    color: colors.textSecondary,
  },
  unit: {
    ...typography.caption,
    color: colors.textLight,
    marginLeft: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
