import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { matchCandidateToJob } from "@/lib/gemini";
import { Briefcase, MapPin, DollarSign, Sparkles, Heart } from "lucide-react";
import { Link, redirect } from "@/navigation";
import { SaveJobButton } from "@/components/shared/SaveJobButton";

export const dynamic = "force-dynamic";

export default async function JobsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  // MOCK DATA: Bypassing auth and database to build the Frontend UI completely.
  const jobsWithMatches = [
    {
      id: "job-1",
      title: "Senior Next.js & React Developer",
      location: "Riyadh, Saudi Arabia (Remote)",
      salaryRange: "SAR 15,000 - 25,000",
      description: "Looking for an experienced Senior Frontend Developer.",
      requirements: ["React.js", "Next.js", "TypeScript", "TailwindCSS"],
      employer: { name: "TechNova Innovators" },
      isSaved: false,
      matchData: {
        matchPercentage: 85,
        summary: "Your strong background in React and Next.js makes you an excellent fit for this role."
      }
    },
    {
      id: "job-2",
      title: "UI/UX Designer",
      location: "Dubai, UAE (Hybrid)",
      salaryRange: "AED 12,000 - 18,000",
      description: "We need a creative designer with a passion for user experience.",
      requirements: ["Figma", "Prototyping", "User Research", "Adobe Creative Suite"],
      employer: { name: "Creative Minds Agency" },
      isSaved: true,
      matchData: {
        matchPercentage: 60,
        summary: "You have design skills, but lack specific user research experience."
      }
    },
    {
      id: "job-3",
      title: "Backend Node.js Engineer",
      location: "Amman, Jordan",
      salaryRange: "JOD 1,500 - 2,500",
      description: "Join our core team building high-performance APIs.",
      requirements: ["Node.js", "Express", "PostgreSQL", "Docker"],
      employer: { name: "CloudGate Systems" },
      isSaved: false,
      matchData: {
        matchPercentage: 95,
        summary: "Exceptional match! Your extensive backend experience perfectly aligns with the requirements."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {locale === "ar" ? "استكشف الفرص المتاحة" : "Discover Your Next Role"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {locale === "ar" 
              ? "تصفح فرص العمل المنسقة بالذكاء الاصطناعي والمصممة خصيصاً لمجموعة مهاراتك الفريدة."
              : "Browse through AI-curated job opportunities tailored to your unique skill set."}
          </p>
        </div>

        <div className="space-y-6">
          {jobsWithMatches.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
              <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">
                {locale === "ar" ? "لم يتم العثور على وظائف. تحقق لاحقاً!" : "No jobs found. Check back later!"}
              </p>
            </div>
          ) : (
            jobsWithMatches.map((job) => (
              <div
                key={job.id}
                className="group p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h2>
                      {job.matchData && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800/50">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {job.matchData.matchPercentage}% Match
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" />
                        {job.salaryRange || "Competitive"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {job.employer?.name || "SkillBridge Partner"}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(job.requirements as string[])?.slice(0, 4).map((req) => (
                        <span
                          key={req}
                          className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase rounded-md"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <SaveJobButton jobId={job.id} initialSaved={!!(job as any).isSaved} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                      {locale === "ar" ? "عرض التفاصيل" : "View Details"}
                    </Link>
                  </div>
                </div>

                {job.matchData && (
                  <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                      AI Insight: {job.matchData.summary}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
