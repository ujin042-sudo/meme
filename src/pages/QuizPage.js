import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { useQuestions } from '../hooks/useQuestions';
import { trackNextQuestion } from '../utils/analytics';
import './QuizPage.css';

// 배열 섞기 함수 (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 랜덤으로 N개 선택 후 섞기
const getRandomQuestions = (allQuestions, count = 10) => {
  if (allQuestions.length === 0) return [];
  const actualCount = Math.min(count, allQuestions.length);
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, actualCount);
};

const QuizPage = () => {
  const navigate = useNavigate();
  const { questions: allQuestions } = useQuestions();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 랜덤 질문 10개 선택
  useEffect(() => {
    if (allQuestions.length === 0) {
      setIsLoading(true);
      return;
    }
    
    // 랜덤으로 10개 질문 선택
    const randomQuestions = getRandomQuestions(allQuestions, 10);
    
    if (randomQuestions.length === 0) {
      navigate('/');
      return;
    }
    
    setQuizQuestions(randomQuestions);
    setIsLoading(false);
  }, [allQuestions, navigate]); // allQuestions 전체를 의존성에 추가하여 변경 시 새 랜덤 질문 생성

  // 로딩 중일 때
  if (isLoading || quizQuestions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="loading-container">
            <div className="loading-spinner">🎲</div>
            <p className="quiz-tip">질문을 준비하고 있어요...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (isCorrect) => {
    if (isAnswering) return;
    
    setIsAnswering(true);

    // 정답이면 점수 추가
    if (isCorrect) {
      setScore(score + 1);
    }

    // 잠시 대기 후 다음 문제로 이동
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        trackNextQuestion(currentQuestionIndex + 2);
        setIsAnswering(false);
      } else {
        // 마지막 문제면 결과 페이지로 이동
        navigate('/result', { state: { score: isCorrect ? score + 1 : score } });
      }
    }, 500);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={totalQuestions} 
        />
        
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        <div className="quiz-footer">
          <p className="quiz-tip">💡 천천히 읽고 답변해주세요!</p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
