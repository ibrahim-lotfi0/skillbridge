"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Navbar } from "@/components/shared/Navbar";
import { BookOpen, CheckCircle2, PlayCircle, Target, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LearningRoadmapPage() {
  const locale = useLocale();

  // MOCK DATA: Bypassing auth and database
  const userRole = "Mid-Level Frontend Developer";
  const dreamRole = "Senior Next.js Architect";
  const matchScore = 75;

  const roadmapSteps = [
    {
      id: 1,
      status: "completed",
      title: "React Fundamentals & Hooks",
      description: "Mastered the core concepts of React, including state management and lifecycle hooks.",
      duration: "Completed",
      type: "core",
    },
    {
      id: 2,
      status: "in-progress",
      title: "Advanced Next.js App Router",
      description: "Learn Server Components, streaming, and advanced routing patterns.",
      duration: "4 Hours",
      type: "course",
      provider: "Coursera",
      link: "#"
    },
    {
      id: 3,
      status: "locked",
      title: "GraphQL & Apollo Client",
      description: "Understand how to fetch and mutate data efficiently using GraphQL.",
      duration: "2 Weeks",
      type: "project",
    },
    {
      id: 4,
      status: "locked",
      title: "AWS Cloud Practitioner Basics",
      description: "Learn fundamental cloud concepts for deploying full-stack applications.",
      duration: "1 Week",
      type: "certification",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Your Skill Gap Roadmap
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
            <div className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-600 dark:text-slate-400 shadow-sm">
              {userRole}
            </div>
            <ArrowRight className="w-6 h-6 text-slate-300 hidden sm:block" />
            <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-transparent rounded-xl font-bold shadow-lg shadow-blue-500/20">
              {dreamRole}
            </div>
          </div>
          
          <p className="mt-8 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            You are currently a <strong className="text-blue-600">{matchScore}%</strong> match for your dream role. 
            Complete the steps below to close the gap and become the top candidate.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {roadmapSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    "relative flex items-center gap-8 md:gap-0",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 dark:border-slate-950 z-10 shadow-sm transition-all duration-300"
                    style={{
                      backgroundColor: 
                        step.status === "completed" ? "#10b981" : 
                        step.status === "in-progress" ? "#2563eb" : "#cbd5e1"
                    }}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : step.status === "in-progress" ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-20 md:pl-0",
                    isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
                  )}>
                    <div className={cn(
                      "p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl",
                      step.status === "in-progress" 
                        ? "bg-white dark:bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 scale-105 z-20" 
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80"
                    )}>
                      <div className={cn(
                        "flex items-center gap-2 mb-3",
                        isEven && "md:justify-end"
                      )}>
                        <span className={cn(
                          "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                          step.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                          step.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                          "bg-slate-200 text-slate-500"
                        )}>
                          {step.status === "completed" ? "Verified Skill" : step.type}
                        </span>
                        <span className="text-sm font-medium text-slate-400 flex items-center gap-1">
                          • {step.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {step.status === "in-progress" && (
                        <button className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98]">
                          <PlayCircle className="w-5 h-5" />
                          Start Learning on {step.provider}
                        </button>
                      )}
                      {step.status === "locked" && (
                        <button disabled className="flex items-center justify-center gap-2 w-full py-3 bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                          Complete previous steps to unlock
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </main>
    </div>
  );
}
