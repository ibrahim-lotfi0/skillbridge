"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { uploadResumeAction } from "@/app/actions/resume";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResumeUpload() {
  const t = useTranslations("Index");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are supported");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await uploadResumeAction(formData);
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error || "Failed to parse resume");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t("features.cvParsing")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload your PDF resume and let our AI extract your professional profile
        </p>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer",
              file
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                : "border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700"
            )}
            onClick={() => document.getElementById("resume-input")?.click()}
          >
            <input
              id="resume-input"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
            
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              {file ? (
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ) : (
                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-slate-500">PDF (max. 5MB)</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Parsing with AI...
              </>
            ) : (
              "Extract Skills & Experience"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <div>
              <p className="font-bold text-emerald-900 dark:text-emerald-400">Success!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-500">
                Your profile has been successfully parsed and updated.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Extracted Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Experience
                </h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {result.experience?.length || 0} Roles
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Languages
                </h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {result.languages?.length || 0} Found
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setResult(null)}
            className="w-full py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            Upload another file
          </button>
        </div>
      )}
    </div>
  );
}
