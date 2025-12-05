
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function CalendarScreen() {
  console.log('CalendarScreen rendering');
  
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Calendario',
          }}
        />
      )}
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol 
              ios_icon_name="calendar" 
              android_material_icon_name="event" 
              size={48} 
              color={colors.primary} 
            />
            <Text style={styles.title}>Calendario Allenamenti</Text>
            <Text style={styles.subtitle}>
              Visualizza e pianifica le tue 46 settimane di allenamento
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.comingSoonText}>
              📅 Calendario in arrivo
            </Text>
            <Text style={styles.comingSoonDescription}>
              Qui potrai visualizzare tutte le 46 settimane di allenamento con calendario interattivo.
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
    paddingTop: 48,
    paddingBottom: 32,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  comingSoonDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
