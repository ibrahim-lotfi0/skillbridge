import { prisma } from "@/lib/db";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MapPin, Globe, Building2, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CompanyDetailPage(props: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await props.params;
  
  // MOCK DATA: Bypassing database to build the Frontend UI completely.
  const company = {
    id: id,
    name: "TechNova Innovators",
    industry: "Software Engineering",
    location: "Riyadh, Saudi Arabia",
    website: "https://technova.ai",
    logo: null,
    description: "TechNova Innovators is a leading technology firm specializing in AI-driven solutions and high-performance web applications. We foster a culture of innovation and collaboration, empowering our developers to tackle complex challenges and build the future of tech.",
    jobs: [
      {
        id: "job-1",
        title: "Senior Next.js & React Developer",
        type: "Full-time",
        location: "Remote",
        salary: "SAR 15k - 25k",
      },
      {
        id: "job-5",
        title: "Fullstack Engineer (Node.js)",
        type: "Full-time",
        location: "Hybrid",
        salary: "SAR 12k - 20k",
      }
    ]
  };

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="glass-card p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-3xl" />
                ) : (
                  company.name[0]
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {company.name}
                  </h1>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{company.industry}</p>
                </div>
                
                <div className="flex flex-wrap gap-6 text-slate-500 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {company.jobs.length} Open Positions
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About the Company</h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                  {company.description || "No description available for this company."}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Open Positions
                </h2>
                
                <div className="space-y-4">
                  {company.jobs.length === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="text-slate-400 italic">No open positions at the moment.</p>
                    </div>
                  ) : (
                    company.jobs.map((job) => (
                      <Link 
                        key={job.id}
                        href={`/${locale}/jobs/${job.id}`}
                        className="block p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-lg transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">{job.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{job.type} • {job.location}</p>
                          </div>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            {job.salary}
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-6 bg-slate-900 dark:bg-white rounded-3xl text-white dark:text-slate-900 shadow-xl">
                 <h3 className="font-bold text-lg mb-4">Want to work here?</h3>
                 <p className="text-sm opacity-80 mb-6 leading-relaxed">
                   Set up job alerts to get notified as soon as new roles are posted by {company.name}.
                 </p>
                 <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                   Follow Company
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
