import { Tabs } from 'expo-router';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function TabLayout() {
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#ae95ffff'},
        headerTintColor: '#FFFFFF',
        headerTitle:'KitchenBook',
        
        tabBarStyle:{ backgroundColor: '#ae95ffff'},
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Przepisy',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="(Receipe)"
        options={{
          title: 'Dodaj przepis',
          href: '/(tabs)/(Receipe)/title',
          tabBarIcon: ({ color }) =>  <FontAwesome name="plus" size={28} color={color} />,
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />

    </Tabs>
  );
}
