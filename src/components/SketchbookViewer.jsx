import React, { useEffect, useState } from 'react';
import RotatePrompt from './RotatePrompt';
import './SketchbookViewer.css';

const SketchbookViewer = ({ onBack }) => {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [bypassed, setBypassed] = useState(false);

  useEffect(() => {
    // Attempt screen orientation lock to landscape if supported
    try {
      if (window.screen?.orientation?.lock) {
        window.screen.orientation.lock('landscape').catch(() => {
          // Handled safely if browser policy rejects
        });
      }
    } catch (e) {
      // Screen orientation lock not supported
    }

    const checkOrientation = () => {
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      const isMobileWidth = window.innerWidth <= 900;
      setIsPortraitMobile(isPortrait && isMobileWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      try {
        if (window.screen?.orientation?.unlock) {
          window.screen.orientation.unlock();
        }
      } catch (e) {}
    };
  }, []);

  return (
    <div className="sketchbook-viewer-container">
      {/* Back to Home Button */}
      <button className="sketchbook-back-btn" onClick={onBack} aria-label="Back to home grid">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>Home</span>
      </button>

      {/* Embed Sketchbook.html directly without breaking any functionality */}
      <iframe
        src="/Sketchbook.html"
        title="Digital Scrapbook Sketchbook"
        className="sketchbook-frame"
      />

      {/* Rotate Prompt Overlay for Mobile Portrait Mode */}
      {isPortraitMobile && !bypassed && (
        <RotatePrompt onBypass={() => setBypassed(true)} />
      )}
    </div>
  );
};

export default SketchbookViewer;
