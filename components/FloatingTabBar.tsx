
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
  withSpring,
  useSharedValue,
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
  
  // Use SharedValue for animations
  const animatedIndex = useSharedValue(0);
  const [measuredWidth, setMeasuredWidth] = React.useState(containerWidth);

  // Extract ALL primitive values from theme OUTSIDE of any worklet
  const isDark = React.useMemo(() => theme.dark, [theme.dark]);
  const primaryColor = React.useMemo(() => theme.colors.primary, [theme.colors.primary]);
  
  // Pre-calculate all style values as primitives
  const indicatorBackgroundColor = React.useMemo(() => 
    isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    [isDark]
  );

  const inactiveIconColor = React.useMemo(() => 
    isDark ? '#98989D' : '#8E8E93',
    [isDark]
  );

  const inactiveLabelColor = React.useMemo(() => 
    isDark ? '#98989D' : '#8E8E93',
    [isDark]
  );

  // Improved active tab detection with better path matching
  const activeTabIndex = React.useMemo(() => {
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      if (pathname === tab.route) {
        score = 100;
      } else if (pathname.startsWith(tab.route)) {
        score = 80;
      } else if (pathname.includes(tab.name)) {
        score = 60;
      } else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  // Update animated index when active tab changes
  React.useEffect(() => {
    animatedIndex.value = activeTabIndex;
  }, [activeTabIndex, animatedIndex]);

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  // Calculate tab width as a primitive number
  const tabWidth = React.useMemo(() => {
    return (measuredWidth - 16) / tabs.length;
  }, [measuredWidth, tabs.length]);

  // Create shared value for tab width
  const tabWidthShared = useSharedValue(tabWidth);

  // Update shared value when tab width changes
  React.useEffect(() => {
    tabWidthShared.value = tabWidth;
  }, [tabWidth, tabWidthShared]);

  // Create animated style using ONLY shared values and primitive calculations
  const indicatorStyle = useAnimatedStyle(() => {
    const translateX = animatedIndex.value * tabWidthShared.value;
    
    return {
      transform: [{ 
        translateX: withSpring(translateX, {
          damping: 20,
          stiffness: 120,
          mass: 1,
        }) 
      }],
    };
  });

  // All dynamic styles calculated outside of worklets
  const blurContainerStyle = React.useMemo(() => ({
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
  }), [isDark]);

  const backgroundStyle = React.useMemo(() => ({
    ...styles.background,
    backgroundColor: isDark
      ? (Platform.OS === 'ios' ? 'transparent' : 'rgba(28, 28, 30, 0.1)')
      : (Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.1)'),
  }), [isDark]);

  const indicatorWidthPercent = React.useMemo(() => 
    `${(100 / tabs.length) - 3}%`,
    [tabs.length]
  );

  // Handle layout measurement
  const handleLayout = React.useCallback((event: any) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0 && width !== measuredWidth) {
      setMeasuredWidth(width);
    }
  }, [measuredWidth]);

  // Web-specific wrapper to avoid SafeAreaView issues
  const TabBarContent = React.useCallback(() => (
    <View 
      style={[
        styles.container,
        {
          width: containerWidth,
          marginBottom: bottomMargin ?? (Platform.OS === 'ios' ? 10 : 20)
        }
      ]}
      onLayout={handleLayout}
    >
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
  ), [
    containerWidth,
    bottomMargin,
    handleLayout,
    blurContainerStyle,
    borderRadius,
    backgroundStyle,
    indicatorStyle,
    indicatorBackgroundColor,
    indicatorWidthPercent,
    tabs,
    activeTabIndex,
    primaryColor,
    inactiveIconColor,
    inactiveLabelColor,
  ]);

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
