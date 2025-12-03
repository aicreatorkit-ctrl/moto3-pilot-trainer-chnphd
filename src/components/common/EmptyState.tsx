
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, typography } from '@/styles/commonStyles';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

/**
 * Empty state component per liste vuote
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <View style={styles.container}>
      <IconSymbol 
        ios_icon_name={icon as any} 
        android_material_icon_name={icon} 
        size={64} 
        color={colors.textLight} 
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.xxl,
  },
});
