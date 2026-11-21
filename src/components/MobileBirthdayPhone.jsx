import React, { useState, useEffect, useRef } from 'react';
import './MobileBirthdayPhone.css';

// Sound effects generator via Web Audio API (zero external files required)
const playSound = (type = 'click') => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25); // C6
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } else if (type === 'step') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch (e) {}
};

// Safe trigger for canvas confetti
const triggerConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    try {
      window.confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff9ffc', '#e5a93c', '#38bdf8', '#c084fc', '#ffffff']
      });
    } catch (e) {}
  }
};

const MobileBirthdayPhone = ({ onSelectSection }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [currentTime, setCurrentTime] = useState('23:56');

  // Clock state
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Handle opening an app
  const handleOpenApp = (appId) => {
    playSound('click');
    if (appId === 'scrapbook') {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch (e) {}
      onSelectSection('sketchbook');
    } else if (appId === 'diary') {
      onSelectSection('story');
    } else {
      setActiveModal(appId);
    }
  };

  const closeModal = () => {
    playSound('click');
    setActiveModal(null);
  };

  /* =========================================================================
     ARROW GAME STATE (Attachment 1: 3x3 Grid + Sequence of 8 Arrows)
     Grid: 3x3 (indices 0..2 for row and col)
     Sequence:
       Start: (0,0)
       1. → (0,1)
       2. ↓ (1,1)
       3. ↗ (0,2)
       4. ↓ (1,2)
       5. ↓ (2,2)
       6. ← (2,1)
       7. ← (2,0)
       8. ↑ (1,0)
     ========================================================================= */
  const arrowSteps = [
    { dir: '→', r: 0, c: 1, name: 'Right' },
    { dir: '↓', r: 1, c: 1, name: 'Down' },
    { dir: '↗', r: 0, c: 2, name: 'Up-Right' },
    { dir: '↓', r: 1, c: 2, name: 'Down' },
    { dir: '↓', r: 2, c: 2, name: 'Down' },
    { dir: '←', r: 2, c: 1, name: 'Left' },
    { dir: '←', r: 2, c: 0, name: 'Left' },
    { dir: '↑', r: 1, c: 0, name: 'Up' },
  ];

  const [arrowStepIndex, setArrowStepIndex] = useState(0);
  const [visitedCells, setVisitedCells] = useState([[0, 0]]);
  const [gameWon, setGameWon] = useState(false);

  const resetArrowGame = () => {
    setArrowStepIndex(0);
    setVisitedCells([[0, 0]]);
    setGameWon(false);
    playSound('click');
  };

  const handleArrowStep = (stepIdx) => {
    if (gameWon) return;
    if (stepIdx === arrowStepIndex) {
      playSound('step');
      const nextStep = arrowSteps[stepIdx];
      const nextVisited = [...visitedCells, [nextStep.r, nextStep.c]];
      setVisitedCells(nextVisited);

      if (stepIdx + 1 >= arrowSteps.length) {
        setGameWon(true);
        playSound('success');
        triggerConfetti();
      } else {
        setArrowStepIndex(stepIdx + 1);
      }
    }
  };

  const handleCellClick = (r, c) => {
    if (gameWon) return;
    const target = arrowSteps[arrowStepIndex];
    if (target && target.r === r && target.c === c) {
      handleArrowStep(arrowStepIndex);
    } else {
      playSound('click');
    }
  };

  /* =========================================================================
     MESSAGES APP STATE
     ========================================================================= */
  const [messagesList, setMessagesList] = useState([
    { sender: 'vishnu', text: 'Happy Birthday Maheswari! Wishing you the happiest and most magical day ever!', time: '10:00 AM' },
    { sender: 'vishnu', text: 'I built this special digital universe just for you to celebrate every wonderful memory.', time: '10:01 AM' },
    { sender: 'vishnu', text: 'Looking up at the same sky with you... always.', time: '10:02 AM' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (msgText) => {
    playSound('click');
    const newMsg = { sender: 'ammu', text: msgText, time: currentTime };
    setMessagesList((prev) => [...prev, newMsg]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      playSound('success');
      let reply = 'Always and forever by your side, Ammu!';
      if (msgText.includes('sky')) {
        reply = 'Under the same sky, our hearts are always connected.';
      } else if (msgText.includes('Thank')) {
        reply = 'You deserve all the love, happiness, and peace in the world!';
      }
      setMessagesList((prev) => [
        ...prev,
        { sender: 'vishnu', text: reply, time: currentTime }
      ]);
    }, 1200);
  };

  /* =========================================================================
     PHONE DIALER STATE
     ========================================================================= */
  const [dialNumber, setDialNumber] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (callActive) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const handleDialDigit = (digit) => {
    playSound('click');
    if (dialNumber.length < 10) {
      setDialNumber((prev) => prev + digit);
    }
  };

  const handleStartCall = () => {
    playSound('success');
    setCallActive(true);
  };

  const handleEndCall = () => {
    playSound('click');
    setCallActive(false);
  };

  /* =========================================================================
     CALCULATOR STATE (Secret Passcode: 2211 or 1204)
     ========================================================================= */
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcSecret, setCalcSecret] = useState(null);

  const handleCalcBtn = (btn) => {
    playSound('click');
    if (btn === 'C') {
      setCalcDisplay('0');
      setCalcSecret(null);
      return;
    }
    if (btn === '=') {
      if (calcDisplay === '2211' || calcDisplay === '1204') {
        playSound('success');
        triggerConfetti();
        setCalcSecret('Passcode 2211: "Vishnu loves you to infinity and beyond, Ammu!"');
        return;
      }
      try {
        // Safe evaluation for simple basic math
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(res));
      } catch (e) {
        setCalcDisplay('Error');
      }
      return;
    }

    setCalcDisplay((prev) => {
      if (prev === '0' || prev === 'Error') return String(btn);
      return prev + String(btn);
    });
  };

  /* =========================================================================
     GALLERY PHOTOS
     ========================================================================= */
  const galleryPhotos = [
    { src: '/assets/pose-01.png', caption: 'Looking up at the same sky with you... always' },
    { src: '/assets/pose-02.png', caption: 'The most radiant smile that brightens every day' },
    { src: '/assets/pose-03.png', caption: 'Deep thoughts and gentle grace' },
    { src: '/assets/pose-04.png', caption: 'Celebrating your kindness, joy and warmth' },
    { src: '/assets/scrapbook/slot-1.jpg', caption: 'Cherished memories and timeless milestones' },
    { src: '/assets/scrapbook/slot-2.jpg', caption: 'Laughter captured through the years' },
    { src: '/assets/scrapbook/slot-3.jpg', caption: 'Golden moments that will never fade' },
    { src: '/assets/scrapbook/slot-4.jpg', caption: 'Every smile tells our beautiful story' },
  ];
  const [lightboxImg, setLightboxImg] = useState(null);

  /* =========================================================================
     INGRAM (INSTAGRAM) APP STATE
     ========================================================================= */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(22110);

  const toggleLike = () => {
    playSound('success');
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      triggerConfetti();
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  return (
    <div className="mobile-phone-stage">
      <div className="mobile-phone-body">
        {/* =====================================================================
            1. TOP STATUS BAR (Native iOS Phone Look)
            ===================================================================== */}
        <header className="phone-top-bar" aria-label="Status Bar">
          <div className="status-time">{currentTime}</div>
          <div className="status-carrier">Maheswari</div>
          <div className="status-icons">
            {/* 5G Signal */}
            <svg className="stat-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.2.2-.2.51 0 .71.1.1.23.15.35.15s.26-.05.35-.15l1.83-1.83C8.34 19.39 10.1 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            {/* Wifi */}
            <svg className="stat-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.5 0 6.69 1.34 9.12 3.53L12 19.42 2.88 11.03C5.31 8.84 8.5 7.5 12 7.5z"/>
            </svg>
            {/* Battery 100% */}
            <div className="battery-pill">
              <div className="battery-level" />
            </div>
          </div>
        </header>

        {/* =====================================================================
            2. GREETING HEADER
            ===================================================================== */}
        <div className="phone-hero-header">
          <div className="hero-celebration-pill">A SPECIAL BIRTHDAY CELEBRATION</div>
          <h1 className="hero-main-title">Happy Birthday Maheswari</h1>
          <p className="hero-subtext">Handcrafted with love for Ammu</p>
        </div>

        {/* =====================================================================
            3. 8-APP MAIN GRID (2 Rows of 4 Apps - Clean, Workable, Non-overlapping)
            ===================================================================== */}
        <main className="phone-app-grid" aria-label="Applications">
          {/* 1. Scrapbook */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('scrapbook')}
            aria-label="Open Scrapbook"
          >
            <div className="app-squircle bg-scrapbook">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                <path d="M8 7h8m-8 4h5"/>
              </svg>
            </div>
            <span className="app-text">Scrapbook</span>
          </button>

          {/* 2. Diary (Notes) */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('diary')}
            aria-label="Open Diary Notes"
          >
            <div className="app-squircle bg-diary">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span className="app-text">Diary(Notes)</span>
          </button>

          {/* 3. Gallery */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('gallery')}
            aria-label="Open Photo Gallery"
          >
            <div className="app-squircle bg-gallery">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <span className="app-text">Gallery</span>
          </button>

          {/* 4. Ingram (Instagram Feed) */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('ingram')}
            aria-label="Open Ingram Feed"
          >
            <div className="app-squircle bg-ingram">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <span className="app-text">Ingram</span>
          </button>

          {/* 5. Make Arrow game */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('arrowGame')}
            aria-label="Open Make Arrow Game"
          >
            <div className="app-squircle bg-arrowgame">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="12 8 8 12 12 16 12 8"/>
                <line x1="12" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <span className="app-text">Make Arrow</span>
          </button>

          {/* 6. Calculator */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('calculator')}
            aria-label="Open Calculator"
          >
            <div className="app-squircle bg-calc">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <line x1="8" y1="6" x2="16" y2="6"/>
                <line x1="16" y1="14" x2="16" y2="18"/>
                <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/>
              </svg>
            </div>
            <span className="app-text">Calculator</span>
          </button>

          {/* 7. Settings */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('settings')}
            aria-label="Open Settings"
          >
            <div className="app-squircle bg-settings">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <span className="app-text">Settings</span>
          </button>

          {/* 8. Special Gift */}
          <button
            type="button"
            className="app-item-btn"
            onClick={() => handleOpenApp('gift')}
            aria-label="Open Special Gift"
          >
            <div className="app-squircle bg-gift">
              <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="4" rx="1"/>
                <path d="M12 8v13"/>
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
              </svg>
            </div>
            <span className="app-text">Special Gift</span>
          </button>
        </main>

        {/* =====================================================================
            4. SKY TRIBUTE CARD (Attachment 8: Looking Up at the Same Sky With You)
            ===================================================================== */}
        <section className="phone-quote-widget" aria-label="Dedication">
          <div className="quote-pose-wrap">
            <img
              src="/assets/pose-01.png"
              alt="Maheswari looking up"
              className="quote-pose-img"
              onError={(e) => {
                e.target.src = 'assets/pose-01.png';
              }}
            />
          </div>
          <div className="quote-bubble">
            <p className="bubble-text">
              &ldquo;Looking up at the same sky with you... always.&rdquo;
            </p>
            <span className="bubble-author">&mdash; VISHNU</span>
          </div>
        </section>

        {/* =====================================================================
            5. BOTTOM FLOATING GLASS DOCK (Messages, Phone, Mail, Browser)
            ===================================================================== */}
        <footer className="phone-bottom-dock" aria-label="Phone Dock">
          {/* Phone */}
          <button
            type="button"
            className="dock-item-btn"
            onClick={() => handleOpenApp('phone')}
            aria-label="Open Phone Dialer"
          >
            <div className="dock-squircle bg-phone">
              <svg className="dock-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
          </button>

          {/* Messages */}
          <button
            type="button"
            className="dock-item-btn"
            onClick={() => handleOpenApp('messages')}
            aria-label="Open Messages"
          >
            <div className="dock-squircle bg-messages">
              <svg className="dock-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
            </div>
          </button>

          {/* Mail */}
          <button
            type="button"
            className="dock-item-btn"
            onClick={() => handleOpenApp('mail')}
            aria-label="Open Mail Letter"
          >
            <div className="dock-squircle bg-mail">
              <svg className="dock-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </button>

          {/* Browser */}
          <button
            type="button"
            className="dock-item-btn"
            onClick={() => handleOpenApp('browser')}
            aria-label="Open Browser"
          >
            <div className="dock-squircle bg-browser">
              <svg className="dock-svg" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="12 8 8 16 16 12 12 8"/>
              </svg>
            </div>
          </button>
        </footer>
      </div>

      {/* =========================================================================
          6. MODALS FOR WORKABLE APPS (High fidelity, full screen overlays)
          ========================================================================= */}

      {/* MODAL 1: MAKE ARROW GAME (Attachment 1: 3x3 Grid + Sequence of 8 Arrows) */}
      {activeModal === 'arrowGame' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-arrow">
            <h2>Make Arrow Game</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body arrow-game-body">
            <div className="game-intro-card">
              <p className="game-instruction">
                Follow the 8-arrow trail across the 3x3 grid to unlock the path to Vishnu's heart!
              </p>
            </div>

            {/* Attachment 1 Representation: 3x3 Grid */}
            <div className="arrow-grid-3x3">
              {[0, 1, 2].map((r) => (
                <div key={r} className="grid-row">
                  {[0, 1, 2].map((c) => {
                    const isVisited = visitedCells.some(([vr, vc]) => vr === r && vc === c);
                    const isStart = r === 0 && c === 0;
                    const isCurrentTarget = !gameWon && arrowSteps[arrowStepIndex]?.r === r && arrowSteps[arrowStepIndex]?.c === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        className={`grid-cell ${isVisited ? 'visited' : ''} ${isStart ? 'start-cell' : ''} ${isCurrentTarget ? 'pulse-target' : ''}`}
                        onClick={() => handleCellClick(r, c)}
                        aria-label={`Cell ${r}, ${c}`}
                      >
                        {isStart && <span className="cell-dot">●</span>}
                        {isVisited && !isStart && <span className="cell-sparkle">★</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Sequence of 8 Arrows Display (Matching Attachment 1) */}
            <div className="arrow-sequence-row" aria-label="Arrow Sequence">
              {arrowSteps.map((step, idx) => {
                const isPassed = idx < arrowStepIndex || gameWon;
                const isCurrent = idx === arrowStepIndex && !gameWon;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`seq-arrow-btn ${isPassed ? 'passed' : ''} ${isCurrent ? 'active' : ''}`}
                    onClick={() => handleArrowStep(idx)}
                    aria-label={`Step ${idx + 1}: ${step.name}`}
                  >
                    <span className="arrow-char">{step.dir}</span>
                  </button>
                );
              })}
            </div>

            {/* Victory banner */}
            {gameWon ? (
              <div className="game-victory-card">
                <div className="victory-heart">♥</div>
                <h3 className="victory-title">Path Completed!</h3>
                <p className="victory-text">
                  &ldquo;No matter which direction we take in life, every road leads straight to your heart. Happy Birthday Maheswari!&rdquo;
                </p>
                <button type="button" className="game-reset-btn" onClick={resetArrowGame}>
                  Play Again
                </button>
              </div>
            ) : (
              <p className="step-hint-text">
                Tap the next glowing arrow or cell: Step {arrowStepIndex + 1} of 8 ({arrowSteps[arrowStepIndex]?.name})
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: INGRAM (INSTAGRAM FEED) */}
      {activeModal === 'ingram' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-ingram">
            <h2>Ingram &bull; @maheswari_birthday</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body ingram-body">
            {/* Profile Stories Row */}
            <div className="ingram-stories">
              {['Celebration', 'Memories', 'Ammu', 'Smile', 'Forever'].map((story, i) => (
                <div key={i} className="story-item">
                  <div className="story-ring">
                    <div className="story-avatar">★</div>
                  </div>
                  <span className="story-label">{story}</span>
                </div>
              ))}
            </div>

            {/* Instagram Post */}
            <article className="ingram-post-card">
              <div className="post-header">
                <div className="post-avatar">M</div>
                <div className="post-meta">
                  <span className="post-user">maheswari_birthday</span>
                  <span className="post-sub">Special Birthday Edition</span>
                </div>
              </div>

              <div className="post-image-wrap" onDoubleClick={toggleLike}>
                <img
                  src="/assets/pose-04.png"
                  alt="Maheswari Birthday Pose"
                  className="post-main-img"
                  onError={(e) => {
                    e.target.src = 'assets/pose-04.png';
                  }}
                />
              </div>

              <div className="post-actions-row">
                <button type="button" className={`action-heart-btn ${liked ? 'liked' : ''}`} onClick={toggleLike}>
                  ♥
                </button>
                <span className="like-counter">{likeCount.toLocaleString()} likes</span>
              </div>

              <div className="post-caption-block">
                <p>
                  <strong>vishnu:</strong> Celebrating the most precious day for the most wonderful person in the world. May your smile always illuminate our universe. Happy Birthday Ammu!
                </p>
                <div className="post-tags">#HappyBirthdayMaheswari #OurStory #SpecialDay</div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* MODAL 3: GALLERY */}
      {activeModal === 'gallery' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-gallery">
            <h2>Photo Gallery</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body gallery-body">
            <div className="gallery-masonry-grid">
              {galleryPhotos.map((item, idx) => (
                <div
                  key={idx}
                  className="gallery-thumb-card"
                  onClick={() => setLightboxImg(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setLightboxImg(item);
                  }}
                >
                  <img src={item.src} alt={item.caption} className="thumb-img" />
                  <div className="thumb-caption">{item.caption}</div>
                </div>
              ))}
            </div>

            {lightboxImg && (
              <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
                <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
                  <img src={lightboxImg.src} alt={lightboxImg.caption} className="lightbox-img" />
                  <p className="lightbox-text">{lightboxImg.caption}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: MESSAGES */}
      {activeModal === 'messages' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-messages">
            <div className="chat-header-user">
              <span className="user-dot">●</span>
              <h2>Vishnu</h2>
            </div>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body messages-body">
            <div className="messages-stream">
              {messagesList.map((msg, i) => (
                <div key={i} className={`chat-bubble-row ${msg.sender}`}>
                  <div className={`chat-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble-row vishnu">
                  <div className="chat-bubble typing">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick reply chips */}
            <div className="quick-reply-dock">
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleSendMessage('Thank you so much Vishnu!')}
              >
                Thank you Vishnu!
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleSendMessage('Looking up at the same sky!')}
              >
                Looking up at the sky!
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleSendMessage('This birthday is so special!')}
              >
                Best Birthday Ever!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: PHONE DIALER */}
      {activeModal === 'phone' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-phone">
            <h2>Phone &bull; Keypad</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body phone-dialer-body">
            {callActive ? (
              <div className="in-call-screen">
                <div className="call-avatar-pulse">V</div>
                <h3 className="call-name">Vishnu</h3>
                <p className="call-status">Connected ({String(Math.floor(callTimer / 60)).padStart(2, '0')}:{String(callTimer % 60).padStart(2, '0')})</p>
                <div className="call-transcript-card">
                  <p>&ldquo;Happy Birthday Ammu! Hearing your voice is my favorite thing. Keep that lovely smile shining all year long!&rdquo;</p>
                </div>
                <button type="button" className="call-end-btn" onClick={handleEndCall}>
                  End Call
                </button>
              </div>
            ) : (
              <div className="dialer-screen">
                <div className="dial-display">
                  {dialNumber || <span className="dial-placeholder">Speed Dial: 2211</span>}
                </div>
                <div className="keypad-matrix">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                    <button key={k} type="button" className="num-key" onClick={() => handleDialDigit(k)}>
                      {k}
                    </button>
                  ))}
                </div>
                <div className="dial-action-row">
                  <button type="button" className="dial-call-btn" onClick={handleStartCall}>
                    Call Vishnu
                  </button>
                  {dialNumber && (
                    <button type="button" className="dial-backspace" onClick={() => setDialNumber((d) => d.slice(0, -1))}>
                      ⌫
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 6: MAIL */}
      {activeModal === 'mail' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-mail">
            <h2>Mail &bull; Inbox</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body mail-body">
            <article className="love-letter-parchment">
              <div className="letter-header">
                <div><strong>From:</strong> Vishnu &lt;vishnu@heart.com&gt;</div>
                <div><strong>To:</strong> Maheswari &lt;ammu@love.com&gt;</div>
                <div><strong>Subject:</strong> Happy Birthday to the Light of My Life</div>
              </div>
              <div className="letter-divider" />
              <div className="letter-content">
                <p>Dearest Maheswari,</p>
                <p>
                  Today is the most special day because it brought you into this world. Every single moment shared with you is a blessing that I hold close to my heart.
                </p>
                <p>
                  I hope this birthday brings you limitless joy, peace of mind, and the fulfillment of every dream you have ever wished upon a star.
                </p>
                <p>
                  No matter how far the sky stretches, remember that you are deeply cherished, respected, and loved beyond words.
                </p>
                <p className="letter-signature">
                  Yours always,<br />
                  <strong>Vishnu</strong>
                </p>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* MODAL 7: CALCULATOR */}
      {activeModal === 'calculator' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-calc">
            <h2>Calculator</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body calc-body">
            <div className="calc-screen-box">
              <div className="calc-value">{calcDisplay}</div>
            </div>
            {calcSecret && <div className="calc-secret-alert">{calcSecret}</div>}
            <div className="calc-pad-grid">
              {['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                <button
                  key={btn}
                  type="button"
                  className={`calc-btn ${btn === '=' ? 'btn-equals' : ''} ${['/', '*', '-', '+'].includes(btn) ? 'btn-op' : ''}`}
                  onClick={() => handleCalcBtn(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
            <p className="calc-hint">Tip: Enter passcode 2211 or 1204 and tap =</p>
          </div>
        </div>
      )}

      {/* MODAL 8: BROWSER */}
      {activeModal === 'browser' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-browser">
            <div className="browser-url-pill">https://maheswari.love</div>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body browser-body">
            <div className="browser-page-card">
              <div className="starry-banner">
                <span className="star-icon">★</span>
                <h3>Vishnu &amp; Maheswari</h3>
                <span className="star-icon">★</span>
              </div>
              <p className="browser-dedication">
                Welcome to our eternal constellation. Every star in this sky represents a wish made for your happiness, good health, and success.
              </p>
              <div className="browser-metrics">
                <div className="metric-box">
                  <div className="num">22</div>
                  <div className="lbl">Memories</div>
                </div>
                <div className="metric-box">
                  <div className="num">&infin;</div>
                  <div className="lbl">Love</div>
                </div>
                <div className="metric-box">
                  <div className="num">100%</div>
                  <div className="lbl">Smiles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 9: SETTINGS */}
      {activeModal === 'settings' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-settings">
            <h2>Settings</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body settings-body">
            <div className="settings-group">
              <div className="settings-row">
                <span>Sound &amp; Haptics</span>
                <span className="setting-val">Enabled</span>
              </div>
              <div className="settings-row">
                <span>Passcode Lock</span>
                <span className="setting-val">Active (2211)</span>
              </div>
              <div className="settings-row">
                <span>Display Theme</span>
                <span className="setting-val">Deep Romantic Night</span>
              </div>
            </div>

            <div className="settings-group">
              <div className="settings-row">
                <span>Device</span>
                <span className="setting-val">Maheswari Special Phone</span>
              </div>
              <div className="settings-row">
                <span>Owner</span>
                <span className="setting-val">Maheswari (Ammu)</span>
              </div>
              <div className="settings-row">
                <span>Developer</span>
                <span className="setting-val">Vishnu</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 10: SPECIAL GIFT */}
      {activeModal === 'gift' && (
        <div className="app-modal-overlay">
          <div className="app-modal-header bg-modal-gift">
            <h2>Special Gift</h2>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
          </div>
          <div className="app-modal-body gift-modal-body">
            <div className="gift-box-visual">
              <svg className="gift-big-svg" viewBox="0 0 24 24" fill="none" stroke="#e5a93c" strokeWidth="1.5">
                <rect x="3" y="8" width="18" height="4" rx="1"/>
                <path d="M12 8v13"/>
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
              </svg>
            </div>
            <h3 className="gift-modal-title">A Heartfelt Surprise</h3>
            <p className="gift-modal-text">
              &ldquo;May your day be filled with warm sunshine, endless laughter, and all the love in the universe. Happy Birthday Ammu!&rdquo;
            </p>
            <button
              type="button"
              className="gift-confetti-btn"
              onClick={() => {
                playSound('success');
                triggerConfetti();
              }}
            >
              Celebrate &bull; Shower Confetti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileBirthdayPhone;
