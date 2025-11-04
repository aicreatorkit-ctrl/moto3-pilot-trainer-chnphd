
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { cooldownExercises } from '@/data/trainingData';

export default function CooldownScreen() {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const toggleExercise = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Raffreddamento Post-Allenamento',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.headerCard]}>
            <IconSymbol name="figure.cooldown" size={40} color={colors.primary} />
            <Text style={styles.headerTitle}>Protocollo Defaticamento</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 10-15 minuti{'\n'}
              Essenziale per il recupero ottimale
            </Text>
          </View>

          {cooldownExercises.map((exercise) => (
            <Pressable
              key={exercise.id}
              style={[
                commonStyles.card,
                styles.exerciseCard,
                completedExercises.includes(exercise.id) && styles.exerciseCardCompleted,
              ]}
              onPress={() => toggleExercise(exercise.id)}
            >
              <View style={styles.exerciseHeader}>
                <View style={[
                  styles.exerciseCheckbox,
                  completedExercises.includes(exercise.id) && styles.exerciseCheckboxChecked,
                ]}>
                  {completedExercises.includes(exercise.id) && (
                    <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>
              
              {exercise.duration && (
                <View style={styles.detailItem}>
                  <IconSymbol name="clock.fill" size={16} color={colors.primary} />
                  <Text style={styles.detailText}>{Math.floor(exercise.duration / 60)} minuti</Text>
                </View>
              )}
              
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
              )}
            </Pressable>
          ))}

          <View style={[commonStyles.card, styles.tipsCard]}>
            <Text style={styles.tipsTitle}>Benefici del Defaticamento</Text>
            <Text style={styles.tipsText}>
              - Riduce l&apos;accumulo di acido lattico{'\n'}
              - Previene rigidità muscolare{'\n'}
              - Favorisce il recupero cardiovascolare{'\n'}
              - Migliora la flessibilità
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  exerciseCard: {
    marginBottom: 12,
  },
  exerciseCardCompleted: {
    opacity: 0.6,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseCheckboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 6,
  },
  exerciseNotes: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  tipsCard: {
    marginTop: 8,
    backgroundColor: colors.highlight,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
});
