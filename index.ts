
// Import polyfills FIRST before anything else
// Use platform-specific polyfills
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific polyfills
  import('./utils/polyfills.web');
} else {
  // Native polyfills
  import('./utils/polyfills');
}

// Now import expo-router entry
import 'expo-router/entry';
