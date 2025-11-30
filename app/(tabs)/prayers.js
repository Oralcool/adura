import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Prayers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Prayers Screen</Text>
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
  },
});

export default Prayers;
