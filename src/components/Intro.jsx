import React, { useState, useEffect, useCallback } from 'react';
import './Intro.css';

const VALID_PASSCODES = ['2211', '1204'];

const Intro = ({ onComplete, isMobile = false }) => {
  // App Workflow Stages:
  // 1. 'view1': Separate page (view1.png) hold for 3 seconds ->
  // 2. 'view2': Separate page (view2.png) hold for 3 seconds ->
  // 3. 'pin': Lock page (Passcode verification 2211 / 1204) ->
  // 4. (Mobile) -> Directly onComplete() to Home Screen (MobileBirthdayPhone)
  //    (Desktop) -> 'doors' -> 'opening' -> onComplete()
  const [stage, setStage] = useState('view1');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [errMsg, setErrMsg] = useState('');

  // 3-second hold timer for view1 and view2
  useEffect(() => {
    if (stage === 'view1') {
      const timer = setTimeout(() => {
        setStage('view2');
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (stage === 'view2') {
      const timer = setTimeout(() => {
        setStage('pin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

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
      {/* Ambient background glow for pin / doors stage */}
      {stage !== 'view1' && stage !== 'view2' && (
        <div className="intro-ambient-glow" aria-hidden="true" />
      )}

      {/* =========================================================================
          STAGE 1: FOR YOUR EYES ONLY - WATCH PRIVATELY (view1.png) - HOLD 3s
          ========================================================================= */}
      {stage === 'view1' && (
        <div
          className="workflow-view-stage"
          onClick={() => setStage('view2')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setStage('view2');
          }}
          aria-label="Screen 1: For your eyes only - Watch Privately"
        >
          <img
            src="/view1.png"
            alt="For your eyes only - Watch Privately"
            className="workflow-view-img"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 2: USE HEADPHONES FOR BETTER EXPERIENCE (view2.png) - HOLD 3s
          ========================================================================= */}
      {stage === 'view2' && (
        <div
          className="workflow-view-stage"
          onClick={() => setStage('pin')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setStage('pin');
          }}
          aria-label="Screen 2: Use headphones for a better experience"
        >
          <img
            src="/view2.png"
            alt="Use headphones for a better experience"
            className="workflow-view-img"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 3: PIN LOCK PAGE (Passcode Verification Screen 2211 / 1204)
          ========================================================================= */}
      {stage === 'pin' && (
        <div
          className={`lock-stage ${status === 'error' ? 'shake' : ''}`}
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
          STAGE 4 (DESKTOP ONLY): DOORS APPEAR AFTER PIN
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
