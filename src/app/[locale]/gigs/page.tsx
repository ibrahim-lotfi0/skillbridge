"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Navbar } from "@/components/shared/Navbar";
import { Zap, Clock, DollarSign, Tag, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GigsMarketplacePage() {
  const locale = useLocale();
  const [filter, setFilter] = useState("All");
  const [appliedGig, setAppliedGig] = useState<string | null>(null);

  // MOCK DATA: Bypassing auth and database
  const gigs = [
    {
      id: "gig-1",
      title: "Fix Next.js Routing Bug",
      category: "Development",
      budget: "$50 - $100",
      urgency: "High",
      duration: "1 Day",
      description: "We have a specific bug in our App Router setup where layout state is resetting. Need an expert to patch it quickly.",
      employer: "TechStartup Inc.",
      tags: ["Next.js", "React"]
    },
    {
      id: "gig-2",
      title: "Design 3 Minimalist Icons",
      category: "Design",
      budget: "$30",
      urgency: "Medium",
      duration: "2 Days",
      description: "Need three simple line-art icons for our SaaS landing page (Dashboard, Analytics, Settings).",
      employer: "SaaS Builders",
      tags: ["Figma", "SVG"]
    },
    {
      id: "gig-3",
      title: "Translate 5 Page Website to Arabic",
      category: "Writing",
      budget: "$150",
      urgency: "Low",
      duration: "1 Week",
      description: "Looking for a native Arabic speaker to translate our marketing site. Must understand tech terminology.",
      employer: "GlobalReach",
      tags: ["Translation", "Localization"]
    },
    {
      id: "gig-4",
      title: "Setup CI/CD Pipeline for Node API",
      category: "Development",
      budget: "$200",
      urgency: "Medium",
      duration: "3 Days",
      description: "Need a GitHub Actions workflow to run tests and deploy our Express app to AWS EC2.",
      employer: "CloudSolutions",
      tags: ["DevOps", "AWS", "GitHub Actions"]
    }
  ];

  const categories = ["All", "Development", "Design", "Writing"];

  const filteredGigs = filter === "All" ? gigs : gigs.filter(g => g.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-6">
            <Zap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Micro-Gigs Marketplace
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Earn income immediately while searching for your full-time role. Complete short-term tasks and build your portfolio.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm",
                filter === cat 
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredGigs.map((gig) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={gig.id}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                    gig.urgency === "High" ? "bg-red-100 text-red-700" :
                    gig.urgency === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-emerald-100 text-emerald-700"
                  )}>
                    {gig.urgency} Urgency
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                    <DollarSign className="w-4 h-4" />
                    {gig.budget}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{gig.title}</h3>
                <p className="text-xs text-slate-500 mb-4 font-medium">{gig.employer}</p>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
                  {gig.description}
                </p>

                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {gig.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {gig.category}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {gig.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setAppliedGig(gig.id)}
                  disabled={appliedGig === gig.id}
                  className={cn(
                    "w-full py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2",
                    appliedGig === gig.id
                      ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] shadow-xl"
                  )}
                >
                  {appliedGig === gig.id ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Applied Successfully
                    </>
                  ) : (
                    "Apply for Gig"
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredGigs.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No gigs found in this category.
          </div>
        )}

      </main>
    </div>
  );
}
