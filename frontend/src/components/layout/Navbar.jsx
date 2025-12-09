import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from './LanguageSwitcher'; // Default import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <nav 
      className="bg-white shadow-lg fixed w-full z-50"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8"
                src="/logo.svg"
                alt={t('common.appName')}
              />
              <span className={`ml-2 text-xl font-bold text-gray-800 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                {t('common.appName')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* For Workers Button */}
              <Link
                to="/worker"
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  location.pathname.startsWith('/worker')
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <User className={`h-4 w-4 ${isRTL ? 'mr-0 ml-2' : 'mr-2'}`} />
                <span>{t('nav.forWorkers')}</span>
              </Link>

              {/* For Customers Button */}
              <Link
                to="/customer"
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  location.pathname.startsWith('/customer')
                    ? 'bg-green-100 text-green-600 border border-green-200'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Search className={`h-4 w-4 ${isRTL ? 'mr-0 ml-2' : 'mr-2'}`} />
                <span>{t('nav.forCustomers')}</span>
              </Link>

              {/* Auth Buttons */}
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('common.signup')}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className={`${isRTL ? 'ml-4' : 'mr-4'}`}>
              <LanguageSwitcher variant="simple" />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/worker"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <User className={`h-5 w-5 ${isRTL ? 'mr-0 ml-3' : 'mr-3'}`} />
              <span>{t('nav.forWorkers')}</span>
            </Link>
            <Link
              to="/customer"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Search className={`h-5 w-5 ${isRTL ? 'mr-0 ml-3' : 'mr-3'}`} />
              <span>{t('nav.forCustomers')}</span>
            </Link>
            <div className="border-t pt-2">
              <Link
                to="/login"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {t('common.login')}
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 bg-blue-600 text-white mx-4 rounded-lg hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {t('common.signup')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;