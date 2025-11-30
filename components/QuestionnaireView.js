import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import onboardingData from '../onboarding.json';

const QuestionnaireView = React.memo(({
  currentQuestion,
  selectedAnswers,
  handleOptionSelect,
  handleContinue,
  isContinueDisabled,
  isLastQuestion
}) => {
  const progress = (currentQuestion.id) / onboardingData.length;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <Text style={styles.helperQuestion}>{currentQuestion.helperQuestion}</Text>
        </View>
        <ScrollView style={styles.optionsScrollView}>
          <View style={styles.optionsContainer}>
            {currentQuestion.questionOptions.map((option) => {
              const isSelected = selectedAnswers[currentQuestion.id]?.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, styles.continueButton, isContinueDisabled && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={isContinueDisabled}
        >
          <Text style={[styles.navButtonText, styles.continueButtonText, isContinueDisabled && styles.continueButtonTextDisabled]}>
            {isLastQuestion ? 'Finish' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1621',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#3A4B5F',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E6EAF0',
    marginBottom: 10,
    textAlign: 'center',
  },
  helperQuestion: {
    fontSize: 18,
    color: '#A1ACB8',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionsScrollView: {
    flex: 1,
  },
  optionsContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1C2A3A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3A4B5F',
  },
  optionButtonSelected: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  optionText: {
    color: '#E6EAF0',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#0E1621',
    fontWeight: 'bold',
  },
  navigation: {
    width: '100%',
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
  continueButtonDisabled: {
    backgroundColor: '#8C7737',
  },
  continueButtonTextDisabled: {
    color: '#6A6A6A',
  },
});

export default QuestionnaireView;
