"use client";

import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const stats = [
    { value: "50K+", label: t("stats.seekers") },
    { value: "3K+", label: t("stats.companies") },
    { value: "92%", label: t("stats.placement") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      {/* Animated premium background */}
      <div className="absolute inset-0 -z-10 bg-mesh pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_70%)] opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-legendary-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-legendary-float" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-blue-600 dark:text-blue-400 text-sm font-bold mb-10 shadow-xl animate-reveal">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wide uppercase text-[10px]">{t("poweredByAI")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-10 animate-reveal" style={{ animationDelay: "0.2s" }}>
            {locale === "ar" ? (
              <>
                اكتشف وظيفة{" "}
                <span className="text-gradient">تناسبك</span>
                <br />
                بذكاء مستقبلي
              </>
            ) : (
              <>
                Find Your{" "}
                <span className="text-gradient">Legendary</span>
                <br />
                Career Path
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-reveal" style={{ animationDelay: "0.4s" }}>
            {locale === "ar"
              ? "تحول جذري في مستقبلك المهني. نستخدم الذكاء الاصطناعي الأكثر تطوراً لتحليل مهاراتك وبناء خارطة طريق لنجاحك."
              : "A radical transformation in your professional future. We use state-of-the-art AI to analyze your skills and build a roadmap for your success."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-reveal relative z-20" style={{ animationDelay: "0.6s" }}>
            <Link
              href="/auth/register"
              className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer pointer-events-auto"
            >
              {t("getStarted")}
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-800 shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-500 cursor-pointer pointer-events-auto"
            >
              {t("searchJobs")}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" className="fill-white dark:fill-slate-950" />
        </svg>
      </div>
    </section>
  );
}
