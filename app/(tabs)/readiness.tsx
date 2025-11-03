
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function ReadinessScreen() {
  const [sleepQuality, setSleepQuality] = useState(8);
  const [muscleSoreness, setMuscleSoreness] = useState(8);
  const [mood, setMood] = useState(8);
  const [energy, setEnergy] = useState(8);
  const [motivation, setMotivation] = useState(9);
  const [weight, setWeight] = useState('');
  const [hrv, setHrv] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [notes, setNotes] = useState('');

  const handleRatingPress = (value: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderRatingScale = (
    label: string,
    value: number,
    setValue: (val: number) => void,
    icon: string,
    iconColor: string
  ) => (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingHeader}>
        <View style={[styles.ratingIconContainer, { backgroundColor: iconColor + '20' }]}>
          <IconSymbol name={icon as any} size={22} color={iconColor} />
        </View>
        <View style={styles.ratingLabelContainer}>
          <Text style={styles.ratingLabel}>{label}</Text>
          <Text style={styles.ratingValue}>{value}/10</Text>
        </View>
      </View>
      <View style={styles.scaleContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Pressable
            key={num}
            style={[
              styles.scaleButton,
              value === num && styles.scaleButtonActive,
              value === num && { backgroundColor: iconColor },
            ]}
            onPress={() => {
              setValue(num);
              handleRatingPress(num);
            }}
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
    if (readinessScore >= 85) return colors.success;
    if (readinessScore >= 70) return colors.accent;
    if (readinessScore >= 60) return colors.warning;
    return colors.error;
  };

  const getScoreGradient = () => {
    if (readinessScore >= 85) return gradients.success;
    if (readinessScore >= 70) return gradients.cyan;
    if (readinessScore >= 60) return gradients.warning;
    return gradients.error;
  };

  const getScoreStatus = () => {
    if (readinessScore >= 85) return 'ECCELLENTE';
    if (readinessScore >= 70) return 'BUONA';
    if (readinessScore >= 60) return 'MODERATA';
    return 'BASSA';
  };

  const getRecommendation = () => {
    if (readinessScore >= 85) {
      return {
        title: '✅ Condizione Ottimale',
        description: 'Pronto per sessione ad alta intensità. Tutti i parametri nella norma. Ottimo momento per spingere al massimo.',
        intensity: 'Alta intensità consigliata',
      };
    }
    if (readinessScore >= 70) {
      return {
        title: '⚡ Buona Condizione',
        description: 'Condizione fisica buona. Puoi affrontare allenamenti intensi ma monitora i segnali del corpo.',
        intensity: 'Intensità moderata-alta',
      };
    }
    if (readinessScore >= 60) {
      return {
        title: '⚠️ Attenzione',
        description: 'Alcuni parametri sotto la norma. Considera allenamento a intensità ridotta o focus sul recupero.',
        intensity: 'Intensità moderata',
      };
    }
    return {
      title: '🚨 Recupero Necessario',
      description: 'Prontezza bassa. Priorità al recupero. Evita sessioni intense. Considera giorno di riposo attivo.',
      intensity: 'Solo recupero attivo',
    };
  };

  const recommendation = getRecommendation();

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
          {/* Enhanced Score Card */}
          <LinearGradient
            colors={getScoreGradient()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreCard}
          >
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreLabel}>Punteggio Prontezza</Text>
              <View style={styles.scoreStatusBadge}>
                <Text style={styles.scoreStatusText}>{getScoreStatus()}</Text>
              </View>
            </View>
            <Text style={styles.scoreValue}>{readinessScore}%</Text>
            <View style={styles.scoreBar}>
              <View style={[styles.scoreBarFill, { width: `${readinessScore}%` }]} />
            </View>
          </LinearGradient>

          {/* Recommendation Card */}
          <View style={[commonStyles.cardRacing, styles.recommendationCard]}>
            <View style={styles.recommendationHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            </View>
            <Text style={styles.recommendationDescription}>{recommendation.description}</Text>
            <View style={styles.intensityBadge}>
              <IconSymbol name="bolt.fill" size={16} color={getScoreColor()} />
              <Text style={[styles.intensityText, { color: getScoreColor() }]}>
                {recommendation.intensity}
              </Text>
            </View>
          </View>

          {/* Subjective Assessment */}
          <View style={commonStyles.card}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="person.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Valutazione Soggettiva</Text>
            </View>
            
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
              colors.error
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
              colors.success
            )}
            
            {renderRatingScale(
              'Motivazione',
              motivation,
              setMotivation,
              'flame.fill',
              colors.accent
            )}
          </View>

          {/* Objective Data */}
          <View style={commonStyles.card}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="chart.xyaxis.line" size={20} color={colors.accent} />
              <Text style={styles.sectionTitle}>Dati Oggettivi</Text>
            </View>
            
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Peso (kg)</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="scalemass.fill" size={18} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="decimal-pad"
                    placeholder="70.5"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>HRV (ms)</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="waveform.path.ecg" size={18} color={colors.textSecondary} />
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
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Frequenza Cardiaca a Riposo (bpm)</Text>
              <View style={styles.inputWrapper}>
                <IconSymbol name="heart.fill" size={18} color={colors.textSecondary} />
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
          </View>

          {/* Notes */}
          <View style={commonStyles.card}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="note.text" size={20} color={colors.purple} />
              <Text style={styles.sectionTitle}>Note Personali</Text>
            </View>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              placeholder="Aggiungi note sulla tua condizione fisica e mentale..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Save Button */}
          <Pressable 
            style={styles.saveButton}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              console.log('Valutazione salvata');
            }}
          >
            <LinearGradient
              colors={gradients.racing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButtonGradient}
            >
              <IconSymbol name="checkmark.circle.fill" size={22} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Salva Valutazione</Text>
            </LinearGradient>
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
    borderRadius: 24,
    padding: 28,
    marginBottom: 16,
    ...shadows.large,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  scoreStatusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreStatusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  recommendationCard: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  recommendationDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  intensityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  intensityText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  ratingContainer: {
    marginBottom: 24,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  scaleButtonActive: {
    borderColor: 'transparent',
    ...shadows.small,
  },
  scaleButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  scaleButtonTextActive: {
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 17,
    color: colors.text,
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
