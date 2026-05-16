"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeUpload } from "./ResumeUpload";
import { CheckCircle2, ChevronRight, User, Target, Sparkles, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function OnboardingWizard({ user, locale }: { user: any, locale: string }) {
  const [goals, setGoals] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const t = useTranslations("Onboarding");

  const nextStep = () => setStep(s => s + 1);

  const handleFinish = () => {
    router.push(`/${locale}/dashboard`);
  };

  const steps = [
    { title: "Identity", icon: User },
    { title: "Experience", icon: Rocket },
    { title: "Goals", icon: Target },
    { title: "Done", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
              step > i + 1 ? "bg-emerald-500 text-white" :
              step === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" :
              "bg-slate-200 dark:bg-slate-800 text-slate-400"
            )}>
              {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "h-1 flex-1 mx-4 rounded-full",
                step > i + 1 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
              )} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto animate-float" />
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {t("welcome", { name: user.name })}
              </h1>
              <p className="text-slate-500 max-w-md mx-auto">
                {t("subtitle")}
              </p>
            </div>
            
            <button
              onClick={nextStep}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 mx-auto"
            >
              {t("getStarted")}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("foundation")}</h2>
              <p className="text-slate-500 text-sm">{t("cvSubtitle")}</p>
            </div>
            <ResumeUpload />
            <div className="flex justify-center">
              <button
                onClick={nextStep}
                className="text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors"
              >
                {t("skip")}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("goalsTitle")}</h2>
              <p className="text-slate-500 text-sm">{t("goalsSubtitle")}</p>
            </div>
            
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder={t("goalsPlaceholder")}
              className="w-full h-40 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />

            <button
              onClick={nextStep}
              disabled={!goals.trim()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {t("getStarted")}
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t("finish")}</h2>
              <p className="text-slate-500">
                {t("finishSubtitle")}
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl transition-all"
            >
              {t("goDashboard")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
