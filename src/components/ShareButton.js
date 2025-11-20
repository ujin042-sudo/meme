import React from 'react';
import { trackShareClick } from '../utils/analytics';
import './ShareButton.css';

const ShareButton = ({ grade, score }) => {
  const shareText = `나는 ${grade}! 밈최몇 TEST에서 ${score}점을 받았어요! 🎉\n당신은 몇 점?`;
  const shareUrl = window.location.origin;

  // Web Share API 지원 여부 확인
  const canUseWebShare = () => {
    return navigator.share !== undefined;
  };

  // 브라우저 네이티브 공유 (Web Share API)
  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: '밈최몇 TEST 결과',
        text: shareText,
        url: shareUrl
      });
      trackShareClick('native');
    } catch (err) {
      // 사용자가 취소했거나 오류 발생 시 무시
      if (err.name !== 'AbortError') {
        console.error('공유 실패:', err);
        // 실패 시 링크 복사로 폴백
        handleCopyLink();
      }
    }
  };

  const handleCopyLink = () => {
    const textToCopy = `${shareText}\n${shareUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('링크가 복사되었습니다! 🎉');
      trackShareClick('copy');
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  };

  return (
    <div className="share-container">
      <h3 className="share-title">친구들에게 공유하기 ✨✨</h3>
      <div className="share-buttons">
        {canUseWebShare() && (
          <button 
            className="share-btn native"
            onClick={handleNativeShare}
            title="브라우저 공유 기능 사용"
          >
            <span className="share-icon">📤</span>
            공유하기
          </button>
        )}
        <button 
          className="share-btn copy"
          onClick={handleCopyLink}
        >
          <span className="share-icon">🔗</span>
          링크복사
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
