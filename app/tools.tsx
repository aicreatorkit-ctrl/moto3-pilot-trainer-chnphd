
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ToolsScreen() {
  const router = useRouter();

  const tools = [
    {
      title: 'Calcolatore ACR',
      description: 'Acute:Chronic Workload Ratio',
      icon: 'function',
      color: colors.primary,
      info: 'Monitora il rapporto tra carico acuto e cronico per prevenire infortuni',
      route: '/acr-calculator',
    },
    {
      title: 'Tracker del Carico',
      description: 'Monitoraggio carico allenamento',
      icon: 'chart.line.uptrend.xyaxis',
      color: colors.accent,
      info: 'Registra e analizza il carico di allenamento settimanale',
      route: '/load-tracker',
    },
    {
      title: 'Monitor HRV',
      description: 'Heart Rate Variability',
      icon: 'waveform.path.ecg',
      color: colors.secondary,
      info: 'Traccia la variabilità della frequenza cardiaca per valutare il recupero',
      route: '/hrv-monitor',
    },
    {
      title: 'Valutazione Postura',
      description: 'Analisi posturale pilota',
      icon: 'figure.stand',
      color: colors.warning,
      info: 'Valuta e migliora la postura specifica per la guida in Moto3',
      route: '/posture-assessment',
    },
    {
      title: 'Test Tempo di Reazione',
      description: 'Simulazione partenza gara',
      icon: 'bolt.fill',
      color: '#FF8C00',
      info: 'Allena e misura il tempo di reazione ai semafori di partenza',
      route: '/reaction-time',
    },
    {
      title: 'Simulatore Giro',
      description: 'Analisi tempi e settori',
      icon: 'flag.checkered',
      color: '#2196F3',
      info: 'Analizza i tempi sul giro e confronta i settori per migliorare le prestazioni',
      route: '/lap-simulator',
    },
    {
      title: 'Setup Moto',
      description: 'Configurazione e telemetria',
      icon: 'wrench.and.screwdriver.fill',
      color: '#9C27B0',
      info: 'Registra e ottimizza il setup della moto per ogni circuito',
      route: '/bike-setup',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Strumenti Moto3',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="wrench.and.screwdriver.fill" size={32} color={colors.primary} />
            <Text style={styles.infoText}>
              Strumenti professionali per piloti Moto3: allenamento, analisi e ottimizzazione prestazioni
            </Text>
          </View>

          {tools.map((tool, index) => (
            <View key={index} style={commonStyles.card}>
              <View style={styles.toolHeader}>
                <View style={[styles.iconContainer, { backgroundColor: tool.color + '20' }]}>
                  <IconSymbol name={tool.icon as any} size={32} color={tool.color} />
                </View>
                <View style={styles.toolContent}>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                </View>
              </View>
              <Text style={styles.toolInfo}>{tool.info}</Text>
              <Pressable 
                style={[styles.toolButton, { backgroundColor: tool.color }]}
                onPress={() => router.push(tool.route as any)}
              >
                <Text style={styles.toolButtonText}>Apri Strumento</Text>
                <IconSymbol name="arrow.right" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}

          <View style={[commonStyles.card, styles.comingSoonCard]}>
            <IconSymbol name="sparkles" size={24} color={colors.warning} />
            <Text style={styles.comingSoonTitle}>Prossimamente</Text>
            <Text style={styles.comingSoonText}>
              - Analisi video tecnica con AI{'\n'}
              - Comparazione telemetria avanzata{'\n'}
              - Simulatore reazioni multiple{'\n'}
              - Diario alimentare integrato{'\n'}
              - Analisi biomeccanica 3D{'\n'}
              - Coach virtuale con feedback real-time
            </Text>
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.highlight,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 12,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  toolInfo: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
  },
  toolButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  comingSoonCard: {
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: colors.highlight,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    textAlign: 'center',
  },
});
