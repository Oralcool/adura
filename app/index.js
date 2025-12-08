import { Redirect } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardingComplete');
        if (value !== null) {
          setOnboardingComplete(true);
        }
      } catch (e) {
        console.error('Failed to fetch onboarding status.', e);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (onboardingComplete) {
    return <Redirect href="/paywall" />;
  } else {
    return <Redirect href="/onboarding" />;
  }
};

export default Index;
