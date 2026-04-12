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
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <TogetherSection />
        <ClientsSection />
        <ServicesSection />
        <WorkSection />
      </div>
      <Ticker />
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <StatsSection />
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
