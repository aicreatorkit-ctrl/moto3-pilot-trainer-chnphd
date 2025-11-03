
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { warmupExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = '@moto3_custom_warmup';

interface ExerciseCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

export default function WarmupScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(warmupExercises);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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
      console.log('Error loading warmup exercises:', error);
    }
  };

  const toggleExercise = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const showDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowDetailModal(true);
  };

  const categories: ExerciseCategory[] = [
    {
      id: 'cardio',
      title: 'Attivazione Cardiovascolare',
      icon: 'heart.fill',
      color: '#ef4444',
      exercises: exercises.filter(e => e.id === 'w1' || e.id === 'w8'),
    },
    {
      id: 'upper',
      title: 'Mobilità Parte Superiore',
      icon: 'figure.arms.open',
      color: '#3b82f6',
      exercises: exercises.filter(e => e.id === 'w2' || e.id === 'w3'),
    },
    {
      id: 'core',
      title: 'Core e Bacino',
      icon: 'figure.core.training',
      color: '#8b5cf6',
      exercises: exercises.filter(e => e.id === 'w4' || e.id === 'w7'),
    },
    {
      id: 'lower',
      title: 'Attivazione Parte Inferiore',
      icon: 'figure.walk',
      color: '#10b981',
      exercises: exercises.filter(e => e.id === 'w5' || e.id === 'w6'),
    },
  ];

  const completedCount = completedExercises.length;
  const totalCount = exercises.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Riscaldamento Pre-Allenamento',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Progress */}
          <LinearGradient
            colors={['#f59e0b', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="flame.fill" size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Protocollo Riscaldamento</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 15-20 minuti{'\n'}
              Esegui in sequenza prima di ogni allenamento
            </Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {completedCount} di {totalCount} esercizi completati
              </Text>
            </View>
          </LinearGradient>

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoHeader}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
              <Text style={styles.infoTitle}>Obiettivi del Riscaldamento</Text>
            </View>
            <Text style={styles.infoText}>
              • Aumentare temperatura corporea di 1-2°C{'\n'}
              • Attivare sistema cardiovascolare e nervoso{'\n'}
              • Preparare articolazioni e muscoli allo sforzo{'\n'}
              • Ridurre rischio infortuni fino al 50%{'\n'}
              • Migliorare prestazioni del 10-15%
            </Text>
          </View>

          {/* Exercise Categories */}
          {categories.map((category, categoryIndex) => (
            <View key={category.id} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                  <IconSymbol name={category.icon as any} size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {category.exercises.filter(e => completedExercises.includes(e.id)).length}/{category.exercises.length}
                  </Text>
                </View>
              </View>

              {category.exercises.map((exercise, index) => (
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
                    <View style={styles.exerciseNumber}>
                      <Text style={styles.exerciseNumberText}>
                        {categoryIndex * 2 + index + 1}
                      </Text>
                    </View>
                    <View style={[
                      styles.exerciseCheckbox,
                      completedExercises.includes(exercise.id) && styles.exerciseCheckboxChecked,
                    ]}>
                      {completedExercises.includes(exercise.id) && (
                        <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <View style={styles.exerciseContent}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <View style={styles.exerciseDetails}>
                        {exercise.duration && (
                          <View style={styles.detailItem}>
                            <IconSymbol name="clock.fill" size={14} color={category.color} />
                            <Text style={styles.detailText}>
                              {exercise.duration >= 60 
                                ? `${Math.floor(exercise.duration / 60)} min` 
                                : `${exercise.duration} sec`}
                            </Text>
                          </View>
                        )}
                        {exercise.sets && exercise.reps && (
                          <View style={styles.detailItem}>
                            <IconSymbol name="repeat" size={14} color={category.color} />
                            <Text style={styles.detailText}>{exercise.sets} × {exercise.reps}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <Pressable 
                      style={styles.infoButton}
                      onPress={() => showDetails(exercise)}
                    >
                      <IconSymbol name="info.circle" size={22} color={colors.primary} />
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          ))}

          {/* Tips Card */}
          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
              <Text style={styles.tipsTitle}>Consigli Importanti</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Inizia gradualmente e aumenta l&apos;intensità progressivamente</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Mantieni una respirazione regolare e profonda</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Non forzare i movimenti, ascolta il tuo corpo</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Adatta l&apos;intensità alla temperatura ambientale</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Completa sempre l&apos;intera sequenza per risultati ottimali</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowDetailModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedExercise?.name}</Text>
              <Pressable onPress={() => setShowDetailModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalScroll}>
              {selectedExercise?.notes && (
                <Text style={styles.modalDescription}>{selectedExercise.notes}</Text>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: colors.highlightBlue,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  exerciseCard: {
    marginBottom: 10,
  },
  exerciseCardCompleted: {
    opacity: 0.6,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  exerciseNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
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
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoButton: {
    padding: 4,
    marginLeft: 8,
  },
  tipsCard: {
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  tipsList: {
    gap: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warning,
    marginTop: 7,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
});
