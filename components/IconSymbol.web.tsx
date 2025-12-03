
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Mapping of SF Symbols to Material Icons for web
const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  'house.fill': 'home',
  'house': 'home',
  'calendar': 'calendar-today',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'chart.bar.fill': 'bar-chart',
  'chart.bar': 'bar-chart',
  'gearshape.fill': 'settings',
  'gearshape': 'settings',
  'sunrise.fill': 'wb-sunny',
  'sunrise': 'wb-sunny',
  'flame.fill': 'local-fire-department',
  'flame': 'local-fire-department',
  'figure.cooldown': 'self-improvement',
  'figure.flexibility': 'accessibility',
  'cylinder.fill': 'fitness-center',
  'heart.text.square.fill': 'monitor-heart',
  'trophy.fill': 'emoji-events',
  'trophy': 'emoji-events',
  'timer': 'timer',
  'function': 'calculate',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'waveform.path.ecg': 'monitor-heart',
  'square.grid.2x2.fill': 'grid-view',
  'camera.fill': 'camera-alt',
  'chart.xyaxis.line': 'show-chart',
  'figure.walk.motion': 'directions-walk',
  'person.badge.shield.checkmark.fill': 'verified-user',
  'brain.head.profile': 'psychology',
  'fork.knife': 'restaurant',
  'figure.stand': 'accessibility-new',
  'bolt.fill': 'bolt',
  'flag.checkered': 'flag',
  'wrench.and.screwdriver.fill': 'build',
  'book.fill': 'menu-book',
  'chevron.right': 'chevron-right',
  'list.clipboard.fill': 'assignment',
  'figure.run': 'directions-run',
  'heart.circle.fill': 'favorite',
  'sparkles': 'auto-awesome',
  'exclamationmark.triangle.fill': 'warning',
  'phone.fill': 'phone',
  'phone': 'phone',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
  ios_icon_name,
  android_material_icon_name,
}: {
  name?: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: string;
  ios_icon_name?: string;
  android_material_icon_name?: string;
}) {
  // Use android_material_icon_name if provided, otherwise map from ios name
  const iconName = android_material_icon_name || iconMap[name || ios_icon_name || ''] || 'help-outline';

  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <MaterialIcons name={iconName} size={size} color={color} />
    </View>
  );
}
