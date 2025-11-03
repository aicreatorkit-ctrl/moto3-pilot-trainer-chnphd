
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Dimensions, Modal, Alert } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Line, Text as SvgText, Path, Rect } from 'react-native-svg';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { storage } from '@/utils/storage';
import { measurePerformance, debounce } from '@/utils/performance';

const { width } = Dimensions.get('window');

interface ProgressData {
  date: string;
  weight: number;
  hrv: number;
  load: number;
  stiffness: number;
}

interface ExerciseProgress {
  name: string;
  current: number;
  target: number;
  unit: string;
}

interface ReadinessEntry {
  id: string;
  date: string;
  sleepQuality: number;
  muscleSoreness: number;
  mood: number;
  energy: number;
  motivation: number;
  weight: string;
  hrv: string;
  restingHR: string;
  notes: string;
  score: number;
}

const STORAGE_KEY = '@progress_data';
const READINESS_STORAGE_KEY = '@readiness_history';
const UPDATE_TRIGGER_KEY = '@progress_update_trigger';

export default function ProgressScreen() {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'hrv' | 'load' | 'stiffness'>('weight');
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const metrics = [
    { key: 'weight', label: 'Peso', icon: 'scalemass.fill', color: colors.primary, unit: 'kg' },
    { key: 'hrv', label: 'HRV', icon: 'waveform.path.ecg', color: colors.accent, unit: 'ms' },
    { key: 'load', label: 'Carico', icon: 'chart.bar.fill', color: colors.warning, unit: 'AU' },
    { key: 'stiffness', label: 'Rigidità', icon: 'figure.flexibility', color: colors.secondary, unit: '/10' },
  ];

  const periods = [
    { key: '7d', label: '7 giorni' },
    { key: '30d', label: '30 giorni' },
    { key: '90d', label: '90 giorni' },
  ];

  const exerciseProgress: ExerciseProgress[] = [
    { name: 'Squat', current: 85, target: 100, unit: 'kg' },
    { name: 'Plank', current: 120, target: 180, unit: 'sec' },
    { name: 'Sprint 100m', current: 13.2, target: 12.5, unit: 'sec' },
    { name: 'Flessioni', current: 45, target: 60, unit: 'reps' },
    { name: 'Trazioni', current: 12, target: 20, unit: 'reps' },
  ];

  const generateMockData = useCallback((): ProgressData[] => {
    const data: ProgressData[] = [];
    const now = new Date();
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString(),
        weight: 72 - (i / 90) * 2 + Math.random() * 0.5,
        hrv: 55 + (i / 90) * 12 + Math.random() * 5,
        load: 450 + Math.random() * 150,
        stiffness: 7 - (i / 90) * 3 + Math.random() * 1,
      });
    }
    
    return data;
  }, []);

  const loadProgressData = useCallback(async () => {
    try {
      // Use optimized storage with caching
      const result = await storage.getItem<ProgressData[]>(STORAGE_KEY, true);
      if (result.success && result.data) {
        setProgressData(result.data);
      } else {
        // Generate mock data
        const mockData = generateMockData();
        setProgressData(mockData);
        await storage.setItem(STORAGE_KEY, mockData);
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
      throw error;
    }
  }, [generateMockData]);

  const updateProgressFromReadiness = useCallback(async (currentProgressData: ProgressData[]) => {
    try {
      // Load readiness history
      const readinessData = await AsyncStorage.getItem(READINESS_STORAGE_KEY);
      if (!readinessData) {
        console.log('No readiness data found');
        return;
      }

      const readinessHistory: ReadinessEntry[] = JSON.parse(readinessData);
      console.log(`Updating progress from ${readinessHistory.length} readiness entries`);

      // Load existing progress data
      let existingProgress = currentProgressData;
      if (existingProgress.length === 0) {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          existingProgress = JSON.parse(stored);
        } else {
          existingProgress = generateMockData();
        }
      }

      // Update progress data with readiness entries
      const updatedProgress = [...existingProgress];
      
      readinessHistory.forEach((entry) => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        
        // Find if we already have data for this date
        const existingIndex = updatedProgress.findIndex(
          (p) => new Date(p.date).toISOString().split('T')[0] === entryDate
        );

        const newData: ProgressData = {
          date: entry.date,
          weight: entry.weight ? parseFloat(entry.weight) : (existingIndex >= 0 ? updatedProgress[existingIndex].weight : 72),
          hrv: entry.hrv ? parseFloat(entry.hrv) : (existingIndex >= 0 ? updatedProgress[existingIndex].hrv : 60),
          load: existingIndex >= 0 ? updatedProgress[existingIndex].load : 500 + Math.random() * 100,
          stiffness: (11 - entry.muscleSoreness), // Convert soreness to stiffness
        };

        if (existingIndex >= 0) {
          // Update existing entry
          updatedProgress[existingIndex] = newData;
        } else {
          // Add new entry
          updatedProgress.push(newData);
        }
      });

      // Sort by date
      updatedProgress.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Save updated progress
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
      setProgressData(updatedProgress);
      
      console.log('Progress data updated successfully');
    } catch (error) {
      console.log('Error updating progress from readiness:', error);
    }
  }, [generateMockData]);

  const checkForUpdates = useCallback(async (currentProgressData: ProgressData[], currentLastUpdate: string) => {
    try {
      const updateTrigger = await AsyncStorage.getItem(UPDATE_TRIGGER_KEY);
      if (updateTrigger && updateTrigger !== currentLastUpdate) {
        console.log('Progress data update detected, reloading...');
        setLastUpdate(updateTrigger);
        await updateProgressFromReadiness(currentProgressData);
      }
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  }, [updateProgressFromReadiness]);

  const initializeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await measurePerformance('initializeProgressData', async () => {
        await loadProgressData();
        // Check for updates after loading initial data
        const updateTrigger = await AsyncStorage.getItem(UPDATE_TRIGGER_KEY);
        if (updateTrigger) {
          setLastUpdate(updateTrigger);
        }
      });
    } catch (err) {
      console.error('Error initializing progress data:', err);
      setError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  }, [loadProgressData]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Use focus effect to reload data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      checkForUpdates(progressData, lastUpdate);
    }, [progressData, lastUpdate, checkForUpdates])
  );

  const getFilteredData = useCallback(() => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    return progressData.slice(-days);
  }, [progressData, selectedPeriod]);

  const calculateStats = useCallback((data: number[]) => {
    if (data.length === 0) return { avg: 0, min: 0, max: 0, trend: 0 };
    
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    // Calculate trend (difference between first half and second half)
    const midPoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midPoint).reduce((a, b) => a + b, 0) / midPoint;
    const secondHalf = data.slice(midPoint).reduce((a, b) => a + b, 0) / (data.length - midPoint);
    const trend = ((secondHalf - firstHalf) / firstHalf) * 100;
    
    return { avg, min, max, trend };
  }, []);

  // Memoize expensive calculations
  const filteredData = useMemo(() => getFilteredData(), [getFilteredData]);
  const currentMetricData = useMemo(() => filteredData.map(d => d[selectedMetric]), [filteredData, selectedMetric]);
  const stats = useMemo(() => calculateStats(currentMetricData), [currentMetricData, calculateStats]);
  const currentMetric = useMemo(() => metrics.find(m => m.key === selectedMetric), [selectedMetric, metrics]);

  const renderLineChart = (data: number[], metric: string) => {
    if (data.length < 2) return null;

    const chartWidth = width - 64;
    const chartHeight = 200;
    const padding = 30;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
      const y = chartHeight - padding - ((value - minValue) / range) * (chartHeight - 2 * padding);
      return { x, y, value };
    });

    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }

    const metricColor = metrics.find(m => m.key === metric)?.color || colors.primary;

    return (
      <Svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = chartHeight - padding - (ratio * (chartHeight - 2 * padding));
          const value = minValue + (ratio * range);
          return (
            <React.Fragment key={ratio}>
              <Line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke={colors.border}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
              <SvgText
                x={padding - 8}
                y={y}
                textAnchor="end"
                fontSize="10"
                fill={colors.textSecondary}
                dy="3"
              >
                {value.toFixed(1)}
              </SvgText>
            </React.Fragment>
          );
        })}
        
        {/* Area under line */}
        <Path
          d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
          fill={metricColor}
          opacity={0.1}
        />
        
        {/* Line */}
        <Path
          d={pathData}
          stroke={metricColor}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={metricColor}
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        ))}
      </Svg>
    );
  };

  const renderDoughnutChart = (percentage: number) => {
    const size = 140;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.surface}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
        <SvgText
          x={size / 2}
          y={size / 2 - 10}
          textAnchor="middle"
          fontSize="32"
          fontWeight="800"
          fill={colors.text}
        >
          {percentage}%
        </SvgText>
        <SvgText
          x={size / 2}
          y={size / 2 + 15}
          textAnchor="middle"
          fontSize="12"
          fill={colors.textSecondary}
        >
          Completato
        </SvgText>
      </Svg>
    );
  };

  const weekProgress = 44; // Week 8 of 18

  // Show loading state
  if (loading) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Progressi & Analisi',
            }}
          />
        )}
        <View style={commonStyles.container}>
          <LoadingState message="Caricamento progressi..." fullScreen />
        </View>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Progressi & Analisi',
            }}
          />
        )}
        <View style={commonStyles.container}>
          <ErrorState 
            message={error} 
            onRetry={initializeData}
            fullScreen 
          />
        </View>
      </>
    );
  }

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Progressi & Analisi',
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable onPress={() => {
                  checkForUpdates(progressData, lastUpdate);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}>
                  <IconSymbol name="arrow.clockwise" size={22} color={colors.primary} />
                </Pressable>
                <Pressable onPress={() => setShowExercises(true)}>
                  <IconSymbol name="figure.strengthtraining.traditional" size={22} color={colors.primary} />
                </Pressable>
                <Pressable onPress={() => setShowAnalysis(true)}>
                  <IconSymbol name="chart.bar.doc.horizontal" size={22} color={colors.primary} />
                </Pressable>
              </View>
            ),
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
          {/* Update Indicator */}
          {lastUpdate && (
            <View style={styles.updateBanner}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
              <Text style={styles.updateBannerText}>
                Dati aggiornati da Controllo Prontezza
              </Text>
            </View>
          )}

          {/* Overview Card */}
          <LinearGradient
            colors={gradients.racing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.overviewCard}
          >
            <Text style={styles.overviewTitle}>Programma 18 Settimane</Text>
            <View style={styles.doughnutContainer}>
              {renderDoughnutChart(weekProgress)}
            </View>
            <Text style={styles.overviewText}>
              Settimana 8 di 18 completata
            </Text>
            <View style={styles.weekProgressBar}>
              <View style={[styles.weekProgressFill, { width: `${weekProgress}%` }]} />
            </View>
          </LinearGradient>

          {/* Quick Stats */}
          <View style={styles.quickStatsGrid}>
            <View style={styles.quickStatCard}>
              <IconSymbol name="flame.fill" size={24} color={colors.error} />
              <Text style={styles.quickStatValue}>12</Text>
              <Text style={styles.quickStatLabel}>Sessioni</Text>
              <Text style={styles.quickStatSubLabel}>Questa settimana</Text>
            </View>
            <View style={styles.quickStatCard}>
              <IconSymbol name="clock.fill" size={24} color={colors.accent} />
              <Text style={styles.quickStatValue}>8.5h</Text>
              <Text style={styles.quickStatLabel}>Allenamento</Text>
              <Text style={styles.quickStatSubLabel}>Totale settimanale</Text>
            </View>
            <View style={styles.quickStatCard}>
              <IconSymbol name="bolt.fill" size={24} color={colors.warning} />
              <Text style={styles.quickStatValue}>2850</Text>
              <Text style={styles.quickStatLabel}>Carico</Text>
              <Text style={styles.quickStatSubLabel}>AU settimanale</Text>
            </View>
          </View>

          {/* Period Selector */}
          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Periodo</Text>
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <Pressable
                  key={period.key}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period.key && styles.periodButtonActive,
                  ]}
                  onPress={() => {
                    setSelectedPeriod(period.key as any);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period.key && styles.periodButtonTextActive,
                    ]}
                  >
                    {period.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Metrics Selector */}
          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Metriche</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric) => (
                <Pressable
                  key={metric.key}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric.key && [
                      styles.metricButtonActive,
                      { backgroundColor: metric.color }
                    ],
                  ]}
                  onPress={() => {
                    setSelectedMetric(metric.key as any);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
          <View style={commonStyles.card}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>{currentMetric?.label}</Text>
                <Text style={styles.chartSubtitle}>
                  {selectedPeriod === '7d' ? 'Ultimi 7 giorni' : selectedPeriod === '30d' ? 'Ultimi 30 giorni' : 'Ultimi 90 giorni'}
                </Text>
              </View>
              <View style={[styles.trendBadge, { backgroundColor: stats.trend >= 0 ? colors.success + '20' : colors.error + '20' }]}>
                <IconSymbol 
                  name={stats.trend >= 0 ? 'arrow.up.right' : 'arrow.down.right'} 
                  size={16} 
                  color={stats.trend >= 0 ? colors.success : colors.error} 
                />
                <Text style={[styles.trendText, { color: stats.trend >= 0 ? colors.success : colors.error }]}>
                  {Math.abs(stats.trend).toFixed(1)}%
                </Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {renderLineChart(currentMetricData, selectedMetric)}
            </View>
            <View style={styles.chartStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Media</Text>
                <Text style={styles.statValue}>
                  {stats.avg.toFixed(1)} {currentMetric?.unit}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Min</Text>
                <Text style={styles.statValue}>
                  {stats.min.toFixed(1)} {currentMetric?.unit}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Max</Text>
                <Text style={styles.statValue}>
                  {stats.max.toFixed(1)} {currentMetric?.unit}
                </Text>
              </View>
            </View>
          </View>

          {/* Exercise Progress Preview */}
          <View style={commonStyles.card}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Progressi Esercizi</Text>
              <Pressable onPress={() => setShowExercises(true)}>
                <Text style={styles.seeAllText}>Vedi tutti</Text>
              </Pressable>
            </View>
            {exerciseProgress.slice(0, 3).map((exercise, index) => {
              const progress = (exercise.current / exercise.target) * 100;
              return (
                <View key={index} style={styles.exerciseItem}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseValue}>
                      {exercise.current} / {exercise.target} {exercise.unit}
                    </Text>
                  </View>
                  <View style={styles.exerciseProgressBar}>
                    <View style={[styles.exerciseProgressFill, { width: `${Math.min(progress, 100)}%` }]} />
                  </View>
                  <Text style={styles.exercisePercentage}>{Math.round(progress)}%</Text>
                </View>
              );
            })}
          </View>

          {/* Export Button */}
          <Pressable 
            style={styles.exportButton}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert('📊 Export', 'Report PDF generato con successo');
            }}
          >
            <LinearGradient
              colors={gradients.racing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.exportButtonGradient}
            >
              <IconSymbol name="square.and.arrow.up" size={20} color="#FFFFFF" />
              <Text style={styles.exportButtonText}>Esporta Report PDF</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>

      {/* Exercise Progress Modal */}
      <Modal
        visible={showExercises}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowExercises(false)}
      >
        <View style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Progressi Esercizi</Text>
            <Pressable onPress={() => setShowExercises(false)}>
              <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {exerciseProgress.map((exercise, index) => {
              const progress = (exercise.current / exercise.target) * 100;
              const isCompleted = progress >= 100;
              
              return (
                <View key={index} style={styles.exerciseCard}>
                  <View style={styles.exerciseCardHeader}>
                    <View style={styles.exerciseIconContainer}>
                      <IconSymbol 
                        name={isCompleted ? 'checkmark.circle.fill' : 'figure.strengthtraining.traditional'} 
                        size={28} 
                        color={isCompleted ? colors.success : colors.primary} 
                      />
                    </View>
                    <View style={styles.exerciseCardInfo}>
                      <Text style={styles.exerciseCardName}>{exercise.name}</Text>
                      <Text style={styles.exerciseCardValue}>
                        {exercise.current} / {exercise.target} {exercise.unit}
                      </Text>
                    </View>
                    <View style={[styles.exerciseCardBadge, { backgroundColor: isCompleted ? colors.success : colors.primary }]}>
                      <Text style={styles.exerciseCardBadgeText}>{Math.round(progress)}%</Text>
                    </View>
                  </View>
                  <View style={styles.exerciseCardProgressBar}>
                    <View 
                      style={[
                        styles.exerciseCardProgressFill, 
                        { 
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: isCompleted ? colors.success : colors.primary
                        }
                      ]} 
                    />
                  </View>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <IconSymbol name="star.fill" size={14} color={colors.warning} />
                      <Text style={styles.completedText}>Obiettivo raggiunto!</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      {/* Analysis Modal */}
      <Modal
        visible={showAnalysis}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAnalysis(false)}
      >
        <View style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Analisi Dettagliata</Text>
            <Pressable onPress={() => setShowAnalysis(false)}>
              <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={commonStyles.card}>
              <Text style={styles.sectionTitle}>Riepilogo Prestazioni</Text>
              <View style={styles.analysisGrid}>
                <View style={styles.analysisCard}>
                  <IconSymbol name="chart.line.uptrend.xyaxis" size={32} color={colors.success} />
                  <Text style={styles.analysisValue}>+15%</Text>
                  <Text style={styles.analysisLabel}>Miglioramento</Text>
                  <Text style={styles.analysisSubLabel}>vs mese scorso</Text>
                </View>
                <View style={styles.analysisCard}>
                  <IconSymbol name="target" size={32} color={colors.primary} />
                  <Text style={styles.analysisValue}>87%</Text>
                  <Text style={styles.analysisLabel}>Obiettivi</Text>
                  <Text style={styles.analysisSubLabel}>Raggiunti</Text>
                </View>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={styles.sectionTitle}>Insights Chiave</Text>
              <View style={styles.insightItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Eccellente Consistenza</Text>
                  <Text style={styles.insightText}>
                    Hai completato il 95% delle sessioni programmate nelle ultime 4 settimane
                  </Text>
                </View>
              </View>
              <View style={styles.insightItem}>
                <IconSymbol name="arrow.up.circle.fill" size={24} color={colors.accent} />
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>HRV in Miglioramento</Text>
                  <Text style={styles.insightText}>
                    Il tuo HRV è aumentato del 12% indicando un miglior recupero
                  </Text>
                </View>
              </View>
              <View style={styles.insightItem}>
                <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.warning} />
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Attenzione al Carico</Text>
                  <Text style={styles.insightText}>
                    Il carico di allenamento è aumentato del 20% nell&apos;ultima settimana. Monitora il recupero
                  </Text>
                </View>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={styles.sectionTitle}>Raccomandazioni</Text>
              <View style={styles.recommendationItem}>
                <View style={styles.recommendationNumber}>
                  <Text style={styles.recommendationNumberText}>1</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Mantieni la Consistenza</Text>
                  <Text style={styles.recommendationText}>
                    La tua aderenza al programma è ottima. Continua così per massimizzare i risultati
                  </Text>
                </View>
              </View>
              <View style={styles.recommendationItem}>
                <View style={styles.recommendationNumber}>
                  <Text style={styles.recommendationNumberText}>2</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Focus sul Recupero</Text>
                  <Text style={styles.recommendationText}>
                    Considera una settimana di scarico per ottimizzare l&apos;adattamento
                  </Text>
                </View>
              </View>
              <View style={styles.recommendationItem}>
                <View style={styles.recommendationNumber}>
                  <Text style={styles.recommendationNumberText}>3</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Progressione Graduale</Text>
                  <Text style={styles.recommendationText}>
                    Aumenta il carico del 5-10% a settimana per evitare sovrallenamento
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
  updateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  updateBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
    flex: 1,
  },
  overviewCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.large,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  doughnutContainer: {
    marginVertical: 16,
  },
  overviewText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 16,
    fontWeight: '600',
  },
  weekProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...shadows.small,
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  quickStatSubLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  metricButtonActive: {
    ...shadows.small,
  },
  metricButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  metricButtonTextActive: {
    color: '#FFFFFF',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  chartSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '700',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  exerciseItem: {
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  exerciseValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  exerciseProgressBar: {
    height: 10,
    backgroundColor: colors.surface,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  exerciseProgressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 5,
  },
  exercisePercentage: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  exportButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  exportButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  modalContent: {
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  exerciseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseCardInfo: {
    flex: 1,
  },
  exerciseCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseCardValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  exerciseCardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  exerciseCardBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  exerciseCardProgressBar: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  exerciseCardProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  completedText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.success,
  },
  analysisGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  analysisCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  analysisValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  analysisLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 6,
  },
  analysisSubLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  insightItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  insightText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  recommendationItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  recommendationNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationNumberText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
