
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Animated } from 'react-native';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { Stack, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface QuickActionCard {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string[];
  route: string;
  badge?: string;
}

interface FeatureSection {
  title: string;
  description: string;
  icon: string;
  items: QuickActionCard[];
}

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
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
  }, [pulseAnim]);

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route as any);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => handlePress('/settings')}
      style={({ pressed }) => [
        styles.headerButton,
        pressed && styles.headerButtonPressed,
      ]}
    >
      <IconSymbol name="gearshape.fill" size={24} color={colors.text} />
    </Pressable>
  );

  // Organized feature sections
  const sections: FeatureSection[] = [
    {
      title: 'Allenamento Quotidiano',
      description: 'Routine e sessioni giornaliere',
      icon: 'figure.run',
      items: [
        {
          title: 'Routine Mattutina',
          subtitle: 'Inizia la giornata',
          icon: 'sunrise.fill',
          gradient: gradients.warning,
          route: '/morning-routine',
          badge: 'OGGI',
        },
        {
          title: 'Calendario 18 Settimane',
          subtitle: 'Programma completo',
          icon: 'calendar',
          gradient: gradients.blue,
          route: '/(tabs)/calendar',
        },
      ],
    },
    {
      title: 'Preparazione & Recupero',
      description: 'Protocolli pre e post allenamento',
      icon: 'heart.circle.fill',
      items: [
        {
          title: 'Riscaldamento',
          subtitle: 'Pre-allenamento',
          icon: 'flame.fill',
          gradient: gradients.error,
          route: '/warmup',
        },
        {
          title: 'Raffreddamento',
          subtitle: 'Post-allenamento',
          icon: 'figure.cooldown',
          gradient: gradients.cyan,
          route: '/cooldown',
        },
        {
          title: 'Stretching',
          subtitle: 'Flessibilità',
          icon: 'figure.flexibility',
          gradient: gradients.success,
          route: '/stretching',
        },
        {
          title: 'Foam Rolling',
          subtitle: 'Rilascio miofasciale',
          icon: 'cylinder.fill',
          gradient: gradients.purple,
          route: '/foam-rolling',
        },
      ],
    },
    {
      title: 'Monitoraggio & Analisi',
      description: 'Traccia le tue prestazioni',
      icon: 'chart.line.uptrend.xyaxis',
      items: [
        {
          title: 'Controllo Prontezza',
          subtitle: 'Valutazione giornaliera',
          icon: 'heart.text.square.fill',
          gradient: gradients.racing,
          route: '/(tabs)/readiness',
          badge: 'LIVE',
        },
        {
          title: 'Progressi & Analisi',
          subtitle: 'Grafici e statistiche',
          icon: 'chart.bar.fill',
          gradient: gradients.championship,
          route: '/(tabs)/progress',
        },
        {
          title: 'Sistema Bandiera Rossa',
          subtitle: 'Prevenzione infortuni',
          icon: 'exclamationmark.triangle.fill',
          gradient: ['#FF3B30', '#D32F2F'],
          route: '/red-flags',
          badge: 'ALERT',
        },
      ],
    },
    {
      title: 'Strumenti Professionali',
      description: 'Suite avanzata per piloti',
      icon: 'wrench.and.screwdriver.fill',
      items: [
        {
          title: 'Timer Multi-Intervallo',
          subtitle: 'Gestione sessioni',
          icon: 'timer',
          gradient: gradients.blue,
          route: '/timer',
        },
        {
          title: 'Calcolatore ACR',
          subtitle: 'Workload ratio',
          icon: 'function',
          gradient: gradients.racing,
          route: '/acr-calculator',
        },
        {
          title: 'Tracker del Carico',
          subtitle: 'Monitoraggio settimanale',
          icon: 'chart.line.uptrend.xyaxis',
          gradient: gradients.success,
          route: '/load-tracker',
        },
        {
          title: 'Monitor HRV',
          subtitle: 'Variabilità cardiaca',
          icon: 'waveform.path.ecg',
          gradient: gradients.error,
          route: '/hrv-monitor',
        },
        {
          title: 'Tutti gli Strumenti',
          subtitle: 'Suite completa',
          icon: 'square.grid.2x2.fill',
          gradient: gradients.carbon,
          route: '/tools',
          badge: 'PRO',
        },
      ],
    },
    {
      title: 'Tecnologie Avanzate',
      description: 'AI e analisi biomeccanica',
      icon: 'sparkles',
      items: [
        {
          title: 'Analisi Video AI',
          subtitle: 'Feedback intelligente',
          icon: 'camera.fill',
          gradient: gradients.racing,
          route: '/video-analysis',
          badge: 'AI',
        },
        {
          title: 'Telemetria',
          subtitle: 'Comparazione dati',
          icon: 'chart.xyaxis.line',
          gradient: gradients.cyan,
          route: '/telemetry-comparison',
        },
        {
          title: 'Biomeccanica 3D',
          subtitle: 'Analisi movimento',
          icon: 'figure.walk.motion',
          gradient: gradients.warning,
          route: '/biomechanics-3d',
          badge: '3D',
        },
        {
          title: 'Coach Virtuale',
          subtitle: 'Assistente AI',
          icon: 'person.badge.shield.checkmark.fill',
          gradient: gradients.blue,
          route: '/virtual-coach',
          badge: 'LIVE',
        },
      ],
    },
    {
      title: 'Benessere & Performance',
      description: 'Mente e corpo al massimo',
      icon: 'brain.head.profile',
      items: [
        {
          title: 'Allenamento Mentale',
          subtitle: 'Focus e concentrazione',
          icon: 'brain.head.profile',
          gradient: gradients.purple,
          route: '/mental-training',
        },
        {
          title: 'Diario Alimentare',
          subtitle: 'Nutrizione ottimale',
          icon: 'fork.knife',
          gradient: gradients.success,
          route: '/nutrition-diary',
        },
        {
          title: 'Valutazione Postura',
          subtitle: 'Analisi posturale',
          icon: 'figure.stand',
          gradient: gradients.warning,
          route: '/posture-assessment',
        },
      ],
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Moto3 Training',
          headerLargeTitle: true,
          headerRight: renderHeaderRight,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Card */}
          <LinearGradient
            colors={gradients.racing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <View style={styles.heroIconContainer}>
                <IconSymbol name="flag.checkered" size={48} color="#FFFFFF" />
              </View>
            </Animated.View>
            <Text style={styles.heroTitle}>Allenamento Pilota Moto3</Text>
            <Text style={styles.heroSubtitle}>
              Sistema completo di preparazione fisica e mentale per piloti professionisti
            </Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>18</Text>
                <Text style={styles.heroStatLabel}>Settimane</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>50+</Text>
                <Text style={styles.heroStatLabel}>Strumenti</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>PRO</Text>
                <Text style={styles.heroStatLabel}>Livello</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Access - Most Used */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <IconSymbol name="bolt.fill" size={24} color={colors.racingGold} />
                <Text style={styles.sectionTitle}>Accesso Rapido</Text>
              </View>
            </View>
            <View style={styles.quickAccessGrid}>
              <Pressable
                style={styles.quickAccessCard}
                onPress={() => handlePress('/morning-routine')}
              >
                <LinearGradient
                  colors={gradients.warning}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickAccessGradient}
                >
                  <IconSymbol name="sunrise.fill" size={32} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickAccessTitle}>Routine</Text>
                <Text style={styles.quickAccessSubtitle}>Mattutina</Text>
              </Pressable>

              <Pressable
                style={styles.quickAccessCard}
                onPress={() => handlePress('/(tabs)/readiness')}
              >
                <LinearGradient
                  colors={gradients.racing}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickAccessGradient}
                >
                  <IconSymbol name="heart.text.square.fill" size={32} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickAccessTitle}>Prontezza</Text>
                <Text style={styles.quickAccessSubtitle}>Controllo</Text>
              </Pressable>

              <Pressable
                style={styles.quickAccessCard}
                onPress={() => handlePress('/(tabs)/calendar')}
              >
                <LinearGradient
                  colors={gradients.blue}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickAccessGradient}
                >
                  <IconSymbol name="calendar" size={32} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickAccessTitle}>Calendario</Text>
                <Text style={styles.quickAccessSubtitle}>18 Settimane</Text>
              </Pressable>

              <Pressable
                style={styles.quickAccessCard}
                onPress={() => handlePress('/tools')}
              >
                <LinearGradient
                  colors={gradients.carbon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickAccessGradient}
                >
                  <IconSymbol name="wrench.and.screwdriver.fill" size={32} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickAccessTitle}>Strumenti</Text>
                <Text style={styles.quickAccessSubtitle}>Professionali</Text>
              </Pressable>
            </View>
          </View>

          {/* Organized Sections */}
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <IconSymbol name={section.icon as any} size={24} color={colors.primary} />
                  <View>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.sectionDescription}>{section.description}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardsGrid}>
                {section.items.map((item, itemIndex) => (
                  <Pressable
                    key={itemIndex}
                    style={styles.featureCard}
                    onPress={() => handlePress(item.route)}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.featureGradient}
                    >
                      <IconSymbol name={item.icon as any} size={28} color="#FFFFFF" />
                      {item.badge && (
                        <View style={styles.featureBadge}>
                          <Text style={styles.featureBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                    </LinearGradient>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={16} color={colors.textLight} />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          {/* Reference Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <IconSymbol name="book.fill" size={24} color={colors.info} />
                <Text style={styles.sectionTitle}>Riferimenti</Text>
              </View>
            </View>
            <Pressable
              style={[commonStyles.card, styles.referenceCard]}
              onPress={() => handlePress('/quick-reference')}
            >
              <View style={styles.referenceIconContainer}>
                <IconSymbol name="book.fill" size={32} color={colors.info} />
              </View>
              <View style={styles.referenceContent}>
                <Text style={styles.referenceTitle}>Riferimento Rapido</Text>
                <Text style={styles.referenceDescription}>
                  Linee guida, protocolli e informazioni essenziali sempre a portata di mano
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textLight} />
            </Pressable>
          </View>

          {/* Bottom Spacing for Tab Bar */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  heroCard: {
    borderRadius: 28,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    ...shadows.large,
  },
  heroIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    ...shadows.medium,
  },
  quickAccessGradient: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  quickAccessSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  cardsGrid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  featureGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    position: 'relative',
  },
  featureBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.racingGold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.card,
  },
  featureBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.racingBlack,
    letterSpacing: 0.5,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  featureSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  referenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlightBlue,
  },
  referenceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.info + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  referenceContent: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  referenceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  headerButtonPressed: {
    opacity: 0.6,
  },
});
