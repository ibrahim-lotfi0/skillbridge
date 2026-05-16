import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { matchCandidateToJob } from "@/lib/gemini";
import { Briefcase, MapPin, DollarSign, Sparkles, CheckCircle2, ListChecks } from "lucide-react";
import { Link, redirect } from "@/navigation";
import { notFound } from "next/navigation";
import { ApplyButton } from "@/components/shared/ApplyButton";
import { SalaryInsights } from "@/components/shared/SalaryInsights";
import { Bot } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function JobDetailPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;

  // MOCK DATA: Bypassing auth and database to build the Frontend UI completely.
  const job = {
    id: id,
    title: "Senior Next.js & React Developer",
    location: "Riyadh, Saudi Arabia (Remote)",
    salaryRange: "SAR 15,000 - 25,000",
    description: "We are looking for an experienced Senior Frontend Developer to lead our next-generation web applications. You will be responsible for architecting scalable frontend solutions using Next.js, React, and TypeScript. You should have a deep understanding of server-side rendering, performance optimization, and modern state management.",
    requirements: [
      "5+ years of experience with React.js and modern frontend architecture.",
      "Strong proficiency in Next.js (App Router), TypeScript, and TailwindCSS.",
      "Experience with state management libraries (Zustand, Redux).",
      "Familiarity with consuming GraphQL and REST APIs.",
      "A portfolio of high-performance web applications."
    ],
    employer: { name: "TechNova Innovators" }
  };

  const hasApplied = false; // Set to false to show the Apply button

  // Mock AI Match Data
  const matchData = {
    matchPercentage: 85,
    summary: "Your strong background in React and Next.js makes you an excellent fit for this role. However, strengthening your GraphQL experience would increase your chances.",
    matchingSkills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    strategicAdvice: [
      "Highlight your past Next.js App Router projects in your application.",
      "Review common GraphQL patterns before the interview.",
      "Emphasize your ability to lead technical decisions."
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/jobs`}
          className="inline-flex items-center text-sm font-semibold text-blue-600 mb-8 hover:underline"
        >
          {locale === "ar" ? "← العودة إلى كافة الوظائف" : "← Back to All Jobs"}
        </Link>

        <div className="space-y-8">
          {/* Header Card */}
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    {job.salaryRange || "Competitive"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    {job.employer?.name || "SkillBridge Partner"}
                  </div>
                </div>
              </div>
              <ApplyButton jobId={job.id} initialApplied={!!hasApplied} />
            </div>
          </div>

          {/* AI Insights Card */}
          {matchData && (
            <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-200" />
                  <h2 className="text-xl font-bold">{locale === "ar" ? "رؤية المطابقة" : "AI Match Insight"}</h2>
                </div>
                <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-lg font-bold">
                  {matchData.matchPercentage}%
                </div>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed italic">
                &quot;{matchData.summary}&quot;
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Matching Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchData.matchingSkills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200 flex items-center gap-2">
                    <ListChecks className="w-4 h-4" />
                    {locale === "ar" ? "نصيحة استراتيجية" : "Strategic Advice"}
                  </h3>
                  <ul className="space-y-1.5 list-disc list-inside text-xs text-blue-100">
                    {matchData.strategicAdvice?.map((a: string, i: number) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                 <Link 
                   href={`/jobs/${id}/interview`}
                   className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
                 >
                   <Bot className="w-5 h-5" />
                   {locale === "ar" ? "بدء مقابلة تجريبية" : "Start Practice Interview"}
                 </Link>
              </div>
            </div>
          )}

          {/* Description & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  {locale === "ar" ? "وصف الوظيفة" : "Job Description"}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </section>

              <section className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  {locale === "ar" ? "المتطلبات" : "Requirements"}
                </h2>
                <ul className="space-y-3">
                  {(job.requirements as string[])?.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <section className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">About the Employer</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {job.employer?.name || "SkillBridge Partner"} is committed to fostering innovation and inclusive growth in accordance with SDG Goal 8.
                </p>
              </section>

              <SalaryInsights jobId={job.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
