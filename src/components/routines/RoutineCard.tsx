
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '@/src/components/common/Card';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { Database } from '@/src/types/database.types';

type Routine = Database['public']['Tables']['routines']['Row'];

interface RoutineCardProps {
  routine: Routine;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Card per visualizzare una routine
 */
export const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onPress, onEdit, onDelete }) => {
  const icon = routine.type === 'pre_workout' ? 'flame.fill' : 'moon.stars.fill';
  const iconColor = routine.type === 'pre_workout' ? '#FF4444' : '#00D9FF';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="racing">
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <IconSymbol 
              ios_icon_name={icon as any} 
              android_material_icon_name={routine.type === 'pre_workout' ? 'local_fire_department' : 'nightlight'} 
              size={24} 
              color={iconColor} 
            />
            <Text style={styles.title}>{routine.title}</Text>
          </View>
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                <IconSymbol 
                  ios_icon_name="pencil" 
                  android_material_icon_name="edit" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                <IconSymbol 
                  ios_icon_name="trash" 
                  android_material_icon_name="delete" 
                  size={20} 
                  color={colors.error} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.itemCount}>{routine.items.length} esercizi</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {routine.type === 'pre_workout' ? 'PRE-ALLENAMENTO' : 'POST-ALLENAMENTO'}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
  },
  itemCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: '#FF4444',
    borderRadius: 12,
  },
  badgeText: {
    ...typography.small,
    color: colors.textInverse,
    fontWeight: '700',
  },
});
