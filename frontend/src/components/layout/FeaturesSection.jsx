import { ShieldCheck, Clock, Headphones } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import useTranslation from "../../hook/useTranslation";

const FeaturesSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t("features.verifiedTitle"),
      desc: t("features.verifiedDesc"),
    },
    {
      icon: Clock,
      title: t("features.fastTitle"),
      desc: t("features.fastDesc"),
    },
    {
      icon: Headphones,
      title: t("features.supportTitle"),
      desc: t("features.supportDesc"),
    },
  ];

  return (
    <section className="w-full py-24" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
          {t("features.title")}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          {t("features.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <Icon className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
