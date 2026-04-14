import HeroHeader from "@/components/HeroHeader";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
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
      <HeroHeader />
      <HeroSection />
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
