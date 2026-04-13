import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TogetherSection from "@/components/TogetherSection";
import GrowSection from "@/components/GrowSection";
import PlatformSection from "@/components/PlatformSection";
import GetStartedSection from "@/components/GetStartedSection";
import AccordionSection from "@/components/AccordionSection";
import WorkSection from "@/components/WorkSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <TogetherSection />
      <GrowSection />
      <PlatformSection />
      <GetStartedSection />
      <AccordionSection />
      <WorkSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
