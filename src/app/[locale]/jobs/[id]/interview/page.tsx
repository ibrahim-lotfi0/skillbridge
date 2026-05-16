import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { InterviewSimulator } from "@/components/seeker/InterviewSimulator";
import { Navbar } from "@/components/shared/Navbar";

export default async function InterviewPage(props: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await props.params;

  // MOCK DATA: Bypassing auth and database to build the Frontend UI completely.
  const job = {
    id: id,
    title: "Senior Next.js & React Developer",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="pt-20">
        <InterviewSimulator 
          jobId={job.id} 
          jobTitle={job.title} 
          locale={locale} 
        />
      </main>
    </div>
  );
}
