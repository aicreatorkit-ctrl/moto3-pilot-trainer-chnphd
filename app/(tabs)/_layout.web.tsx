
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'calendar',
      route: '/(tabs)/calendar',
      icon: 'event',
      label: 'Calendario',
    },
    {
      name: 'readiness',
      route: '/(tabs)/readiness',
      icon: 'favorite',
      label: 'Prontezza',
    },
    {
      name: 'progress',
      route: '/(tabs)/progress',
      icon: 'trending-up',
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
        <Stack.Screen name="settings" />
        <Stack.Screen name="routines" />
        <Stack.Screen name="nutrition" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
