import React from 'react';
import { useMusic } from '../context/MusicContext';
import './RotatingCdWidget.css';

const RotatingCdWidget = ({ onOpenMusic }) => {
  const { isPlaying, handlePlayPause, currentTrack } = useMusic();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onOpenMusic) {
      onOpenMusic();
    } else {
      handlePlayPause();
    }
  };

  return (
    <div
      className={`floating-cd-widget ${isPlaying ? 'is-spinning' : 'is-paused'}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={`${isPlaying ? 'Playing: ' : 'Paused: '} ${currentTrack.title}`}
      aria-label="Music player control"
    >
      <div className="cd-vinyl-disc">
        <div className="cd-vinyl-grooves">
          <div className="cd-vinyl-core">
            <svg
              className="cd-note-svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        </div>
      </div>
      {isPlaying && <div className="cd-sound-aura" />}
    </div>
  );
};

export default RotatingCdWidget;
