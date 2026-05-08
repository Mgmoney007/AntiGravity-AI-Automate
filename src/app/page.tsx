import HeroHeader from "@/components/HeroHeader";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ClientDashboard from "@/components/sections/ClientDashboard";
import LogoStrip from "@/components/sections/LogoStrip";
import FeatureGrid from "@/components/sections/FeatureGrid";
import Integrations from "@/components/sections/Integrations";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Scanner from "@/components/Scanner";

import { DottedSurface } from "@/components/ui/dotted-surface";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <DottedSurface />
      {/* Black overlay at 30% opacity to make the animated background more subtle */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none -z-9" />
      <HeroHeader />
      <HeroSection />
      <ClientDashboard />
      <Scanner />
      <LogoStrip />
      <FeatureGrid />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
