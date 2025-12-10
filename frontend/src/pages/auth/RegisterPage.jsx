import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
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
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border">
        {/* Choose Account */}
        {step === 0 && (
          <div className="text-center">
            <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t('auth.createAccount')}</h2>
            <p className="text-gray-600 mb-8">{t('auth.signInToContinue')}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer */}
              <button
                onClick={() => {
                  setUserType('customer');
                  setStep(1);
                }}
                className="p-8 border rounded-xl hover:border-blue-500 hover:shadow-lg transition text-left"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-600">{t('auth.customer')}</h3>
                <p className="text-gray-600">{t('auth.customerDetails')}</p>
              </button>

              {/* Worker */}
              <button
                onClick={() => navigate('/register/worker')} // ✅ Navigate to WorkerRegister
                className="p-8 border rounded-xl hover:border-green-500 hover:shadow-lg transition text-left"
              >
                <h3 className="text-xl font-bold mb-2 text-green-600">{t('auth.worker')}</h3>
                <p className="text-gray-600">{t('auth.workerDetails')}</p>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              {t('auth.haveAccount')}{' '}
              <Link to="/login" className="text-blue-600 font-semibold">
                {t('common.login')}
              </Link>
            </div>
          </div>
        )}

        {/* Customer form */}
        {step === 1 && (
          <div className="text-center text-gray-600">
            <p>{t('auth.customerFormWillBeHere')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
