import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const Onboarding = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Adura</Text>
      <Text style={styles.subtitle}>Your companion for prayer and stories.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1621',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E6EAF0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#A1ACB8',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  buttonText: {
    color: '#0E1621',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding;
