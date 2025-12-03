
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { Database } from '@/src/types/database.types';

type Routine = Database['public']['Tables']['routines']['Row'];

interface RoutineCardProps {
  routine: Routine;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Card per visualizzare una routine
 */
export const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onPress, onEdit, onDelete }) => {
  const typeIcon = routine.type === 'pre_workout' ? 'flame.fill' : 'moon.stars.fill';
  const typeAndroidIcon = routine.type === 'pre_workout' ? 'local_fire_department' : 'nightlight';
  const typeColor = routine.type === 'pre_workout' ? '#FF4444' : '#00D9FF';

  return (
    <Card>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={[styles.iconBadge, { backgroundColor: `${typeColor}20` }]}>
              <IconSymbol 
                ios_icon_name={typeIcon as any} 
                android_material_icon_name={typeAndroidIcon} 
                size={24} 
                color={typeColor} 
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{routine.title}</Text>
              <Text style={styles.subtitle}>
                {routine.items.length} {routine.items.length === 1 ? 'elemento' : 'elementi'}
              </Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <IconSymbol 
                ios_icon_name="pencil" 
                android_material_icon_name="edit" 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <IconSymbol 
                ios_icon_name="trash" 
                android_material_icon_name="delete" 
                size={20} 
                color={colors.error} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preview items */}
        {routine.items.slice(0, 3).map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemDot} />
            <Text style={styles.itemText} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        ))}
        
        {routine.items.length > 3 && (
          <Text style={styles.moreItems}>
            +{routine.items.length - 3} altri elementi
          </Text>
        )}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    marginRight: spacing.md,
  },
  itemText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  moreItems: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
