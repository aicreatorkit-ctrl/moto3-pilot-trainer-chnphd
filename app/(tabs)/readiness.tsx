
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ReadinessScreen() {
  const [sleepQuality, setSleepQuality] = useState(5);
  const [muscleSoreness, setMuscleSoreness] = useState(5);
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [motivation, setMotivation] = useState(5);
  const [weight, setWeight] = useState('');
  const [hrv, setHrv] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [notes, setNotes] = useState('');

  const renderRatingScale = (
    label: string,
    value: number,
    setValue: (val: number) => void,
    icon: string,
    iconColor: string
  ) => (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingHeader}>
        <IconSymbol name={icon as any} size={20} color={iconColor} />
        <Text style={styles.ratingLabel}>{label}</Text>
      </View>
      <View style={styles.scaleContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Pressable
            key={num}
            style={[
              styles.scaleButton,
              value === num && styles.scaleButtonActive,
            ]}
            onPress={() => setValue(num)}
          >
            <Text
              style={[
                styles.scaleButtonText,
                value === num && styles.scaleButtonTextActive,
              ]}
            >
              {num}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const calculateReadinessScore = () => {
    const total = sleepQuality + (11 - muscleSoreness) + mood + energy + motivation;
    return Math.round((total / 50) * 100);
  };

  const readinessScore = calculateReadinessScore();
  const getScoreColor = () => {
    if (readinessScore >= 80) return colors.accent;
    if (readinessScore >= 60) return colors.warning;
    return colors.secondary;
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Controllo Prontezza',
          }}
        />
      )}
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.scoreCard]}>
            <Text style={styles.scoreLabel}>Punteggio Prontezza</Text>
            <Text style={[styles.scoreValue, { color: getScoreColor() }]}>
              {readinessScore}%
            </Text>
            <Text style={styles.scoreDescription}>
              {readinessScore >= 80 && 'Ottima condizione - Pronto per allenamento intenso'}
              {readinessScore >= 60 && readinessScore < 80 && 'Buona condizione - Allenamento moderato'}
              {readinessScore < 60 && 'Attenzione - Considera recupero attivo'}
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Valutazione Soggettiva</Text>
            
            {renderRatingScale(
              'Qualità del Sonno',
              sleepQuality,
              setSleepQuality,
              'bed.double.fill',
              colors.primary
            )}
            
            {renderRatingScale(
              'Dolori Muscolari (1=molto, 10=nessuno)',
              muscleSoreness,
              setMuscleSoreness,
              'figure.walk',
              colors.secondary
            )}
            
            {renderRatingScale(
              'Umore',
              mood,
              setMood,
              'face.smiling.fill',
              colors.warning
            )}
            
            {renderRatingScale(
              'Livello di Energia',
              energy,
              setEnergy,
              'bolt.fill',
              colors.accent
            )}
            
            {renderRatingScale(
              'Motivazione',
              motivation,
              setMotivation,
              'flame.fill',
              colors.primary
            )}
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Dati Oggettivi</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                  placeholder="70.5"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>HRV (ms)</Text>
                <TextInput
                  style={styles.input}
                  value={hrv}
                  onChangeText={setHrv}
                  keyboardType="number-pad"
                  placeholder="65"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Frequenza Cardiaca a Riposo (bpm)</Text>
              <TextInput
                style={styles.input}
                value={restingHR}
                onChangeText={setRestingHR}
                keyboardType="number-pad"
                placeholder="55"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Note</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              placeholder="Aggiungi note sulla tua condizione..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salva Valutazione</Text>
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
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  scoreCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleButtonActive: {
    backgroundColor: colors.primary,
  },
  scaleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  scaleButtonTextActive: {
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
