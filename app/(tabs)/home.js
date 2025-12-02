import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/AuthProvider'; // Adjust path if necessary

const Home = () => {
  const { user, loading } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      {loading ? (
        <Text style={styles.uidText}>Loading user...</Text>
      ) : (
        user && <Text style={styles.uidText}>Anonymous User ID: {user.uid}</Text>
      )}
      {/* 
        This 'user.uid' is the unique identifier you would pass to Superwall
        when initializing it, or when setting the user ID for Superwall.
        Example: Superwall.configure(API_KEY, { userId: user.uid });
      */}
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
  text: {
    color: '#E6EAF0',
    fontSize: 24,
    marginBottom: 20,
  },
  uidText: {
    color: '#A1ACB8',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
