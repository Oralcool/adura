import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PaywallScreen = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleComplete}>
        <Feather name="x" size={24} color="#E6EAF0" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Unlock All Features</Text>
        <Text style={styles.subtitle}>
          Gain access to personalized prayers, Bible studies, and more.
        </Text>
        
        <View style={styles.featureList}>
          <FeatureItem text="Unlimited personalized prayers" />
          <FeatureItem text="In-depth Bible studies" />
          <FeatureItem text="Save your favorite content" />
          <FeatureItem text="Ad-free experience" />
        </View>

        <View style={styles.plans}>
          <TouchableOpacity style={[styles.plan, styles.activePlan]}>
            <Text style={styles.planText}>Yearly</Text>
            <Text style={styles.planPrice}>$49.99</Text>
            <Text style={styles.planSave}>Save 50%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.plan}>
            <Text style={styles.planText}>Monthly</Text>
            <Text style={styles.planPrice}>$9.99</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleComplete}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const FeatureItem = ({ text }) => (
  <View style={styles.featureItem}>
    <Feather name="check-circle" size={20} color="#D4AF37" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1621',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E6EAF0',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#A1ACB8',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureList: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#E6EAF0',
    marginLeft: 10,
  },
  plans: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  plan: {
    flex: 1,
    padding: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3A4B5F',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activePlan: {
    borderColor: '#D4AF37',
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EAF0',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E6EAF0',
    marginVertical: 5,
  },
  planSave: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E1621',
  },
  restoreText: {
    fontSize: 16,
    color: '#A1ACB8',
    textDecorationLine: 'underline',
  },
});

export default PaywallScreen;
