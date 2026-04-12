"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function HighgatePage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website_case-studies_highgate_cover.jpg" alt="Highgate" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0, marginBottom: "16px" }}>Highgate</h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(0,0,0,0.6)", fontWeight: 300 }}>Driving digital marketing growth with a $15B global hospitality powerhouse</p>
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          {[{ label: "Industry", value: "Hospitality" }, { label: "Real estate value", value: "$15B" }, { label: "Global properties", value: "500+" }, { label: "Managed hotel rooms", value: "87K" }].map((s) => (
            <div key={s.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(0,0,0,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#000" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Content Creation", "Custom Website Design", "Information Architecture Mapping", "Search Engine Marketing", "Website Development"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.5)", background: "rgba(0,0,0,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.08)" }}>{s} →</span>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0, marginBottom: "32px" }}>Upgraded hotel. <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>Updated brand.</span></h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>Highgate Hotels is a global home and investment management firm with properties in the US and Europe. An owner in their management portfolio had an urgent need — after a recent takeover of a much beloved Waikiki Beach hotel, they were overseeing an extensive renovation.</p>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.55)", lineHeight: 1.85 }}>The goal was upgrading the property from a three-star hotel to a four-star resort. Now, they needed a brand experience to match — with a new name, a new look, and, most importantly, the targeting of a new guest profile.</p>
        </div>
        <div style={{ position: "relative", aspectRatio: "1300/900", borderRadius: "16px", overflow: "hidden" }}>
          <Image src="/images/3fo_case_highgate_site-visit_01.jpg" alt="Highgate site visit" fill style={{ objectFit: "cover" }} />
        </div>
      </section>
      <CTASection />
      <Footer />
      <style>{`@media(max-width:900px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </main>
  );
}
