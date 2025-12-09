import { useLanguage } from '../context/LanguageContext';
import { t as translate } from '../i18n';

const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key, params = {}) => {
    let translation = translate(key, language);
    
    // Replace parameters
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };
  
  const formatCurrency = (amount) => {
    if (language === 'ar') {
      return `${amount} درهم`;
    } else {
      return `${amount} DH`;
    }
  };
  
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    if (language === 'ar') {
      return new Date(date).toLocaleDateString('ar-MA', options);
    } else {
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  };
  
  return {
    t,
    language,
    formatCurrency,
    formatDate
  };
};

export default useTranslation;