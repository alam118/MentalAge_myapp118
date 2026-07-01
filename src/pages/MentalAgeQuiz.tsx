/**
 * MentalAgeQuiz Page
 * The active quiz interface managing the question-answering flow.
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { ROUTES } from '@/utils/constants';
import QuestionCard from '@/components/quiz/QuestionCard';
import AnswerOption from '@/components/quiz/AnswerOption';
import QuizProgress from '@/components/quiz/QuizProgress';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const MentalAgeQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { 
    session, 
    startNewQuiz, 
    selectOption, 
    goNext, 
    goBack, 
    isAnalyzing, 
    finalizeAndAnalyze 
  } = useQuiz();

  useEffect(() => {
    if (!session) {
      startNewQuiz('mental-age', 20);
    }
  }, [session, startNewQuiz]);

  if (!session) return <Loader fullScreen />;

  const currentQuestion = session.questions[session.currentIndex];
  const currentAnswer = session.answers.find(a => a.questionId === currentQuestion?.id);
  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  const handleNext = async () => {
    if (isLastQuestion) {
      const result = await finalizeAndAnalyze();
      if (result) navigate(ROUTES.RESULTS);
    } else {
      goNext();
    }
  };

  if (isAnalyzing) return <Loader fullScreen />;

  return (
    <Container>
      <QuizProgress 
        current={session.currentIndex + 1} 
        total={session.questions.length} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={session.currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentQuestion && (
            <>
              <QuestionCard 
                question={currentQuestion} 
                questionNumber={session.currentIndex + 1}
                totalQuestions={session.questions.length}
              />
              <OptionsGrid>
                {currentQuestion.options.map((option) => (
                  <AnswerOption
                    key={option.id}
                    option={option}
                    isSelected={currentAnswer?.optionId === option.id}
                    onSelect={selectOption}
                  />
                ))}
              </OptionsGrid>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <Footer>
        <Button 
          variant="secondary" 
          onClick={goBack} 
          disabled={session.currentIndex === 0}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!currentAnswer}
        >
          {isLastQuestion ? "Finish Analysis" : "Next"}
        </Button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 32px 20px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
`;

export default MentalAgeQuiz;
