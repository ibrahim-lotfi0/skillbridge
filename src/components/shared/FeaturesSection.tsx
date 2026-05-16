"use client";

import { useLocale, useTranslations } from "next-intl";
import { Brain, Target, BookOpen, BarChart3, Shield, Zap, Layout, Briefcase, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-blue-200 dark:ring-blue-800",
  emerald: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-800",
  purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 ring-purple-200 dark:ring-purple-800",
  amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 ring-amber-200 dark:ring-amber-800",
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-indigo-200 dark:ring-indigo-800",
  rose: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 ring-rose-200 dark:ring-rose-800",
};

export function FeaturesSection() {
  const t = useTranslations("Index.features");
  const locale = useLocale();
  
  const features = [
    {
      title: t("aiMatching"),
      description: t("aiMatchingDesc"),
      icon: Brain,
      color: "blue",
    },
    {
      title: t("cvParsing"),
      description: t("cvParsingDesc"),
      icon: Zap,
      color: "emerald",
    },
    {
      title: t("dashboard"),
      description: t("dashboardDesc"),
      icon: Layout,
      color: "purple",
    },
    {
      title: t("interview"),
      description: t("interviewDesc"),
      icon: Briefcase,
      color: "amber",
    },
    {
      title: t("salary"),
      description: t("salaryDesc"),
      icon: Target,
      color: "indigo",
    },
    {
      title: t("coaching"),
      description: t("coachingDesc"),
      icon: Bot,
      color: "rose",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/50 mb-6 shadow-sm">
             {locale === "ar" ? "الميزات الثورية" : "Revolutionary Features"}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            {t("subtitle")}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative p-8 glass-card hover-premium"
              >
                <div className={cn("w-14 h-14 rounded-2xl ring-1 flex items-center justify-center mb-6 shadow-lg", colorMap[feature.color])}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
