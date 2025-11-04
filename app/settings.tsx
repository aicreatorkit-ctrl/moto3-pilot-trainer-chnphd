
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Impostazioni',
          presentation: 'card',
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Generali</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <IconSymbol name="bell.fill" size={20} color={colors.primary} />
                <Text style={styles.settingLabel}>Notifiche</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <IconSymbol name="moon.fill" size={20} color={colors.primary} />
                <Text style={styles.settingLabel}>Modalità Scura</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Dati</Text>
            
            <Pressable style={styles.settingButton}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
              <Text style={styles.settingButtonText}>Esporta Tutti i Dati</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={styles.settingButton}>
              <IconSymbol name="square.and.arrow.down" size={20} color={colors.primary} />
              <Text style={styles.settingButtonText}>Importa Dati</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={styles.settingButton}>
              <IconSymbol name="trash" size={20} color={colors.secondary} />
              <Text style={[styles.settingButtonText, { color: colors.secondary }]}>
                Cancella Tutti i Dati
              </Text>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Informazioni</Text>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Versione</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Sviluppato per</Text>
              <Text style={styles.infoValue}>Piloti Moto3</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
});
