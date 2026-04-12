import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TogetherSection from "@/components/TogetherSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import Ticker from "@/components/Ticker";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <TogetherSection />
      <ClientsSection />
      <ServicesSection />
      <WorkSection />
      <Ticker />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
