import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { BriefcaseBusiness } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Login | SkillBridge AI",
  description: "Login to your SkillBridge account",
};

export default async function LoginPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <BriefcaseBusiness className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
          Skill<span className="text-blue-600">Bridge</span>
        </span>
      </Link>
      
      <LoginForm />
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        {t("notRegistered")}{" "}
        <Link
          href={`/${locale}/auth/register`}
          className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
        >
          {t("signup")}
        </Link>
      </p>
    </div>
  );
}

