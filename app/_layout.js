import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthProvider';

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="paywall" />
        <Stack.Screen name="prayer" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
