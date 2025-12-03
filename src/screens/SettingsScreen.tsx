
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Card } from '@/src/components/common/Card';
import { Button } from '@/src/components/common/Button';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { useAuth } from '@/src/hooks/useAuth';
import { isSupabaseConfigured } from '@/src/config/constants';

/**
 * Settings Screen - Impostazioni e profilo
 */
export const SettingsScreen: React.FC = () => {
  const { user, signOut, configured } = useAuth();
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  useEffect(() => {
    setSupabaseConfigured(isSupabaseConfigured());
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Esci',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Errore', 'Impossibile effettuare il logout');
            }
          },
        },
      ]
    );
  };

  const handleSupabaseInfo = () => {
    Alert.alert(
      supabaseConfigured ? '✅ Supabase Configurato' : '⚠️ Supabase Non Configurato',
      supabaseConfigured 
        ? 'I tuoi dati vengono sincronizzati su cloud e tra dispositivi.'
        : 'Per abilitare il salvataggio dati:\n\n' +
          '1. Crea un progetto su supabase.com\n' +
          '2. Copia .env.example in .env\n' +
          '3. Inserisci le credenziali\n' +
          '4. Riavvia l\'app\n\n' +
          'Senza Supabase, l\'app funziona ma i dati non vengono salvati.',
      [{ text: 'OK' }]
    );
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { label: 'Profilo', icon: 'person.fill', androidIcon: 'person', onPress: () => console.log('Profile') },
        { label: 'Notifiche', icon: 'bell.fill', androidIcon: 'notifications', onPress: () => console.log('Notifications') },
      ],
    },
    {
      title: 'Dati',
      items: [
        { label: 'Esporta PDF', icon: 'doc.fill', androidIcon: 'description', onPress: () => console.log('Export PDF') },
        { label: 'Backup', icon: 'icloud.fill', androidIcon: 'cloud_upload', onPress: () => console.log('Backup') },
      ],
    },
    {
      title: 'Altro',
      items: [
        { label: 'Info App', icon: 'info.circle.fill', androidIcon: 'info', onPress: () => console.log('Info') },
        { label: 'Supporto', icon: 'questionmark.circle.fill', androidIcon: 'help', onPress: () => console.log('Support') },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Impostazioni</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Supabase Status Card */}
        <TouchableOpacity onPress={handleSupabaseInfo} activeOpacity={0.7}>
          <Card 
            variant="racing" 
            style={[
              styles.statusCard,
              { 
                backgroundColor: supabaseConfigured ? '#00C85320' : '#FF950020',
                borderLeftColor: supabaseConfigured ? '#00C853' : '#FF9500',
              }
            ]}
          >
            <View style={styles.statusIcon}>
              <IconSymbol 
                ios_icon_name={supabaseConfigured ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'} 
                android_material_icon_name={supabaseConfigured ? 'check_circle' : 'warning'} 
                size={32} 
                color={supabaseConfigured ? '#00C853' : '#FF9500'} 
              />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {supabaseConfigured ? 'Supabase Configurato' : 'Supabase Non Configurato'}
              </Text>
              <Text style={styles.statusText}>
                {supabaseConfigured 
                  ? 'Dati sincronizzati su cloud' 
                  : 'Tocca per configurare il salvataggio dati'}
              </Text>
            </View>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron_right" 
              size={20} 
              color={colors.textSecondary} 
            />
          </Card>
        </TouchableOpacity>

        {/* User Card */}
        {user && (
          <Card variant="racing" style={styles.userCard}>
            <View style={styles.avatar}>
              <IconSymbol 
                ios_icon_name="person.fill" 
                android_material_icon_name="person" 
                size={32} 
                color={colors.textInverse} 
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.email}</Text>
              <Text style={styles.userRole}>Pilota</Text>
            </View>
          </Card>
        )}

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.settingLeft}>
                      <IconSymbol 
                        ios_icon_name={item.icon as any} 
                        android_material_icon_name={item.androidIcon} 
                        size={24} 
                        color={colors.text} 
                      />
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <IconSymbol 
                      ios_icon_name="chevron.right" 
                      android_material_icon_name="chevron_right" 
                      size={20} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout Button */}
        {user && (
          <Button
            title="Logout"
            onPress={handleSignOut}
            variant="danger"
            style={styles.logoutButton}
          />
        )}

        {/* Version */}
        <Text style={styles.version}>Versione 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xl,
    paddingTop: 48,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    ...typography.hero,
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  statusIcon: {
    marginRight: spacing.md,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statusText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userRole: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.xs,
  },
  logoutButton: {
    marginTop: spacing.xl,
  },
  version: {
    ...typography.small,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
