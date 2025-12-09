import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from "./components/layout/HeroSection";
import ChatButton from './components/ai/ChatButton';
import { LanguageProvider } from './context/LanguageContext';


// Import other components...

function App() {
  return (
    <LanguageProvider>
      {/* Remove <BrowserRouter> wrapper */}
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              {/* Other sections */}
              <ChatButton />
            </>
          } />
          {/* Other routes */}
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;