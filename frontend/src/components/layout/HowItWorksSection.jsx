"use client"

import { useState } from "react"
import {
  UserPlus,
  Wrench,
  CalendarCheck,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import useTranslation from "../../hook/useTranslation"

export default function HowItWorksSection() {
  const { isRTL } = useLanguage()
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { icon: UserPlus, title: t("how.registerTitle"), desc: t("how.registerDesc") },
    { icon: Wrench, title: t("how.chooseTitle"), desc: t("how.chooseDesc") },
    { icon: CalendarCheck, title: t("how.bookTitle"), desc: t("how.bookDesc") },
    { icon: Star, title: t("how.feedbackTitle"), desc: t("how.feedbackDesc") },
  ]

  const nextStep = () => setActiveStep((p) => (p + 1) % steps.length)
  const prevStep = () => setActiveStep((p) => (p - 1 + steps.length) % steps.length)

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            {t("how.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t("how.title")}
          </h2>
        </div>

        {/* Progress */}
        <div className="flex justify-center items-center gap-3 mb-14">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-full font-bold transition-all duration-300
                ${
                  i === activeStep
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40 scale-110"
                    : "bg-white border text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-10 md:w-20 h-1 mx-2 rounded-full transition-all duration-300 ${
                    i < activeStep ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="relative max-w-xl mx-auto">
          {/* Arrows */}
          <button
            onClick={isRTL ? nextStep : prevStep}
            className={`absolute ${
              isRTL ? "-right-12" : "-left-12"
            } top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
              bg-white/80 backdrop-blur border shadow hover:scale-110
              transition`}
          >
            <ChevronLeft className="mx-auto text-gray-600" />
          </button>

          <button
            onClick={isRTL ? prevStep : nextStep}
            className={`absolute ${
              isRTL ? "-left-12" : "-right-12"
            } top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
              bg-white/80 backdrop-blur border shadow hover:scale-110
              transition`}
          >
            <ChevronRight className="mx-auto text-gray-600" />
          </button>

          {/* Step Card */}
          <div className="relative h-80">
            {steps.map((step, i) => {
              const Icon = step.icon
              const active = i === activeStep

              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-500
                  ${
                    active
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="h-full bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-9 h-9 text-white" />
                    </div>

                    <span className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2">
                      Step {i + 1}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeStep
                    ? "w-8 bg-orange-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
