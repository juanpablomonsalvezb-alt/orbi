"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function PersonalisPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website_case-studies_per_tech-cover.jpg" alt="Personalis" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "16px" }}>Personalis</h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>Scaling next-stage biotech growth into commercialization</p>
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[{ label: "Industry", value: "Biotech" }, { label: "Market cap", value: "$284M" }, { label: "Total revenue", value: "$25.7M" }, { label: "Revenue growth YoY", value: "41%" }].map((s) => (
            <div key={s.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Campaign Ideation + Implementation", "Custom Website Design", "Information Architecture Mapping", "Motion Graphics, Animation & Video", "Website Development"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>{s} →</span>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "32px" }}>New audiences, <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>adapting brand.</span></h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>Moving from investors and pharma to clinicians, patients, and employees changes how a website is perceived. It's no longer only about getting a good return — it's about saving lives and giving hope where there was none.</p>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>Merging all five audiences into a single website was the result of an amazing partnership. Collaborating closely with the in-house marketing team, 3FO serves as the foundation for digital strategy, brand development, and asset creation.</p>
        </div>
        <div style={{ position: "relative", aspectRatio: "1220/1220", borderRadius: "16px", overflow: "hidden" }}>
          <Image src="/images/3fo_case_per_mobile-home.jpg" alt="Personalis mobile" fill style={{ objectFit: "cover" }} />
        </div>
      </section>
      <CTASection />
      <Footer />
      <style>{`@media(max-width:900px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </main>
  );
}
