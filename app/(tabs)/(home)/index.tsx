
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const mainFeatures = [
    {
      title: 'Mattutina di Routine',
      description: 'Checklist giornaliera mattutina',
      icon: 'sunrise.fill',
      color: colors.warning,
      route: '/morning-routine',
    },
    {
      title: 'Preparazione & Recupero',
      description: 'Riscaldamento, raffreddamento, stretching',
      icon: 'figure.strengthtraining.traditional',
      color: colors.primary,
      route: '/preparation',
    },
    {
      title: 'Controllo Prontezza',
      description: 'Valutazione giornaliera della condizione',
      icon: 'heart.text.square.fill',
      color: colors.secondary,
      route: '/(tabs)/readiness',
    },
    {
      title: 'Timer Multi-Intervallo',
      description: 'Timer personalizzabili per allenamenti',
      icon: 'timer',
      color: colors.accent,
      route: '/timer',
    },
    {
      title: 'Sistema Bandiera Rossa',
      description: 'Monitoraggio segnali di allarme',
      icon: 'flag.fill',
      color: colors.error,
      route: '/red-flags',
    },
    {
      title: 'Strumenti Avanzati',
      description: 'Calcolatore ACR, Tracker carico, Monitor HRV',
      icon: 'wrench.and.screwdriver.fill',
      color: colors.textSecondary,
      route: '/tools',
    },
  ];

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push('/settings')}
      style={styles.headerButton}
    >
      <IconSymbol name="gear" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Moto3 Training',
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[commonStyles.container]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Benvenuto Pilota</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('it-IT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>

          <View style={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => (
              <Pressable
                key={index}
                style={[commonStyles.card, styles.featureCard]}
                onPress={() => router.push(feature.route as any)}
              >
                <View style={[styles.iconContainer, { backgroundColor: feature.color + '20' }]}>
                  <IconSymbol name={feature.icon as any} size={32} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Pressable>
            ))}
          </View>

          <View style={[commonStyles.card, styles.quickAccessCard]}>
            <Text style={styles.sectionTitle}>Accesso Rapido</Text>
            <Pressable 
              style={styles.quickAccessButton}
              onPress={() => router.push('/(tabs)/calendar')}
            >
              <IconSymbol name="calendar" size={20} color={colors.primary} />
              <Text style={styles.quickAccessText}>Calendario 18 Settimane</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
            <Pressable 
              style={styles.quickAccessButton}
              onPress={() => router.push('/(tabs)/progress')}
            >
              <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color={colors.primary} />
              <Text style={styles.quickAccessText}>Progressi & Analisi</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
            <Pressable 
              style={styles.quickAccessButton}
              onPress={() => router.push('/quick-reference')}
            >
              <IconSymbol name="book.fill" size={20} color={colors.primary} />
              <Text style={styles.quickAccessText}>Riferimento Rapido</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
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
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  quickAccessCard: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  quickAccessText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  headerButton: {
    padding: 8,
  },
});
