
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { cooldownExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = '@moto3_custom_cooldown';

interface ExerciseCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

export default function CooldownScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(cooldownExercises);
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
      console.log('Error loading cooldown exercises:', error);
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
      title: 'Decelerazione Cardiovascolare',
      icon: 'heart.fill',
      color: '#06b6d4',
      exercises: exercises.filter(e => e.id === 'c1'),
    },
    {
      id: 'breathing',
      title: 'Respirazione e Reset',
      icon: 'wind',
      color: '#8b5cf6',
      exercises: exercises.filter(e => e.id === 'c2'),
    },
    {
      id: 'stretching',
      title: 'Stretching Post-Allenamento',
      icon: 'figure.flexibility',
      color: '#10b981',
      exercises: exercises.filter(e => e.id === 'c3' || e.id === 'c4' || e.id === 'c5'),
    },
    {
      id: 'recovery',
      title: 'Recupero Finale',
      icon: 'bed.double.fill',
      color: '#f59e0b',
      exercises: exercises.filter(e => e.id === 'c6'),
    },
  ];

  const completedCount = completedExercises.length;
  const totalCount = exercises.length;
  const progress = (completedCount / totalCount) * 100;

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
          {/* Header with Progress */}
          <LinearGradient
            colors={['#06b6d4', '#0891b2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="figure.cooldown" size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Protocollo Defaticamento</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 10-15 minuti{'\n'}
              Essenziale per il recupero ottimale
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
              <Text style={styles.infoTitle}>Perché il Defaticamento è Cruciale</Text>
            </View>
            <Text style={styles.infoText}>
              • Riduce accumulo di acido lattico e metaboliti{'\n'}
              • Previene rigidità muscolare post-allenamento{'\n'}
              • Favorisce recupero cardiovascolare graduale{'\n'}
              • Migliora flessibilità e range di movimento{'\n'}
              • Accelera il recupero fino al 30%
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

              {category.exercises.map((exercise, index) => {
                const exerciseNumber = categories
                  .slice(0, categoryIndex)
                  .reduce((sum, cat) => sum + cat.exercises.length, 0) + index + 1;

                return (
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
                        <Text style={styles.exerciseNumberText}>{exerciseNumber}</Text>
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
                        {exercise.duration && (
                          <View style={styles.detailItem}>
                            <IconSymbol name="clock.fill" size={14} color={category.color} />
                            <Text style={styles.detailText}>
                              {Math.floor(exercise.duration / 60)} minuti
                            </Text>
                          </View>
                        )}
                      </View>
                      <Pressable 
                        style={styles.infoButton}
                        onPress={() => showDetails(exercise)}
                      >
                        <IconSymbol name="info.circle" size={22} color={colors.primary} />
                      </Pressable>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}

          {/* Benefits Card */}
          <View style={[commonStyles.card, styles.benefitsCard]}>
            <View style={styles.benefitsHeader}>
              <IconSymbol name="checkmark.seal.fill" size={24} color="#10b981" />
              <Text style={styles.benefitsTitle}>Benefici del Defaticamento</Text>
            </View>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <IconSymbol name="checkmark.circle.fill" size={18} color="#10b981" />
                <Text style={styles.benefitText}>Riduce dolore muscolare post-allenamento (DOMS)</Text>
              </View>
              <View style={styles.benefitItem}>
                <IconSymbol name="checkmark.circle.fill" size={18} color="#10b981" />
                <Text style={styles.benefitText}>Previene accumulo di sangue negli arti inferiori</Text>
              </View>
              <View style={styles.benefitItem}>
                <IconSymbol name="checkmark.circle.fill" size={18} color="#10b981" />
                <Text style={styles.benefitText}>Attiva sistema nervoso parasimpatico (recupero)</Text>
              </View>
              <View style={styles.benefitItem}>
                <IconSymbol name="checkmark.circle.fill" size={18} color="#10b981" />
                <Text style={styles.benefitText}>Migliora qualità del sonno notturno</Text>
              </View>
            </View>
          </View>

          {/* Tips Card */}
          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#ef4444" />
              <Text style={styles.tipsTitle}>Mai Saltare il Defaticamento</Text>
            </View>
            <Text style={styles.tipsText}>
              Anche se sei stanco, il defaticamento è fondamentale. Anche solo 5-10 minuti 
              possono fare una grande differenza nel recupero. È particolarmente importante 
              dopo allenamenti intensi o gare.
            </Text>
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
  benefitsCard: {
    marginBottom: 16,
    backgroundColor: '#f0fdf4',
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  benefitsList: {
    gap: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
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
