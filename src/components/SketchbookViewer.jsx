import React, { useEffect, useState, useRef } from 'react';
import RotatePrompt from './RotatePrompt';
import './SketchbookViewer.css';

const SketchbookViewer = ({ onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [confirmPoseImg, setConfirmPoseImg] = useState('/assets/pose-03.png');

  // Rotate Prompt: triggers on portrait/mobile viewports
  const [showRotatePrompt, setShowRotatePrompt] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isMobile = window.innerWidth <= 820 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isPortrait = window.innerHeight >= window.innerWidth;
    return isMobile && isPortrait;
  });

  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // Auto-dismiss rotate prompt when device rotates to landscape
  useEffect(() => {
    const handleOrientationCheck = () => {
      if (window.innerWidth > window.innerHeight) {
        setShowRotatePrompt(false);
      }
    };
    window.addEventListener('resize', handleOrientationCheck);
    window.addEventListener('orientationchange', handleOrientationCheck);
    return () => {
      window.removeEventListener('resize', handleOrientationCheck);
      window.removeEventListener('orientationchange', handleOrientationCheck);
    };
  }, []);

  // Helper to trigger Exit Confirmation with a pose image
  const promptExitConfirm = () => {
    const randomIdx = Math.floor(Math.random() * 10) + 1;
    const numStr = String(randomIdx).padStart(2, '0');
    setConfirmPoseImg(`/assets/pose-${numStr}.png`);
    setShowExitConfirm(true);
  };

  // Intercept back navigation (browser back, Android gesture, popstate)
  useEffect(() => {
    window.history.pushState({ inSketchbook: true }, '');

    const handlePopState = () => {
      promptExitConfirm();
      window.history.pushState({ inSketchbook: true }, '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Listen for download requests dispatched from inside the embedded Sketchbook.html iframe
  useEffect(() => {
    const handleFrameMessage = (event) => {
      if (event.data && (event.data.type === 'DOWNLOAD_SCRAPBOOK_PDF' || event.data.type === 'DOWNLOAD_SCRAPBOOK')) {
        handleDownloadScrapbook();
      }
    };
    window.addEventListener('message', handleFrameMessage);
    return () => window.removeEventListener('message', handleFrameMessage);
  }, []);

  // Handle Download Scrapbook PDF (Downloads the 22-page Newspaper Aesthetic PDF)
  const handleDownloadScrapbook = async () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3500);

    try {
      const response = await fetch('/music/Sketchbook_22_Pages_Newspaper_Aesthetic.pdf');
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'Sketchbook_22_Pages_Newspaper_Aesthetic.pdf';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        return;
      }
    } catch (e) {
      console.warn('Blob fetch download failed, using direct fallback:', e);
    }

    try {
      const a = document.createElement('a');
      a.href = '/music/Sketchbook_22_Pages_Newspaper_Aesthetic.pdf';
      a.download = 'Sketchbook_22_Pages_Newspaper_Aesthetic.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  useEffect(() => {
    // Monitor native fullscreen state changes
    const handleFullscreenChange = () => {
      const active = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(active);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Lock orientation if supported
    try {
      if (window.screen?.orientation?.lock) {
        window.screen.orientation.lock('landscape').catch(() => {});
      }
    } catch (e) {}

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      try {
        if (window.screen?.orientation?.unlock) {
          window.screen.orientation.unlock();
        }
      } catch (e) {}
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const isCurrentlyFs = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement
      );

      if (!isCurrentlyFs) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleConfirmExit = () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen().catch(() => {});
        }
      }
    } catch (e) {}
    setShowExitConfirm(false);
    onBack();
  };

  return (
    <div className="sketchbook-viewer-container" ref={containerRef}>
      {/* Rotate Phone Prompt on Portrait/Mobile */}
      {showRotatePrompt && (
        <RotatePrompt onBypass={() => setShowRotatePrompt(false)} />
      )}

      {/* Top Floating Glass Navigation Bar */}
      <header className="sketchbook-top-bar">
        {/* Back to Home Button - prompts confirmation popup */}
        <button
          type="button"
          className="sketchbook-glass-btn back-btn"
          onClick={promptExitConfirm}
          aria-label="Back to home"
          title="Return to Home"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="btn-label-text">Home</span>
        </button>

        {/* Right Action Controls: EXACTLY ONE Round Download Button & Fullscreen Button */}
        <div className="sketchbook-top-actions">
          {/* Round Scrapbook Download Button */}
          <button
            type="button"
            className="sketchbook-round-download-btn"
            onClick={handleDownloadScrapbook}
            aria-label="Download 22-Page Scrapbook PDF"
            title="Download 22-Page Scrapbook PDF"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="sketchbook-btn-badge">PDF</span>
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            type="button"
            className={`sketchbook-glass-btn fs-btn ${isFullscreen ? 'active' : ''}`}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Open in Fullscreen'}
          >
            {isFullscreen ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
                <span className="btn-label-text desktop-label">Exit Fullscreen</span>
                <span className="btn-label-text mobile-label">Exit</span>
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
                <span className="btn-label-text desktop-label">Fullscreen</span>
                <span className="btn-label-text mobile-label">Full</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Download Toast */}
      {downloadToast && (
        <aside className="sketchbook-download-toast" role="status" aria-live="polite">
          <svg
            className="toast-download-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Downloading 22-Page Scrapbook PDF...</span>
        </aside>
      )}

      {/* Exit Confirmation Modal with Pose Image */}
      {showExitConfirm && (
        <div
          className="sketchbook-exit-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelExit();
          }}
        >
          <div className="sketchbook-exit-modal-card">
            <div className="exit-pose-stage">
              <div className="exit-pose-aura" aria-hidden="true" />
              <img
                src={confirmPoseImg}
                alt="Maheswari"
                className="exit-pose-photo"
                onError={(e) => {
                  const fallbackNum = confirmPoseImg.replace('.png', '.jpg');
                  e.currentTarget.src = fallbackNum;
                }}
              />
            </div>

            <h3 className="exit-modal-title">Close Scrapbook?</h3>
            <p className="exit-modal-desc">
              Are you sure you want to exit? You can continue reading or return to Home.
            </p>

            <div className="exit-modal-actions">
              <button
                type="button"
                className="exit-btn-cancel"
                onClick={handleCancelExit}
              >
                Cancel
              </button>
              <button
                type="button"
                className="exit-btn-close"
                onClick={handleConfirmExit}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embed Sketchbook.html directly in Full Screen Viewport */}
      <iframe
        ref={iframeRef}
        src="/Sketchbook.html"
        title="Digital Scrapbook Sketchbook"
        className="sketchbook-frame"
        sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-popups"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen={true}
      />
    </div>
  );
};

export default SketchbookViewer;
