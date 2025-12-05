
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = 240,
  borderRadius = 25,
  bottomMargin
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const animatedValue = useSharedValue(0);

  // Extract primitive values from theme for use in worklets
  const isDark = theme.dark;
  const primaryColor = theme.colors.primary;

  // Improved active tab detection with better path matching
  const activeTabIndex = React.useMemo(() => {
    // Find the best matching tab based on the current pathname
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      // Exact route match gets highest score
      if (pathname === tab.route) {
        score = 100;
      }
      // Check if pathname starts with tab route (for nested routes)
      else if (pathname.startsWith(tab.route)) {
        score = 80;
      }
      // Check if pathname contains the tab name
      else if (pathname.includes(tab.name)) {
        score = 60;
      }
      // Check for partial matches in the route
      else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    // Default to first tab if no match found
    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  React.useEffect(() => {
    if (activeTabIndex >= 0) {
      animatedValue.value = withSpring(activeTabIndex, {
        damping: 20,
        stiffness: 120,
        mass: 1,
      });
    }
  }, [activeTabIndex, animatedValue]);

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  // Calculate tab width as a primitive value
  const tabWidth = (containerWidth - 16) / tabs.length;
  const tabsLength = tabs.length;

  const indicatorStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [0, tabsLength - 1],
            [0, tabWidth * (tabsLength - 1)]
          ),
        },
      ],
    };
  }, [tabWidth, tabsLength]);

  // Dynamic styles based on theme - using only primitive values
  const indicatorBackgroundColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.04)';

  const blurContainerStyle = {
    ...styles.blurContainer,
    ...Platform.select({
      ios: {
        backgroundColor: isDark
          ? 'rgba(28, 28, 30, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
      },
      android: {
        backgroundColor: isDark
          ? 'rgba(28, 28, 30, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        elevation: 8,
      },
      web: {
        backgroundColor: isDark
          ? 'rgba(28, 28, 30, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    }),
  };

  const backgroundStyle = {
    ...styles.background,
    backgroundColor: isDark
      ? (Platform.OS === 'ios' ? 'transparent' : 'rgba(28, 28, 30, 0.1)')
      : (Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.1)'),
  };

  const indicatorWidthPercent = `${(100 / tabs.length) - 3}%`;

  const inactiveIconColor = isDark ? '#98989D' : '#8E8E93';
  const inactiveLabelColor = isDark ? '#98989D' : '#8E8E93';

  // Web-specific wrapper to avoid SafeAreaView issues
  const TabBarContent = () => (
    <View style={[
      styles.container,
      {
        width: containerWidth,
        marginBottom: bottomMargin ?? (Platform.OS === 'ios' ? 10 : 20)
      }
    ]}>
      <BlurView
        intensity={Platform.OS === 'web' ? 0 : 80}
        style={[blurContainerStyle, { borderRadius }]}
      >
        <View style={backgroundStyle} />
        <Animated.View 
          style={[
            styles.indicator, 
            indicatorStyle,
            {
              backgroundColor: indicatorBackgroundColor,
              width: indicatorWidthPercent,
            }
          ]} 
        />
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => {
            const isActive = activeTabIndex === index;

            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <View style={styles.tabContent}>
                  <IconSymbol
                    ios_icon_name={tab.icon as any}
                    android_material_icon_name={tab.icon as any}
                    size={24}
                    color={isActive ? primaryColor : inactiveIconColor}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: inactiveLabelColor },
                      isActive && { color: primaryColor, fontWeight: '600' },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.safeAreaWeb}>
        <TabBarContent />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <TabBarContent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  safeAreaWeb: {
    position: 'fixed' as any,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  blurContainer: {
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  indicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    bottom: 8,
    borderRadius: 17,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
