import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WorkerRegister from './pages/auth/WorkerRegister';
import HeroSection from './components/layout/HeroSection';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-transparent">
          <Navbar />

          {/* Main content */}
          <main className="flex-1 bg-transparent">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register/worker" element={<WorkerRegister />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
