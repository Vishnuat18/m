import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import HomeGrid from './components/HomeGrid';
import SketchbookViewer from './components/SketchbookViewer';
import Story from './components/Story';
import Gift from './components/Gift';
import DeskBuddy from './components/DeskBuddy';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth <= 768;
    return false;
  });

  // On mobile: skip intro door animation, go straight to home
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return 'home';
    return 'intro';
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleIntroComplete = () => setCurrentScreen('home');
  const handleBackToHome = () => setCurrentScreen('home');
  const handleSelectSection = (sectionId) => setCurrentScreen(sectionId);

  return (
    <div className="app-main-wrapper">
      {currentScreen === 'intro' && !isMobile && (
        <Intro onComplete={handleIntroComplete} />
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

      {currentScreen !== 'intro' && currentScreen !== 'sketchbook' && !isMobile && (
        <DeskBuddy />
      )}
    </div>
  );
}

export default App;
