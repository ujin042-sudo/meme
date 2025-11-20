import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-text">{current} / {total}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
