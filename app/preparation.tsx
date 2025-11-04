
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function PreparationScreen() {
  const router = useRouter();

  const sections = [
    {
      title: 'Riscaldamento Pre-Allenamento',
      description: 'Preparazione muscolare e cardiovascolare',
      icon: 'flame.fill',
      color: colors.warning,
      route: '/warmup',
    },
    {
      title: 'Raffreddamento Post-Allenamento',
      description: 'Defaticamento e recupero immediato',
      icon: 'figure.cooldown',
      color: colors.primary,
      route: '/cooldown',
    },
    {
      title: 'Stretching Dedicato',
      description: 'Allungamento muscolare completo',
      icon: 'figure.flexibility',
      color: colors.accent,
      route: '/stretching',
    },
    {
      title: 'Protocollo Foam Rolling',
      description: 'Rilascio miofasciale e recupero',
      icon: 'cylinder.fill',
      color: colors.secondary,
      route: '/foam-rolling',
    },
    {
      title: 'Riferimento Rapido',
      description: 'Linee guida e protocolli essenziali',
      icon: 'book.fill',
      color: colors.textSecondary,
      route: '/quick-reference',
    },
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
          <View style={[commonStyles.card, styles.infoCard]}>
            <IconSymbol name="info.circle.fill" size={32} color={colors.primary} />
            <Text style={styles.infoText}>
              Seleziona una sezione per accedere ai protocolli di preparazione e recupero specifici per piloti Moto3
            </Text>
          </View>

          {sections.map((section, index) => (
            <Pressable
              key={index}
              style={commonStyles.card}
              onPress={() => router.push(section.route as any)}
            >
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: section.color + '20' }]}>
                  <IconSymbol name={section.icon as any} size={28} color={section.color} />
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
          ))}
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
