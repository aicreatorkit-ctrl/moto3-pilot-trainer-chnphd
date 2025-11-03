
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mobilityExercises } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types/training';
import { LinearGradient } from 'expo-linear-gradient';

const STORAGE_KEY = '@moto3_custom_mobility';

export default function MobilityScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(mobilityExercises);
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
      console.log('Error loading mobility exercises:', error);
    }
  };

  const toggleExercise = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
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
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <IconSymbol name="figure.flexibility" size={48} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Protocollo Mobilità</Text>
            <Text style={styles.headerDescription}>
              Durata totale: 15-20 minuti{'\n'}
              Esegui quotidianamente per risultati ottimali
            </Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {completedCount} di {totalCount} completati
              </Text>
            </View>
          </LinearGradient>

          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoHeader}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.infoTitle}>Perché la Mobilità è Cruciale</Text>
            </View>
            <Text style={styles.infoText}>
              Per un pilota Moto3, la mobilità articolare è fondamentale per:{'\n\n'}
              • Mantenere posizioni aerodinamiche senza tensioni{'\n'}
              • Trasferire il peso rapidamente in curva{'\n'}
              • Prevenire infortuni da movimenti ripetitivi{'\n'}
              • Migliorare la propriocezione e il controllo{'\n'}
              • Ridurre l&apos;affaticamento muscolare
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Esercizi di Mobilità</Text>

          {exercises.map((exercise, index) => (
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
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                </View>
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
                  <Text style={styles.detailText}>
                    {exercise.duration >= 60 
                      ? `${Math.floor(exercise.duration / 60)} min` 
                      : `${exercise.duration} sec`}
                  </Text>
                </View>
              )}
              
              {exercise.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
                </View>
              )}
            </Pressable>
          ))}

          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
              <Text style={styles.tipsTitle}>Linee Guida per la Mobilità</Text>
            </View>
            <Text style={styles.tipsText}>
              • Esegui i movimenti lentamente e con controllo{'\n'}
              • Respira profondamente durante ogni esercizio{'\n'}
              • Non forzare mai oltre il range confortevole{'\n'}
              • La mobilità migliora con la costanza, non con la forza{'\n'}
              • Ideale al mattino o prima dell&apos;allenamento{'\n'}
              • Temperatura corporea elevata = migliore mobilità
            </Text>
          </View>

          <View style={[commonStyles.card, styles.benefitsCard]}>
            <Text style={styles.benefitsTitle}>Benefici Specifici per Piloti</Text>
            <View style={styles.benefitItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
              <Text style={styles.benefitText}>
                Riduzione tensione cervicale da casco e forze G
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
              <Text style={styles.benefitText}>
                Maggiore controllo del trasferimento di peso
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
              <Text style={styles.benefitText}>
                Prevenzione infortuni da posizione di guida prolungata
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
              <Text style={styles.benefitText}>
                Miglioramento della propriocezione e reattività
              </Text>
            </View>
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
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
  progressContainer: {
    width: '100%',
    marginTop: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 4,
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
    marginBottom: 12,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  exerciseNumberText: {
    fontSize: 14,
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
    fontWeight: '500',
  },
  notesContainer: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  exerciseNotes: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tipsCard: {
    marginTop: 8,
    marginBottom: 16,
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
  benefitsCard: {
    backgroundColor: '#f0fdf4',
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});
