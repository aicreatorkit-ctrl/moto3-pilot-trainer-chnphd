
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'calendar',
      route: '/(tabs)/calendar',
      icon: 'calendar',
      label: 'Calendario',
    },
    {
      name: 'readiness',
      route: '/(tabs)/readiness',
      icon: 'heart.fill',
      label: 'Prontezza',
    },
    {
      name: 'progress',
      route: '/(tabs)/progress',
      icon: 'chart.bar.fill',
      label: 'Progressi',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="readiness" />
        <Stack.Screen name="progress" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
