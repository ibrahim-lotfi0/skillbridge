"use client";

import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BriefcaseBusiness } from "lucide-react";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Navigation");

  const links = {
    platform: {
      label: locale === "ar" ? "المنصة" : "Platform",
      items: [
        { href: "/jobs", label: locale === "ar" ? "الوظائف" : "Browse Jobs" },
        { href: "/companies", label: locale === "ar" ? "الشركات" : "Companies" },
        { href: "/pricing", label: locale === "ar" ? "الأسعار" : "Pricing" },
      ],
    },
    company: {
      label: locale === "ar" ? "الشركة" : "Company",
      items: [
        { href: "/about", label: locale === "ar" ? "عن المنصة" : "About" },
        { href: "/blog", label: locale === "ar" ? "المدونة" : "Blog" },
        { href: "/contact", label: locale === "ar" ? "تواصل معنا" : "Contact" },
      ],
    },
    legal: {
      label: locale === "ar" ? "قانوني" : "Legal",
      items: [
        { href: "/privacy", label: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy" },
        { href: "/terms", label: locale === "ar" ? "شروط الاستخدام" : "Terms of Service" },
      ],
    },
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                <BriefcaseBusiness className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Skill<span className="text-blue-600">Bridge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
              {locale === "ar"
                ? "منصة التوظيف المدعومة بالذكاء الاصطناعي. تدعم هدف الأمم المتحدة للتنمية المستدامة رقم 8."
                : "AI-powered job matching platform. Supporting UN SDG Goal 8: Decent Work & Economic Growth."}
            </p>
          </div>

          {/* Links */}
          {Object.values(links).map((section) => (
            <div key={section.label}>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{section.label}</h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} SkillBridge AI.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {locale === "ar" ? "جميع الأنظمة تعمل" : "All systems operational"}
          </div>
        </div>
      </div>
    </footer>
  );
}
