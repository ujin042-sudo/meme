import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, onAnswer, currentQuestion, totalQuestions }) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-emoji">{question.emoji}</span>
        <span className="question-number">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onAnswer(option.answer)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
