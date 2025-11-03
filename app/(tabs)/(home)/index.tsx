
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const mainFeatures = [
    {
      title: 'Mattutina',
      subtitle: 'Routine',
      description: 'Checklist giornaliera',
      icon: 'sunrise.fill',
      gradient: ['#F59E0B', '#F97316'],
      route: '/morning-routine',
    },
    {
      title: 'Preparazione',
      subtitle: 'Recupero',
      description: 'Riscaldamento e stretching',
      icon: 'figure.strengthtraining.traditional',
      gradient: ['#3B82F6', '#2563EB'],
      route: '/preparation',
    },
    {
      title: 'Controllo',
      subtitle: 'Prontezza',
      description: 'Valutazione condizione',
      icon: 'heart.text.square.fill',
      gradient: ['#EF4444', '#DC2626'],
      route: '/(tabs)/readiness',
    },
    {
      title: 'Timer',
      subtitle: 'Intervalli',
      description: 'Timer personalizzabili',
      icon: 'timer',
      gradient: ['#10B981', '#059669'],
      route: '/timer',
    },
    {
      title: 'Bandiera',
      subtitle: 'Rossa',
      description: 'Segnali di allarme',
      icon: 'flag.fill',
      gradient: ['#EF4444', '#B91C1C'],
      route: '/red-flags',
    },
    {
      title: 'Strumenti',
      subtitle: 'Avanzati',
      description: 'ACR, HRV, Carico',
      icon: 'wrench.and.screwdriver.fill',
      gradient: ['#8B5CF6', '#7C3AED'],
      route: '/tools',
    },
    {
      title: 'Gestione',
      subtitle: 'Contenuti',
      description: 'Aggiornamento automatico',
      icon: 'doc.text.fill',
      gradient: ['#06B6D4', '#0891B2'],
      route: '/content-manager',
    },
  ];

  const quickAccessItems = [
    {
      title: 'Calendario 18 Settimane',
      icon: 'calendar',
      color: colors.primary,
      route: '/(tabs)/calendar',
    },
    {
      title: 'Progressi & Analisi',
      icon: 'chart.line.uptrend.xyaxis',
      color: colors.accent,
      route: '/(tabs)/progress',
    },
    {
      title: 'Riferimento Rapido',
      icon: 'book.fill',
      color: colors.purple,
      route: '/quick-reference',
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
          {/* Hero Header */}
          <View style={styles.heroContainer}>
            <View style={styles.heroContent}>
              <Text style={styles.welcomeText}>Benvenuto</Text>
              <Text style={styles.pilotText}>Pilota Moto3</Text>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('it-IT', { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'long'
                })}
              </Text>
            </View>
            
            {/* Quick Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Settimana</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Prontezza</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Allenamenti</Text>
              </View>
            </View>
          </View>

          {/* Main Features Grid */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Funzioni Principali</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => (
              <Pressable
                key={index}
                style={styles.featureCardContainer}
                onPress={() => router.push(feature.route as any)}
              >
                <LinearGradient
                  colors={feature.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureCard}
                >
                  <View style={styles.featureIconContainer}>
                    <IconSymbol name={feature.icon as any} size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.featureTextContainer}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                  <View style={styles.featureArrow}>
                    <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.8)" />
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </View>

          {/* Quick Access */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Accesso Rapido</Text>
          </View>
          
          <View style={[commonStyles.card, styles.quickAccessCard]}>
            {quickAccessItems.map((item, index) => (
              <Pressable 
                key={index}
                style={[
                  styles.quickAccessButton,
                  index < quickAccessItems.length - 1 && styles.quickAccessButtonBorder
                ]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.quickAccessIcon, { backgroundColor: item.color + '15' }]}>
                  <IconSymbol name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={styles.quickAccessText}>{item.title}</Text>
                <IconSymbol name="chevron.right" size={18} color={colors.textLight} />
              </Pressable>
            ))}
          </View>

          {/* Today's Focus */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Focus di Oggi</Text>
          </View>
          
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.focusCard}
          >
            <View style={styles.focusContent}>
              <IconSymbol name="target" size={32} color="#FFFFFF" />
              <View style={styles.focusTextContainer}>
                <Text style={styles.focusTitle}>Allenamento Forza</Text>
                <Text style={styles.focusDescription}>
                  Sessione di potenziamento muscolare - 45 minuti
                </Text>
              </View>
            </View>
            <Pressable style={styles.focusButton}>
              <Text style={styles.focusButtonText}>Inizia</Text>
              <IconSymbol name="arrow.right" size={16} color="#FFFFFF" />
            </Pressable>
          </LinearGradient>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroContainer: {
    marginBottom: 32,
  },
  heroContent: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pilotText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -1,
  },
  dateText: {
    fontSize: 14,
    color: colors.textLight,
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...shadows.small,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  featuresGrid: {
    marginBottom: 32,
  },
  featureCardContainer: {
    marginBottom: 12,
  },
  featureCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
    overflow: 'hidden',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  featureSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  featureArrow: {
    marginLeft: 8,
  },
  quickAccessCard: {
    padding: 0,
    marginBottom: 32,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  quickAccessButtonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  quickAccessIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickAccessText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  focusCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    ...shadows.large,
  },
  focusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  focusTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  focusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  focusDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  focusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  focusButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerButton: {
    padding: 8,
  },
});
