import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  UserPlus, ArrowLeft, ArrowRight, CheckCircle, 
  User, Briefcase, MapPin, Phone, Mail, Lock 
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const RegisterPage = () => {
  const [step, setStep] = useState(0); // 👈 step 0 = choose role
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    city: '',
    address: '',
    professionalTitle: '',
    experienceYears: 0,
    hourlyRate: '',
    categories: [],
    skills: []
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setUserType(type);
      setStep(1);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordsDontMatch'));
      setLoading(false);
      return;
    }

    const result = await signUp(
      formData.email,
      formData.password,
      formData,
      userType
    );

    if (result.success) {
      setSuccess(t('auth.registrationSuccess'));
      setTimeout(() => {
        navigate(userType === 'customer' ? '/customer/dashboard' : '/worker/dashboard');
      }, 1500);
    } else {
      setError(result.error || t('auth.registrationError'));
    }

    setLoading(false);
  };

  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes', 'Agadir'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border">

        {/* ✅✅✅ PART 1: CHOOSE ACCOUNT TYPE */}
        {step === 0 && (
          <div className="text-center">
            <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t('auth.chooseAccount')}</h2>
            <p className="text-gray-600 mb-8">
              Choose how you want to use the platform
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CUSTOMER */}
              <button
                onClick={() => {
                  setUserType('customer');
                  setStep(1);
                }}
                className="p-8 border rounded-xl hover:border-blue-500 hover:shadow-lg transition text-left"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-600">
                  I want a service
                </h3>
                <p className="text-gray-600">
                  Book electricians, plumbers, painters and more.
                </p>
              </button>

              {/* WORKER */}
              <button
                onClick={() => {
                  setUserType('worker');
                  setStep(1);
                }}
                className="p-8 border rounded-xl hover:border-green-500 hover:shadow-lg transition text-left"
              >
                <h3 className="text-xl font-bold mb-2 text-green-600">
                  I provide services
                </h3>
                <p className="text-gray-600">
                  Offer your skills and earn money.
                </p>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </div>
          </div>
        )}

        {/* ✅✅✅ PART 2: FORM */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>

            <h2 className="text-2xl font-bold">
              {userType === 'customer' ? 'Customer Registration' : 'Worker Registration'}
            </h2>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded">{success}</div>}

            {/* EMAIL */}
            <div>
              <label>Email</label>
              <input
                name="email"
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                className="p-3 border rounded-lg"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                className="p-3 border rounded-lg"
                required
              />
            </div>

            {/* NAME */}
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            {/* PHONE */}
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            {/* CITY */}
            <select
              name="city"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select city</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* ✅ Worker Only Fields */}
            {userType === 'worker' && (
              <>
                <input
                  name="professionalTitle"
                  placeholder="Your job (Plumber, Electrician...)"
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />

                <input
                  name="hourlyRate"
                  placeholder="Hourly rate"
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
