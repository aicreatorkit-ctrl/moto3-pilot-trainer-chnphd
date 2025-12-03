
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Button } from '@/src/components/common/Button';
import { EmptyState } from '@/src/components/common/EmptyState';
import { RoutineCard } from '@/src/components/routines/RoutineCard';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { useRoutines } from '@/src/hooks/useRoutines';

/**
 * Routines Screen - Gestione routine pre/post allenamento
 */
export const RoutinesScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'pre_workout' | 'post_workout'>('pre_workout');
  const { routines, loading, refresh } = useRoutines(selectedType);

  return (
    <View style={styles.container}>
      {/* Header con tabs */}
      <View style={styles.header}>
        <Text style={styles.title}>Routine</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedType === 'pre_workout' && styles.tabActive]}
            onPress={() => setSelectedType('pre_workout')}
          >
            <IconSymbol 
              ios_icon_name="flame.fill" 
              android_material_icon_name="local_fire_department" 
              size={20} 
              color={selectedType === 'pre_workout' ? colors.textInverse : colors.textSecondary} 
            />
            <Text style={[styles.tabText, selectedType === 'pre_workout' && styles.tabTextActive]}>
              Pre-Allenamento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedType === 'post_workout' && styles.tabActive]}
            onPress={() => setSelectedType('post_workout')}
          >
            <IconSymbol 
              ios_icon_name="moon.stars.fill" 
              android_material_icon_name="nightlight" 
              size={20} 
              color={selectedType === 'post_workout' ? colors.textInverse : colors.textSecondary} 
            />
            <Text style={[styles.tabText, selectedType === 'post_workout' && styles.tabTextActive]}>
              Post-Allenamento
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista routine */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <View style={{ display: 'none' }} />
        }
      >
        {loading ? (
          <Text style={styles.loading}>Caricamento...</Text>
        ) : routines.length === 0 ? (
          <EmptyState
            icon="list.bullet"
            title="Nessuna routine"
            description={`Crea la tua prima routine ${selectedType === 'pre_workout' ? 'pre' : 'post'}-allenamento`}
            action={
              <Button
                title="Crea Routine"
                onPress={() => console.log('Create routine')}
                variant="primary"
              />
            }
          />
        ) : (
          <>
            {routines.map((routine, index) => (
              <RoutineCard
                key={index}
                routine={routine}
                onPress={() => console.log('Open routine:', routine.id)}
                onEdit={() => console.log('Edit routine:', routine.id)}
                onDelete={() => console.log('Delete routine:', routine.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* FAB per creare nuova routine */}
      {routines.length > 0 && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => console.log('Create new routine')}
          activeOpacity={0.8}
        >
          <IconSymbol 
            ios_icon_name="plus" 
            android_material_icon_name="add" 
            size={28} 
            color={colors.textInverse} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xl,
    paddingTop: 48, // Android notch
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    gap: spacing.sm,
  },
  tabActive: {
    backgroundColor: '#FF4444',
  },
  tabText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.textInverse,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100, // Spazio per bottom tab
  },
  loading: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxxl,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: 100, // Sopra la bottom tab
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
