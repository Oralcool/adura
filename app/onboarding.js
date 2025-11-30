import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import onboardingData from '../onboarding.json';
import PersonalizingView from '../components/PersonalizingView';
import WelcomeView from '../components/WelcomeView';
import QuestionnaireView from '../components/QuestionnaireView';

const Onboarding = () => {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const currentQuestion = onboardingData[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prev) => {
      const existingAnswers = prev[currentQuestion.id] || [];
      if (currentQuestion.questionType === 'single choice') {
        return { ...prev, [currentQuestion.id]: [option] };
      } else {
        if (existingAnswers.includes(option)) {
          return { ...prev, [currentQuestion.id]: existingAnswers.filter((item) => item !== option) };
        } else {
          return { ...prev, [currentQuestion.id]: [...existingAnswers, option] };
        }
      }
    });
  };

  const handleContinue = () => {
    if (!isContinueDisabled) {
      if (currentQuestionIndex < onboardingData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsPersonalizing(true);
      }
    }
  };

  const onPersonalizationComplete = () => {
    router.replace('/(tabs)/home');
  };

  const isLastQuestion = currentQuestionIndex === onboardingData.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion.id]?.length > 0;
  const isContinueDisabled = !hasSelectedAnswer;

  if (showWelcome) {
    return <WelcomeView onContinue={() => setShowWelcome(false)} />;
  }

  if (isPersonalizing) {
    return <PersonalizingView onComplete={onPersonalizationComplete} />;
  }

  return (
    <QuestionnaireView
      currentQuestion={currentQuestion}
      selectedAnswers={selectedAnswers}
      handleOptionSelect={handleOptionSelect}
      handleContinue={handleContinue}
      isContinueDisabled={isContinueDisabled}
      isLastQuestion={isLastQuestion}
    />
  );
};

export default Onboarding;
