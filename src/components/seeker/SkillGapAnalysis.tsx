"use client";

import { useState } from "react";
import { analysisSkillGapsAction } from "@/app/actions/analysis";
import { Brain, Rocket, Lightbulb, CheckCircle2, Loader2, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  existingAnalysis: any;
}

export function SkillGapAnalysis({ existingAnalysis }: Props) {
  const [targetRole, setTargetRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(existingAnalysis);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!targetRole) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const res = await analysisSkillGapsAction(targetRole);
      if (res.success) {
        setAnalysis(res.analysis);
      } else {
        setError(res.error || "Failed to generate analysis");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Skill Gap Analysis</h2>
            <p className="text-sm text-slate-500">Pick a target role and let AI build your roadmap</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500 transition-all outline-none"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!targetRole || isAnalyzing}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
            Analyze Gap
          </button>
        </div>

        {error && <p className="mt-3 text-xs text-red-500 ml-1">{error}</p>}
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Missing Skills */}
          <section className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Missing Skills
            </h3>
            <div className="space-y-3">
              {analysis.missingSkills?.map((skill: any) => (
                <div key={skill.name} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-md",
                    skill.importance === 'high' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {skill.importance}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Path */}
          <section className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-blue-500" />
              Learning Roadmap
            </h3>
            <div className="relative space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
              {analysis.learningPath?.map((step: any) => (
                <div key={step.step} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.description}</p>
                  <p className="text-[10px] text-blue-500 mt-1 font-semibold">{step.estimatedTime}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CV Improvements */}
          <section className="md:col-span-2 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-3xl">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              CV Optimization Advice
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.cvImprovements?.map((tip: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-emerald-800 dark:text-emerald-500">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
