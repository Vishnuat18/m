import React, { useState } from 'react';
import Intro from './components/Intro';
import HomeGrid from './components/HomeGrid';
import SketchbookViewer from './components/SketchbookViewer';
import Story from './components/Story';
import Gift from './components/Gift';
import './App.css';

function App() {
  // Screens: 'intro' (Door + Scanner + Lock PIN 2211) -> 'home' (Reference Image 1 Cards) -> 'sketchbook' / 'story' (Reference Image 2 Note) / 'gift'
  const [currentScreen, setCurrentScreen] = useState('intro');

  const handleIntroComplete = () => {
    // After animation, open the reference image home page
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
    </div>
  );
}

export default App;
