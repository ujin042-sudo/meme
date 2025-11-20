import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import QuestionForm from '../components/QuestionForm';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    resetToDefault,
    exportToJSON,
    importFromJSON
  } = useQuestions();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setEditingQuestion(null);
    setIsFormOpen(true);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleSave = (questionData) => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, questionData);
    } else {
      addQuestion(questionData);
    }
    setIsFormOpen(false);
    setEditingQuestion(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 이 질문을 삭제하시겠습니까?')) {
      deleteQuestion(id);
    }
  };

  const handleReset = () => {
    if (window.confirm('모든 질문을 기본값으로 초기화하시겠습니까? 현재 질문들은 모두 삭제됩니다.')) {
      resetToDefault();
      alert('기본 질문으로 초기화되었습니다!');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(file)
        .then(() => {
          alert('질문을 성공적으로 가져왔습니다!');
        })
        .catch((error) => {
          alert('파일을 가져오는데 실패했습니다: ' + error.message);
        });
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="header-top">
            <button className="back-button" onClick={() => navigate('/')}>
              ← 메인으로
            </button>
            <h1>🛠️ 질문 관리자</h1>
          </div>
          <p className="admin-subtitle">밈최몇 TEST의 질문을 자유롭게 편집하세요!</p>
        </div>

        {!isFormOpen ? (
          <>
            <div className="admin-controls">
              <div className="control-group">
                <input
                  type="text"
                  placeholder="질문 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="btn-add" onClick={handleAddNew}>
                  ➕ 새 질문 추가
                </button>
              </div>

              <div className="control-group">
                <button className="btn-export" onClick={exportToJSON}>
                  💾 JSON 내보내기
                </button>
                <label className="btn-import">
                  📂 JSON 가져오기
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    style={{ display: 'none' }}
                  />
                </label>
                <button className="btn-reset" onClick={handleReset}>
                  🔄 기본값으로 초기화
                </button>
              </div>
            </div>

            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-label">총 질문 수</span>
                <span className="stat-value">{questions.length}개</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">검색 결과</span>
                <span className="stat-value">{filteredQuestions.length}개</span>
              </div>
            </div>

            <div className="questions-list">
              {filteredQuestions.length === 0 ? (
                <div className="empty-state">
                  <p className="empty-emoji">🔍</p>
                  <p className="empty-text">
                    {searchTerm ? '검색 결과가 없습니다.' : '질문이 없습니다. 새 질문을 추가해보세요!'}
                  </p>
                </div>
              ) : (
                filteredQuestions.map((question, index) => (
                  <div key={question.id} className="question-item">
                    <div className="question-header-item">
                      <span className="question-number">#{index + 1}</span>
                      <span className="question-emoji-large">{question.emoji}</span>
                    </div>
                    
                    <div className="question-content">
                      <h3 className="question-title">{question.question}</h3>
                      
                      <div className="question-options">
                        {question.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`option-preview ${option.answer ? 'correct' : ''}`}
                          >
                            <span className="option-indicator">
                              {option.answer ? '✅' : '❌'}
                            </span>
                            <span className="option-text">{option.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="question-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(question)}
                      >
                        ✏️ 수정
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(question.id)}
                      >
                        🗑️ 삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <QuestionForm
            question={editingQuestion}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingQuestion(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
