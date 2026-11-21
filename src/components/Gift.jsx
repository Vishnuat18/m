import React from 'react';
import './Gift.css';

const Gift = ({ onBack }) => {
  return (
    <div className="gift-container">
      <div className="gift-card">
        <div className="gift-icon-wrapper">
          <svg
            className="gift-main-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff9ffc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
        </div>
        <div className="gift-badge">Coming Soon</div>
        <h2 className="gift-title">A Special Surprise</h2>
        <p className="gift-desc">
          "A special surprise is being wrapped with all my love just for you. Keep smiling, Ammu — the best is yet to come!"
        </p>
        <button className="gift-back-btn" onClick={onBack}>
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default Gift;
