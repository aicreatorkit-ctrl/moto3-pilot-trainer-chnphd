
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from '@/src/components/progress/LineChart';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { useProgress } from '@/src/hooks/useProgress';

/**
 * Progress Screen - Dashboard analytics e grafici
 */
export const ProgressScreen: React.FC = () => {
  const [dateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  const { metrics, loading } = useProgress(dateRange);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Progressi</Text>
        <Text style={styles.subtitle}>Ultimi 30 giorni</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {loading ? (
          <Text style={styles.loading}>Caricamento dati...</Text>
        ) : (
          <>
            {/* Stats Cards */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Routine Completate</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Check Mattutine</Text>
              </Card>
            </View>

            {/* Charts */}
            <LineChart
              title="Qualità del Sonno"
              data={metrics.sleep}
              color="#00D9FF"
              unit="/10"
            />
            <LineChart
              title="Livello Energia"
              data={metrics.energy}
              color="#FFD700"
              unit="/10"
            />
            <LineChart
              title="Peso Corporeo"
              data={metrics.weight}
              color="#FF4444"
              unit=" kg"
            />
            <LineChart
              title="HRV (Variabilità Cardiaca)"
              data={metrics.hrv}
              color="#00C853"
              unit=" ms"
            />

            {/* Info */}
            <Card style={styles.infoCard}>
              <Text style={styles.infoTitle}>💡 Suggerimento</Text>
              <Text style={styles.infoText}>
                Completa la check mattutina ogni giorno per tracciare i tuoi progressi e identificare pattern di performance.
              </Text>
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xl,
    paddingTop: 48, // Android notch
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100, // Spazio per bottom tab
  },
  loading: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxxl,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.hero,
    color: '#FF4444',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FFD70020',
    borderLeftColor: '#FFD700',
  },
  infoTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
