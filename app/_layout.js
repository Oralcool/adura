import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="paywall" />
      </Stack>
    </>
  );
};

export default RootLayout;
