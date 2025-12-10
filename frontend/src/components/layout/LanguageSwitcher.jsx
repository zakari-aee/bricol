import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getSupportedLanguages } from '../../i18n/indexx';

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { language, changeLanguage } = useLanguage();
  const languages = getSupportedLanguages();

  if (variant === 'simple') {
    return (
      <button
        onClick={() => {
          const currentIndex = languages.findIndex(lang => lang.code === language);
          const nextIndex = (currentIndex + 1) % languages.length;
          changeLanguage(languages[nextIndex].code);
        }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="font-medium">
          {language === 'en' ? 'EN' : language === 'fr' ? 'FR' : 'AR'}
        </span>
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white transition">
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="font-medium">
          {language === 'en' ? 'English' : language === 'fr' ? 'Français' : 'العربية'}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
      
      <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition ${
              language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium flex-1 text-right">{lang.name}</span>
            {language === lang.code && (
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;