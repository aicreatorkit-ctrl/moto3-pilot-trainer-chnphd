
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { defaultMorningRoutine } from '@/data/trainingData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@moto3_custom_morning_routine';

export default function MorningRoutineScreen() {
  const router = useRouter();
  const [routine, setRoutine] = useState(defaultMorningRoutine);

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
          <View style={[commonStyles.card, styles.progressCard]}>
            <Text style={styles.progressTitle}>Progresso Giornaliero</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {completedCount} di {routine.length} completati
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Checklist Mattutina</Text>
            {routine.map((item) => (
              <Pressable
                key={item.id}
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
              </Pressable>
            ))}
          </View>

          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
              <Text style={styles.tipsTitle}>Suggerimenti</Text>
            </View>
            <Text style={styles.tipsText}>
              - Completa la routine entro 30 minuti dal risveglio{'\n'}
              - Mantieni costanza negli orari{'\n'}
              - Annota eventuali anomalie nelle note{'\n'}
              - Idratati prima di iniziare
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
            <Text style={styles.completeButtonText}>
              {completedCount === routine.length ? 'Routine Completata!' : 'Completa tutti gli elementi'}
            </Text>
          </Pressable>
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
  progressCard: {
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
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
    lineHeight: 22,
  },
  completeButton: {
    backgroundColor: colors.textSecondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  completeButtonActive: {
    backgroundColor: colors.accent,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
