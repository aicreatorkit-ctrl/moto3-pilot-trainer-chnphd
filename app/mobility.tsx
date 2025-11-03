
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mobilityExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = '@moto3_custom_mobility';

export default function MobilityScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(mobilityExercises);
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
      console.log('Error loading mobility exercises:', error);
    }
  };

  const toggleExercise = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const showDetails = (exercise: Exercise) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedExercise(exercise);
    setShowDetailModal(true);
  };

  const completedCount = completedExercises.length;
  const totalCount = exercises.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mobilità Articolare',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Enhanced Header */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="figure.flexibility" size={52} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Mobilità</Text>
            <Text style={styles.headerSubtitle}>Articolare</Text>
            <View style={styles.headerBadge}>
              <IconSymbol name="clock.fill" size={16} color="#FFFFFF" />
              <Text style={styles.headerBadgeText}>15-20 minuti</Text>
            </View>
            <View style={styles.headerBadge}>
              <IconSymbol name="calendar" size={16} color="#FFFFFF" />
              <Text style={styles.headerBadgeText}>Quotidianamente</Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={['#FFFFFF', 'rgba(255, 255, 255, 0.8)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>
                {completedCount} di {totalCount} esercizi • {Math.round(progress)}% completato
              </Text>
            </View>
          </LinearGradient>

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoHeader}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.infoIconGradient}
              >
                <IconSymbol name="info.circle.fill" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.infoTitle}>Perché la Mobilità è Cruciale</Text>
            </View>
            <Text style={styles.infoText}>
              Per un pilota Moto3, la mobilità articolare è fondamentale per:
            </Text>
            <View style={styles.objectivesList}>
              {[
                { icon: 'figure.cooldown', text: 'Mantenere posizioni aerodinamiche senza tensioni' },
                { icon: 'arrow.left.arrow.right', text: 'Trasferire il peso rapidamente in curva' },
                { icon: 'shield.fill', text: 'Prevenire infortuni da movimenti ripetitivi' },
                { icon: 'scope', text: 'Migliorare la propriocezione e il controllo' },
                { icon: 'bolt.fill', text: 'Ridurre l\'affaticamento muscolare' },
              ].map((item, index) => (
                <View key={index} style={styles.objectiveItem}>
                  <View style={styles.objectiveIcon}>
                    <IconSymbol name={item.icon as any} size={16} color="#667eea" />
                  </View>
                  <Text style={styles.objectiveText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Exercises Section */}
          <View style={styles.exercisesSection}>
            <Text style={styles.sectionTitle}>Esercizi di Mobilità</Text>
            <Text style={styles.sectionSubtitle}>
              Esegui in sequenza per risultati ottimali
            </Text>

            {exercises.map((exercise, index) => {
              const isCompleted = completedExercises.includes(exercise.id);

              return (
                <Pressable
                  key={exercise.id}
                  style={[
                    styles.exerciseCard,
                    isCompleted && styles.exerciseCardCompleted,
                  ]}
                  onPress={() => toggleExercise(exercise.id)}
                >
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseLeft}>
                      <View style={styles.exerciseNumber}>
                        <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                      </View>
                      <Pressable
                        style={[
                          styles.exerciseCheckbox,
                          isCompleted && styles.exerciseCheckboxChecked,
                        ]}
                        onPress={() => toggleExercise(exercise.id)}
                      >
                        {isCompleted && (
                          <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
                        )}
                      </Pressable>
                    </View>
                    
                    <View style={styles.exerciseContent}>
                      <Text style={[
                        styles.exerciseName,
                        isCompleted && styles.exerciseNameCompleted,
                      ]}>
                        {exercise.name}
                      </Text>
                      {exercise.duration && (
                        <View style={styles.detailBadge}>
                          <IconSymbol name="clock.fill" size={14} color="#667eea" />
                          <Text style={styles.detailText}>
                            {exercise.duration >= 60 
                              ? `${Math.floor(exercise.duration / 60)} min` 
                              : `${exercise.duration} sec`}
                          </Text>
                        </View>
                      )}
                    </View>

                    <Pressable 
                      style={styles.infoButton}
                      onPress={() => showDetails(exercise)}
                    >
                      <IconSymbol name="info.circle.fill" size={26} color={colors.info} />
                    </Pressable>
                  </View>

                  {exercise.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Guidelines Card */}
          <View style={[commonStyles.card, styles.guidelinesCard]}>
            <View style={styles.guidelinesHeader}>
              <LinearGradient
                colors={gradients.warning}
                style={styles.guidelinesIconGradient}
              >
                <IconSymbol name="lightbulb.fill" size={22} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.guidelinesTitle}>Linee Guida per la Mobilità</Text>
            </View>
            <View style={styles.guidelinesList}>
              {[
                'Esegui i movimenti lentamente e con controllo',
                'Respira profondamente durante ogni esercizio',
                'Non forzare mai oltre il range confortevole',
                'La mobilità migliora con la costanza, non con la forza',
                'Ideale al mattino o prima dell\'allenamento',
                'Temperatura corporea elevata = migliore mobilità',
              ].map((guideline, index) => (
                <View key={index} style={styles.guidelineItem}>
                  <View style={styles.guidelineBullet}>
                    <View style={styles.guidelineBulletInner} />
                  </View>
                  <Text style={styles.guidelineText}>{guideline}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits Card */}
          <View style={[commonStyles.card, styles.benefitsCard]}>
            <View style={styles.benefitsHeader}>
              <LinearGradient
                colors={gradients.success}
                style={styles.benefitsIconGradient}
              >
                <IconSymbol name="checkmark.seal.fill" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.benefitsTitle}>Benefici Specifici per Piloti</Text>
            </View>
            <View style={styles.benefitsList}>
              {[
                'Riduzione tensione cervicale da casco e forze G',
                'Maggiore controllo del trasferimento di peso',
                'Prevenzione infortuni da posizione di guida prolungata',
                'Miglioramento della propriocezione e reattività',
              ].map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Enhanced Modal */}
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
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedExercise?.name}</Text>
              <Pressable 
                style={styles.modalCloseButton}
                onPress={() => setShowDetailModal(false)}
              >
                <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView 
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              {selectedExercise?.notes && (
                <Text style={styles.modalDescription}>{selectedExercise.notes}</Text>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    alignItems: 'center',
    ...shadows.large,
  },
  headerIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    fontWeight: '600',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginBottom: 8,
  },
  headerBadgeText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  progressContainer: {
    width: '100%',
    marginTop: 12,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: 24,
    backgroundColor: colors.highlightPurple,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  objectiveIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  objectiveText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  exercisesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    ...shadows.small,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  exerciseCardCompleted: {
    backgroundColor: colors.highlightGreen,
    borderColor: colors.success,
    opacity: 0.7,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    ...shadows.small,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  exerciseCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  exerciseCheckboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 20,
  },
  exerciseNameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    alignSelf: 'flex-start',
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  infoButton: {
    padding: 4,
    marginLeft: 8,
  },
  notesContainer: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  exerciseNotes: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  guidelinesCard: {
    marginBottom: 16,
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  guidelinesIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guidelinesTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  guidelinesList: {
    gap: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  guidelineBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 149, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  guidelineBulletInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
  },
  guidelineText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  benefitsCard: {
    backgroundColor: colors.highlightGreen,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitsIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  benefitsList: {
    gap: 12,
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
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '85%',
    ...shadows.large,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    marginRight: 12,
    lineHeight: 26,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalScroll: {
    maxHeight: 500,
  },
  modalDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
  },
});
