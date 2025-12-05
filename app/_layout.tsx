
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert, View, Text } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { setupErrorLogging } from "@/utils/errorLogger";

// Ensure polyfills are loaded
const ensurePolyfills = () => {
  if (typeof window === 'undefined') {
    console.warn('[App Layout] window undefined, creating it');
    // @ts-expect-error - Create window
    global.window = global as any;
  }

  if (typeof window !== 'undefined') {
    if (!window.addEventListener) {
      // @ts-expect-error - Polyfill
      window.addEventListener = () => {};
    }
    if (!window.removeEventListener) {
      // @ts-expect-error - Polyfill
      window.removeEventListener = () => {};
    }
    if (!window.dispatchEvent) {
      // @ts-expect-error - Polyfill
      window.dispatchEvent = () => true;
    }
  }
};

// Call polyfills immediately
ensurePolyfills();

// Setup error logging
setupErrorLogging();

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#0A0E27' }}>
          <Text style={{ color: '#FF4444', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
            Errore nell&apos;app
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
            {this.state.error?.message || 'Si è verificato un errore'}
          </Text>
          <Text style={{ color: '#6B7280', fontSize: 14, textAlign: 'center' }}>
            Riavvia l&apos;app per continuare
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  
  // Load Inter fonts
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log('Fonts loaded successfully');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 Sei offline",
        "Puoi continuare a usare l'app! Le modifiche verranno salvate localmente e sincronizzate quando tornerai online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded && !error) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: '#FF4444',
      background: '#F8F9FA',
      card: '#FFFFFF',
      text: '#1A1D29',
      border: '#E5E7EB',
      notification: '#FF3B30',
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: '#FF4444',
      background: '#0A0E27',
      card: '#1F2937',
      text: '#FFFFFF',
      border: '#2C2C2C',
      notification: '#FF3B30',
    },
  };

  return (
    <ErrorBoundary>
      <StatusBar style="auto" animated />
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
      >
        <WidgetProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <OfflineIndicator />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                    title: "Standard Modal",
                  }}
                />
                <Stack.Screen
                  name="formsheet"
                  options={{
                    presentation: "formSheet",
                    title: "Form Sheet Modal",
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.5, 0.8, 1.0],
                    sheetCornerRadius: 20,
                  }}
                />
                <Stack.Screen
                  name="transparent-modal"
                  options={{
                    presentation: "transparentModal",
                    headerShown: false,
                  }}
                />
              </Stack>
            </View>
            <SystemBars style={"auto"} />
          </GestureHandlerRootView>
        </WidgetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
