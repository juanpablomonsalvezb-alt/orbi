import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TogetherSection from "@/components/TogetherSection";
import GrowSection from "@/components/GrowSection";
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
      <WorkSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
