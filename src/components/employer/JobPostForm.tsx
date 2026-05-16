"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createJobAction } from "@/app/actions/job";
import { Loader2, Plus, MapPin, DollarSign, ListChecks, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const jobSchema = z.object({
  title: z.string().min(3, { message: "Job title must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
  salaryRange: z.string().optional(),
  requirements: z.string().min(5, { message: "Please enter at least one requirement" }),
});

type JobValues = z.infer<typeof jobSchema>;

export function JobPostForm() {
  const t = useTranslations("Index");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobValues>({
    resolver: zodResolver(jobSchema),
  });

  async function onSubmit(data: JobValues) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await createJobAction(formData);
      if (res.success) {
        setSuccess(true);
        reset();
        router.refresh();
      } else {
        setError(res.error || "Failed to post job");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Post a New Job
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Find the best talent using our AI-powered matching engine
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            Job posted successfully!
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Job Title
            </label>
            <div className="relative">
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("title")}
                placeholder="Software Engineer"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                  errors.title && "border-red-500 focus:ring-red-500"
                )}
              />
            </div>
            {errors.title && <p className="text-xs text-red-500 ml-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  {...register("location")}
                  placeholder="Remote / City"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                    errors.location && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Salary Range
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  {...register("salaryRange")}
                  placeholder="$80k - $120k"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Requirements (Comma separated)
            </label>
            <div className="relative">
              <ListChecks className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
              <textarea
                {...register("requirements")}
                placeholder="React, TypeScript, Node.js, AWS..."
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px]",
                  errors.requirements && "border-red-500 focus:ring-red-500"
                )}
              />
            </div>
            {errors.requirements && <p className="text-xs text-red-500 ml-1">{errors.requirements.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Job Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
              <textarea
                {...register("description")}
                placeholder="Detailed job description..."
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[150px]",
                  errors.description && "border-red-500 focus:ring-red-500"
                )}
              />
            </div>
            {errors.description && <p className="text-xs text-red-500 ml-1">{errors.description.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Job Listing"}
        </button>
      </form>
    </div>
  );
}
