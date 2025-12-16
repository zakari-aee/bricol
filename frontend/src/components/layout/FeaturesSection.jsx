"use client"

import { Shield, Clock, Wallet, Users, Headphones, Award } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import useTranslation from "../../hook/useTranslation"

export default function FeaturesSection() {
  const { isRTL } = useLanguage()
  const { t } = useTranslation()

  const features = [
    { icon: Shield, title: t("features.verifiedTitle"), desc: t("features.verifiedDesc") },
    { icon: Clock, title: t("features.fastTitle"), desc: t("features.fastDesc") },
    { icon: Wallet, title: t("features.affordableTitle"), desc: t("features.affordableDesc") },
    { icon: Users, title: t("features.expertsTitle"), desc: t("features.expertsDesc") },
    { icon: Headphones, title: t("features.supportTitle"), desc: t("features.supportDesc") },
    { icon: Award, title: t("features.qualityTitle"), desc: t("features.qualityDesc") },
  ]

  return (
    <section className="w-full py-28 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-orange-600 font-semibold text-base tracking-wide uppercase mb-4">
            {t("features.subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t("features.title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("features.description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group p-8 rounded-3xl border border-gray-100 bg-white
                  hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10
                  transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6
                  group-hover:bg-orange-500 transition-colors duration-300"
                >
                  <Icon
                    className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
