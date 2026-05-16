import { prisma } from "@/lib/db";
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { Building2, MapPin, Globe, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function CompaniesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations("Navigation");
  
  // MOCK DATA: Bypassing database to build the Frontend UI completely.
  const companies = [
    {
      id: "comp-1",
      name: "TechNova Innovators",
      industry: "Software Engineering",
      location: "Riyadh, Saudi Arabia",
      website: "https://technova.ai",
      logo: null,
    },
    {
      id: "comp-2",
      name: "SaaS Builders",
      industry: "Product Design",
      location: "Dubai, UAE",
      website: "https://saasbuilders.io",
      logo: null,
    },
    {
      id: "comp-3",
      name: "CloudGate Systems",
      industry: "Infrastructure",
      location: "Amman, Jordan",
      website: "https://cloudgate.net",
      logo: null,
    },
    {
      id: "comp-4",
      name: "Creative Minds Agency",
      industry: "Marketing",
      location: "Doha, Qatar",
      website: "https://creativeminds.agency",
      logo: null,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {locale === "ar" ? "استكشف الشركات" : "Explore Top Companies"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {locale === "ar" 
              ? "اكتشف أفضل أماكن العمل التي تبحث عن مهاراتك."
              : "Discover the best places to work that are looking for your skills."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.length === 0 ? (
            <div className="col-span-full text-center py-20 glass-card">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No companies found yet.</p>
            </div>
          ) : (
            companies.map((company) => (
              <Link 
                key={company.id}
                href={`/${locale}/companies/${company.id}`}
                className="group glass-card p-6 block hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h2>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {company.industry || "General"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                     <MapPin className="w-4 h-4" />
                     {company.location || "Remote"}
                   </div>
                   {company.website && (
                     <div className="flex items-center gap-2 text-sm text-slate-500">
                       <Globe className="w-4 h-4" />
                       {company.website.replace("https://", "")}
                     </div>
                   )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                     View Profile
                   </span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Search className="w-4 h-4" />
                   </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
