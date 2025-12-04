
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, typography } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useDataExport } from '@/hooks/useDataExport';

export default function SettingsScreen() {
  const {
    isExporting,
    isImporting,
    error,
    exportData,
    importData,
    clearError,
  } = useDataExport();

  const [fileInputKey, setFileInputKey] = useState(0);

  const handleExport = async () => {
    try {
      await exportData();
      if (Platform.OS === 'web') {
        Alert.alert(
          'Esportazione Completata',
          'I tuoi dati sono stati esportati con successo.'
        );
      }
    } catch (err) {
      Alert.alert(
        'Errore',
        'Si è verificato un errore durante l\'esportazione dei dati.'
      );
    }
  };

  const handleImport = () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Non Supportato',
        'L\'importazione è disponibile solo nella versione web.'
      );
      return;
    }

    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        try {
          await importData(file);
          Alert.alert(
            'Importazione Completata',
            'I tuoi dati sono stati importati con successo. L\'app verrà ricaricata.',
            [
              {
                text: 'OK',
                onPress: () => {
                  if (Platform.OS === 'web') {
                    window.location.reload();
                  }
                },
              },
            ]
          );
        } catch (err) {
          Alert.alert(
            'Errore',
            'Si è verificato un errore durante l\'importazione dei dati.'
          );
        }
      }
    };
    input.click();
    setFileInputKey(prev => prev + 1);
  };

  const settingsSections = [
    {
      title: 'Dati',
      items: [
        {
          icon: 'arrow.down.doc',
          androidIcon: 'download',
          label: 'Esporta Dati',
          subtitle: 'Salva tutti i tuoi dati',
          onPress: handleExport,
          loading: isExporting,
        },
        {
          icon: 'arrow.up.doc',
          androidIcon: 'upload',
          label: 'Importa Dati',
          subtitle: 'Ripristina i tuoi dati',
          onPress: handleImport,
          loading: isImporting,
          disabled: Platform.OS !== 'web',
        },
      ],
    },
    {
      title: 'Allenamento',
      items: [
        {
          icon: 'calendar',
          androidIcon: 'calendar_today',
          label: 'Calendario 18 Settimane',
          subtitle: 'Visualizza il programma completo',
          onPress: () => router.push('/(tabs)/calendar'),
        },
        {
          icon: 'flag.fill',
          androidIcon: 'flag',
          label: 'Sistema Bandiera Rossa',
          subtitle: 'Monitora i segnali di allarme',
          onPress: () => router.push('/red-flags'),
        },
      ],
    },
    {
      title: 'Strumenti',
      items: [
        {
          icon: 'timer',
          androidIcon: 'timer',
          label: 'Timer Multi-Intervallo',
          subtitle: 'Gestisci i tempi di allenamento',
          onPress: () => router.push('/timer'),
        },
        {
          icon: 'heart.text.square',
          androidIcon: 'favorite',
          label: 'Monitor HRV',
          subtitle: 'Variabilità frequenza cardiaca',
          onPress: () => router.push('/hrv-monitor'),
        },
        {
          icon: 'figure.walk',
          androidIcon: 'accessibility',
          label: 'Valutazione Postura',
          subtitle: 'Analisi posturale',
          onPress: () => router.push('/posture-assessment'),
        },
      ],
    },
    {
      title: 'Contenuti',
      items: [
        {
          icon: 'book.fill',
          androidIcon: 'book',
          label: 'Riferimento Rapido',
          subtitle: 'Guide e protocolli',
          onPress: () => router.push('/quick-reference'),
        },
        {
          icon: 'list.bullet.clipboard',
          androidIcon: 'checklist',
          label: 'Checklist Stampabili',
          subtitle: 'Liste di controllo',
          onPress: () => router.push('/printable-checklists'),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Impostazioni</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error.message}</Text>
            <TouchableOpacity onPress={clearError}>
              <IconSymbol
                ios_icon_name="xmark.circle.fill"
                android_material_icon_name="cancel"
                size={20}
                color={colors.textInverse}
              />
            </TouchableOpacity>
          </View>
        )}

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.settingItemLast,
                    item.disabled && styles.settingItemDisabled,
                  ]}
                  onPress={item.onPress}
                  disabled={item.disabled || item.loading}
                >
                  <View style={styles.settingIcon}>
                    <IconSymbol
                      ios_icon_name={item.icon}
                      android_material_icon_name={item.androidIcon}
                      size={24}
                      color={item.disabled ? colors.textLight : colors.primary}
                    />
                  </View>
                  <View style={styles.settingContent}>
                    <Text
                      style={[
                        styles.settingLabel,
                        item.disabled && styles.settingLabelDisabled,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.loading ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <IconSymbol
                      ios_icon_name="chevron.right"
                      android_material_icon_name="chevron_right"
                      size={20}
                      color={colors.textLight}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {Platform.OS === 'web' && (
          <View style={styles.webInfo}>
            <IconSymbol
              ios_icon_name="info.circle"
              android_material_icon_name="info"
              size={20}
              color={colors.info}
            />
            <Text style={styles.webInfoText}>
              Stai usando la versione web. I dati vengono salvati nel browser.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Moto3 Pilot Trainer</Text>
          <Text style={styles.footerVersion}>Versione 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'android' ? 48 : spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  headerTitle: {
    ...typography.title,
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.error,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  errorText: {
    flex: 1,
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '600',
    marginRight: spacing.md,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sectionContent: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemDisabled: {
    opacity: 0.5,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  settingLabelDisabled: {
    color: colors.textLight,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  webInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlightBlue,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginTop: spacing.xl,
  },
  webInfoText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: 14,
    color: colors.info,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  footerVersion: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
