
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface Section {
  title: string;
  description: string;
  icon: string;
  gradient: string[];
  route: string;
  duration?: string;
  category: 'pre' | 'post' | 'recovery' | 'reference';
}

export default function PreparationScreen() {
  const router = useRouter();

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route as any);
  };

  const sections: Section[] = [
    {
      title: 'Riscaldamento Pre-Allenamento',
      description: 'Preparazione muscolare e cardiovascolare completa',
      icon: 'flame.fill',
      gradient: gradients.error,
      route: '/warmup',
      duration: '15-20 min',
      category: 'pre',
    },
    {
      title: 'Mobilità Articolare',
      description: 'Esercizi di mobilità per prestazioni ottimali',
      icon: 'figure.flexibility',
      gradient: ['#667eea', '#764ba2'],
      route: '/mobility',
      duration: '15-20 min',
      category: 'pre',
    },
    {
      title: 'Raffreddamento Post-Allenamento',
      description: 'Defaticamento e recupero cardiovascolare',
      icon: 'figure.cooldown',
      gradient: gradients.cyan,
      route: '/cooldown',
      duration: '10-15 min',
      category: 'post',
    },
    {
      title: 'Stretching Dedicato',
      description: 'Allungamento muscolare completo e profondo',
      icon: 'figure.flexibility',
      gradient: gradients.success,
      route: '/stretching',
      duration: '20-30 min',
      category: 'recovery',
    },
    {
      title: 'Protocollo Foam Rolling',
      description: 'Rilascio miofasciale per recupero muscolare',
      icon: 'cylinder.fill',
      gradient: gradients.purple,
      route: '/foam-rolling',
      duration: '15-20 min',
      category: 'recovery',
    },
    {
      title: 'Riferimento Rapido',
      description: 'Linee guida e protocolli essenziali',
      icon: 'book.fill',
      gradient: gradients.blue,
      route: '/quick-reference',
      category: 'reference',
    },
  ];

  const categories = [
    { id: 'pre', title: 'Pre-Allenamento', icon: 'arrow.up.circle.fill' },
    { id: 'post', title: 'Post-Allenamento', icon: 'arrow.down.circle.fill' },
    { id: 'recovery', title: 'Recupero', icon: 'heart.circle.fill' },
    { id: 'reference', title: 'Riferimenti', icon: 'book.circle.fill' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Preparazione & Recupero',
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
              <IconSymbol name="heart.circle.fill" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Preparazione & Recupero</Text>
            <Text style={styles.headerDescription}>
              Protocolli professionali per piloti Moto3: ottimizza prestazioni e previeni infortuni
            </Text>
          </LinearGradient>

          {/* Info Card */}
          <View style={[commonStyles.card, styles.infoCard]}>
            <View style={styles.infoIconContainer}>
              <IconSymbol name="info.circle.fill" size={28} color={colors.info} />
            </View>
            <Text style={styles.infoText}>
              Ogni protocollo è stato sviluppato specificamente per le esigenze fisiche dei piloti Moto3, 
              con focus su mobilità, resistenza e recupero rapido.
            </Text>
          </View>

          {/* Organized by Category */}
          {categories.map((category) => {
            const categorySections = sections.filter(section => section.category === category.id);
            if (categorySections.length === 0) return null;

            return (
              <View key={category.id} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <IconSymbol name={category.icon as any} size={22} color={colors.primary} />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>

                {categorySections.map((section, index) => (
                  <Pressable
                    key={index}
                    style={styles.sectionCard}
                    onPress={() => handlePress(section.route)}
                  >
                    <LinearGradient
                      colors={section.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.sectionGradient}
                    >
                      <IconSymbol name={section.icon as any} size={32} color="#FFFFFF" />
                    </LinearGradient>
                    
                    <View style={styles.sectionContent}>
                      <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.duration && (
                          <View style={styles.durationBadge}>
                            <IconSymbol name="clock.fill" size={12} color={colors.textSecondary} />
                            <Text style={styles.durationText}>{section.duration}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.sectionDescription}>{section.description}</Text>
                    </View>
                    
                    <View style={styles.sectionArrow}>
                      <IconSymbol name="chevron.right" size={20} color={colors.textLight} />
                    </View>
                  </Pressable>
                ))}
              </View>
            );
          })}

          {/* Quick Tips Card */}
          <View style={[commonStyles.card, styles.tipsCard]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.racingGold} />
              <Text style={styles.tipsTitle}>Suggerimenti Professionali</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Riscaldamento: sempre prima di ogni sessione, anche breve</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Mobilità: quotidiana al mattino per risultati ottimali</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Raffreddamento: mai saltare, accelera il recupero</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Foam rolling: 3-4 volte a settimana per prevenzione</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Stretching: nei giorni di riposo per flessibilità</Text>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
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
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.highlightBlue,
  },
  infoIconContainer: {
    marginRight: 14,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontWeight: '500',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
    gap: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  sectionGradient: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
    flex: 1,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    marginLeft: 8,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  sectionArrow: {
    marginLeft: 12,
  },
  tipsCard: {
    backgroundColor: colors.highlightGold,
    borderLeftWidth: 4,
    borderLeftColor: colors.racingGold,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.racingGold,
    marginTop: 7,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontWeight: '500',
  },
});
