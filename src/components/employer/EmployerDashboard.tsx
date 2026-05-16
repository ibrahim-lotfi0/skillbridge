"use client";

import { useTranslations } from "next-intl";
import { JobPostForm } from "./JobPostForm";
import { Users, Briefcase, Plus, TrendingUp, Search, ArrowLeft, CheckCircle2, XCircle, FileUser } from "lucide-react";
import { useState, useEffect } from "react";
import { getJobApplicantsAction, updateApplicationStatusAction } from "@/app/actions/job";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "../shared/NotificationCenter";

interface Props {
  user: any;
  jobs: any[];
  notifications?: any[];
}

export function EmployerDashboard({ user, jobs, notifications = [] }: Props) {
  const t = useTranslations("Dashboard");
  const tIndex = useTranslations("Index");
  const [showPostForm, setShowPostForm] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [isLoadingApplicants, setIsLoadingApplicants] = useState(false);

  useEffect(() => {
    if (activeJob) {
      loadApplicants(activeJob.id);
    }
  }, [activeJob]);

  const loadApplicants = async (jobId: string) => {
    setIsLoadingApplicants(true);
    const res = await getJobApplicantsAction(jobId);
    if (res.success) {
      setApplicants(res.applications || []);
    }
    setIsLoadingApplicants(false);
  };

  const handleStatusUpdate = async (appId: string, status: string) => {
    const res = await updateApplicationStatusAction(appId, status);
    if (res.success && activeJob) {
      loadApplicants(activeJob.id);
    }
  };

  if (activeJob) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveJob(null)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{activeJob.title}</h1>
              <p className="text-sm text-slate-500">{t("applicants")} • {t("matchScore")}</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4">
          {isLoadingApplicants ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500">Analyzing applicants...</p>
            </div>
          ) : applicants.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">No applicants yet for this position.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applicants.map((app) => (
                <div key={app.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <FileUser className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white capitalize">{app.seeker.name}</h3>
                      <p className="text-xs text-slate-500">{app.seeker.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("matchScore")}</p>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-sm font-bold",
                        app.matchScore >= 80 ? "bg-emerald-100 text-emerald-600" :
                        app.matchScore >= 50 ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                      )}>
                        {app.matchScore}%
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                      <span className="text-xs font-semibold capitalize text-slate-600 dark:text-slate-300">{app.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(app.id, "SHORTLISTED")}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-all"
                        title="Shortlist"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button 
                         onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("welcome")}, {user.name?.split(" ")[0]}!</h1>
            <p className="text-slate-500 dark:text-slate-400">{t("employerPortal")} • {t("activeJobs")}: {jobs.length}</p>
          </div>
          <div className="flex items-center gap-4">
             <NotificationCenter notifications={notifications} />
             <button 
                onClick={() => setShowPostForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                {t("postJob")}
              </button>
          </div>
        </header>

      {showPostForm && (
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          <JobPostForm />
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Active Jobs</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{jobs.length}</p>
        </div>
        
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Total Applicants</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Avg. Match Rate</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
        </div>
      </div>

      <section className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t("activeJobs")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No jobs posted yet. Start by clicking &quot;Post New Job&quot;.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500">{job.location} • {job.salaryRange || 'Competitive'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg">
                    0 {t("applicants")}
                  </span>
                  <button 
                    onClick={() => setActiveJob(job)}
                    className="text-sm font-bold text-blue-600 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
