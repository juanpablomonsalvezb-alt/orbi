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
      {/* PROOF-OF-LIFE BANNER — delete later. If you don't see this red bar, you're on a cached version. */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#ff0000",
          color: "#fff",
          padding: "14px 20px",
          fontSize: "16px",
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        ✅ DEPLOY NUEVO 22:45 — si ves esta barra roja, el sitio nuevo SÍ cargó
      </div>
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
