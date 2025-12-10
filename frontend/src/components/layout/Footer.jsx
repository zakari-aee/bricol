import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hook/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-gray-50 border-t border-gray-200 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        {/* Left: Logo & Rights */}
        <div className="text-center md:text-left text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.rights')}.
        </div>

        {/* Right: Links */}
        <div className="flex space-x-4 text-gray-600 text-sm">
          <Link to="/about" className="hover:text-blue-600 transition">{t('common.about')}</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">{t('common.contact')}</Link>
          <Link to="/privacy" className="hover:text-blue-600 transition">{t('footer.privacy')}</Link>
          <Link to="/terms" className="hover:text-blue-600 transition">{t('footer.terms')}</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
