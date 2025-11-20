import React, { useState, useEffect } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    question: '',
    emoji: '🤔',
    options: [
      { text: '', answer: true },
      { text: '', answer: false },
      { text: '', answer: false },
      { text: '', answer: false }
    ]
  });

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleEmojiChange = (e) => {
    setFormData({ ...formData, emoji: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleCorrectAnswerChange = (index) => {
    const newOptions = formData.options.map((opt, i) => ({
      ...opt,
      answer: i === index
    }));
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.question.trim()) {
      alert('질문을 입력해주세요!');
      return;
    }

    if (formData.options.some(opt => !opt.text.trim())) {
      alert('모든 선택지를 입력해주세요!');
      return;
    }

    if (!formData.options.some(opt => opt.answer)) {
      alert('정답을 하나 선택해주세요!');
      return;
    }

    onSave(formData);
  };

  const commonEmojis = ['🤔', '💬', '📢', '💼', '😤', '👍', '✨', '🧠', '💪', '🎤', '🔥', '💯', '🎯', '⭐', '💡', '🎉', '😎', '🤷', '💀', '🤣'];

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{question ? '질문 수정' : '새 질문 추가'}</h2>
      </div>

      <div className="form-group">
        <label>이모지</label>
        <div className="emoji-selector">
          <input
            type="text"
            value={formData.emoji}
            onChange={handleEmojiChange}
            className="emoji-input"
            maxLength="2"
          />
          <div className="emoji-presets">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className="emoji-btn"
                onClick={() => setFormData({ ...formData, emoji })}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>질문 *</label>
        <textarea
          value={formData.question}
          onChange={handleQuestionChange}
          placeholder="질문을 입력하세요..."
          rows="3"
          required
        />
      </div>

      <div className="form-group">
        <label>선택지 (정답 체크박스를 선택하세요) *</label>
        <div className="options-list">
          {formData.options.map((option, index) => (
            <div key={index} className="option-item">
              <input
                type="radio"
                name="correct-answer"
                checked={option.answer}
                onChange={() => handleCorrectAnswerChange(index)}
                className="correct-radio"
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`선택지 ${index + 1}`}
                required
                className="option-input"
              />
              <span className="option-label">
                {option.answer ? '✅ 정답' : '❌'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          취소
        </button>
        <button type="submit" className="btn-save">
          {question ? '수정 완료' : '추가하기'}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
