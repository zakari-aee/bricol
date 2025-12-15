import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserPlus, User, Hammer } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import useTranslation from "../../hook/useTranslation";
import LanguageSwitcher from "../../components/layout/LanguageSwitcher";

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "worker") navigate("/register/worker");
    if (type === "customer") navigate("/register/customer");
  }, [searchParams, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center">
          <UserPlus className="h-14 w-14 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-2 text-gray-800">
            {t("registration.createAccount")}
          </h2>
          <p className="text-gray-500 mb-8">
            {t("registration.signInToContinue")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer */}
            <button
              onClick={() => navigate("/register/customer")}
              className="p-8 border border-gray-200 rounded-2xl hover:border-orange-500 hover:shadow-lg transition flex items-center gap-4 bg-white"
            >
              <User className="w-10 h-10 text-orange-500" />
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 text-orange-500">
                  {t("registration.customer")}
                </h3>
                <p className="text-gray-600">
                  {t("registration.customerDetails")}
                </p>
              </div>
            </button>

            {/* Worker */}
            <button
              onClick={() => navigate("/register/worker")}
              className="p-8 border border-gray-200 rounded-2xl hover:border-orange-500 hover:shadow-lg transition flex items-center gap-4 bg-white"
            >
              <Hammer className="w-10 h-10 text-orange-500" />
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 text-orange-500">
                  {t("registration.worker")}
                </h3>
                <p className="text-gray-600">
                  {t("registration.workerDetails")}
                </p>
              </div>
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            {t("registration.haveAccount")}{" "}
            <Link
              to="/login"
              className="text-orange-500 font-semibold hover:underline"
            >
              {t("common.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
