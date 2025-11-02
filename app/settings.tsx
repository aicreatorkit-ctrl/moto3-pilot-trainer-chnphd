
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...commonStyles.shadow,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dangerCard: {
    backgroundColor: '#FF3B3020',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  dangerText: {
    color: '#FF3B30',
  },
});

export default function SettingsScreen() {
  const router = useRouter();

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully');
      alert('Tutti i dati sono stati cancellati');
    } catch (error) {
      console.log('Error clearing data:', error);
      alert('Errore durante la cancellazione dei dati');
    }
  };

  const dataSettings = [
    {
      title: 'Routine Mattutina',
      description: 'Modifica gli elementi della routine',
      icon: 'sunny',
      color: colors.primary,
      route: '/edit-morning-routine',
    },
    {
      title: 'Esercizi Riscaldamento',
      description: 'Personalizza gli esercizi di warmup',
      icon: 'flame',
      color: '#FF9500',
      route: '/edit-warmup',
    },
    {
      title: 'Esercizi Raffreddamento',
      description: 'Modifica gli esercizi di cooldown',
      icon: 'water',
      color: '#5AC8FA',
      route: '/edit-cooldown',
    },
    {
      title: 'Esercizi Stretching',
      description: 'Personalizza gli esercizi di stretching',
      icon: 'figure.flexibility',
      color: '#34C759',
      route: '/edit-stretching',
    },
    {
      title: 'Foam Rolling',
      description: 'Modifica il protocollo foam rolling',
      icon: 'circle.grid.cross',
      color: '#AF52DE',
      route: '/edit-foam-rolling',
    },
    {
      title: 'Riferimento Rapido',
      description: 'Modifica le linee guida rapide',
      icon: 'book',
      color: '#FF2D55',
      route: '/edit-quick-reference',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Impostazioni',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modifica Dati</Text>
          {dataSettings.map((setting, index) => (
            <Pressable
              key={index}
              style={styles.settingCard}
              onPress={() => router.push(setting.route as any)}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: setting.color + '20' }]}>
                  <IconSymbol name={setting.icon as any} size={24} color={setting.color} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestione Dati</Text>
          <Pressable
            style={[styles.settingCard, styles.dangerCard]}
            onPress={() => {
              if (confirm('Sei sicuro di voler cancellare tutti i dati? Questa azione non può essere annullata.')) {
                clearAllData();
              }
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FF3B3020' }]}>
                <IconSymbol name="trash" size={24} color="#FF3B30" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, styles.dangerText]}>Cancella Tutti i Dati</Text>
                <Text style={styles.settingDescription}>Rimuovi tutti i dati salvati</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
