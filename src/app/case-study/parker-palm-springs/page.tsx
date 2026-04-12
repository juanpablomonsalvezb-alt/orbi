"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function ParkerPalmSpringsPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website_case-studies_pps_cover_1.jpg" alt="Parker Palm Springs" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "16px" }}>
            Parker Palm Springs
          </h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
            High-impact digital marketing for an iconic desert oasis resort
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { label: "Industry", value: "Hospitality" },
            { label: "Leading Hotels of the World", value: "01" },
            { label: "F&B Outlets", value: "05" },
            { label: "Acres", value: "13" },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{stat.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff" }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Services</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Digital Channel Strategy", "Campaign Ideation + Implementation", "Digital Advertising", "Search Engine Marketing", "Website Re-platforming, Takeovers & Support"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>{s} →</span>
          ))}
        </div>
      </section>

      {/* Case content */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "32px" }}>
            Digital marketing for <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>elevated luxury.</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>
            Since its debut in 1959, the world-famous Parker Palm Springs has passed through many hands. When The Jack Parker Corporation — developers of over 15,000 residences — acquired the iconic property, their initial goal was simple: reduce reliance on OTAs through a targeted digital marketing plan.
          </p>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
            That vision quickly grew into what is now a full-fledged SEM, Website, Social, and Marketing integration strategy. Today, it stands as a robust Agency of Record partnership driving long-term brand growth.
          </p>
        </div>
        <div style={{ position: "relative", aspectRatio: "1221/1221", borderRadius: "16px", overflow: "hidden" }}>
          <Image src="/images/3fo_website_case-studies_pps_website-mobile-campaign.jpg" alt="PPS Mobile Campaign" fill style={{ objectFit: "cover" }} />
        </div>
      </section>

      {/* Results */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 120px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,52px)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "48px" }}>
          Channel marketing <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>growth.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {[
            { number: "247%", label: "Increase in revenue from Google Ads" },
            { number: "185%", label: "Increase in organic search revenue" },
            { number: "3x", label: "ROI on paid media campaigns" },
          ].map((r) => (
            <div key={r.number} style={{ background: "#0a0a0a", padding: "48px 32px" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "64px", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: "12px" }}>{r.number}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
      <style>{`@media(max-width:900px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important;}}`}</style>
    </main>
  );
}
