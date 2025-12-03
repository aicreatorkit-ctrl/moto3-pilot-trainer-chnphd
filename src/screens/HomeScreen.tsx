
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { useAuth } from '@/src/hooks/useAuth';
import { isSupabaseConfigured } from '@/src/config/constants';

/**
 * Home Screen - Dashboard principale
 * Funziona anche senza Supabase configurato
 */
export const HomeScreen: React.FC = () => {
  const { user, loading, configured } = useAuth();
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  useEffect(() => {
    console.log('HomeScreen mounted');
    const isConfigured = isSupabaseConfigured();
    setSupabaseConfigured(isConfigured);
    console.log('Supabase configurato:', isConfigured);
  }, []);

  const quickActions = [
    {
      title: 'Routine Pre',
      icon: 'flame.fill',
      androidIcon: 'local-fire-department',
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
      androidIcon: 'wb-sunny',
      color: '#FFD700',
      route: '/morning-routine',
    },
  ];

  const handleConfigureSupabase = () => {
    Alert.alert(
      '⚙️ Configura Supabase',
      'Per sincronizzare i dati tra dispositivi:\n\n' +
      '1. Crea un progetto su supabase.com\n' +
      '2. Copia il file .env.example in .env\n' +
      '3. Inserisci SUPABASE_URL e SUPABASE_ANON_KEY\n' +
      '4. Riavvia l\'app\n\n' +
      'Senza Supabase, l\'app funziona comunque ma i dati non vengono salvati.',
      [{ text: 'OK' }]
    );
  };

  const handleNavigate = (route: string) => {
    console.log('Navigate to:', route);
    try {
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Errore', 'Impossibile navigare a questa schermata');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ciao, Pilota! 🏍️</Text>
          <Text style={styles.subtitle}>Pronto per l&apos;allenamento?</Text>
        </View>
      </View>

      {/* Avviso Supabase non configurato */}
      {!supabaseConfigured && (
        <TouchableOpacity 
          style={styles.warningCard}
          onPress={handleConfigureSupabase}
          activeOpacity={0.7}
        >
          <View style={styles.warningIcon}>
            <IconSymbol 
              ios_icon_name="exclamationmark.triangle.fill" 
              android_material_icon_name="warning" 
              size={24} 
              color="#FF9500" 
            />
          </View>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Supabase non configurato</Text>
            <Text style={styles.warningText}>
              L&apos;app funziona anche senza Supabase, ma i dati non vengono salvati. Tocca per maggiori info.
            </Text>
          </View>
          <IconSymbol 
            ios_icon_name="chevron.right" 
            android_material_icon_name="chevron-right" 
            size={20} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Azioni Rapide</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => handleNavigate(action.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${action.color}20` }]}>
                <IconSymbol 
                  ios_icon_name={action.icon as any} 
                  android_material_icon_name={action.androidIcon as any} 
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
                android_material_icon_name="check-circle" 
                size={24} 
                color={colors.success} 
              />
              <Text style={styles.summaryLabel}>Routine</Text>
              <Text style={styles.summaryValue}>0/2</Text>
            </View>
            <View style={styles.summaryItem}>
              <IconSymbol 
                ios_icon_name="flame.fill" 
                android_material_icon_name="local-fire-department" 
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

      {/* User Info - Solo se Supabase è configurato */}
      {supabaseConfigured && user && (
        <Card style={styles.userCard}>
          <IconSymbol 
            ios_icon_name="checkmark.circle.fill" 
            android_material_icon_name="check-circle" 
            size={24} 
            color="#00C853" 
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>✅ Connesso a Supabase</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </Card>
      )}

      {/* Info Card - Modalità Offline */}
      {!supabaseConfigured && (
        <Card style={styles.infoCard}>
          <IconSymbol 
            ios_icon_name="info.circle.fill" 
            android_material_icon_name="info" 
            size={24} 
            color="#00D9FF" 
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>💡 Modalità Offline</Text>
            <Text style={styles.infoText}>
              Puoi usare l&apos;app normalmente. Per salvare i dati in modo permanente, configura Supabase.
            </Text>
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
    paddingTop: 48,
    paddingBottom: 100,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.text,
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF950020',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  warningIcon: {
    marginRight: spacing.md,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  warningText: {
    ...typography.caption,
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
    backgroundColor: '#00C85320',
    borderLeftColor: '#00C853',
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
