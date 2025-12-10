import { UserPlus, Wrench, CalendarCheck, Star } from "lucide-react";
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
      icon: Star,
      title: t("how.feedbackTitle"),
      desc: t("how.feedbackDesc"),
    },
  ];

  return (
    <section className="w-full py-28" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
          {t("how.title")}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          {t("how.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative backdrop-blur-xl bg-white/70 p-8 rounded-3xl border border-gray-200 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold shadow-md">
                  {i + 1}
                </div>

                <Icon className="w-10 h-10 text-orange-500 mx-auto mb-4 mt-4" />

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600">
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
