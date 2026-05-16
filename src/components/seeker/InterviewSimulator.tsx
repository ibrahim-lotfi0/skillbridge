"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, ChevronRight, CheckCircle2, Award, ListChecks, Target, ArrowLeft, Loader2, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function InterviewSimulator({ jobId, jobTitle, locale }: { jobId: string, jobTitle: string, locale: string }) {
  const [step, setStep] = useState<"intro" | "qa" | "evaluating" | "results">("intro");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const startInterview = async () => {
    setIsLoading(true);
    // Mocking API call latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    setQuestions([
      "Can you tell me about a time you had to optimize a React application?",
      "How do you handle state management in a large Next.js project?",
      "Describe a challenging technical problem you solved recently.",
    ]);
    setStep("qa");
    setIsLoading(false);
  };

  const nextQuestion = async () => {
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setCurrentAnswer("");

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep("evaluating");
      
      // Mocking evaluation processing latency
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setEvaluation({
        overallScore: 88,
        strengths: [
          "Demonstrated strong understanding of React rendering cycles.",
          "Clear communication of problem-solving methods.",
          "Good architectural approach to state management."
        ],
        improvements: [
          "Could provide more specific metrics when discussing optimization.",
          "Try to structure behavioral answers using the STAR method."
        ],
        feedback: "You showed an excellent grasp of modern frontend concepts. Your technical depth is solid, but you can improve how you quantify the impact of your work."
      });
      setStep("results");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center glass-card p-12 space-y-8"
          >
            <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-12 h-12 text-blue-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">AI Interview Lab</h1>
              <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
                Experience a high-fidelity simulation of an interview for the <span className="text-blue-600 font-bold">{jobTitle}</span> role. 
                Our AI will analyze your responses and provide expert feedback.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto">
              {[
                { label: "5 Questions", icon: ListChecks },
                { label: "Technical & Behavioral", icon: Target },
                { label: "Instant Feedback", icon: Sparkles }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2">
                  <item.icon className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
               <button 
                  onClick={() => router.back()}
                  className="px-8 py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors"
               >
                 Maybe Later
               </button>
               <button 
                  onClick={startInterview}
                  disabled={isLoading}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3 active:scale-[0.98]"
               >
                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                 Start Simulation
               </button>
            </div>
          </motion.div>
        )}

        {step === "qa" && (
          <motion.div
            key="qa"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>
              <div className="flex h-1.5 flex-1 mx-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500" 
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Bot className="w-32 h-32" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                &quot;{questions[currentIdx]}&quot;
              </h2>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Give your best response here..."
                className="w-full h-48 p-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-3xl text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                autoFocus
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextQuestion}
                  disabled={!currentAnswer.trim() || isLoading}
                  className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl transition-all flex items-center gap-2"
                >
                  {currentIdx === questions.length - 1 ? "Submit Simulation" : "Next Question"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "evaluating" && (
          <motion.div
             key="evaluating"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800"
          >
             <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-slate-800 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
             </div>
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Performance</h2>
             <p className="text-slate-500">AI is evaluating your responses against industry standards...</p>
          </motion.div>
        )}

        {step === "results" && evaluation && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 glass-card border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-extrabold">Final Assessment</h1>
                <p className="text-blue-100 max-w-sm">Great job completing the simulation! Here is your AI-generated feedback report.</p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-xl font-bold text-2xl">
                    {evaluation.overallScore}%
                  </div>
                  <span className="text-sm font-semibold opacity-80 uppercase tracking-widest">Performance Score</span>
                </div>
              </div>
              <div className="w-32 h-32 rounded-full border-8 border-white/20 flex items-center justify-center">
                 <Award className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="glass-card p-8">
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Key Strengths
                </h3>
                <ul className="space-y-3">
                  {evaluation.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="glass-card p-8">
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Areas to Improve
                </h3>
                <ul className="space-y-3">
                  {evaluation.improvements.map((imp: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="glass-card p-8">
               <h3 className="font-bold text-slate-900 dark:text-white mb-6">Simulation Summary</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                 &quot;{evaluation.feedback}&quot;
               </p>
            </section>

            <div className="flex justify-center pt-8">
               <button 
                  onClick={() => router.push(`/${locale}/dashboard`)}
                  className="px-10 py-4 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
               >
                 Back to Dashboard
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
