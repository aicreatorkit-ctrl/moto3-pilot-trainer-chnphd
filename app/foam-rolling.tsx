
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { foamRollingExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = '@moto3_custom_foam_rolling';

interface ExerciseCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

export default function FoamRollingScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(foamRollingExercises);
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
      console.log('Error loading foam rolling exercises:', error);
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
      id: 'lower',
      title: 'Gambe e Anche',
      icon: 'figure.walk',
      color: '#8b5cf6',
      exercises: exercises.filter(e => ['f1', 'f2', 'f3', 'f4', 'f6', 'f7'].includes(e.id)),
    },
    {
      id: 'back',
      title: 'Schiena e Dorsali',
      icon: 'figure.cooldown',
      color: '#3b82f6',
      exercises: exercises.filter(e => ['f5', 'f8'].includes(e.id)),
    },
  ];

  const completedCount = completedExercises.length;
  const totalCount = exercises.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Protocollo Foam Rolling',
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
            colors={['#8b5cf6', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="cylinder.fill" size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Rilascio Miofasciale</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 15-20 minuti{'\n'}
              Ottimo per recupero e prevenzione infortuni
            </Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {completedCount} di {totalCount} aree trattate
              </Text>
            </View>
          </LinearGradient>

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoHeader}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
              <Text style={styles.infoTitle}>Cos&apos;è il Foam Rolling</Text>
            </View>
            <Text style={styles.infoText}>
              Il foam rolling è una tecnica di auto-massaggio che utilizza un rullo di schiuma 
              per rilasciare tensioni muscolari e migliorare la mobilità. Per i piloti Moto3 è 
              essenziale per:{'\n\n'}
              • Ridurre rigidità muscolare post-allenamento{'\n'}
              • Migliorare circolazione sanguigna{'\n'}
              • Prevenire infortuni da sovraccarico{'\n'}
              • Accelerare recupero muscolare{'\n'}
              • Identificare e trattare trigger points
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
                              {exercise.duration} secondi (45 sec per lato)
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

          {/* Technique Card */}
          <View style={[commonStyles.card, styles.techniqueCard]}>
            <View style={styles.techniqueHeader}>
              <IconSymbol name="checkmark.seal.fill" size={24} color="#8b5cf6" />
              <Text style={styles.techniqueTitle}>Tecnica Corretta</Text>
            </View>
            <View style={styles.techniqueList}>
              <View style={styles.techniqueItem}>
                <View style={styles.techniqueBullet}>
                  <Text style={styles.techniqueBulletText}>1</Text>
                </View>
                <Text style={styles.techniqueText}>
                  <Text style={styles.techniqueBold}>Rotola lentamente:</Text> 2-3 cm al secondo, non veloce
                </Text>
              </View>
              <View style={styles.techniqueItem}>
                <View style={styles.techniqueBullet}>
                  <Text style={styles.techniqueBulletText}>2</Text>
                </View>
                <Text style={styles.techniqueText}>
                  <Text style={styles.techniqueBold}>Fermati sui trigger points:</Text> 20-30 secondi sui punti più tesi
                </Text>
              </View>
              <View style={styles.techniqueItem}>
                <View style={styles.techniqueBullet}>
                  <Text style={styles.techniqueBulletText}>3</Text>
                </View>
                <Text style={styles.techniqueText}>
                  <Text style={styles.techniqueBold}>Respira profondamente:</Text> Non trattenere il respiro
                </Text>
              </View>
              <View style={styles.techniqueItem}>
                <View style={styles.techniqueBullet}>
                  <Text style={styles.techniqueBulletText}>4</Text>
                </View>
                <Text style={styles.techniqueText}>
                  <Text style={styles.techniqueBold}>Evita articolazioni:</Text> Non rotolare direttamente su ginocchia, gomiti, colonna
                </Text>
              </View>
              <View style={styles.techniqueItem}>
                <View style={styles.techniqueBullet}>
                  <Text style={styles.techniqueBulletText}>5</Text>
                </View>
                <Text style={styles.techniqueText}>
                  <Text style={styles.techniqueBold}>Intensità 6-7/10:</Text> Deve essere intenso ma tollerabile
                </Text>
              </View>
            </View>
          </View>

          {/* Frequency Card */}
          <View style={[commonStyles.card, styles.frequencyCard]}>
            <View style={styles.frequencyHeader}>
              <IconSymbol name="calendar" size={24} color={colors.warning} />
              <Text style={styles.frequencyTitle}>Quando e Quanto Spesso</Text>
            </View>
            <Text style={styles.frequencyText}>
              <Text style={styles.frequencyBold}>Frequenza ideale:</Text> 3-4 volte a settimana{'\n\n'}
              <Text style={styles.frequencyBold}>Momento migliore:</Text> Dopo allenamento o sera prima di dormire{'\n\n'}
              <Text style={styles.frequencyBold}>Durata:</Text> 15-20 minuti per sessione completa{'\n\n'}
              <Text style={styles.frequencyBold}>Giorni intensi:</Text> Focus su aree più sollecitate (gambe, schiena)
            </Text>
          </View>

          {/* Warning Card */}
          <View style={[commonStyles.card, styles.warningCard]}>
            <View style={styles.warningHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#ef4444" />
              <Text style={styles.warningTitle}>Quando NON Usare il Foam Roller</Text>
            </View>
            <Text style={styles.warningText}>
              • Su infortuni acuti o infiammazioni{'\n'}
              • Su contusioni o ematomi{'\n'}
              • In caso di dolore acuto o lancinante{'\n'}
              • Su vene varicose o problemi circolatori{'\n'}
              • In presenza di fratture o lesioni ossee
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
  techniqueCard: {
    marginBottom: 16,
    backgroundColor: '#f5f3ff',
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  techniqueList: {
    gap: 14,
  },
  techniqueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  techniqueBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  techniqueBulletText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  techniqueText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  techniqueBold: {
    fontWeight: '700',
  },
  frequencyCard: {
    marginBottom: 16,
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  frequencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  frequencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  frequencyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  frequencyBold: {
    fontWeight: '700',
  },
  warningCard: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
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
