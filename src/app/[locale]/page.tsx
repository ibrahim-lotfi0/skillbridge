import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/shared/HeroSection";
import { FeaturesSection } from "@/components/shared/FeaturesSection";
import { CTASection } from "@/components/shared/CTASection";
import { Footer } from "@/components/shared/Footer";

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
