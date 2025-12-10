import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useTranslation from "../../hook/useTranslation";
import LanguageSwitcher from "../../components/layout/LanguageSwitcher";

const WorkerRegister = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    experienceYears: "",
    category: "",
    worksWeekends: "", // "weekends" or "weekdays"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signUpWorker } = useAuth();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();

  const categories = [
    { label: `⚡ ${t("services.electrical")}`, value: "electrical" },
    { label: `🚿 ${t("services.plumbing")}`, value: "plumbing" },
    { label: `🪚 ${t("services.carpentry")}`, value: "carpentry" },
    { label: `🎨 ${t("services.painting")}`, value: "painting" },
    { label: `❄️ ${t("services.ac")}`, value: "ac" },
    { label: `🚚 ${t("services.furniture")}`, value: "furniture" },
    { label: `🧹 ${t("services.cleaning")}`, value: "cleaning" },
    { label: `🛠️ ${t("services.installation")}`, value: "installation" },
  ];

  // ========================
  // Validation Functions
  // ========================
  const validateFullName = (name) => {
    if (!name.trim()) return "fillRequiredFields";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "invalidFullName";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "fillRequiredFields";
    if (!/^\+?\d{8,15}$/.test(phone)) return "invalidPhone";
    return "";
  };

  const validateWhatsapp = (whatsapp) => {
    if (!whatsapp) return "";
    if (!/^\+?\d{8,15}$/.test(whatsapp)) return "invalidWhatsapp";
    return "";
  };

  const validateExperienceYears = (years) => {
    if (years === "") return "fillRequiredFields";
    const num = Number(years);
    if (isNaN(num) || num < 0 || num > 30) return "invalidExperience";
    return "";
  };

  const validateCategory = (category) => {
    if (!category) return "selectCategory";
    return "";
  };

  const validateWorksWeekends = (worksWeekends) => {
    if (!worksWeekends) return "selectAvailability";
    return "";
  };

  const validateStep = (step, data) => {
    switch (step) {
      case 0:
        return (
          validateFullName(data.fullName) ||
          validatePhone(data.phone) ||
          validateWhatsapp(data.whatsapp) ||
          validateExperienceYears(data.experienceYears)
        );
      case 1:
        return validateCategory(data.category);
      case 2:
        return validateWorksWeekends(data.worksWeekends);
      default:
        return "";
    }
  };

  // ========================
  // Handlers
  // ========================
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setError("");
    const stepError = validateStep(step, formData);
    if (stepError) {
      setError(t(`errors.${stepError}`));
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setError("");
    const stepError = validateStep(step, formData);
    if (stepError) {
      setError(t(`errors.${stepError}`));
      return;
    }

    setLoading(true);
    const result = await signUpWorker(formData);
    if (result.success) {
      setSuccess(t("worker.registrationSuccess"));
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.error || t("worker.registrationError"));
    }
    setLoading(false);
  };

  // ========================
  // JSX
  // ========================
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="simple" />
      </div>

      <form
        className={`w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 space-y-6 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <>
            <h2 className="text-2xl font-extrabold text-center mb-4 text-gray-800">
              {t("worker.personalInfo")}
            </h2>
            <input
              type="text"
              placeholder={t("worker.fullName")}
              value={formData.fullName}
              onChange={(e) =>
                handleChange("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
            <input
              type="tel"
              placeholder={t("worker.phone")}
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value.replace(/[^\d+]/g, ""))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
            <input
              type="tel"
              placeholder={t("worker.whatsapp")}
              value={formData.whatsapp}
              onChange={(e) =>
                handleChange("whatsapp", e.target.value.replace(/[^\d+]/g, ""))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
            <input
              type="number"
              placeholder={t("worker.experienceYears")}
              value={formData.experienceYears}
              onChange={(e) =>
                handleChange("experienceYears", e.target.value.replace(/\D/g, ""))
              }
              min={0}
              max={30}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
          </>
        )}

        {/* Step 1: Specialty */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-extrabold text-center mb-4 text-gray-800">
              {t("worker.specialtyQuestion")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => handleChange("category", cat.value)}
                  className={`p-4 border rounded-xl text-center transition ${
                    formData.category === cat.value
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white text-gray-800 hover:bg-orange-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Weekend Availability */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-extrabold text-center mb-4 text-gray-800">
              {t("worker.availabilityQuestion")}
            </h2>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => handleChange("worksWeekends", "weekends")}
                className={`p-4 border rounded-xl text-center transition ${
                  formData.worksWeekends === "weekends"
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-800 hover:bg-orange-50"
                }`}
              >
                {t("worker.weekends")}
              </button>
              <button
                type="button"
                onClick={() => handleChange("worksWeekends", "weekdays")}
                className={`p-4 border rounded-xl text-center transition ${
                  formData.worksWeekends === "weekdays"
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-800 hover:bg-orange-50"
                }`}
              >
                {t("worker.weekdays")}
              </button>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 flex items-center font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("common.back")}
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 flex items-center font-semibold"
            >
              {t("common.next")} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 flex items-center font-semibold"
            >
              {loading ? t("common.submitting") : t("common.submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WorkerRegister;
