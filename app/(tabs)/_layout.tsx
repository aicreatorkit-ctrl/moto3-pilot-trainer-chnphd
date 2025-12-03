
import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  console.log('TabLayout rendering');
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4444',
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="house.fill" 
              android_material_icon_name="home" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="calendar" 
              android_material_icon_name="event" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="readiness"
        options={{
          title: 'Prontezza',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="heart.fill" 
              android_material_icon_name="favorite" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progressi',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="chart.line.uptrend.xyaxis" 
              android_material_icon_name="trending-up" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Altro',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="gearshape.fill" 
              android_material_icon_name="settings" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
