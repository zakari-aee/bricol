import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Sparkles, ArrowLeft, User, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const LoginPage = () => {
  const [step, setStep] = useState(0); // ✅ 0 = choose role, 1 = login
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await signIn(email, password, userType);

    if (result.success) {
      setSuccess(t('auth.loginSuccess'));
      setTimeout(() => {
        navigate(userType === 'customer' ? '/customer/dashboard' : '/worker/dashboard');
      }, 1200);
    } else {
      setError(result.error || t('auth.loginError'));
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const result = await signInWithGoogle(userType);
    if (result?.success) {
      navigate(userType === 'customer' ? '/customer/dashboard' : '/worker/dashboard');
    } else {
      setError(result?.error || t('auth.googleError'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">

        {/* ✅✅✅ PART 1 — ROLE SELECTION */}
        {step === 0 && (
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('common.login')}</h1>
            <p className="text-gray-600 mb-8">Choose how you want to continue</p>

            <div className="grid gap-6">
              <button
                onClick={() => {
                  setUserType('customer');
                  setStep(1);
                }}
                className="p-6 border rounded-xl hover:border-green-500 hover:shadow-lg transition text-left flex items-center"
              >
                <User className="h-8 w-8 text-green-600 mr-4" />
                <div>
                  <h3 className="font-bold text-green-600">Customer</h3>
                  <p className="text-gray-600 text-sm">Login to book services</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setUserType('worker');
                  setStep(1);
                }}
                className="p-6 border rounded-xl hover:border-blue-500 hover:shadow-lg transition text-left flex items-center"
              >
                <Briefcase className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-bold text-blue-600">Worker</h3>
                  <p className="text-gray-600 text-sm">Login to manage jobs</p>
                </div>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold">
                Create one
              </Link>
            </div>
          </div>
        )}

        {/* ✅✅✅ PART 2 — LOGIN FORM */}
        {step === 1 && (
          <>
            <button
              onClick={() => setStep(0)}
              className="flex items-center text-gray-600 hover:text-black mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </button>

            <div className="flex items-center mb-4">
              <LogIn className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">
                {userType === 'customer' ? 'Customer Login' : 'Worker Login'}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" /> {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
                <Sparkles className="h-5 w-5 mr-2" /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 p-3 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>

              <div className="text-center text-gray-500">or</div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 border rounded-lg hover:bg-gray-50 flex justify-center"
              >
                Sign in with Google
              </button>

              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  No account?{' '}
                  <Link to="/register" className="text-blue-600 font-semibold">
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
