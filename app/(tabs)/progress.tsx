
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'hrv' | 'load' | 'stiffness'>('weight');

  const metrics = [
    { key: 'weight', label: 'Peso', icon: 'scalemass.fill', color: colors.primary },
    { key: 'hrv', label: 'HRV', icon: 'waveform.path.ecg', color: colors.accent },
    { key: 'load', label: 'Carico', icon: 'chart.bar.fill', color: colors.warning },
    { key: 'stiffness', label: 'Rigidità', icon: 'figure.flexibility', color: colors.secondary },
  ];

  const mockData = {
    weight: [72, 71.8, 71.5, 71.3, 71.2, 71.0, 70.8],
    hrv: [55, 58, 60, 62, 65, 63, 67],
    load: [450, 480, 520, 500, 550, 530, 580],
    stiffness: [7, 6, 6, 5, 5, 4, 4],
  };

  const renderLineChart = (data: number[]) => {
    const chartWidth = width - 64;
    const chartHeight = 150;
    const padding = 20;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
      const y = chartHeight - padding - ((value - minValue) / range) * (chartHeight - 2 * padding);
      return { x, y, value };
    });

    return (
      <Svg width={chartWidth} height={chartHeight}>
        {points.map((point, index) => {
          if (index < points.length - 1) {
            const nextPoint = points[index + 1];
            return (
              <Line
                key={`line-${index}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={colors.primary}
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={colors.primary}
          />
        ))}
      </Svg>
    );
  };

  const renderDoughnutChart = (percentage: number) => {
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.background}
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
          y={size / 2}
          textAnchor="middle"
          dy=".3em"
          fontSize="24"
          fontWeight="700"
          fill={colors.text}
        >
          {percentage}%
        </SvgText>
      </Svg>
    );
  };

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
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.overviewCard]}>
            <Text style={styles.sectionTitle}>Progressione Obiettivi</Text>
            <View style={styles.doughnutContainer}>
              {renderDoughnutChart(73)}
            </View>
            <Text style={styles.overviewText}>
              Settimana 8 di 18 completata
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Metriche</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric) => (
                <Pressable
                  key={metric.key}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric.key && styles.metricButtonActive,
                  ]}
                  onPress={() => setSelectedMetric(metric.key as any)}
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

          <View style={commonStyles.card}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>
                {metrics.find(m => m.key === selectedMetric)?.label}
              </Text>
              <Text style={styles.chartPeriod}>Ultimi 7 giorni</Text>
            </View>
            <View style={styles.chartContainer}>
              {renderLineChart(mockData[selectedMetric])}
            </View>
            <View style={styles.chartStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Media</Text>
                <Text style={styles.statValue}>
                  {(mockData[selectedMetric].reduce((a, b) => a + b, 0) / mockData[selectedMetric].length).toFixed(1)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Min</Text>
                <Text style={styles.statValue}>
                  {Math.min(...mockData[selectedMetric]).toFixed(1)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Max</Text>
                <Text style={styles.statValue}>
                  {Math.max(...mockData[selectedMetric]).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Esercizi Principali</Text>
            {['Squat', 'Plank', 'Sprint 100m'].map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise}</Text>
                <View style={styles.exerciseProgress}>
                  <View style={[styles.exerciseProgressBar, { width: `${60 + index * 10}%` }]} />
                </View>
                <Text style={styles.exercisePercentage}>{60 + index * 10}%</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.exportButton}>
            <IconSymbol name="square.and.arrow.up" size={20} color="#FFFFFF" />
            <Text style={styles.exportButtonText}>Esporta Report PDF</Text>
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
  overviewCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  doughnutContainer: {
    marginVertical: 16,
  },
  overviewText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  metricButtonActive: {
    backgroundColor: colors.primary,
  },
  metricButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  metricButtonTextActive: {
    color: '#FFFFFF',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartPeriod: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    width: 100,
  },
  exerciseProgress: {
    flex: 1,
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  exerciseProgressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  exercisePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    width: 40,
    textAlign: 'right',
  },
  exportButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
