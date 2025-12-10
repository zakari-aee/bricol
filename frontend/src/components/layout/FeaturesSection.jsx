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
    <section
      className="w-full py-24 bg-gradient-to-b from-gray-50 to-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {t("features.title")}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
          {t("features.subtitle")}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition"
              >
                <Icon className="w-10 h-10 text-orange-500 mx-auto mb-6" />

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-base">
                  {feature.desc}
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
