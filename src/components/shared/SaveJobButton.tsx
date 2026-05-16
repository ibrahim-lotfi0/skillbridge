"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleSavedJobAction } from "@/app/actions/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  jobId: string;
  initialSaved?: boolean;
}

export function SaveJobButton({ jobId, initialSaved = false }: Props) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPending) return;

    setIsPending(true);
    // Optimistic UI
    setIsSaved(!isSaved);

    try {
      const res = await toggleSavedJobAction(jobId);
      if (!res.success) {
        // Revert on failure
        setIsSaved(isSaved);
      }
    } catch (err) {
      setIsSaved(isSaved);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={cn(
        "p-2.5 rounded-xl transition-all border",
        isSaved 
          ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-500 shadow-sm"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-red-200 dark:hover:border-red-800/40 hover:text-red-400"
      )}
    >
      <Heart className={cn("w-5 h-5 transition-colors", isSaved && "fill-current")} />
    </motion.button>
  );
}
