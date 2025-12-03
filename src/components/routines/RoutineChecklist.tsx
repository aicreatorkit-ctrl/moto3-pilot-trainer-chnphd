
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, typography, borderRadius } from '@/styles/commonStyles';
import { RoutineItem } from '@/src/types/database.types';

interface RoutineChecklistProps {
  items: RoutineItem[];
  completedItems: string[];
  onToggleItem: (itemId: string) => void;
}

/**
 * Checklist interattiva per routine
 */
export const RoutineChecklist: React.FC<RoutineChecklistProps> = ({ 
  items, 
  completedItems, 
  onToggleItem 
}) => {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <ScrollView style={styles.container}>
      {sortedItems.map((item, index) => {
        const isCompleted = completedItems.includes(item.id);
        
        return (
          <TouchableOpacity
            key={index}
            style={[styles.item, isCompleted && styles.itemCompleted]}
            onPress={() => onToggleItem(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
              {isCompleted && (
                <IconSymbol 
                  ios_icon_name="checkmark" 
                  android_material_icon_name="check" 
                  size={18} 
                  color={colors.textInverse} 
                />
              )}
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
                {item.title}
              </Text>
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
              {item.duration_seconds && (
                <Text style={styles.duration}>
                  ⏱️ {Math.floor(item.duration_seconds / 60)}:{(item.duration_seconds % 60).toString().padStart(2, '0')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  itemCompleted: {
    backgroundColor: colors.highlightGreen,
    borderColor: colors.success,
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
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  duration: {
    ...typography.small,
    color: '#FF4444',
    fontWeight: '600',
  },
});
