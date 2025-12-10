import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/customer/Home';
import HeroSection from './components/layout/HeroSection';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />

          {/* Main content */}
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Example Protected Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <h1 className="text-2xl p-4">Dashboard (Protected)</h1>
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
