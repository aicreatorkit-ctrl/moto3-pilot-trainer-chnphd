
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkState } from 'expo-network';
import { colors, spacing, typography } from '@/styles/commonStyles';

/**
 * Indicatore di connessione offline
 */
export const OfflineIndicator: React.FC = () => {
  const networkState = useNetworkState();

  if (networkState.isConnected !== false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔌 Modalità Offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '700',
  },
});
