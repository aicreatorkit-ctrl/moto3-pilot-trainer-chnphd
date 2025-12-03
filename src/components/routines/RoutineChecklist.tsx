
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { RoutineItem } from '@/src/types/database.types';

interface RoutineChecklistProps {
  items: RoutineItem[];
  completedItems: string[];
  onToggleItem: (itemId: string) => void;
}

/**
 * Checklist per completare routine
 */
export const RoutineChecklist: React.FC<RoutineChecklistProps> = ({ 
  items, 
  completedItems, 
  onToggleItem 
}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isCompleted = completedItems.includes(item.id);
        
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => onToggleItem(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
              {isCompleted && (
                <IconSymbol 
                  ios_icon_name="checkmark" 
                  android_material_icon_name="check" 
                  size={20} 
                  color={colors.textInverse} 
                />
              )}
            </View>
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, isCompleted && styles.itemTitleCompleted]}>
                {item.title}
              </Text>
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}
              {item.duration_seconds && (
                <Text style={styles.itemDuration}>
                  {Math.floor(item.duration_seconds / 60)}:{(item.duration_seconds % 60).toString().padStart(2, '0')} min
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: '#FF4444',
    borderColor: '#FF4444',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  itemTitleCompleted: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  itemDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  itemDuration: {
    ...typography.small,
    color: '#FF4444',
    fontWeight: '600',
  },
});
