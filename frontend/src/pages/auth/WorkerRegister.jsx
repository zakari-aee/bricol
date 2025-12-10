import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const WorkerRegister = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    experienceYears: '',
    category: '',
    availability: {
      Monday: { available: false, startTime: '', endTime: '' },
      Tuesday: { available: false, startTime: '', endTime: '' },
      Wednesday: { available: false, startTime: '', endTime: '' },
      Thursday: { available: false, startTime: '', endTime: '' },
      Friday: { available: false, startTime: '', endTime: '' },
      Saturday: { available: false, startTime: '', endTime: '' },
      Sunday: { available: false, startTime: '', endTime: '' },
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signUpWorker } = useAuth(); 
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation(); // use RTL if Arabic

  const categories = [
    t('categories.electrical'),
    t('categories.plumbing'),
    t('categories.carpentry'),
    t('categories.painting'),
    t('categories.ac'),
    t('categories.furniture'),
    t('categories.appliance'),
    t('categories.cleaning'),
    t('categories.gardening'),
    t('categories.moving'),
    t('categories.security'),
    t('categories.smarthome')
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('day-')) {
      const day = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        availability: { ...prev.availability, [day]: { ...prev.availability[day], available: checked } }
      }));
    } else if (name.includes('-start') || name.includes('-end')) {
      const [day, timeType] = name.split('-');
      setFormData(prev => ({
        ...prev,
        availability: { ...prev.availability, [day]: { ...prev.availability[day], [timeType]: value } }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    setError('');
    if (step === 0 && (!formData.fullName || !formData.phone)) {
      setError(t('errors.fillRequiredFields'));
      return;
    }
    if (step === 1 && !formData.category) {
      setError(t('errors.selectCategory'));
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setError('');
    const daysSelected = Object.entries(formData.availability).filter(
      ([_, value]) => value.available && value.startTime && value.endTime
    );

    if (daysSelected.length === 0) {
      setError(t('errors.selectAvailability'));
      return;
    }

    setLoading(true);
    const result = await signUpWorker(formData);

    if (result.success) {
      setSuccess(t('auth.registrationSuccess'));
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(result.error || t('auth.registrationError'));
    }
    setLoading(false);
  };

  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <form className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border space-y-4">
        {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">{t('worker.personalInfo')}</h2>
            <input
              type="text"
              name="fullName"
              placeholder={t('worker.fullName')}
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={t('worker.phone')}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder={t('worker.whatsapp')}
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="number"
              name="experienceYears"
              placeholder={t('worker.experienceYears')}
              value={formData.experienceYears}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </>
        )}

        {/* Step 1: Specialty */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">{t('worker.specialty')}</h2>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">{t('worker.selectCategory')}</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </>
        )}

        {/* Step 2: Availability */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">{t('worker.availability')}</h2>
            {days.map(day => (
              <div key={day} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  name={`day-${day}`}
                  checked={formData.availability[day].available}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="w-20">{t(`days.${day}`)}</label>
                <input
                  type="time"
                  name={`${day}-start`}
                  value={formData.availability[day].startTime}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                  disabled={!formData.availability[day].available}
                />
                <span>{t('common.to')}</span>
                <input
                  type="time"
                  name={`${day}-end`}
                  value={formData.availability[day].endTime}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                  disabled={!formData.availability[day].available}
                />
              </div>
            ))}
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> {t('common.back')}
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              {t('common.next')} <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
              {loading ? t('common.submitting') : t('common.submit')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WorkerRegister;
