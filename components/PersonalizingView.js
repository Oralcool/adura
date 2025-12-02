import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const PersonalizingView = React.memo(({ onComplete }) => {
  const [fill, setFill] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // This is a simple way to animate the fill value from 0 to 100 over 10 seconds.
    const interval = setInterval(() => {
      setFill((prevFill) => {
        if (prevFill >= 100) {
          clearInterval(interval);
          setIsAnimationComplete(true);
          return 100;
        }
        return prevFill + 1;
      });
    }, 100); // Update every 100ms for a 10 second duration (100 * 100 = 10000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AnimatedCircularProgress
          size={220}
          width={15}
          fill={fill}
          tintColor="#D4AF37"
          backgroundColor="#3A4B5F"
          rotation={0}
          lineCap="round"
        >
          {
            (fill) => (
              <Text style={styles.progressText}>
                {Math.round(fill)}%
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <Text style={styles.personalizingText}>
          {isAnimationComplete ? "Personalization completed" : "Personalizing your experience..."}
        </Text>
      </View>
      <View style={styles.navigation}>
        {isAnimationComplete && (
          <TouchableOpacity style={[styles.navButton, styles.continueButton]} onPress={onComplete}>
            <Text style={[styles.navButtonText, styles.continueButtonText]}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1621',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  progressText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#E6EAF0',
  },
  personalizingText: {
    fontSize: 24,
    color: '#A1ACB8',
    marginTop: 30,
    textAlign: 'center',
  },
  navigation: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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

export default PersonalizingView;
