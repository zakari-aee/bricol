import React, { useState } from 'react';
import {
  Wrench,
  MapPin,
  ChevronRight,
  Sparkles,
  Users,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';

const HeroSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');

  const categories = [
    { label: `⚡ ${t('services.electrical')}`, value: 'electrical' },
    { label: `🚿 ${t('services.plumbing')}`, value: 'plumbing' },
    { label: `🪚 ${t('services.carpentry')}`, value: 'carpentry' },
    { label: `🎨 ${t('services.painting')}`, value: 'painting' },
    { label: `❄️ ${t('services.ac')}`, value: 'ac' },
    { label: `🚚 ${t('services.furniture')}`, value: 'furniture' },
    { label: `🧹 ${t('services.cleaning')}`, value: 'cleaning' },
    { label: `🛠️ ${t('services.installation')}`, value: 'installation' },
  ];

  const cities = isRTL
    ? ['الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'فاس', 'أكادير', 'مكناس', 'وجدة']
    : ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda'];

  const stats = [
    { value: '10,000+', label: t('stats.workers'), icon: Users },
    { value: '98%', label: t('stats.satisfaction'), icon: CheckCircle },
    { value: isRTL ? '30 دقيقة' : '30 min', label: t('stats.responseTime'), icon: Clock },
    { value: isRTL ? 'مضمون' : 'Garanti', label: t('stats.guarantee'), icon: Shield },
  ];

  const handleSearch = () => {
    if (!category || !city) return;
    window.location.href = `/customer/search?category=${category}&city=${city}`;
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-32 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-40 text-center">
        {/* Badge */}
        <div className="inline-flex items-center mb-8 px-6 py-2 bg-orange-50 rounded-full border border-orange-200 shadow-sm">
          <Sparkles className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-semibold text-orange-600 ml-2">
            {isRTL ? 'خدمات منزلية احترافية' : 'Professional Home Services'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          {t('hero.title')}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            {t('hero.highlighted')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 mb-16">
          {isRTL
            ? 'اختر نوع العطل، اختر مدينتك، وسنجد لك أفضل حرفي'
            : 'Choose what you want to fix, select your city, and we find the best worker'}
        </p>

        {/* Search Form */}
        <div className="bg-white max-w-4xl mx-auto rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category */}
            <div className="relative flex-1">
              <Wrench
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 text-gray-700 shadow-sm hover:shadow-md transition`}
              >
                <option value="">{isRTL ? 'ماذا تريد أن تصلح؟' : 'What do you want to fix?'}</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="relative flex-1">
              <MapPin
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 text-gray-700 shadow-sm hover:shadow-md transition`}
              >
                <option value="">{t('hero.city')}</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!category || !city}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              {t('hero.searchNow')}
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl shadow border border-gray-200 text-center transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <Icon className="h-8 w-8 mx-auto text-orange-500 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
