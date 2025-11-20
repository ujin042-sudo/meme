import { useState, useEffect } from 'react';
import { questions as defaultQuestions } from '../data/questions';

const STORAGE_KEY = 'meme_test_questions';

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
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, count);
};

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);

  // 초기 로드: LocalStorage에서 질문 불러오기
  useEffect(() => {
    const savedQuestions = localStorage.getItem(STORAGE_KEY);
    if (savedQuestions) {
      try {
        setQuestions(JSON.parse(savedQuestions));
      } catch (error) {
        console.error('Failed to load questions:', error);
        setQuestions(defaultQuestions);
      }
    } else {
      // 저장된 질문이 없으면 기본 질문 사용
      setQuestions(defaultQuestions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuestions));
    }
  }, []);

  // 질문 저장
  const saveQuestions = (newQuestions) => {
    setQuestions(newQuestions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuestions));
  };

  // 질문 추가
  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
    };
    const updatedQuestions = [...questions, newQuestion];
    saveQuestions(updatedQuestions);
    return newQuestion;
  };

  // 질문 수정
  const updateQuestion = (id, updatedQuestion) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, ...updatedQuestion } : q
    );
    saveQuestions(updatedQuestions);
  };

  // 질문 삭제
  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    saveQuestions(updatedQuestions);
  };

  // 질문 순서 변경
  const reorderQuestions = (startIndex, endIndex) => {
    const result = Array.from(questions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveQuestions(result);
  };

  // 기본 질문으로 초기화
  const resetToDefault = () => {
    saveQuestions(defaultQuestions);
  };

  // JSON 내보내기
  const exportToJSON = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'questions.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // JSON 가져오기
  const importFromJSON = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            saveQuestions(imported);
            resolve(imported);
          } else {
            reject(new Error('Invalid JSON format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  // 랜덤 질문 가져오기 (퀴즈용)
  const getRandomizedQuestions = (count = 10) => {
    return getRandomQuestions(questions, count);
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    resetToDefault,
    exportToJSON,
    importFromJSON,
    getRandomizedQuestions
  };
};
