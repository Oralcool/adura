import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AduraLogo from '../assets/icon.png'; // Relative path from components/WelcomeView.js

const WelcomeView = React.memo(({ onContinue }) => (
  <View style={styles.welcomeContainer}>
    <Image source={AduraLogo} style={styles.logo} />
    <Text style={styles.title}>Welcome to Adura</Text>
    <Text style={styles.subtitle}>Your companion for prayer and stories.</Text>
    <TouchableOpacity style={[styles.navButton, styles.continueButton]} onPress={onContinue}>
      <Text style={[styles.navButtonText, styles.continueButtonText]}>Continue</Text>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1621',
    paddingHorizontal: 20,
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
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: '100%',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#D4AF37',
  },
  continueButtonText: {
    color: '#0E1621',
  },
});

export default WelcomeView;
