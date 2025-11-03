
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { defaultMorningRoutine } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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
    setRoutine(routine.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const showDetails = (item: typeof defaultMorningRoutine[0]) => {
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
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressCard}
          >
            <Text style={styles.progressTitle}>Progresso Giornaliero</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {completedCount} di {routine.length} completati ({Math.round(progress)}%)
            </Text>
          </LinearGradient>

          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoHeader}>
              <IconSymbol name="sunrise.fill" size={24} color="#f59e0b" />
              <Text style={styles.infoTitle}>Importanza della Routine Mattutina</Text>
            </View>
            <Text style={styles.infoText}>
              La routine mattutina è il fondamento di ogni giornata di allenamento di successo. 
              Stabilisce il tono, monitora lo stato di recupero e prepara corpo e mente per le 
              prestazioni ottimali.
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Checklist Mattutina</Text>
            {routine.map((item) => (
              <View key={item.id}>
                <Pressable
                  style={[
                    styles.routineItem,
                    item.completed && styles.routineItemCompleted,
                  ]}
                  onPress={() => toggleItem(item.id)}
                >
                  <View style={[
                    styles.checkbox,
                    item.completed && styles.checkboxChecked,
                  ]}>
                    {item.completed && (
                      <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <View style={styles.routineContent}>
                    <Text style={[
                      styles.routineTitle,
                      item.completed && styles.routineTitleCompleted,
                    ]}>
                      {item.title}
                    </Text>
                    {item.time && (
                      <Text style={styles.routineTime}>
                        {Math.floor(item.time / 60)} minuti
                      </Text>
                    )}
                  </View>
                  <Pressable 
                    style={styles.infoButton}
                    onPress={() => showDetails(item)}
                  >
                    <IconSymbol name="info.circle" size={20} color={colors.primary} />
                  </Pressable>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
              <Text style={styles.tipsTitle}>Suggerimenti Chiave</Text>
            </View>
            <Text style={styles.tipsText}>
              • Completa la routine entro 30-45 minuti dal risveglio{'\n'}
              • Mantieni costanza negli orari (stesso orario ogni giorno){'\n'}
              • Annota eventuali anomalie o sensazioni inusuali{'\n'}
              • L&apos;idratazione è prioritaria: inizia subito{'\n'}
              • Usa i dati raccolti per adattare l&apos;allenamento
            </Text>
          </View>

          <Pressable 
            style={[
              styles.completeButton,
              completedCount === routine.length && styles.completeButtonActive,
            ]}
            disabled={completedCount !== routine.length}
            onPress={() => router.back()}
          >
            <IconSymbol 
              name={completedCount === routine.length ? "checkmark.circle.fill" : "circle"} 
              size={24} 
              color="#FFFFFF" 
            />
            <Text style={styles.completeButtonText}>
              {completedCount === routine.length ? 'Routine Completata!' : 'Completa tutti gli elementi'}
            </Text>
          </Pressable>
        </ScrollView>
      </View>

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
              <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
              <Pressable onPress={() => setShowDetailModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalDescription}>
                {selectedItem?.description || 'Nessuna descrizione disponibile.'}
              </Text>
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
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: colors.highlight,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
  },
  routineItemCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  routineContent: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  routineTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  routineTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoButton: {
    padding: 4,
  },
  tipsCard: {
    marginTop: 16,
    backgroundColor: colors.highlight,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
  },
  completeButton: {
    backgroundColor: colors.textSecondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButtonActive: {
    backgroundColor: colors.accent,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
