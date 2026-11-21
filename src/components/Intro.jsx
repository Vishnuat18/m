import React, { useState, useEffect, useCallback } from 'react';
import './Intro.css';

const VALID_PASSCODES = ['2211', '1204'];

const Intro = ({ onComplete }) => {
  // Stages: 'pin' (only lock visible, static clean background) -> 'doors' (clean doors appear) -> 'opening' (swing open animation)
  const [stage, setStage] = useState('pin');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleVerify = useCallback((codeToVerify) => {
    if (VALID_PASSCODES.includes(codeToVerify)) {
      setStatus('success');
      setErrMsg('');

      // After success indication, reveal the 3D doors
      setTimeout(() => {
        setStage('doors');
      }, 450);
    } else {
      setStatus('error');
      setErrMsg('Invalid Passcode Entry');
      setTimeout(() => {
        setPin('');
        setStatus('idle');
      }, 650);
    }
  }, []);

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

  // Click on doors to trigger 3D swing opening animation
  const handleOpenDoors = () => {
    if (stage !== 'doors') return;
    setStage('opening');

    // After realistic 3D doors swing open, transition to Home screen
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="intro-wrapper">
      {/* =========================================================================
          STAGE 1: ONLY PIN LOCK (Clean, static background, NO animation)
          ========================================================================= */}
      <div
        className={`lock-stage ${stage !== 'pin' ? 'hidden' : ''} ${
          status === 'error' ? 'shake' : ''
        }`}
      >
        <h1 className="lock-title">VERIFICATION REQUIRED</h1>

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

      {/* =========================================================================
          STAGE 2: DOORS APPEAR AFTER PIN (Clean doors with NO text, Click to Open)
          ========================================================================= */}
      <div
        className={`doors-stage ${stage === 'doors' ? 'visible' : ''} ${
          stage === 'opening' ? 'visible opening' : ''
        }`}
        onClick={handleOpenDoors}
        role="button"
        tabIndex={stage === 'doors' ? 0 : -1}
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
    </div>
  );
};

export default Intro;
