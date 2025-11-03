
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface CoachFeedback {
  id: string;
  timestamp: string;
  type: 'technique' | 'performance' | 'safety' | 'motivation';
  message: string;
  priority: 'low' | 'medium' | 'high';
}

interface SessionMetrics {
  heartRate: number;
  speed: number;
  lapTime: string;
  consistency: number;
  fatigue: number;
}

export default function VirtualCoachScreen() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [metrics, setMetrics] = useState<SessionMetrics>({
    heartRate: 72,
    speed: 0,
    lapTime: '--:--',
    consistency: 0,
    fatigue: 0,
  });
  const [feedbackHistory, setFeedbackHistory] = useState<CoachFeedback[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<CoachFeedback | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
        
        // Simulate real-time metrics
        setMetrics((prev) => ({
          heartRate: 140 + Math.floor(Math.random() * 20),
          speed: 180 + Math.floor(Math.random() * 40),
          lapTime: `1:${50 + Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 999)}`,
          consistency: Math.min(prev.consistency + 1, 100),
          fatigue: Math.min(prev.fatigue + 0.5, 100),
        }));

        // Generate random feedback
        if (Math.random() > 0.95) {
          generateFeedback();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const generateFeedback = () => {
    const feedbackMessages = [
      {
        type: 'technique' as const,
        message: 'Ottima linea in curva 3! Mantieni questa traiettoria.',
        priority: 'low' as const,
      },
      {
        type: 'performance' as const,
        message: 'Tempo sul giro migliorato di 0.3s! Continua così.',
        priority: 'medium' as const,
      },
      {
        type: 'safety' as const,
        message: 'Frequenza cardiaca elevata. Considera una pausa.',
        priority: 'high' as const,
      },
      {
        type: 'motivation' as const,
        message: 'Stai andando forte! Concentrati sul prossimo giro.',
        priority: 'low' as const,
      },
      {
        type: 'technique' as const,
        message: 'Anticipa il punto di frenata di 5 metri.',
        priority: 'medium' as const,
      },
    ];

    const feedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    const newFeedback: CoachFeedback = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('it-IT'),
      ...feedback,
    };

    setFeedbackHistory((prev) => [newFeedback, ...prev]);
    setCurrentFeedback(newFeedback);
    setShowFeedbackModal(true);
    
    Haptics.notificationAsync(
      feedback.priority === 'high'
        ? Haptics.NotificationFeedbackType.Warning
        : Haptics.NotificationFeedbackType.Success
    );

    setTimeout(() => {
      setShowFeedbackModal(false);
    }, 3000);
  };

  const startSession = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsSessionActive(true);
    setSessionDuration(0);
    setFeedbackHistory([]);
    setMetrics({
      heartRate: 72,
      speed: 0,
      lapTime: '--:--',
      consistency: 0,
      fatigue: 0,
    });
  };

  const stopSession = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsSessionActive(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFeedbackIcon = (type: CoachFeedback['type']) => {
    switch (type) {
      case 'technique':
        return 'wrench.and.screwdriver.fill';
      case 'performance':
        return 'chart.line.uptrend.xyaxis';
      case 'safety':
        return 'exclamationmark.triangle.fill';
      case 'motivation':
        return 'bolt.fill';
    }
  };

  const getFeedbackColor = (priority: CoachFeedback['priority']) => {
    switch (priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Coach Virtuale',
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
            colors={gradients.blue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="person.badge.shield.checkmark.fill" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Coach Virtuale AI</Text>
            <Text style={styles.headerDescription}>
              Feedback real-time e consigli personalizzati durante l&apos;allenamento
            </Text>
          </LinearGradient>

          {/* Session Control */}
          {!isSessionActive ? (
            <Pressable style={styles.startButton} onPress={startSession}>
              <LinearGradient
                colors={gradients.racing}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.startButtonGradient}
              >
                <IconSymbol name="play.circle.fill" size={48} color="#FFFFFF" />
                <Text style={styles.startButtonText}>Inizia Sessione</Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <View style={[commonStyles.card, styles.activeSessionCard]}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionStatus}>
                  <View style={styles.liveIndicator} />
                  <Text style={styles.liveText}>SESSIONE ATTIVA</Text>
                </View>
                <Text style={styles.sessionDuration}>{formatDuration(sessionDuration)}</Text>
              </View>

              {/* Real-time Metrics */}
              <View style={styles.metricsGrid}>
                <View style={styles.metricCard}>
                  <IconSymbol name="heart.fill" size={24} color={colors.error} />
                  <Text style={styles.metricValue}>{metrics.heartRate}</Text>
                  <Text style={styles.metricLabel}>BPM</Text>
                </View>
                <View style={styles.metricCard}>
                  <IconSymbol name="speedometer" size={24} color={colors.primary} />
                  <Text style={styles.metricValue}>{metrics.speed}</Text>
                  <Text style={styles.metricLabel}>km/h</Text>
                </View>
                <View style={styles.metricCard}>
                  <IconSymbol name="timer" size={24} color={colors.accent} />
                  <Text style={styles.metricValue}>{metrics.lapTime}</Text>
                  <Text style={styles.metricLabel}>Giro</Text>
                </View>
              </View>

              {/* Performance Indicators */}
              <View style={styles.indicatorsSection}>
                <View style={styles.indicator}>
                  <View style={styles.indicatorHeader}>
                    <Text style={styles.indicatorLabel}>Consistenza</Text>
                    <Text style={styles.indicatorValue}>{Math.round(metrics.consistency)}%</Text>
                  </View>
                  <View style={styles.indicatorBar}>
                    <View
                      style={[
                        styles.indicatorBarFill,
                        {
                          width: `${metrics.consistency}%`,
                          backgroundColor: colors.success,
                        },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.indicator}>
                  <View style={styles.indicatorHeader}>
                    <Text style={styles.indicatorLabel}>Affaticamento</Text>
                    <Text style={styles.indicatorValue}>{Math.round(metrics.fatigue)}%</Text>
                  </View>
                  <View style={styles.indicatorBar}>
                    <View
                      style={[
                        styles.indicatorBarFill,
                        {
                          width: `${metrics.fatigue}%`,
                          backgroundColor:
                            metrics.fatigue > 70
                              ? colors.error
                              : metrics.fatigue > 40
                              ? colors.warning
                              : colors.success,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <Pressable style={styles.stopButton} onPress={stopSession}>
                <Text style={styles.stopButtonText}>Termina Sessione</Text>
              </Pressable>
            </View>
          )}

          {/* Features */}
          <View style={[commonStyles.card, styles.featuresCard]}>
            <Text style={styles.sectionTitle}>Funzionalità Coach AI</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <IconSymbol name="waveform.path.ecg" size={20} color={colors.error} />
                <Text style={styles.featureText}>Monitoraggio frequenza cardiaca</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color={colors.primary} />
                <Text style={styles.featureText}>Analisi performance real-time</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="speaker.wave.3.fill" size={20} color={colors.accent} />
                <Text style={styles.featureText}>Feedback vocale durante sessione</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="lightbulb.fill" size={20} color={colors.warning} />
                <Text style={styles.featureText}>Suggerimenti tecnici personalizzati</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="shield.checkered" size={20} color={colors.success} />
                <Text style={styles.featureText}>Allerte sicurezza e prevenzione</Text>
              </View>
            </View>
          </View>

          {/* Feedback History */}
          {feedbackHistory.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Cronologia Feedback</Text>
              {feedbackHistory.map((feedback) => (
                <View key={feedback.id} style={[commonStyles.card, styles.feedbackCard]}>
                  <View style={styles.feedbackHeader}>
                    <View
                      style={[
                        styles.feedbackIcon,
                        { backgroundColor: getFeedbackColor(feedback.priority) + '20' },
                      ]}
                    >
                      <IconSymbol
                        name={getFeedbackIcon(feedback.type) as any}
                        size={20}
                        color={getFeedbackColor(feedback.priority)}
                      />
                    </View>
                    <View style={styles.feedbackContent}>
                      <Text style={styles.feedbackMessage}>{feedback.message}</Text>
                      <Text style={styles.feedbackTime}>{feedback.timestamp}</Text>
                    </View>
                    <View
                      style={[
                        styles.priorityBadge,
                        { backgroundColor: getFeedbackColor(feedback.priority) },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
            <Text style={styles.infoText}>
              Il coach virtuale analizza i tuoi dati in tempo reale e fornisce feedback 
              personalizzato per ottimizzare tecnica, performance e sicurezza.
            </Text>
          </View>
        </ScrollView>

        {/* Feedback Modal */}
        <Modal
          visible={showFeedbackModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowFeedbackModal(false)}
        >
          <View style={styles.modalOverlay}>
            {currentFeedback && (
              <View
                style={[
                  styles.feedbackModal,
                  { borderLeftColor: getFeedbackColor(currentFeedback.priority) },
                ]}
              >
                <View style={styles.modalIcon}>
                  <IconSymbol
                    name={getFeedbackIcon(currentFeedback.type) as any}
                    size={32}
                    color={getFeedbackColor(currentFeedback.priority)}
                  />
                </View>
                <Text style={styles.modalMessage}>{currentFeedback.message}</Text>
              </View>
            )}
          </View>
        </Modal>
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
  startButton: {
    marginBottom: 24,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderRadius: 20,
    padding: 32,
    ...shadows.medium,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  activeSessionCard: {
    marginBottom: 24,
    backgroundColor: colors.highlightGreen,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sessionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.error,
  },
  liveText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.error,
    letterSpacing: 0.5,
  },
  sessionDuration: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  indicatorsSection: {
    gap: 16,
    marginBottom: 20,
  },
  indicator: {
    gap: 8,
  },
  indicatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  indicatorValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  indicatorBar: {
    height: 10,
    backgroundColor: colors.card,
    borderRadius: 5,
    overflow: 'hidden',
  },
  indicatorBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  stopButton: {
    backgroundColor: colors.error,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  stopButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  featuresCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
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
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  feedbackCard: {
    marginBottom: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  feedbackIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackMessage: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  feedbackTime: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  priorityBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.highlightBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  feedbackModal: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 6,
    ...shadows.large,
  },
  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMessage: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
});
