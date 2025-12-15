import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus, User, Hammer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      if (type === 'worker') {
        navigate('/register/worker');
      } else {
        setUserType(type);
        setStep(1); // customer form
      }
    }
  }, [searchParams, navigate]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-gray-50 flex items-center justify-center p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        {/* Choose Account */}
        {step === 0 && (
          <div className="text-center">
            <UserPlus className="h-14 w-14 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-2 text-gray-800">
              {t('registration.createAccount')}
            </h2>
            <p className="text-gray-500 mb-8">{t('registration.signInToContinue')}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer */}
              <button
                onClick={() => {
                  setUserType('customer');
                  setStep(1);
                }}
                className="p-8 border border-gray-200 rounded-2xl hover:border-orange-500 hover:shadow-lg transition flex items-center gap-4 bg-white"
              >
                <User className="w-10 h-10 text-orange-500" />
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1 text-orange-500">
                    {t('registration.customer')}
                  </h3>
                  <p className="text-gray-600">{t('registration.customerDetails')}</p>
                </div>
              </button>

              {/* Worker */}
              <button
                onClick={() => navigate('/register/worker')} 
                className="p-8 border border-gray-200 rounded-2xl hover:border-orange-500 hover:shadow-lg transition flex items-center gap-4 bg-white"
              >
                <Hammer className="w-10 h-10 text-orange-500" />
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1 text-orange-500">
                    {t('registration.worker')}
                  </h3>
                  <p className="text-gray-600">{t('registration.workerDetails')}</p>
                </div>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              {t('registration.haveAccount')}{' '}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                {t('common.login')}
              </Link>
            </div>
          </div>
        )}

        {/* Customer form */}
        {step === 1 && (
          <div className="mt-8 text-gray-700">
            <h3 className="text-2xl font-bold mb-4">{t('registration.customerForm')}</h3>
            <p className="text-gray-500 mb-6">{t('registration.fillCustomerForm')}</p>

            {/* Example form fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder={t('auth.fullName')}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
              />
              <input
                type="email"
                placeholder={t('auth.email')}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
              />
              <input
                type="tel"
                placeholder={t('auth.phone')}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
              />
              <input
                type="password"
                placeholder={t('auth.password')}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
              />
            </div>

            <button className="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition shadow-lg hover:shadow-xl">
              {t('common.submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
