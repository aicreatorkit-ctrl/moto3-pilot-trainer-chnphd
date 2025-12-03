
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MacroCard } from '@/src/components/nutrition/MacroCard';
import { Button } from '@/src/components/common/Button';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';

/**
 * Nutrition Screen - Diario alimentare e tracking macro
 */
export const NutritionScreen: React.FC = () => {
  const [todayNutrition] = useState({
    calories: 1850,
    protein: 120,
    carbs: 180,
    fats: 65,
  });

  const [targets] = useState({
    calories: 2500,
    protein: 150,
    carbs: 250,
    fats: 80,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Diario Alimentare</Text>
        <Text style={styles.date}>Oggi, {new Date().toLocaleDateString('it-IT')}</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Macro Cards */}
        <View style={styles.macroGrid}>
          <MacroCard
            label="Calorie"
            current={todayNutrition.calories}
            target={targets.calories}
            unit="kcal"
            color="#FF4444"
          />
          <MacroCard
            label="Proteine"
            current={todayNutrition.protein}
            target={targets.protein}
            unit="g"
            color="#00D9FF"
          />
        </View>
        <View style={styles.macroGrid}>
          <MacroCard
            label="Carboidrati"
            current={todayNutrition.carbs}
            target={targets.carbs}
            unit="g"
            color="#FFD700"
          />
          <MacroCard
            label="Grassi"
            current={todayNutrition.fats}
            target={targets.fats}
            unit="g"
            color="#00C853"
          />
        </View>

        {/* Pasti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasti di Oggi</Text>
          <Card>
            <Text style={styles.emptyText}>Nessun pasto registrato</Text>
            <Button
              title="Aggiungi Pasto"
              onPress={() => console.log('Add meal')}
              variant="primary"
              style={styles.addButton}
            />
          </Card>
        </View>

        {/* Piano Nutrizionale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Piano Attivo</Text>
          <Card variant="racing">
            <Text style={styles.planName}>Piano Standard</Text>
            <Text style={styles.planDescription}>
              Target giornalieri per mantenimento peso e performance
            </Text>
            <Button
              title="Modifica Piano"
              onPress={() => console.log('Edit plan')}
              variant="outline"
              size="small"
              style={styles.editButton}
            />
          </Card>
        </View>
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
  date: {
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
  macroGrid: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    marginHorizontal: -spacing.xs,
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  addButton: {
    marginTop: spacing.md,
  },
  planName: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  planDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  editButton: {
    marginTop: spacing.md,
  },
});
