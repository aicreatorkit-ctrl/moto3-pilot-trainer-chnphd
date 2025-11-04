
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { defaultMorningRoutine } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = '@moto3_custom_morning_routine';

export default function MorningRoutineScreen() {
  const router = useRouter();
  const [routine, setRoutine] = useState(defaultMorningRoutine);
  const [selectedItem, setSelectedItem] = useState<typeof defaultMorningRoutine[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadRoutine();
  }, []);

  const loadRoutine = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRoutine(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading morning routine:', error);
    }
  };

  const toggleItem = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRoutine(routine.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const showDetails = (item: typeof defaultMorningRoutine[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const completedCount = routine.filter(item => item.completed).length;
  const progress = (completedCount / routine.length) * 100;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mattutina di Routine',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Enhanced Progress Header */}
          <LinearGradient
            colors={gradients.sunset}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.progressIconContainer}>
              <IconSymbol name="sunrise.fill" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.progressTitle}>Routine Mattutina</Text>
            <Text style={styles.progressSubtitle}>
              Il fondamento della tua giornata di allenamento
            </Text>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={['#FFFFFF', 'rgba(255, 255, 255, 0.8)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
              </View>
              <View style={styles.progressStats}>
                <View style={styles.progressStatItem}>
                  <Text style={styles.progressStatNumber}>{completedCount}</Text>
                  <Text style={styles.progressStatLabel}>Completati</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressStatItem}>
                  <Text style={styles.progressStatNumber}>{routine.length}</Text>
                  <Text style={styles.progressStatLabel}>Totali</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressStatItem}>
                  <Text style={styles.progressStatNumber}>{Math.round(progress)}%</Text>
                  <Text style={styles.progressStatLabel}>Progresso</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Enhanced Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoIconWrapper}>
              <LinearGradient
                colors={gradients.blue}
                style={styles.infoIconGradient}
              >
                <IconSymbol name="info.circle.fill" size={24} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Perché è Importante</Text>
              <Text style={styles.infoText}>
                La routine mattutina stabilisce il tono della giornata, monitora il recupero 
                e prepara corpo e mente per prestazioni ottimali. Ogni elemento è essenziale 
                per massimizzare le tue performance in pista.
              </Text>
            </View>
          </View>

          {/* Enhanced Checklist */}
          <View style={styles.checklistSection}>
            <Text style={styles.sectionTitle}>Checklist Mattutina</Text>
            <Text style={styles.sectionSubtitle}>
              Completa tutti gli elementi entro 45 minuti dal risveglio
            </Text>

            {routine.map((item, index) => (
              <Pressable
                key={item.id}
                style={[
                  styles.routineCard,
                  item.completed && styles.routineCardCompleted,
                ]}
                onPress={() => toggleItem(item.id)}
              >
                <View style={styles.routineHeader}>
                  <View style={styles.routineLeft}>
                    <View style={styles.routineNumberBadge}>
                      <Text style={styles.routineNumberText}>{index + 1}</Text>
                    </View>
                    <Pressable
                      style={[
                        styles.checkbox,
                        item.completed && styles.checkboxChecked,
                      ]}
                      onPress={() => toggleItem(item.id)}
                    >
                      {item.completed && (
                        <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
                      )}
                    </Pressable>
                  </View>
                  
                  <View style={styles.routineContent}>
                    <Text style={[
                      styles.routineTitle,
                      item.completed && styles.routineTitleCompleted,
                    ]}>
                      {item.title}
                    </Text>
                    {item.time && (
                      <View style={styles.routineTimeContainer}>
                        <IconSymbol name="clock.fill" size={14} color={colors.primary} />
                        <Text style={styles.routineTime}>
                          {Math.floor(item.time / 60)} minuti
                        </Text>
                      </View>
                    )}
                  </View>

                  <Pressable 
                    style={styles.infoButton}
                    onPress={() => showDetails(item)}
                  >
                    <View style={styles.infoButtonCircle}>
                      <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
                    </View>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Enhanced Tips Card */}
          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <LinearGradient
                colors={gradients.warning}
                style={styles.tipsIconGradient}
              >
                <IconSymbol name="lightbulb.fill" size={22} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.tipsTitle}>Suggerimenti Chiave</Text>
            </View>
            <View style={styles.tipsList}>
              {[
                'Completa la routine entro 30-45 minuti dal risveglio',
                'Mantieni costanza negli orari (stesso orario ogni giorno)',
                'Annota eventuali anomalie o sensazioni inusuali',
                'L\'idratazione è prioritaria: inizia subito',
                'Usa i dati raccolti per adattare l\'allenamento',
              ].map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipBullet}>
                    <View style={styles.tipBulletInner} />
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Complete Button */}
          <Pressable 
            style={[
              styles.completeButton,
              completedCount === routine.length && styles.completeButtonActive,
            ]}
            disabled={completedCount !== routine.length}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              router.back();
            }}
          >
            <LinearGradient
              colors={completedCount === routine.length ? gradients.success : ['#9CA3AF', '#6B7280']}
              style={styles.completeButtonGradient}
            >
              <IconSymbol 
                name={completedCount === routine.length ? "checkmark.seal.fill" : "circle"} 
                size={28} 
                color="#FFFFFF" 
              />
              <Text style={styles.completeButtonText}>
                {completedCount === routine.length ? 'Routine Completata!' : 'Completa tutti gli elementi'}
              </Text>
            </LinearGradient>
          </Pressable>
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
              <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
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
              <Text style={styles.modalDescription}>
                {selectedItem?.description || 'Nessuna descrizione disponibile.'}
              </Text>
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
  progressCard: {
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    alignItems: 'center',
    ...shadows.large,
  },
  progressIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  progressSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressStatNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  progressDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoCard: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: colors.highlightBlue,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  infoIconWrapper: {
    marginRight: 16,
  },
  infoIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  checklistSection: {
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
  routineCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  routineCardCompleted: {
    backgroundColor: colors.highlightGreen,
    borderColor: colors.success,
    opacity: 0.7,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  routineNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    ...shadows.small,
  },
  routineNumberText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  routineContent: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 22,
  },
  routineTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  routineTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  routineTime: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoButton: {
    padding: 4,
  },
  infoButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsCard: {
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 149, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipBulletInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  completeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 12,
  },
  completeButtonActive: {
    ...shadows.large,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
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
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    marginRight: 12,
    lineHeight: 28,
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
