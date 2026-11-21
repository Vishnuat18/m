import React, { useState, useEffect, useRef } from 'react';
import './DeskBuddy.css';

const REACTION_SLIDES = [
  {
    image: '/assets/pose-01.png',
    fallback: '/assets/pose-01.jpg',
    message: "Looking up at the same sky with you..."
  },
  {
    image: '/assets/pose-02.png',
    fallback: '/assets/pose-02.jpg',
    message: "Caught you looking! Always keep smiling!"
  },
  {
    image: '/assets/pose-03.png',
    fallback: '/assets/pose-03.jpg',
    message: "Thinking about all our sweetest memories..."
  },
  {
    image: '/assets/pose-04.png',
    fallback: '/assets/pose-04.jpg',
    message: "Always grateful to have you in my life, Ammu."
  },
  {
    image: '/assets/pose-05.png',
    fallback: '/assets/pose-05.jpg',
    message: "Aww... You always know how to make my day!"
  },
  {
    image: '/assets/pose-06.png',
    fallback: '/assets/pose-06.jpg',
    message: "Sending you endless love today and forever!"
  },
  {
    image: '/assets/pose-07.png',
    fallback: '/assets/pose-07.jpg',
    message: "Oh! Did you just realize how special you are?"
  },
  {
    image: '/assets/pose-08.png',
    fallback: '/assets/pose-08.jpg',
    message: "Every chapter is brighter when you smile."
  },
  {
    image: '/assets/pose-09.png',
    fallback: '/assets/pose-09.jpg',
    message: "Peace, strength, and happiness always for you!"
  },
  {
    image: '/assets/pose-10.png',
    fallback: '/assets/pose-10.jpg',
    message: "Happy Birthday Maheswari! Love you to infinity!"
  }
];

const DeskBuddy = () => {
  const [index, setIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const timerRef = useRef(null);

  const currentSlide = REACTION_SLIDES[index];

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (isMinimized) return;

    timerRef.current = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(timerRef.current);
  }, [index, isMinimized]);

  const handleNextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % REACTION_SLIDES.length);
      setIsSliding(false);
    }, 200);
  };

  const handleManualClick = (e) => {
    e.stopPropagation();
    handleNextSlide();
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized((prev) => !prev);
  };

  if (isMinimized) {
    return (
      <div
        className="desk-buddy-minimized"
        onClick={toggleMinimize}
        role="button"
        tabIndex={0}
        title="Open reaction buddy"
        aria-label="Expand reaction buddy"
      >
        <div className="min-avatar">
          <img
            src={currentSlide.image}
            alt="M"
            onError={(e) => {
              e.target.src = currentSlide.fallback;
            }}
          />
        </div>
        <span className="min-label">M</span>
      </div>
    );
  }

  return (
    <div className="desk-buddy-container">
      {/* Speech message bubble above reaction */}
      <div className="buddy-speech-bubble" key={index}>
        <div className="bubble-text">{currentSlide.message}</div>
        <div className="bubble-pointer" />
      </div>

      {/* Character Figure */}
      <div
        className={`buddy-figure-wrap ${isSliding ? 'slide-transition' : ''}`}
        onClick={handleManualClick}
        role="button"
        tabIndex={0}
        title="Tap to change reaction"
        aria-label="Reaction pose"
      >
        <img
          src={currentSlide.image}
          alt="Maheswari reaction"
          className="buddy-image"
          onError={(e) => {
            e.target.src = currentSlide.fallback;
          }}
        />
      </div>

      {/* Minimize control */}
      <button
        type="button"
        className="buddy-close-btn"
        onClick={toggleMinimize}
        title="Minimize buddy"
        aria-label="Minimize buddy"
      >
        &times;
      </button>
    </div>
  );
};

export default DeskBuddy;
