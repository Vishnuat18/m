import React from 'react';
import './HomeGrid.css';

const HomeGrid = ({ onSelectSection }) => {
  const handleOpenSketchbook = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen().catch(() => {});
        }
      }
    } catch (e) {}
    onSelectSection('sketchbook');
  };

  return (
    <div className="home-grid-container">
      {/* Ambient background aura */}
      <div className="ambient-glow top" aria-hidden="true" />
      <div className="ambient-glow bottom" aria-hidden="true" />

      <header className="home-header">
        <h1 className="birthday-main-title">Happy Birthday Maheswari</h1>
      </header>

      <main className="home-grid">
        {/* Card 1: Scrapbook (div image, below that Scrapbook text only on mobile) */}
        <div
          className="grid-card card-sketchbook"
          onClick={handleOpenSketchbook}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenSketchbook();
          }}
        >
          <div className="card-badge">SKETCHBOOK</div>
          <div className="card-visual-wrapper">
            <img
              src="/assets/sketchbook-cover.jpg"
              alt="Scrapbook Cover"
              className="sketchbook-cover-preview"
              onError={(e) => {
                e.target.src = 'assets/sketchbook-cover.jpg';
              }}
            />
          </div>
          <h2 className="card-title">
            <span className="desktop-card-title">Digital Sketchbook</span>
            <span className="mobile-card-title">Scrapbook</span>
          </h2>
          <p className="card-label">
            Vintage scrapbooks, polaroids, taped memories &amp; 3D corner flips
          </p>
          <div className="card-action">OPEN SKETCHBOOK &rarr;</div>
        </div>

        {/* Card 2: Notes (right of Scrapbook, div image, below that Notes text only on mobile) */}
        <div
          className="grid-card card-notes"
          onClick={() => onSelectSection('story')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectSection('story');
          }}
        >
          <div className="card-badge">STORY NOTES</div>
          <div className="card-visual-wrapper">
            <div className="story-note-preview">
              <div className="mini-note-header">Chapter M</div>
              <div className="mini-note-lines">
                <div className="mini-line" />
                <div className="mini-line accent" />
                <div className="mini-line" />
                <div className="mini-line short" />
                <div className="mini-line" />
              </div>
            </div>
          </div>
          <h2 className="card-title">
            <span className="desktop-card-title">Our Story Notes</span>
            <span className="mobile-card-title">Notes</span>
          </h2>
          <p className="card-label">
            Handwritten journal memories through every letter from M to I
          </p>
          <div className="card-action">READ NOTES &rarr;</div>
        </div>

        {/* Card 3: Special Gift */}
        <div
          className="grid-card card-gift"
          onClick={() => onSelectSection('gift')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectSection('gift');
          }}
        >
          <div className="card-badge">SPECIAL GIFT</div>
          <div className="card-visual-wrapper">
            <svg
              className="gift-svg-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
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
          <div className="card-text-block">
            <h2 className="card-title">
              <span className="desktop-card-title">Special Gift</span>
              <span className="mobile-card-title">Special Gift</span>
            </h2>
            <p className="card-label">
              A personal surprise packed with loving thoughts just for you
            </p>
            <div className="card-action">UNWRAP GIFT &rarr;</div>
          </div>
        </div>
      </main>

      {/* Heartfelt Birthday Tribute Section to fill the bottom of mobile neatly */}
      <footer className="home-birthday-banner" aria-label="Birthday Dedication">
        <div className="banner-sparkle-row">
          <span className="sparkle-line" />
          <span className="sparkle-symbol">&loz;</span>
          <span className="sparkle-line" />
        </div>
        <p className="banner-wishes">
          &ldquo;Every chapter of our story is more wonderful with you in it. May your year ahead be as radiant and joyful as your smile.&rdquo;
        </p>
        <div className="banner-highlights">
          <span className="hl-item">22 Scrapbook Memories</span>
          <span className="hl-sep">&bull;</span>
          <span className="hl-item">Handwritten Story Chapters</span>
          <span className="hl-sep">&bull;</span>
          <span className="hl-item">Personal Surprise</span>
        </div>
      </footer>
    </div>
  );
};

export default HomeGrid;
