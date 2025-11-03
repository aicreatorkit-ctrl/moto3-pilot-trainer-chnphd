
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Svg, { Line, Circle, Polyline, Text as SvgText } from 'react-native-svg';

interface TelemetrySession {
  id: string;
  date: string;
  circuit: string;
  lapTime: string;
  data: {
    speed: number[];
    throttle: number[];
    brake: number[];
    gear: number[];
    rpm: number[];
  };
  sectors: {
    sector1: string;
    sector2: string;
    sector3: string;
  };
}

export default function TelemetryComparisonScreen() {
  const [sessions] = useState<TelemetrySession[]>([
    {
      id: '1',
      date: '2024-01-15',
      circuit: 'Mugello',
      lapTime: '1:52.345',
      data: {
        speed: [0, 80, 150, 180, 200, 220, 180, 140, 100, 120, 160, 200, 220, 200, 150, 100],
        throttle: [0, 50, 80, 90, 100, 100, 60, 40, 70, 90, 100, 100, 90, 70, 50, 30],
        brake: [0, 0, 0, 0, 0, 20, 80, 100, 60, 20, 0, 0, 20, 60, 80, 100],
        gear: [1, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 2],
        rpm: [4000, 8000, 10000, 11000, 12000, 13000, 11000, 9000, 7000, 9000, 11000, 13000, 11000, 9000, 7000, 5000],
      },
      sectors: {
        sector1: '36.234',
        sector2: '38.567',
        sector3: '37.544',
      },
    },
    {
      id: '2',
      date: '2024-01-14',
      circuit: 'Mugello',
      lapTime: '1:53.123',
      data: {
        speed: [0, 75, 145, 175, 195, 215, 175, 135, 95, 115, 155, 195, 215, 195, 145, 95],
        throttle: [0, 45, 75, 85, 95, 95, 55, 35, 65, 85, 95, 95, 85, 65, 45, 25],
        brake: [0, 0, 0, 0, 0, 25, 85, 100, 65, 25, 0, 0, 25, 65, 85, 100],
        gear: [1, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 2],
        rpm: [3800, 7800, 9800, 10800, 11800, 12800, 10800, 8800, 6800, 8800, 10800, 12800, 10800, 8800, 6800, 4800],
      },
      sectors: {
        sector1: '36.789',
        sector2: '38.912',
        sector3: '37.422',
      },
    },
  ]);

  const [selectedSessions, setSelectedSessions] = useState<string[]>(['1', '2']);
  const [selectedMetric, setSelectedMetric] = useState<'speed' | 'throttle' | 'brake' | 'rpm'>('speed');

  const toggleSession = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (selectedSessions.includes(id)) {
      setSelectedSessions(selectedSessions.filter(s => s !== id));
    } else if (selectedSessions.length < 2) {
      setSelectedSessions([...selectedSessions, id]);
    }
  };

  const renderChart = () => {
    const width = 350;
    const height = 200;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const session1 = sessions.find(s => s.id === selectedSessions[0]);
    const session2 = sessions.find(s => s.id === selectedSessions[1]);

    if (!session1) return null;

    const data1 = session1.data[selectedMetric];
    const data2 = session2?.data[selectedMetric];
    const maxValue = Math.max(...data1, ...(data2 || []));

    const points1 = data1.map((value, index) => {
      const x = padding + (index / (data1.length - 1)) * chartWidth;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    const points2 = data2?.map((value, index) => {
      const x = padding + (index / (data2.length - 1)) * chartWidth;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <Line
            key={index}
            x1={padding}
            y1={padding + chartHeight * ratio}
            x2={width - padding}
            y2={padding + chartHeight * ratio}
            stroke={colors.divider}
            strokeWidth="1"
          />
        ))}

        {/* Session 1 line */}
        <Polyline
          points={points1}
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
        />

        {/* Session 2 line */}
        {points2 && (
          <Polyline
            points={points2}
            fill="none"
            stroke={colors.accent}
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        )}

        {/* Y-axis labels */}
        <SvgText
          x={padding - 10}
          y={padding}
          fontSize="10"
          fill={colors.textSecondary}
          textAnchor="end"
        >
          {maxValue}
        </SvgText>
        <SvgText
          x={padding - 10}
          y={padding + chartHeight}
          fontSize="10"
          fill={colors.textSecondary}
          textAnchor="end"
        >
          0
        </SvgText>
      </Svg>
    );
  };

  const calculateDifference = (session1: TelemetrySession, session2: TelemetrySession) => {
    const time1 = parseFloat(session1.lapTime.replace(':', '').replace('.', ''));
    const time2 = parseFloat(session2.lapTime.replace(':', '').replace('.', ''));
    const diff = ((time1 - time2) / 1000).toFixed(3);
    return diff;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Comparazione Telemetria',
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
            colors={gradients.cyan}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="chart.xyaxis.line" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Telemetria Avanzata</Text>
            <Text style={styles.headerDescription}>
              Confronta dati telemetrici per ottimizzare le prestazioni
            </Text>
          </LinearGradient>

          {/* Metric Selector */}
          <View style={[commonStyles.card, styles.metricSelector]}>
            <Text style={styles.sectionTitle}>Seleziona Metrica</Text>
            <View style={styles.metricButtons}>
              {[
                { key: 'speed', label: 'Velocità', icon: 'speedometer', color: colors.primary },
                { key: 'throttle', label: 'Gas', icon: 'bolt.fill', color: colors.success },
                { key: 'brake', label: 'Freno', icon: 'brake.signal', color: colors.error },
                { key: 'rpm', label: 'RPM', icon: 'gauge.high', color: colors.warning },
              ].map((metric) => (
                <Pressable
                  key={metric.key}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric.key && styles.metricButtonActive,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedMetric(metric.key as any);
                  }}
                >
                  <IconSymbol
                    name={metric.icon as any}
                    size={20}
                    color={selectedMetric === metric.key ? '#FFFFFF' : metric.color}
                  />
                  <Text
                    style={[
                      styles.metricButtonText,
                      selectedMetric === metric.key && styles.metricButtonTextActive,
                    ]}
                  >
                    {metric.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Chart */}
          {selectedSessions.length > 0 && (
            <View style={[commonStyles.card, styles.chartCard]}>
              <Text style={styles.sectionTitle}>Grafico Comparativo</Text>
              <View style={styles.chartContainer}>
                {renderChart()}
              </View>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendLine, { backgroundColor: colors.primary }]} />
                  <Text style={styles.legendText}>Sessione 1</Text>
                </View>
                {selectedSessions.length > 1 && (
                  <View style={styles.legendItem}>
                    <View style={[styles.legendLine, { backgroundColor: colors.accent }]} />
                    <Text style={styles.legendText}>Sessione 2</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Session Comparison */}
          {selectedSessions.length === 2 && (
            <View style={[commonStyles.card, styles.comparisonCard]}>
              <Text style={styles.sectionTitle}>Confronto Diretto</Text>
              {(() => {
                const session1 = sessions.find(s => s.id === selectedSessions[0]);
                const session2 = sessions.find(s => s.id === selectedSessions[1]);
                if (!session1 || !session2) return null;

                const diff = calculateDifference(session1, session2);
                const isFaster = parseFloat(diff) < 0;

                return (
                  <>
                    <View style={styles.timeDifference}>
                      <Text style={styles.timeDifferenceLabel}>Differenza Tempo</Text>
                      <Text style={[
                        styles.timeDifferenceValue,
                        { color: isFaster ? colors.success : colors.error }
                      ]}>
                        {isFaster ? '-' : '+'}{Math.abs(parseFloat(diff)).toFixed(3)}s
                      </Text>
                    </View>

                    <View style={styles.sectorsComparison}>
                      {['sector1', 'sector2', 'sector3'].map((sector, index) => {
                        const time1 = parseFloat(session1.sectors[sector as keyof typeof session1.sectors]);
                        const time2 = parseFloat(session2.sectors[sector as keyof typeof session2.sectors]);
                        const sectorDiff = time1 - time2;
                        const isSectorFaster = sectorDiff < 0;

                        return (
                          <View key={sector} style={styles.sectorItem}>
                            <Text style={styles.sectorLabel}>Settore {index + 1}</Text>
                            <View style={styles.sectorTimes}>
                              <Text style={styles.sectorTime}>{session1.sectors[sector as keyof typeof session1.sectors]}</Text>
                              <Text style={[
                                styles.sectorDiff,
                                { color: isSectorFaster ? colors.success : colors.error }
                              ]}>
                                {isSectorFaster ? '' : '+'}{sectorDiff.toFixed(3)}
                              </Text>
                              <Text style={styles.sectorTime}>{session2.sectors[sector as keyof typeof session2.sectors]}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </>
                );
              })()}
            </View>
          )}

          {/* Sessions List */}
          <Text style={styles.sectionHeader}>Sessioni Disponibili</Text>
          {sessions.map((session) => (
            <Pressable
              key={session.id}
              style={[
                commonStyles.card,
                styles.sessionCard,
                selectedSessions.includes(session.id) && styles.sessionCardSelected,
              ]}
              onPress={() => toggleSession(session.id)}
            >
              <View style={styles.sessionHeader}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionCircuit}>{session.circuit}</Text>
                  <Text style={styles.sessionDate}>
                    {new Date(session.date).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </Text>
                </View>
                <View style={styles.sessionTime}>
                  <Text style={styles.sessionTimeValue}>{session.lapTime}</Text>
                  <Text style={styles.sessionTimeLabel}>Tempo Giro</Text>
                </View>
              </View>
              <View style={styles.sessionSectors}>
                <View style={styles.sectorBadge}>
                  <Text style={styles.sectorBadgeText}>S1: {session.sectors.sector1}</Text>
                </View>
                <View style={styles.sectorBadge}>
                  <Text style={styles.sectorBadgeText}>S2: {session.sectors.sector2}</Text>
                </View>
                <View style={styles.sectorBadge}>
                  <Text style={styles.sectorBadgeText}>S3: {session.sectors.sector3}</Text>
                </View>
              </View>
            </Pressable>
          ))}

          {/* Info */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={styles.infoText}>
              Seleziona fino a 2 sessioni per confrontare i dati telemetrici. 
              Analizza velocità, gas, freno e RPM per identificare aree di miglioramento.
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
  metricSelector: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  metricButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },
  metricButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  metricButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  metricButtonTextActive: {
    color: '#FFFFFF',
  },
  chartCard: {
    marginBottom: 24,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendLine: {
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  comparisonCard: {
    marginBottom: 24,
  },
  timeDifference: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  timeDifferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  timeDifferenceValue: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  sectorsComparison: {
    gap: 12,
  },
  sectorItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  sectorLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  sectorTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectorTime: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectorDiff: {
    fontSize: 14,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sessionCard: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sessionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlightRed,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionCircuit: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sessionTime: {
    alignItems: 'flex-end',
  },
  sessionTimeValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  sessionTimeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sessionSectors: {
    flexDirection: 'row',
    gap: 8,
  },
  sectorBadge: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  sectorBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
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
