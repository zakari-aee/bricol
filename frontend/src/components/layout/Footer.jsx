import React from "react";
import { Link } from "react-router-dom";
import useTranslation from "../../hook/useTranslation";

const Footer = () => {
  const { t, isRTL } = useTranslation();

  // Example data for quick links, services, cities
  const quickLinks = [
    { label: t('common.about') || 'About', to: '/about' },
    { label: t('common.contact') || 'Contact', to: '/contact' },
    { label: t('footer.cookies') || 'Cookies', to: '/cookies' },
  ];

  const services = [
    { label: t('footer.services') || 'Services', to: '/services' },
    { label: t('footer.cities') || 'Cities', to: '/cities' },
  ];

  const legalLinks = [
    { label: t('footer.privacy') || 'Privacy', to: '/privacy' },
    { label: t('footer.terms') || 'Terms', to: '/terms' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-orange-600 mb-2">{t('common.appName') || 'Bricol'}</h2>
          <p className="text-gray-500 text-sm">{t('footer.description')}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="hover:text-orange-600 transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('footer.services')}</h3>
          <ul className="space-y-2 text-sm">
            {services.map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="hover:text-orange-600 transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('footer.legal')}</h3>
          <ul className="space-y-2 text-sm">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="hover:text-orange-600 transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <span>&copy; {new Date().getFullYear()} {t('common.appName') || 'Bricol'}. {t('footer.rights')}</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-orange-600 transition">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-orange-600 transition">{t('footer.terms')}</Link>
            <Link to="/cookies" className="hover:text-orange-600 transition">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
