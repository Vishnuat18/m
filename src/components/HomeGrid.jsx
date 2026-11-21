import React from 'react';
import './HomeGrid.css';

const HomeGrid = ({ onSelectSection }) => {
  return (
    <div className="home-grid-container">
      <header className="home-header">
        <div className="subtitle">M . A . H . E . S . W . A . R . I</div>
        <h1>Our Story & Scrapbook</h1>
      </header>

      <main className="home-grid">
        {/* Card 1: Digital Sketchbook (Using Sketchbook Front Cover Image) */}
        <div
          className="grid-card"
          onClick={() => onSelectSection('sketchbook')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectSection('sketchbook');
          }}
        >
          <div className="card-badge">SKETCHBOOK</div>
          <div className="card-visual-wrapper">
            <img
              src="/assets/sketchbook-cover.jpg"
              alt="Digital Sketchbook Front Cover"
              className="sketchbook-cover-preview"
              onError={(e) => {
                e.target.src = 'assets/sketchbook-cover.jpg';
              }}
            />
          </div>
          <h2 className="card-title">Digital Sketchbook</h2>
          <p className="card-label">
            Vintage scrapbooks, polaroids, taped memories & 3D corner flips
          </p>
          <div className="card-action">OPEN SKETCHBOOK &rarr;</div>
        </div>

        {/* Card 2: Story Notes (Miniature Parchment Note Preview) */}
        <div
          className="grid-card"
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
              <div className="mini-note-header">Chapter M • 2024</div>
              <div className="mini-note-lines">
                <div className="mini-line" />
                <div className="mini-line accent" />
                <div className="mini-line" />
                <div className="mini-line short" />
                <div className="mini-line" />
              </div>
            </div>
          </div>
          <h2 className="card-title">Our Story Notes</h2>
          <p className="card-label">
            Handwritten journal pages & memories from Chapter M to I
          </p>
          <div className="card-action">READ NOTES &rarr;</div>
        </div>

        {/* Card 3: Special Gift */}
        <div
          className="grid-card"
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
          <h2 className="card-title">Special Gift</h2>
          <p className="card-label">
            A personal surprise packed with loving thoughts for you
          </p>
          <div className="card-action">UNWRAP GIFT &rarr;</div>
        </div>
      </main>
    </div>
  );
};

export default HomeGrid;
