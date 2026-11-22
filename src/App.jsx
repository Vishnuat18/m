import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import HomeGrid from './components/HomeGrid';
import SketchbookViewer from './components/SketchbookViewer';
import Story from './components/Story';
import Gift from './components/Gift';
import DeskBuddy from './components/DeskBuddy';
import { MusicProvider, useMusic } from './context/MusicContext';
import RotatingCdWidget from './components/RotatingCdWidget';
import './App.css';

function AppContent() {
  const { startMusic } = useMusic();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth <= 768;
    return false;
  });

  // Start at intro workflow:
  // Step 1: For your eyes only - Watch Privately -> Use Headphones
  // Step 2: Lock page (PIN 2211 / 1204)
  // Step 3: Home Screen (MobileBirthdayPhone on mobile)
  const [currentScreen, setCurrentScreen] = useState('intro');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleIntroComplete = () => {
    setCurrentScreen('home');
    if (typeof startMusic === 'function') {
      startMusic();
    }
  };
  const handleBackToHome = () => setCurrentScreen('home');
  const handleSelectSection = (sectionId) => setCurrentScreen(sectionId);

  return (
    <div className="app-main-wrapper">
      {currentScreen === 'intro' && (
        <Intro onComplete={handleIntroComplete} isMobile={isMobile} />
      )}

      {currentScreen === 'home' && (
        <HomeGrid onSelectSection={handleSelectSection} />
      )}

      {currentScreen === 'sketchbook' && (
        <SketchbookViewer onBack={handleBackToHome} />
      )}

      {currentScreen === 'story' && (
        <Story onBack={handleBackToHome} />
      )}

      {currentScreen === 'gift' && (
        <Gift onBack={handleBackToHome} />
      )}

      {currentScreen !== 'intro' && currentScreen !== 'sketchbook' && (
        <DeskBuddy />
      )}

      {/* Rotating CD Widget on the bottom right for mobile across all screens */}
      {isMobile && currentScreen !== 'intro' && (
        <RotatingCdWidget />
      )}
    </div>
  );
}

function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;
