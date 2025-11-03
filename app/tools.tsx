
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function ToolsScreen() {
  const router = useRouter();

  const handleToolPress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route as any);
  };

  const tools = [
    {
      title: 'Calcolatore ACR',
      description: 'Acute:Chronic Workload Ratio',
      icon: 'function',
      gradient: gradients.racing,
      info: 'Monitora il rapporto tra carico acuto e cronico per prevenire infortuni e ottimizzare le prestazioni',
      route: '/acr-calculator',
      badge: 'ESSENZIALE',
    },
    {
      title: 'Tracker del Carico',
      description: 'Monitoraggio carico allenamento',
      icon: 'chart.line.uptrend.xyaxis',
      gradient: gradients.success,
      info: 'Registra e analizza il carico di allenamento settimanale con grafici avanzati',
      route: '/load-tracker',
      badge: 'PRO',
    },
    {
      title: 'Monitor HRV',
      description: 'Heart Rate Variability',
      icon: 'waveform.path.ecg',
      gradient: gradients.error,
      info: 'Traccia la variabilità della frequenza cardiaca per valutare il recupero e lo stress',
      route: '/hrv-monitor',
      badge: 'AVANZATO',
    },
    {
      title: 'Valutazione Postura',
      description: 'Analisi posturale pilota',
      icon: 'figure.stand',
      gradient: gradients.warning,
      info: 'Valuta e migliora la postura specifica per la guida ad alte prestazioni',
      route: '/posture-assessment',
      badge: 'SPECIFICO',
    },
    {
      title: 'Test Tempo di Reazione',
      description: 'Simulazione partenza gara',
      icon: 'bolt.fill',
      gradient: ['#FF8C00', '#FF6B00'],
      info: 'Allena e misura il tempo di reazione ai semafori di partenza con precisione millimetrica',
      route: '/reaction-time',
      badge: 'GARA',
    },
    {
      title: 'Simulatore Giro',
      description: 'Analisi tempi e settori',
      icon: 'flag.checkered',
      gradient: gradients.blue,
      info: 'Analizza i tempi sul giro e confronta i settori per identificare aree di miglioramento',
      route: '/lap-simulator',
      badge: 'PERFORMANCE',
    },
    {
      title: 'Setup Moto',
      description: 'Configurazione e telemetria',
      icon: 'wrench.and.screwdriver.fill',
      gradient: gradients.purple,
      info: 'Registra e ottimizza il setup della moto per ogni circuito e condizione',
      route: '/bike-setup',
      badge: 'TECNICO',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Strumenti Professionali',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Card */}
          <LinearGradient
            colors={gradients.racing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="wrench.and.screwdriver.fill" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Suite Professionale</Text>
            <Text style={styles.headerDescription}>
              Strumenti avanzati per piloti professionisti: analisi dati, ottimizzazione prestazioni e monitoraggio completo
            </Text>
          </LinearGradient>

          {/* Tools Grid */}
          {tools.map((tool, index) => (
            <Pressable
              key={index}
              style={styles.toolCard}
              onPress={() => handleToolPress(tool.route)}
            >
              <LinearGradient
                colors={tool.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toolGradient}
              >
                <View style={styles.toolIconContainer}>
                  <IconSymbol name={tool.icon as any} size={36} color="#FFFFFF" />
                </View>
              </LinearGradient>
              
              <View style={styles.toolContent}>
                <View style={styles.toolHeader}>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <View style={styles.toolBadge}>
                    <Text style={styles.toolBadgeText}>{tool.badge}</Text>
                  </View>
                </View>
                <Text style={styles.toolDescription}>{tool.description}</Text>
                <Text style={styles.toolInfo}>{tool.info}</Text>
              </View>
              
              <View style={styles.toolArrow}>
                <IconSymbol name="chevron.right" size={20} color={colors.textLight} />
              </View>
            </Pressable>
          ))}

          {/* Coming Soon Section */}
          <View style={[commonStyles.card, styles.comingSoonCard]}>
            <View style={styles.comingSoonHeader}>
              <IconSymbol name="sparkles" size={28} color={colors.racingGold} />
              <Text style={styles.comingSoonTitle}>Prossimamente</Text>
            </View>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <IconSymbol name="camera.fill" size={18} color={colors.primary} />
                <Text style={styles.featureText}>Analisi video tecnica con AI</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="chart.xyaxis.line" size={18} color={colors.accent} />
                <Text style={styles.featureText}>Comparazione telemetria avanzata</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="brain.head.profile" size={18} color={colors.purple} />
                <Text style={styles.featureText}>Allenamento mentale e visualizzazione</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="fork.knife" size={18} color={colors.success} />
                <Text style={styles.featureText}>Diario alimentare con macro tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="figure.walk.motion" size={18} color={colors.warning} />
                <Text style={styles.featureText}>Analisi biomeccanica 3D</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="person.badge.shield.checkmark.fill" size={18} color={colors.info} />
                <Text style={styles.featureText}>Coach virtuale con feedback real-time</Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    alignItems: 'center',
    ...shadows.large,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  toolCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  toolGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolContent: {
    flex: 1,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
    flex: 1,
  },
  toolBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  toolBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  toolDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  toolInfo: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  toolArrow: {
    marginLeft: 12,
  },
  comingSoonCard: {
    marginTop: 8,
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.racingGold,
  },
  comingSoonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  featuresList: {
    gap: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
});
