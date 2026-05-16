"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { NotificationCenter } from "../shared/NotificationCenter";
import { ResumeUpload } from "./ResumeUpload";
import { SkillGapAnalysis } from "./SkillGapAnalysis";
import { Sparkles, Briefcase, Target, BookOpen, Heart, Plus, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { SaveJobButton } from "../shared/SaveJobButton";

interface Props {
  user: any;
  profile: any;
  applications: any[];
  savedJobs: any[];
  notifications: any[];
}

export function SeekerDashboard({ user, profile, applications = [], savedJobs = [], notifications = [] }: Props) {
  const t = useTranslations("Dashboard");
  const tAI = useTranslations("AI");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"applications" | "saved">("applications");

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t("welcome")}, {user.name?.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("seekerProfile")} • Monitor your career progress
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter notifications={notifications} />
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {t("matchScore")}: {profile?.matchScore || 0}%
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Resume Section */}
          <section>
            <ResumeUpload />
          </section>

          {/* AI Skill Gap Analysis */}
          {profile?.parsedData && (
            <section>
              <SkillGapAnalysis existingAnalysis={profile?.skillGaps} />
            </section>
          )}

          {/* AI Matches Placeholder - Renamed to Recommended Jobs */}
          <section className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Recommended Jobs
              </h2>
              <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
            </div>
            
            {!profile?.skills?.length ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500">Upload your resume to see matching jobs</p>
              </div>
            ) : (
              <div className="space-y-4 text-center py-8">
                <Sparkles className="w-8 h-8 text-blue-500 mx-auto opacity-20" />
                <p className="text-slate-500 text-sm">AI is finding the best matches for your {profile.skills.length} skills...</p>
              </div>
            )}
          </section>

          {/* Center Tabs Section */}
          <section className="p-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex p-1 gap-1">
              <button 
                onClick={() => setActiveTab("applications")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                  activeTab === "applications" 
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <Briefcase className="w-4 h-4" />
                {t("myApplications")}
                {applications.length > 0 && (
                   <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-[10px] text-white rounded-full">
                     {applications.length}
                   </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab("saved")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                  activeTab === "saved" 
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <Heart className="w-4 h-4" />
                {t("savedJobs")}
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === "applications" ? (
                <div>
                  {applications.length === 0 ? (
                    <p className="text-center py-10 text-slate-400 italic text-sm">You haven&apos;t applied to any jobs yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                      {applications.map((app) => (
                        <div key={app.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between group">
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {app.job.title}
                            </h4>
                            <p className="text-xs text-slate-500">{app.job.employer.name} • {new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            {app.matchScore && (
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                {app.matchScore}%
                              </span>
                            )}
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full",
                              app.status === "PENDING" ? "bg-amber-100 text-amber-600" :
                              app.status === "SHORTLISTED" ? "bg-emerald-100 text-emerald-600" :
                              "bg-slate-100 text-slate-600"
                            )}>
                              {app.status}
                            </span>
                            <Link 
                              href={`/${locale}/jobs/${app.job.id}/interview`}
                              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                              title="Practice Interview"
                            >
                              <Bot className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                   {savedJobs.length === 0 ? (
                    <p className="text-center py-10 text-slate-400 italic text-sm">You haven&apos;t saved any jobs yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                      {savedJobs.map((sj) => (
                        <div key={sj.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between group">
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {sj.job.title}
                            </h4>
                            <p className="text-xs text-slate-500">{sj.job.employer.name} • {sj.job.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <Link 
                              href={`/${locale}/jobs/${sj.job.id}/interview`}
                              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                              title="Practice Interview"
                            >
                              <Bot className="w-4 h-4" />
                            </Link>
                             <SaveJobButton jobId={sj.job.id} initialSaved={true} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Career Roadmap
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Our AI is building a personalized path to your dream role.
            </p>
            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold transition-all">
              Initialize Roadmap
            </button>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">My Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill: string) => (
                <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg">
                  {skill}
                </span>
              ))}
              {!profile?.skills?.length && <p className="text-xs text-slate-400 italic">No skills extracted yet</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
