
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { stretchingExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';

const STORAGE_KEY = '@moto3_custom_stretching';

export default function StretchingScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(stretchingExercises);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setExercises(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading stretching exercises:', error);
    }
  };

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
          title: 'Stretching Dedicato',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.headerCard]}>
            <IconSymbol name="figure.flexibility" size={40} color={colors.accent} />
            <Text style={styles.headerTitle}>Protocollo Stretching</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 20-30 minuti{'\n'}
              Ideale per i giorni di riposo
            </Text>
          </View>

          {exercises.map((exercise) => (
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
              
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
              )}
            </Pressable>
          ))}

          <View style={[commonStyles.card, styles.tipsCard]}>
            <Text style={styles.tipsTitle}>Linee Guida Stretching</Text>
            <Text style={styles.tipsText}>
              - Non rimbalzare durante l&apos;allungamento{'\n'}
              - Respira profondamente e rilassati{'\n'}
              - Senti tensione ma non dolore{'\n'}
              - Mantieni ogni posizione per 30 secondi{'\n'}
              - Esegui su entrambi i lati
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
