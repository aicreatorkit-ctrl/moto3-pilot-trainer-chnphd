
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

interface BiomechanicalAnalysis {
  id: string;
  date: string;
  type: 'riding' | 'training' | 'recovery';
  metrics: {
    jointAngles: {
      knee: number;
      hip: number;
      ankle: number;
      elbow: number;
      shoulder: number;
    };
    forceDistribution: {
      leftFoot: number;
      rightFoot: number;
      leftHand: number;
      rightHand: number;
    };
    symmetry: number;
    efficiency: number;
  };
  recommendations: string[];
}

export default function Biomechanics3DScreen() {
  const [analyses, setAnalyses] = useState<BiomechanicalAnalysis[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'riding',
      metrics: {
        jointAngles: {
          knee: 125,
          hip: 110,
          ankle: 95,
          elbow: 140,
          shoulder: 85,
        },
        forceDistribution: {
          leftFoot: 48,
          rightFoot: 52,
          leftHand: 45,
          rightHand: 55,
        },
        symmetry: 92,
        efficiency: 88,
      },
      recommendations: [
        'Aumentare flessione ginocchio di 5° in curva',
        'Migliorare simmetria distribuzione peso',
        'Ottimizzare angolo gomito per controllo',
      ],
    },
  ]);

  const [selectedAnalysis, setSelectedAnalysis] = useState<BiomechanicalAnalysis | null>(null);

  const startAnalysis = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permesso negato', 'Serve il permesso per accedere alla fotocamera');
        return;
      }

      Alert.alert(
        'Analisi Biomeccanica 3D',
        'Per un\'analisi ottimale:\n\n• Indossa abbigliamento aderente\n• Posizionati in un ambiente ben illuminato\n• Segui le istruzioni sullo schermo\n• Esegui i movimenti richiesti',
        [
          { text: 'Annulla', style: 'cancel' },
          {
            text: 'Inizia',
            onPress: () => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              console.log('Starting 3D biomechanical analysis');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error starting analysis:', error);
      Alert.alert('Errore', 'Impossibile avviare l\'analisi');
    }
  };

  const getAngleColor = (angle: number, optimal: number) => {
    const diff = Math.abs(angle - optimal);
    if (diff < 5) return colors.success;
    if (diff < 10) return colors.warning;
    return colors.error;
  };

  const getAngleStatus = (angle: number, optimal: number) => {
    const diff = Math.abs(angle - optimal);
    if (diff < 5) return 'Ottimale';
    if (diff < 10) return 'Buono';
    return 'Da migliorare';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Analisi Biomeccanica 3D',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Card */}
          <LinearGradient
            colors={gradients.warning}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="figure.walk.motion" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Analisi Biomeccanica 3D</Text>
            <Text style={styles.headerDescription}>
              Tecnologia avanzata per ottimizzare movimento e prevenire infortuni
            </Text>
          </LinearGradient>

          {/* Start Analysis Button */}
          <Pressable style={styles.startButton} onPress={startAnalysis}>
            <LinearGradient
              colors={gradients.racing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.startButtonGradient}
            >
              <IconSymbol name="camera.fill" size={32} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Nuova Analisi 3D</Text>
            </LinearGradient>
          </Pressable>

          {/* Features */}
          <View style={[commonStyles.card, styles.featuresCard]}>
            <Text style={styles.sectionTitle}>Analisi Avanzate</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <IconSymbol name="figure.stand" size={20} color={colors.primary} />
                <Text style={styles.featureText}>Angoli articolari in tempo reale</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="arrow.left.and.right" size={20} color={colors.accent} />
                <Text style={styles.featureText}>Simmetria e bilanciamento</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="chart.bar.fill" size={20} color={colors.success} />
                <Text style={styles.featureText}>Distribuzione forze</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="waveform.path.ecg" size={20} color={colors.warning} />
                <Text style={styles.featureText}>Efficienza movimento</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.error} />
                <Text style={styles.featureText}>Rilevamento rischio infortuni</Text>
              </View>
            </View>
          </View>

          {/* Recent Analyses */}
          <Text style={styles.sectionHeader}>Analisi Recenti</Text>
          {analyses.map((analysis) => (
            <Pressable
              key={analysis.id}
              style={[commonStyles.card, styles.analysisCard]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedAnalysis(
                  selectedAnalysis?.id === analysis.id ? null : analysis
                );
              }}
            >
              <View style={styles.analysisHeader}>
                <View style={styles.analysisInfo}>
                  <Text style={styles.analysisDate}>
                    {new Date(analysis.date).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                  <View style={styles.analysisTypeBadge}>
                    <Text style={styles.analysisTypeText}>
                      {analysis.type === 'riding' && 'Guida'}
                      {analysis.type === 'training' && 'Allenamento'}
                      {analysis.type === 'recovery' && 'Recupero'}
                    </Text>
                  </View>
                </View>
                <View style={styles.analysisScores}>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreValue}>{analysis.metrics.symmetry}%</Text>
                    <Text style={styles.scoreLabel}>Simmetria</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreValue}>{analysis.metrics.efficiency}%</Text>
                    <Text style={styles.scoreLabel}>Efficienza</Text>
                  </View>
                </View>
              </View>

              {selectedAnalysis?.id === analysis.id && (
                <View style={styles.analysisDetails}>
                  {/* Joint Angles */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Angoli Articolari</Text>
                    <View style={styles.anglesList}>
                      {Object.entries(analysis.metrics.jointAngles).map(([joint, angle]) => {
                        const optimalAngles: { [key: string]: number } = {
                          knee: 120,
                          hip: 110,
                          ankle: 90,
                          elbow: 135,
                          shoulder: 90,
                        };
                        const optimal = optimalAngles[joint];
                        const jointLabels: { [key: string]: string } = {
                          knee: 'Ginocchio',
                          hip: 'Anca',
                          ankle: 'Caviglia',
                          elbow: 'Gomito',
                          shoulder: 'Spalla',
                        };

                        return (
                          <View key={joint} style={styles.angleItem}>
                            <View style={styles.angleHeader}>
                              <Text style={styles.angleLabel}>{jointLabels[joint]}</Text>
                              <View style={styles.angleValues}>
                                <Text style={[styles.angleValue, { color: getAngleColor(angle, optimal) }]}>
                                  {angle}°
                                </Text>
                                <Text style={styles.angleOptimal}>/ {optimal}°</Text>
                              </View>
                            </View>
                            <View style={styles.angleBar}>
                              <View
                                style={[
                                  styles.angleBarFill,
                                  {
                                    width: `${(angle / 180) * 100}%`,
                                    backgroundColor: getAngleColor(angle, optimal),
                                  },
                                ]}
                              />
                            </View>
                            <Text style={[styles.angleStatus, { color: getAngleColor(angle, optimal) }]}>
                              {getAngleStatus(angle, optimal)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  {/* Force Distribution */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Distribuzione Forze</Text>
                    <View style={styles.forceGrid}>
                      {Object.entries(analysis.metrics.forceDistribution).map(([part, force]) => {
                        const partLabels: { [key: string]: string } = {
                          leftFoot: 'Piede SX',
                          rightFoot: 'Piede DX',
                          leftHand: 'Mano SX',
                          rightHand: 'Mano DX',
                        };

                        return (
                          <View key={part} style={styles.forceItem}>
                            <Text style={styles.forceLabel}>{partLabels[part]}</Text>
                            <Text style={styles.forceValue}>{force}%</Text>
                            <View style={styles.forceBar}>
                              <View
                                style={[
                                  styles.forceBarFill,
                                  {
                                    width: `${force}%`,
                                    backgroundColor: Math.abs(force - 50) < 5 ? colors.success : colors.warning,
                                  },
                                ]}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  {/* Recommendations */}
                  <View style={styles.recommendationsSection}>
                    <Text style={styles.recommendationsTitle}>
                      <IconSymbol name="lightbulb.fill" size={18} color={colors.warning} />
                      {' '}Raccomandazioni
                    </Text>
                    {analysis.recommendations.map((rec, index) => (
                      <Text key={index} style={styles.recommendationItem}>
                        • {rec}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </Pressable>
          ))}

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={styles.infoText}>
              L&apos;analisi biomeccanica 3D utilizza la fotocamera per tracciare i movimenti del corpo 
              e fornire feedback dettagliato su postura, angoli articolari e distribuzione delle forze.
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
  headerCard: {
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    alignItems: 'center',
    ...shadows.large,
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
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  startButton: {
    marginBottom: 24,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 20,
    padding: 24,
    ...shadows.medium,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  featuresCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  featuresList: {
    gap: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  analysisCard: {
    marginBottom: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysisInfo: {
    flex: 1,
  },
  analysisDate: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  analysisTypeBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  analysisTypeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  analysisScores: {
    flexDirection: 'row',
    gap: 16,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  analysisDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: 20,
  },
  detailSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  anglesList: {
    gap: 16,
  },
  angleItem: {
    gap: 8,
  },
  angleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  angleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  angleValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  angleValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  angleOptimal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  angleBar: {
    height: 8,
    backgroundColor: colors.card,
    borderRadius: 4,
    overflow: 'hidden',
  },
  angleBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  angleStatus: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  forceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  forceItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
  },
  forceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  forceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  forceBar: {
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  forceBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  recommendationsSection: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  recommendationItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.highlightBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
