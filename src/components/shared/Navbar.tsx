"use client";

import { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, BriefcaseBusiness, Globe, Moon, Sun, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const t = useTranslations("Navigation");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    // @ts-ignore - next-intl accepts locale option
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: "/jobs", label: t("jobs") },
    { href: "/gigs", label: t("gigs") || "Gigs" },
    { href: "/learning", label: t("learning") || "Learning" },
    { href: "/companies", label: t("companies") },
  ];

  if (!mounted) {
    return (
      <nav className="fixed top-4 inset-x-4 z-50 py-5 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 opacity-0">
          <div className="w-10 h-10 rounded-2xl bg-slate-900" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "fixed top-4 inset-x-4 z-50 transition-all duration-500 rounded-[2rem]",
        isScrolled
          ? "glass-card py-3 px-6 shadow-2xl"
          : "bg-transparent py-5 px-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
              <BriefcaseBusiness className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tighter">
              Skill<span className="text-blue-600">Bridge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-xl transition-all"
            >
              <Globe className="w-4 h-4" />
              {locale === "ar" ? "English" : "عربي"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-bold"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card p-2 z-50 animate-in fade-in zoom-in-95 duration-200 bg-white dark:bg-slate-950 shadow-2xl border border-slate-100 dark:border-slate-800">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {t("dashboard")}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("signOut")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-6 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 glass-card mx-4 p-6 bg-white dark:bg-slate-950 animate-in slide-in-from-top-4 duration-300 overflow-hidden">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between text-lg font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between gap-4">
                 <button 
                  onClick={toggleLocale} 
                  className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm"
                >
                  <Globe className="w-5 h-5" />
                  {locale === "ar" ? "English" : "عربي"}
                </button>
                <button 
                  onClick={toggleTheme} 
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {!session ? (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/auth/login" 
                    className="w-full text-center py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="w-full text-center py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("signup")}
                  </Link>
                </div>
              ) : (
                <Link 
                  href="/dashboard"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {t("dashboard")}
                </Link>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-2 py-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
               <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  {t("poweredByAI")}
               </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
