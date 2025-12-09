import React, { useState } from 'react';
import { Search, CheckCircle, Shield, Clock, Star, Users, MapPin, ChevronRight, PlayCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const popularServices = [
    { name: t('services.electrical'), icon: "⚡", color: "yellow" },
    { name: t('services.plumbing'), icon: "💧", color: "blue" },
    { name: t('services.carpentry'), icon: "🔨", color: "brown" },
    { name: t('services.painting'), icon: "🎨", color: "purple" },
    { name: t('services.ac'), icon: "❄️", color: "cyan" },
    { name: t('services.furniture'), icon: "🛋️", color: "green" },
  ];

  const cities = isRTL 
    ? ["الدار البيضاء", "الرباط", "مراكش", "طنجة", "فاس", "أكادير", "مكناس", "وجدة"]
    : ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Agadir", "Meknès", "Oujda"];

  const stats = [
    { value: "10,000+", label: t('stats.workers'), icon: Users, color: "blue" },
    { value: "98%", label: t('stats.satisfaction'), icon: CheckCircle, color: "green" },
    { value: isRTL ? "30 دقيقة" : "30 min", label: t('stats.responseTime'), icon: Clock, color: "orange" },
    { value: isRTL ? "مضمون" : "Garanti", label: t('stats.guarantee'), icon: Shield, color: "purple" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/customer/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const ChevronIcon = isRTL ? ChevronRight : ChevronRight;

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-gray-50"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-48">
        <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} mb-8 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200`}>
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              {isRTL ? '💡 اكتشف مساعدنا الذكي BricoBot' : '💡 Découvrez notre assistant IA BricoBot'}
            </span>
            <ChevronIcon className="h-4 w-4 text-blue-500" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">{t('hero.title')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {t('hero.highlighted')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed">
            {t('hero.subtitle')}
            <span className="font-semibold text-gray-800"> {t('hero.services')}</span>
            {isRTL ? ' – كل ما يحتاجه منزلك في مكان واحد.' : ' – tout ce dont votre maison a besoin en un seul endroit.'}
          </p>

          {/* Search Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-3 border border-gray-200">
              {/* Tabs */}
              <div className="flex mb-4 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition ${activeTab === 'services' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔍 {isRTL ? 'ابحث عن خدمة' : 'Trouver un service'}
                </button>
                <button
                  onClick={() => setActiveTab('workers')}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition ${activeTab === 'workers' 
                    ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-green-50'
                  }`}
                >
                  👷 {t('hero.joinAsWorker')}
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative">
                <div className={`flex flex-col md:flex-row gap-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="relative">
                      <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('hero.searchPlaceholder')}
                        className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-64">
                    <div className="relative">
                      <MapPin className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
                      <select className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white appearance-none`}>
                        <option value="">{t('hero.city')}</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                  >
                    <span>{t('hero.searchNow')}</span>
                    <ChevronIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Popular Services */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-500 mb-3 text-right">{t('hero.popularServices')}:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularServices.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(service.name)}
                      className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} px-4 py-2 rounded-full border transition hover:scale-105 ${
                        service.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' :
                        service.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100' :
                        service.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' :
                        'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-medium">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-3">
                    <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'space-x-reverse' : ''}`}>
            <button className={`px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <PlayCircle className="h-5 w-5" />
              <span>{t('hero.watchDemo')}</span>
            </button>
            
            <button className={`px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-100 flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Star className="h-5 w-5" />
              <span>{t('hero.getOffer')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;