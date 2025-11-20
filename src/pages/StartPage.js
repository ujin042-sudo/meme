import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackStartClick } from '../utils/analytics';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    trackStartClick();
    navigate('/quiz');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <button className="admin-link" onClick={handleAdmin}>
          🛠️ 관리자
        </button>

        <div className="start-emoji-banner">
          <span className="floating-emoji">💀</span>
          <span className="floating-emoji delay-1">🍼</span>
          <span className="floating-emoji delay-2">💅</span>
          <span className="floating-emoji delay-3">🤖</span>
        </div>

        <h1 className="start-title">
          밈최몇 TEST
          <span className="subtitle">How Meme Are You?</span>
        </h1>

        <div className="start-description">
          <p>🔥 요즘 유행하는 밈, 얼마나 알고 계신가요?</p>
          <p>10개의 질문으로 당신의 밈 지식을 테스트해보세요!</p>
        </div>

        <div className="info-boxes">
          <div className="info-box">
            <span className="info-emoji">⏱️</span>
            <span className="info-text">소요시간: 2분</span>
          </div>
          <div className="info-box">
            <span className="info-emoji">📝</span>
            <span className="info-text">문항수: 10개</span>
          </div>
        </div>

        <button className="start-button" onClick={handleStart}>
          <span className="button-emoji">💀</span>
          밈최몇 TEST 시작하기
          <span className="button-emoji">💀</span>
        </button>

        <div className="warning-text">
          ⚠️ 진지한 사람은 금지! 밈을 즐기는 마음으로 해주세요 ⚠️
        </div>
      </div>
    </div>
  );
};

export default StartPage;
