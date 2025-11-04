
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { quickReference } from '@/data/trainingData';

export default function QuickReferenceScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Riferimento Rapido',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[commonStyles.card, styles.referenceCard]}>
            <View style={styles.referenceHeader}>
              <IconSymbol name="drop.fill" size={24} color={colors.primary} />
              <Text style={styles.referenceTitle}>Idratazione</Text>
            </View>
            <Text style={styles.referenceText}>{quickReference.hydration}</Text>
          </View>

          <View style={[commonStyles.card, styles.referenceCard]}>
            <View style={styles.referenceHeader}>
              <IconSymbol name="fork.knife" size={24} color={colors.accent} />
              <Text style={styles.referenceTitle}>Nutrizione</Text>
            </View>
            <Text style={styles.referenceText}>{quickReference.nutrition}</Text>
          </View>

          <View style={[commonStyles.card, styles.referenceCard]}>
            <View style={styles.referenceHeader}>
              <IconSymbol name="bed.double.fill" size={24} color={colors.warning} />
              <Text style={styles.referenceTitle}>Sonno</Text>
            </View>
            <Text style={styles.referenceText}>{quickReference.sleep}</Text>
          </View>

          <View style={[commonStyles.card, styles.referenceCard]}>
            <View style={styles.referenceHeader}>
              <IconSymbol name="figure.cooldown" size={24} color={colors.accent} />
              <Text style={styles.referenceTitle}>Recupero</Text>
            </View>
            <Text style={styles.referenceText}>{quickReference.recovery}</Text>
          </View>

          <View style={[commonStyles.card, styles.referenceCard, styles.warningCard]}>
            <View style={styles.referenceHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.secondary} />
              <Text style={[styles.referenceTitle, { color: colors.secondary }]}>
                Segnali di Allarme
              </Text>
            </View>
            <Text style={styles.referenceText}>{quickReference.redFlags}</Text>
          </View>

          <View style={[commonStyles.card, styles.tipsCard]}>
            <Text style={styles.tipsTitle}>Principi Fondamentali</Text>
            <Text style={styles.tipsText}>
              - Costanza è la chiave del successo{'\n'}
              - Ascolta sempre il tuo corpo{'\n'}
              - Qualità prima della quantità{'\n'}
              - Recupero = Parte dell&apos;allenamento{'\n'}
              - Monitora i progressi regolarmente
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
  referenceCard: {
    marginBottom: 16,
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  referenceText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  warningCard: {
    backgroundColor: colors.highlight,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  tipsCard: {
    backgroundColor: colors.primary + '10',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
});
