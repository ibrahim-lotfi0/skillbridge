import { SeekerDashboard } from "@/components/seeker/SeekerDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage(props: {
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

  const mockProfile = {
    matchScore: 88,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "UI/UX Design", "Figma"],
    skillGaps: {
      currentLevel: "Mid-Level Frontend Developer",
      missingSkills: [
        { name: "GraphQL", importance: "high", resourceType: "course" },
        { name: "AWS Basics", importance: "medium", resourceType: "documentation" }
      ],
      learningPath: [
        { step: 1, title: "Master GraphQL Queries", description: "Learn how to fetch data efficiently using Apollo Client.", estimatedTime: "2 weeks" },
        { step: 2, title: "AWS Cloud Practitioner", description: "Understand basic cloud infrastructure to deploy Next.js apps.", estimatedTime: "3 weeks" }
      ],
      cvImprovements: ["Highlight your TypeScript experience more prominently.", "Add measurable metrics to your past projects."]
    },
    parsedData: true // To show the skill gap analysis section
  };

  const mockApplications = [
    {
      id: "app-1",
      status: "SHORTLISTED",
      matchScore: 92,
      createdAt: new Date().toISOString(),
      job: {
        id: "job-1",
        title: "Senior Frontend Engineer",
        employer: { name: "TechCorp Global" }
      }
    },
    {
      id: "app-2",
      status: "PENDING",
      matchScore: 78,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      job: {
        id: "job-2",
        title: "React Developer",
        employer: { name: "Innovate Solutions" }
      }
    }
  ];

  const mockSavedJobs = [
    {
      id: "save-1",
      job: {
        id: "job-3",
        title: "Fullstack Next.js Developer",
        location: "Remote",
        employer: { name: "FutureWorks Inc." }
      }
    }
  ];

  const mockNotifications = [
    {
      id: "notif-1",
      title: "Application Viewed",
      message: "TechCorp Global has viewed your application for Senior Frontend Engineer.",
      type: "SUCCESS",
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SeekerDashboard 
          user={mockUser} 
          profile={mockProfile} 
          applications={mockApplications} 
          savedJobs={mockSavedJobs}
          notifications={mockNotifications}
        />
      </div>
    </main>
  );
}

