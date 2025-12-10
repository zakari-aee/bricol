import en from './translations/en.json';
import fr from './translations/fr.json';
import ar from './translations/ar.json';

const translations = {
  en,
  fr,
  ar
};

export const getTranslations = (lang = 'en') => {
  return translations[lang] || translations.en;
};

export const t = (key, lang = 'en') => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = getFallback(key, translations.en);
      break;
    }
  }
  
  return value || key;
};

const getFallback = (key, fallbackTranslations) => {
  const keys = key.split('.');
  let value = fallbackTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return value;
};

export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];
};

export default translations;