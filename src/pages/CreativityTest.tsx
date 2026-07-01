/**
 * CreativityTest Page
 * Specialized quiz flow for analyzing imaginative and abstract thinking.
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
import Layout from '@/components/layout/Layout';

const CreativityTest: React.FC = () => {
  const navigate = useNavigate();
  const { session, startNewQuiz, selectOption, goNext, goBack, isAnalyzing, finalizeAndAnalyze } = useQuiz();

  useEffect(() => {
    startNewQuiz('creativity', 12);
  }, []);

  if (!session || session.testType !== 'creativity') return <Loader fullScreen />;
  if (isAnalyzing) return <Loader fullScreen title="Unlocking Creative Potential..." />;

  const handleNext = async () => {
    if (session.currentIndex === session.questions.length - 1) {
      const result = await finalizeAndAnalyze();
      if (result) navigate(ROUTES.RESULTS);
    } else {
      goNext();
    }
  };

  const currentQuestion = session.questions[session.currentIndex];
  const currentAnswer = session.answers.find(a => a.questionId === currentQuestion?.id);

  return (
    <Layout>
      <Container>
        <QuizProgress current={session.currentIndex + 1} total={session.questions.length} />
        
        <Header>
          <Emoji>🎨</Emoji>
          <Title>Creativity Score</Title>
        </Header>

        {currentQuestion && (
          <div className="animate-in">
            <QuestionCard 
              question={currentQuestion} 
              questionNumber={session.currentIndex + 1}
              totalQuestions={session.questions.length}
            />
            <Options>
              {currentQuestion.options.map(opt => (
                <AnswerOption 
                  key={opt.id} 
                  option={opt} 
                  isSelected={currentAnswer?.optionId === opt.id}
                  onSelect={selectOption}
                />
              ))}
            </Options>
          </div>
        )}

        <Footer>
          <Button variant="secondary" onClick={goBack} disabled={session.currentIndex === 0}>Back</Button>
          <Button onClick={handleNext} disabled={!currentAnswer}>Next</Button>
        </Footer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  padding: 32px 20px;
  max-width: 500px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`text-align: center; margin-bottom: 24px;`;
const Emoji = styled.div`font-size: 32px;`;
const Title = styled.h2`color: ${({ theme }) => theme.colors.accent};`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
`;

export default CreativityTest;
