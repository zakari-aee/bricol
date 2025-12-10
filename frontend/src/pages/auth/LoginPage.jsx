import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useTranslation from '../../hook/useTranslation';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(identifier, password);

    if (result.success) {
      navigate(result.userType === 'worker' ? '/worker/dashboard' : '/customer/dashboard');
    } else {
      setError(result.error || t('auth.loginError'));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-4"
      >
        <div className="flex items-center mb-4">
          <LogIn className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">{t('common.login')}</h2>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {/* Identifier */}
        <input
          type="text"
          placeholder="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition text-gray-700"
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition text-gray-700 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-md hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50"
        >
          {loading ? t('auth.signingIn') : t('common.login')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
