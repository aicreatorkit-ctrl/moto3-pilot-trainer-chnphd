
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Cross-platform haptic feedback utility
 * Gracefully handles web platform where haptics are not available
 */
export const haptics = {
  /**
   * Light impact feedback
   */
  light: async () => {
    if (Platform.OS === 'web') {
      // Web fallback - use Vibration API if available
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      return;
    }
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Medium impact feedback
   */
  medium: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate(20);
      }
      return;
    }
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Heavy impact feedback
   */
  heavy: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate(30);
      }
      return;
    }
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Success notification feedback
   */
  success: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 50, 10]);
      }
      return;
    }
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Warning notification feedback
   */
  warning: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate([20, 50, 20]);
      }
      return;
    }
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Error notification feedback
   */
  error: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate([30, 50, 30, 50, 30]);
      }
      return;
    }
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  /**
   * Selection changed feedback
   */
  selection: async () => {
    if (Platform.OS === 'web') {
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
      return;
    }
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },
};
