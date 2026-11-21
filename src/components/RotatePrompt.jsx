import React from 'react';
import './RotatePrompt.css';

const RotatePrompt = ({ onBypass }) => {
  return (
    <div className="rotate-prompt-overlay" role="dialog" aria-modal="true" aria-label="Rotate device prompt">
      <div className="rotate-icon-wrapper">
        <svg
          className="rotating-phone"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#phone-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5227FF" />
              <stop offset="50%" stopColor="#FF9FFC" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
          <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2.5" />
          <path d="M9 5h6" />
        </svg>
      </div>

      <h2 className="rotate-prompt-title">Rotate your phone</h2>
      <p className="rotate-prompt-text">
        Please rotate your phone to landscape to use the Sketchbook.
      </p>

      {onBypass && (
        <button className="rotate-bypass-btn" onClick={onBypass}>
          Continue in portrait anyway
        </button>
      )}
    </div>
  );
};

export default RotatePrompt;
