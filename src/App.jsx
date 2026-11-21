import React, { useState } from 'react';
import Intro from './components/Intro';
import HomeGrid from './components/HomeGrid';
import SketchbookViewer from './components/SketchbookViewer';
import Story from './components/Story';
import Gift from './components/Gift';
import DeskBuddy from './components/DeskBuddy';
import './App.css';

function App() {
  // Screens: 'intro' (Door + Lock PIN 2211) -> 'home' -> 'sketchbook' / 'story' / 'gift'
  const [currentScreen, setCurrentScreen] = useState('intro');

  const handleIntroComplete = () => {
    setCurrentScreen('home');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleSelectSection = (sectionId) => {
    setCurrentScreen(sectionId);
  };

  return (
    <div className="app-main-wrapper">
      {currentScreen === 'intro' && (
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

      {/* Reaction Desk Buddy at bottom-left corner (hidden in full-screen sketchbook mode) */}
      {currentScreen !== 'intro' && currentScreen !== 'sketchbook' && (
        <DeskBuddy />
      )}
    </div>
  );
}

export default App;
