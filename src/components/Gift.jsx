import React from 'react';
import './Gift.css';

const Gift = ({ onBack }) => {
  const handleOpenPhone = () => {
    window.location.href = '/birthday_trail_phone.html';
  };

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
        <div className="gift-badge">Special Surprise</div>
        <h2 className="gift-title">Maheswari's Birthday Phone</h2>
        <p className="gift-desc">
          "A personal smartphone trail packed with loving memories, photo moments, our story chapters, and riddles just for you. Keep smiling always, Ammu!"
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="gift-back-btn" onClick={handleOpenPhone} style={{ background: 'linear-gradient(135deg, #e5a93c, #ff9ffc)' }}>
            Open Birthday Phone &rarr;
          </button>
          <button className="gift-back-btn" onClick={onBack} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gift;
