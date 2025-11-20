import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import { calculateResult } from '../utils/calculateResult';
import { trackResultView } from '../utils/analytics';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;
  const result = calculateResult(score);

  useEffect(() => {
    // 점수가 없으면 시작 페이지로 리다이렉트
    if (score === undefined) {
      navigate('/');
      return;
    }
    
    trackResultView(result.grade);
  }, [score, result.grade, navigate]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="result-page" style={{ background: `linear-gradient(135deg, ${result.color}aa 0%, ${result.color}dd 100%)` }}>
      <div className="result-container">
        <div className="result-header">
          <h1 className="result-emoji">{result.grade.split(' ')[0]}</h1>
          <h2 className="result-grade">{result.grade}</h2>
          <p className="result-subtitle">{result.title}</p>
        </div>

        <div className="result-content">
          <div className="score-display">
            <span className="score-label">당신의 점수</span>
            <span className="score-value">{score} / 10</span>
          </div>

          <div className="result-info">
            <p className="result-description">{result.description}</p>

            {/* 특징 분석 섹션 */}
            <div className="analysis-section">
              <h3 className="section-title">
                <span className="section-emoji">📊</span>
                특징 분석
              </h3>
              <ul className="characteristics-list">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="characteristic-item">
                    <span className="bullet">•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* 솔루션 섹션 */}
            <div className="solution-section">
              <h3 className="section-title">
                <span className="section-emoji">💡</span>
                솔루션
              </h3>
              <ul className="solutions-list">
                {result.solutions.map((solution, index) => (
                  <li key={index} className="solution-item">
                    <span className="solution-number">{index + 1}</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ShareButton grade={result.grade} score={score} />

          <button className="retry-button" onClick={handleRetry}>
            <span className="button-emoji">🔄</span>
            다시 도전하기
          </button>

          <div className="result-footer">
            <p>💡 친구들과 함께 해보세요!</p>
            <p className="made-with">Made with 💜 by Vibe Coding</p>
          </div>
        </div>
      </div>

      <div className="confetti-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="confetti" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][Math.floor(Math.random() * 6)]
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
