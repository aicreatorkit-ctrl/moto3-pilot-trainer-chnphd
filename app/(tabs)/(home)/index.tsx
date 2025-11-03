
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Animated } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Pulse animation for championship feel
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route as any);
  };

  const mainFeatures = [
    {
      title: 'Mattutina',
      subtitle: 'Routine',
      description: 'Checklist giornaliera professionale',
      icon: 'sunrise.fill',
      gradient: gradients.racing,
      route: '/morning-routine',
    },
    {
      title: 'Preparazione',
      subtitle: 'Recupero',
      description: 'Protocolli pre e post sessione',
      icon: 'figure.strengthtraining.traditional',
      gradient: gradients.blue,
      route: '/preparation',
    },
    {
      title: 'Controllo',
      subtitle: 'Prontezza',
      description: 'Valutazione condizione fisica',
      icon: 'heart.text.square.fill',
      gradient: gradients.error,
      route: '/(tabs)/readiness',
    },
    {
      title: 'Timer',
      subtitle: 'Intervalli',
      description: 'Timer professionali multi-fase',
      icon: 'timer',
      gradient: gradients.success,
      route: '/timer',
    },
    {
      title: 'Bandiera',
      subtitle: 'Rossa',
      description: 'Sistema allerta prestazioni',
      icon: 'flag.fill',
      gradient: ['#FF3B30', '#D32F2F'],
      route: '/red-flags',
    },
    {
      title: 'Strumenti',
      subtitle: 'Pro',
      description: 'Suite completa analisi dati',
      icon: 'wrench.and.screwdriver.fill',
      gradient: gradients.purple,
      route: '/tools',
    },
    {
      title: 'Gestione',
      subtitle: 'Contenuti',
      description: 'Sistema aggiornamento intelligente',
      icon: 'doc.text.fill',
      gradient: gradients.cyan,
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
      onPress={() => handlePress('/settings')}
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
            title: 'World Championship',
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
          {/* Championship Hero Header */}
          <LinearGradient
            colors={['#E10600', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroContainer}
          >
            <View style={styles.heroContent}>
              <View style={styles.championshipBadge}>
                <IconSymbol name="trophy.fill" size={16} color={colors.racingGold} />
                <Text style={styles.championshipText}>WORLD CHAMPIONSHIP</Text>
              </View>
              <Text style={styles.welcomeText}>Benvenuto</Text>
              <Text style={styles.pilotText}>Pilota Mondiale</Text>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('it-IT', { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </View>
            
            {/* Enhanced Quick Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <IconSymbol name="calendar" size={18} color={colors.primary} />
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Settimana</Text>
              </View>
              <Animated.View style={[styles.statCard, styles.statCardHighlight, { transform: [{ scale: pulseAnim }] }]}>
                <IconSymbol name="bolt.fill" size={18} color={colors.racingGold} />
                <Text style={[styles.statValue, styles.statValueHighlight]}>92%</Text>
                <Text style={styles.statLabel}>Prontezza</Text>
              </Animated.View>
              <View style={styles.statCard}>
                <IconSymbol name="figure.run" size={18} color={colors.primary} />
                <Text style={styles.statValue}>48</Text>
                <Text style={styles.statLabel}>Sessioni</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Performance Insights */}
          <View style={[commonStyles.cardRacing, styles.insightCard]}>
            <View style={styles.insightHeader}>
              <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color={colors.primary} />
              <Text style={styles.insightTitle}>Performance Insight</Text>
            </View>
            <Text style={styles.insightText}>
              Condizione fisica ottimale. HRV in zona verde (+8% vs media). 
              Pronto per sessione ad alta intensità.
            </Text>
            <View style={styles.insightMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>HRV</Text>
                <Text style={[styles.metricValue, { color: colors.success }]}>↑ 8%</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Carico</Text>
                <Text style={[styles.metricValue, { color: colors.success }]}>Ottimale</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Recupero</Text>
                <Text style={[styles.metricValue, { color: colors.success }]}>100%</Text>
              </View>
            </View>
          </View>

          {/* Main Features Grid */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Funzioni Principali</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>PRO</Text>
            </View>
          </View>
          
          <View style={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => (
              <Pressable
                key={index}
                style={styles.featureCardContainer}
                onPress={() => handlePress(feature.route)}
              >
                <LinearGradient
                  colors={feature.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureCard}
                >
                  <View style={styles.featureIconContainer}>
                    <IconSymbol name={feature.icon as any} size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.featureTextContainer}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                  <View style={styles.featureArrow}>
                    <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.9)" />
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
                onPress={() => handlePress(item.route)}
              >
                <View style={[styles.quickAccessIcon, { backgroundColor: item.color + '15' }]}>
                  <IconSymbol name={item.icon as any} size={24} color={item.color} />
                </View>
                <Text style={styles.quickAccessText}>{item.title}</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textLight} />
              </Pressable>
            ))}
          </View>

          {/* Today's Focus - Enhanced */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Focus di Oggi</Text>
            <View style={[styles.sectionBadge, { backgroundColor: colors.success + '20' }]}>
              <Text style={[styles.sectionBadgeText, { color: colors.success }]}>ATTIVO</Text>
            </View>
          </View>
          
          <LinearGradient
            colors={['#E10600', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.focusCard}
          >
            <View style={styles.focusHeader}>
              <View style={styles.focusIconContainer}>
                <IconSymbol name="figure.strengthtraining.traditional" size={40} color="#FFFFFF" />
              </View>
              <View style={styles.focusTextContainer}>
                <Text style={styles.focusTitle}>Allenamento Forza Esplosiva</Text>
                <Text style={styles.focusDescription}>
                  Sessione potenziamento muscolare specifico
                </Text>
                <View style={styles.focusMetaRow}>
                  <View style={styles.focusMeta}>
                    <IconSymbol name="clock.fill" size={14} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.focusMetaText}>45 min</Text>
                  </View>
                  <View style={styles.focusMeta}>
                    <IconSymbol name="flame.fill" size={14} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.focusMetaText}>Alta intensità</Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable style={styles.focusButton} onPress={() => handlePress('/preparation')}>
              <Text style={styles.focusButtonText}>Inizia Sessione</Text>
              <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
            </Pressable>
          </LinearGradient>

          {/* Championship Stats */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Statistiche Campionato</Text>
          </View>
          
          <View style={[commonStyles.card, styles.championshipCard]}>
            <View style={styles.championshipRow}>
              <View style={styles.championshipStat}>
                <IconSymbol name="trophy.fill" size={20} color={colors.racingGold} />
                <Text style={styles.championshipStatValue}>3</Text>
                <Text style={styles.championshipStatLabel}>Podi</Text>
              </View>
              <View style={styles.championshipDivider} />
              <View style={styles.championshipStat}>
                <IconSymbol name="flag.checkered" size={20} color={colors.primary} />
                <Text style={styles.championshipStatValue}>12</Text>
                <Text style={styles.championshipStatLabel}>Gare</Text>
              </View>
              <View style={styles.championshipDivider} />
              <View style={styles.championshipStat}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color={colors.accent} />
                <Text style={styles.championshipStatValue}>5°</Text>
                <Text style={styles.championshipStatLabel}>Posizione</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroContainer: {
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    ...shadows.large,
  },
  heroContent: {
    marginBottom: 24,
  },
  championshipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  championshipText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.racingGold,
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pilotText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...shadows.medium,
  },
  statCardHighlight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.racingGold,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statValueHighlight: {
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  insightCard: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  insightText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  insightMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  featuresGrid: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  featureCardContainer: {
    marginBottom: 12,
  },
  featureCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.large,
    overflow: 'hidden',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  featureSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  featureArrow: {
    marginLeft: 8,
  },
  quickAccessCard: {
    padding: 0,
    marginBottom: 32,
    marginHorizontal: 16,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  quickAccessButtonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickAccessText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  focusCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    marginHorizontal: 16,
    ...shadows.racing,
  },
  focusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  focusIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  focusTextContainer: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  focusDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 10,
  },
  focusMetaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  focusMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  focusMetaText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  focusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  focusButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  championshipCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  championshipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  championshipStat: {
    flex: 1,
    alignItems: 'center',
  },
  championshipStatValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  championshipStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  championshipDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.divider,
  },
  headerButton: {
    padding: 8,
  },
});
