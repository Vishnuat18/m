import React, { useState, useEffect, useCallback } from 'react';
import './Intro.css';

const VALID_PASSCODES = ['2211', '1204'];

const Intro = ({ onComplete, isMobile = false }) => {
  // App Workflow Stages:
  // 1. 'notice': For your eyes only - Watch Privately -> Use Headphones for Better Experience
  // 2. 'pin': Lock page (Passcode verification 2211 / 1204)
  // 3. (Mobile) -> Directly onComplete() to Home Screen (MobileBirthdayPhone)
  //    (Desktop) -> 'doors' -> 'opening' -> onComplete()
  const [stage, setStage] = useState('notice');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleVerify = useCallback(
    (codeToVerify) => {
      if (VALID_PASSCODES.includes(codeToVerify)) {
        setStatus('success');
        setErrMsg('');

        // On mobile view: no wooden door animation, transition directly to Mobile Phone Home screen!
        if (isMobile) {
          setTimeout(() => {
            onComplete();
          }, 350);
        } else {
          // Desktop: reveal 3D doors
          setTimeout(() => {
            setStage('doors');
          }, 450);
        }
      } else {
        setStatus('error');
        setErrMsg('Invalid Passcode Entry');
        setTimeout(() => {
          setPin('');
          setStatus('idle');
        }, 650);
      }
    },
    [isMobile, onComplete]
  );

  const handleProceedToLock = () => {
    setStage('pin');
  };

  const handleKeyClick = (val) => {
    if (stage !== 'pin' || status === 'success') return;

    if (val === 'clear') {
      setPin('');
      setStatus('idle');
      setErrMsg('');
      return;
    }

    if (val === 'verify') {
      if (pin.length === 4) {
        handleVerify(pin);
      } else {
        setStatus('error');
        setErrMsg('Enter 4 digits');
        setTimeout(() => setStatus('idle'), 600);
      }
      return;
    }

    if (pin.length < 4) {
      const nextPin = pin + String(val);
      setPin(nextPin);
      setStatus('idle');
      setErrMsg('');

      if (nextPin.length === 4) {
        setTimeout(() => handleVerify(nextPin), 150);
      }
    }
  };

  // Keyboard typing support for PIN
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stage !== 'pin' || status === 'success') return;

      if (e.key >= '0' && e.key <= '9') {
        handleKeyClick(e.key);
      } else if (e.key === 'Backspace') {
        setPin((prev) => prev.slice(0, -1));
        setStatus('idle');
        setErrMsg('');
      } else if (e.key === 'Enter') {
        handleKeyClick('verify');
      } else if (e.key === 'Escape') {
        handleKeyClick('clear');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, stage, status, handleKeyClick]);

  // Click on doors to trigger 3D swing opening animation (desktop only)
  const handleOpenDoors = () => {
    if (stage !== 'doors') return;
    setStage('opening');

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="intro-wrapper">
      {/* Ambient background glow */}
      <div className="intro-ambient-glow" aria-hidden="true" />

      {/* =========================================================================
          STAGE 1: FOR YOUR EYES ONLY - WATCH PRIVATELY & USE HEADPHONES PROMPT
          ========================================================================= */}
      {stage === 'notice' && (
        <div className="intro-notice-stage anim-fade-in">
          <div className="notice-card">
            {/* Top Pill Badge */}
            <div className="notice-badge">
              <span className="notice-badge-dot"></span>
              <span className="notice-badge-text">FOR YOUR EYES ONLY</span>
            </div>

            {/* Glowing Main Title */}
            <h1 className="notice-title anim-glow-text">
              Watch Privately
            </h1>

            {/* Animated Headphone Visual with Radiating Soundwaves */}
            <div className="headphone-visual-wrap">
              <div className="soundwave-ring ring-1"></div>
              <div className="soundwave-ring ring-2"></div>
              <div className="headphone-icon-circle">
                <svg
                  className="headphone-svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 36V30C12 18.954 20.954 10 32 10C43.046 10 52 18.954 52 30V36"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <rect x="8" y="34" width="11" height="19" rx="5.5" fill="currentColor" />
                  <rect x="45" y="34" width="11" height="19" rx="5.5" fill="currentColor" />
                  <rect x="19" y="37" width="3" height="13" rx="1.5" fill="rgba(255,255,255,0.4)" />
                  <rect x="42" y="37" width="3" height="13" rx="1.5" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>
            </div>

            {/* Subtext */}
            <p className="notice-subtext">
              Use headphones for a<br />better experience
            </p>

            {/* Tap to Begin CTA */}
            <button
              type="button"
              className="notice-begin-btn"
              onClick={handleProceedToLock}
            >
              <span>Tap to Begin</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 2: PIN LOCK PAGE (Passcode Verification Screen 2211 / 1204)
          ========================================================================= */}
      {stage === 'pin' && (
        <div
          className={`lock-stage anim-fade-in ${status === 'error' ? 'shake' : ''}`}
        >
          <div className="lock-security-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>SECURITY LOCK</span>
          </div>

          <h2 className="lock-title">VERIFICATION REQUIRED</h2>

          {/* 4-dot display */}
          <div className="pass-display">
            {[0, 1, 2, 3].map((idx) => {
              let dotClass = 'dot';
              if (idx < pin.length) dotClass += ' active';
              if (status === 'success') dotClass += ' success';
              if (status === 'error') dotClass += ' error';
              return <div key={idx} className={dotClass} />;
            })}
          </div>

          {/* 3x4 Keypad */}
          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                className="key"
                onClick={() => handleKeyClick(num)}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              className="key clear"
              onClick={() => handleKeyClick('clear')}
            >
              CLEAR
            </button>
            <button
              type="button"
              className="key"
              onClick={() => handleKeyClick(0)}
            >
              0
            </button>
            <button
              type="button"
              className="key verify"
              onClick={() => handleKeyClick('verify')}
            >
              BEGIN
            </button>
          </div>

          <div className="lock-err-msg">{errMsg}</div>
        </div>
      )}

      {/* =========================================================================
          STAGE 3: DOORS APPEAR AFTER PIN (Clean doors with NO text, Desktop only)
          ========================================================================= */}
      {!isMobile && (stage === 'doors' || stage === 'opening') && (
        <div
          className={`doors-stage visible ${stage === 'opening' ? 'opening' : ''}`}
          onClick={handleOpenDoors}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenDoors();
          }}
          aria-label="Click to open doors"
        >
          {/* Left 3D Door Panel - Clean, No Text */}
          <div className="door-panel left">
            <div className="door-surface" />
            <div className="door-handle" />
          </div>

          {/* Right 3D Door Panel - Clean, No Text */}
          <div className="door-panel right">
            <div className="door-surface" />
            <div className="door-handle" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
