import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [direction, setDirection] = useState('ltr');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check localStorage or browser language
    const savedLang = localStorage.getItem('bricol_lang') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 
                      navigator.language.startsWith('fr') ? 'fr' : 'en');
    
    setLanguage(savedLang);
    updateDirection(savedLang);
    
    // Update document attributes
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    
    // Add language-specific CSS class
    document.body.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    document.body.classList.add(`lang-${savedLang}`);
  }, []);

  const updateDirection = (lang) => {
    const isRTL = lang === 'ar';
    setDirection(isRTL ? 'rtl' : 'ltr');
    setIsRTL(isRTL);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  };

  const changeLanguage = (lang) => {
    if (['en', 'fr', 'ar'].includes(lang)) {
      setLanguage(lang);
      updateDirection(lang);
      localStorage.setItem('bricol_lang', lang);
      document.documentElement.lang = lang;
      document.body.classList.remove('lang-en', 'lang-fr', 'lang-ar');
      document.body.classList.add(`lang-${lang}`);
    }
  };

  const toggleLanguage = () => {
    const currentIndex = ['en', 'fr', 'ar'].indexOf(language);
    const nextIndex = (currentIndex + 1) % 3;
    changeLanguage(['en', 'fr', 'ar'][nextIndex]);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        changeLanguage,
        toggleLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);