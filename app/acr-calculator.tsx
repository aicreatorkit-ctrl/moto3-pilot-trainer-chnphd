
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ACRCalculatorScreen() {
  const [acuteLoad, setAcuteLoad] = useState('');
  const [chronicLoad, setChronicLoad] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState('');

  const calculateACR = () => {
    const acute = parseFloat(acuteLoad);
    const chronic = parseFloat(chronicLoad);

    if (isNaN(acute) || isNaN(chronic) || chronic === 0) {
      setResult(null);
      setInterpretation('Inserisci valori validi per calcolare l\'ACR');
      return;
    }

    const acr = acute / chronic;
    setResult(acr);

    if (acr < 0.8) {
      setInterpretation('⚠️ SOTTOCCARICO - Rischio di perdita di forma. Considera di aumentare gradualmente il carico di allenamento.');
    } else if (acr >= 0.8 && acr <= 1.3) {
      setInterpretation('✅ ZONA OTTIMALE - Il rapporto tra carico acuto e cronico è ideale. Continua con questo approccio.');
    } else if (acr > 1.3 && acr <= 1.5) {
      setInterpretation('⚠️ ATTENZIONE - Carico leggermente elevato. Monitora attentamente i segnali di affaticamento.');
    } else {
      setInterpretation('🚨 SOVRACCARICO - Alto rischio di infortuni! Riduci il carico di allenamento e aumenta il recupero.');
    }
  };

  const getResultColor = () => {
    if (!result) return colors.text;
    if (result < 0.8) return colors.warning;
    if (result >= 0.8 && result <= 1.3) return colors.accent;
    if (result > 1.3 && result <= 1.5) return colors.warning;
    return colors.secondary;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Calcolatore ACR',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              L&apos;ACR (Acute:Chronic Workload Ratio) confronta il carico di allenamento della settimana corrente con la media delle ultime 4 settimane.
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Inserisci i Dati</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Carico Acuto (ultima settimana)</Text>
              <Text style={styles.inputHint}>Somma delle unità di carico dell&apos;ultima settimana</Text>
              <TextInput
                style={styles.input}
                value={acuteLoad}
                onChangeText={setAcuteLoad}
                keyboardType="decimal-pad"
                placeholder="es. 2500"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Carico Cronico (media 4 settimane)</Text>
              <Text style={styles.inputHint}>Media del carico delle ultime 4 settimane</Text>
              <TextInput
                style={styles.input}
                value={chronicLoad}
                onChangeText={setChronicLoad}
                keyboardType="decimal-pad"
                placeholder="es. 2200"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <Pressable style={styles.calculateButton} onPress={calculateACR}>
              <IconSymbol name="function" size={20} color="#FFFFFF" />
              <Text style={styles.calculateButtonText}>Calcola ACR</Text>
            </Pressable>
          </View>

          {result !== null && (
            <View style={[commonStyles.card, styles.resultCard]}>
              <Text style={styles.resultLabel}>Rapporto ACR</Text>
              <Text style={[styles.resultValue, { color: getResultColor() }]}>
                {result.toFixed(2)}
              </Text>
              <View style={styles.interpretationContainer}>
                <Text style={styles.interpretationText}>{interpretation}</Text>
              </View>
            </View>
          )}

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Guida Interpretazione</Text>
            
            <View style={styles.guideItem}>
              <View style={[styles.guideDot, { backgroundColor: colors.warning }]} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>&lt; 0.8 - Sottoccarico</Text>
                <Text style={styles.guideDescription}>Carico insufficiente, rischio detraining</Text>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View style={[styles.guideDot, { backgroundColor: colors.accent }]} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>0.8 - 1.3 - Zona Ottimale</Text>
                <Text style={styles.guideDescription}>Range ideale per progressione sicura</Text>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View style={[styles.guideDot, { backgroundColor: colors.warning }]} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>1.3 - 1.5 - Attenzione</Text>
                <Text style={styles.guideDescription}>Carico elevato, monitorare attentamente</Text>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View style={[styles.guideDot, { backgroundColor: colors.secondary }]} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>&gt; 1.5 - Sovraccarico</Text>
                <Text style={styles.guideDescription}>Alto rischio infortuni, ridurre carico</Text>
              </View>
            </View>
          </View>

          <View style={[commonStyles.card, styles.exampleCard]}>
            <Text style={styles.sectionTitle}>Esempio Pratico</Text>
            <Text style={styles.exampleText}>
              <Text style={styles.exampleBold}>Settimana corrente:</Text> 2600 unità{'\n'}
              <Text style={styles.exampleBold}>Media 4 settimane:</Text> 2200 unità{'\n'}
              <Text style={styles.exampleBold}>ACR:</Text> 2600 ÷ 2200 = 1.18{'\n\n'}
              Risultato nella zona ottimale ✅
            </Text>
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: colors.highlight,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  inputHint: {
    fontSize: 12,
    color: colors.textSecondary,
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
  calculateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 16,
  },
  interpretationContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  interpretationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    textAlign: 'center',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  guideDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  exampleCard: {
    backgroundColor: colors.highlight,
  },
  exampleText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  exampleBold: {
    fontWeight: '600',
  },
});
