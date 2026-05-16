"use client";

import { useState } from "react";
import { applyToJobAction } from "@/app/actions/application";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  jobId: string;
  initialApplied?: boolean;
}

export function ApplyButton({ jobId, initialApplied = false }: Props) {
  const [isApplied, setIsApplied] = useState(initialApplied);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setIsPending(true);
    setError(null);

    try {
      const res = await applyToJobAction(jobId);
      if (res.success) {
        setIsApplied(true);
      } else {
        setError(res.error || "Failed to apply");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  if (isApplied) {
    return (
      <div className="flex items-center gap-2 px-8 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
        <CheckCircle2 className="w-5 h-5" />
        Applied
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-w-[160px]">
      <button
        onClick={handleApply}
        disabled={isPending}
        className={cn(
          "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2",
          isPending && "opacity-70 cursor-not-allowed"
        )}
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Now"}
      </button>
      {error && (
        <p className="text-[10px] text-red-500 flex items-start gap-1 max-w-[200px]">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
