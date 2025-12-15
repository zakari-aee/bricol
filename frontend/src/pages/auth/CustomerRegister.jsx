import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import useTranslation from "../../hook/useTranslation";
import LanguageSwitcher from "../../components/layout/LanguageSwitcher";

const CustomerRegister = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      setError(t("auth.passwordNotMatch"));
      return;
    }

    console.log("Customer register:", form);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-xl backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          {t("registration.customerForm")}
        </h2>

        <div className="grid gap-4">
          <input
            name="fullName"
            placeholder={t("auth.fullName")}
            onChange={handleChange}
            className="p-4 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder={t("auth.email")}
            onChange={handleChange}
            className="p-4 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="phone"
            placeholder={t("auth.phone")}
            onChange={handleChange}
            className="p-4 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder={t("auth.password")}
            onChange={handleChange}
            className="p-4 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder={t("auth.confirmPassword")}
            onChange={handleChange}
            className="p-4 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          {t("common.submit")}
        </button>
      </div>
    </div>
  );
};

export default CustomerRegister;
