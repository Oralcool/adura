import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
// A placeholder for icons, you would use a library like @expo/vector-icons
import { Ionicons } from '@expo/vector-icons';
import FloatingPlayer from '../../components/FloatingPlayer'; 

// Using the colors from your color scheme
const COLORS = {
  primaryBg: '#0E1621',
  secondaryBg: '#1A2533',
  accent: '#D4AF37',
  textSecondary: '#A1ACB8',
  textPrimary: '#E6EAF0',
};

const TabsLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            backgroundColor: COLORS.secondaryBg,
            borderTopColor: COLORS.secondaryBg,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="stories"
          options={{
            title: 'Stories',
            tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="sleep"
          options={{
            title: 'Sleep',
            tabBarIcon: ({ color }) => <Ionicons name="moon-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </View>
  );
};

export default TabsLayout;
