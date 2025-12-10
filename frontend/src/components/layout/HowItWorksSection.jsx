import { UserPlus, Wrench, CalendarCheck, CreditCard } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import useTranslation from "../../hook/useTranslation";

const HowItWorksSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      title: t("how.registerTitle"),
      desc: t("how.registerDesc"),
    },
    {
      icon: Wrench,
      title: t("how.chooseTitle"),
      desc: t("how.chooseDesc"),
    },
    {
      icon: CalendarCheck,
      title: t("how.bookTitle"),
      desc: t("how.bookDesc"),
    },
    {
      icon: CreditCard,
      title: t("how.payTitle"),
      desc: t("how.payDesc"),
    },
  ];

  return (
    <section
      className="w-full py-24 bg-gradient-to-b from-white to-gray-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {t("how.title")}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
          {t("how.subtitle")}
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                <Icon className="w-10 h-10 text-orange-500 mx-auto mb-6" />

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-base">
                  {step.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
