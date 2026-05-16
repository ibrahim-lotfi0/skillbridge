import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/seeker/OnboardingWizard";
import { Navbar } from "@/components/shared/Navbar";

export default async function OnboardingPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  
  // MOCK DATA: Bypassing auth and database to build the Frontend UI completely.
  const mockUser = {
    id: "mock-user-1",
    name: "Ahmed Dev",
    email: "ahmed@example.com",
    role: "SEEKER",
  };

  const user = mockUser;

  // If already onboarded (e.g. has parsed data), we can redirect to dashboard
  // But for now, we'll let them complete the wizard.
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="pt-20">
        <OnboardingWizard user={user} locale={locale} />
      </main>
    </div>
  );
}
