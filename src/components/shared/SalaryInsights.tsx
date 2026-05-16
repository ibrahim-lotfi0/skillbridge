"use client";

import { useState, useEffect } from "react";
import { getSalaryInsightsAction } from "@/app/actions/interview";
import { DollarSign, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function SalaryInsights({ jobId }: { jobId: string }) {
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await getSalaryInsightsAction(jobId);
      if (res.success) {
        setInsights(res.insights);
      }
      setIsLoading(false);
    };
    fetchInsights();
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
           <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
           <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">AI Salary Insights</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <TrendingUp className="w-3 h-3 text-blue-600" />
          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">Market Data</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
           <p className="text-2xl font-black text-slate-900 dark:text-white">
             {insights.min.toLocaleString()} - {insights.max.toLocaleString()} {insights.currency}
           </p>
           <p className="text-xs text-slate-500 mt-1">Estimated annual salary for this role</p>
        </div>

        <div className="space-y-2">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Influencing Factors</p>
           <ul className="space-y-1.5">
             {insights.factors.map((f: string, i: number) => (
               <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex gap-2">
                  <span className="text-emerald-500">•</span>
                  {f}
               </li>
             ))}
           </ul>
        </div>

        <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
           <div className="flex items-center gap-2 text-[10px] text-slate-400">
             <AlertCircle className="w-3 h-3" />
             AI Confidence: <span className={insights.confidence === 'high' ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>{insights.confidence.toUpperCase()}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
