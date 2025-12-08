import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthProvider';
import COLORS from '../constants/colors';

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.primaryBg }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="paywall" />
        <Stack.Screen name="prayer" options={{ presentation: 'transparentModal', headerShown: false }} />
        <Stack.Screen name="player" options={{ presentation: 'transparentModal', headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
