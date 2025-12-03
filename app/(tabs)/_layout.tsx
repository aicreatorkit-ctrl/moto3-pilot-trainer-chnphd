
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
        name="routines"
        options={{
          title: 'Routine',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="list.bullet" 
              android_material_icon_name="list" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrizione',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="fork.knife" 
              android_material_icon_name="restaurant" 
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
    </Tabs>
  );
}
