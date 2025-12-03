
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { useAuth } from '@/src/hooks/useAuth';
import { isSupabaseConfigured } from '@/src/config/constants';

/**
 * Home Screen - Dashboard principale
 */
export const HomeScreen: React.FC = () => {
  const { user, loading } = useAuth();
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  useEffect(() => {
    setSupabaseConfigured(isSupabaseConfigured());
  }, []);

  const quickActions = [
    {
      title: 'Routine Pre',
      icon: 'flame.fill',
      androidIcon: 'local_fire_department',
      color: '#FF4444',
      route: '/routines',
    },
    {
      title: 'Routine Post',
      icon: 'moon.stars.fill',
      androidIcon: 'nightlight',
      color: '#00D9FF',
      route: '/routines',
    },
    {
      title: 'Diario Alimentare',
      icon: 'fork.knife',
      androidIcon: 'restaurant',
      color: '#00C853',
      route: '/nutrition',
    },
    {
      title: 'Check Mattutina',
      icon: 'sun.max.fill',
      androidIcon: 'wb_sunny',
      color: '#FFD700',
      route: '/morning-routine',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ciao, Pilota! 🏍️</Text>
          <Text style={styles.subtitle}>Pronto per l&apos;allenamento?</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Azioni Rapide</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => {
                console.log('Navigate to:', action.route);
                try {
                  router.push(action.route as any);
                } catch (error) {
                  console.log('Navigation error:', error);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${action.color}20` }]}>
                <IconSymbol 
                  ios_icon_name={action.icon as any} 
                  android_material_icon_name={action.androidIcon} 
                  size={32} 
                  color={action.color} 
                />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Oggi</Text>
        <Card variant="racing">
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check_circle" 
                size={24} 
                color={colors.success} 
              />
              <Text style={styles.summaryLabel}>Routine</Text>
              <Text style={styles.summaryValue}>0/2</Text>
            </View>
            <View style={styles.summaryItem}>
              <IconSymbol 
                ios_icon_name="flame.fill" 
                android_material_icon_name="local_fire_department" 
                size={24} 
                color="#FF4444" 
              />
              <Text style={styles.summaryLabel}>Calorie</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
            <View style={styles.summaryItem}>
              <IconSymbol 
                ios_icon_name="heart.fill" 
                android_material_icon_name="favorite" 
                size={24} 
                color={colors.error} 
              />
              <Text style={styles.summaryLabel}>Energia</Text>
              <Text style={styles.summaryValue}>-</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Info Card - Supabase */}
      {!supabaseConfigured && (
        <Card style={styles.infoCard}>
          <IconSymbol 
            ios_icon_name="info.circle.fill" 
            android_material_icon_name="info" 
            size={24} 
            color="#00D9FF" 
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Configura Supabase</Text>
            <Text style={styles.infoText}>
              Per sincronizzare i dati tra dispositivi, configura Supabase nel file .env
            </Text>
          </View>
        </Card>
      )}

      {/* User Info */}
      {supabaseConfigured && user && (
        <Card style={styles.userCard}>
          <IconSymbol 
            ios_icon_name="person.circle.fill" 
            android_material_icon_name="account_circle" 
            size={24} 
            color="#FF4444" 
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Connesso</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingTop: 48, // Android notch
    paddingBottom: 100, // Spazio per bottom tab
  },
  header: {
    marginBottom: spacing.xxxl,
  },
  greeting: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: '1%',
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  actionTitle: {
    ...typography.caption,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  summaryValue: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.xs,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#00D9FF20',
    borderLeftColor: '#00D9FF',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FF444420',
    borderLeftColor: '#FF4444',
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoTitle: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
