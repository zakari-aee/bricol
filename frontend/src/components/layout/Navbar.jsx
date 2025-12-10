import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <nav
      className="bg-white shadow-md fixed w-full z-50 transition-all duration-300"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/img/a.jpeg" alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-bold text-gray-800">
              {t('common.appName') || 'MyApp'}
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">

            <LanguageSwitcher />

            <Link
              to="/login"
              className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition shadow"
            >
              {t('common.login') || 'Login'}
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition"
            >
              {t('common.signup') || 'Sign Up'}
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher variant="simple" />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-4">

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold shadow transition"
          >
            {t('common.login') || 'Login'}
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block text-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition"
          >
            {t('common.signup') || 'Sign Up'}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
