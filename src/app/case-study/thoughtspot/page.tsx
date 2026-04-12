"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function ThoughtSpotPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website_case-studies_tsp_cover.jpg" alt="ThoughtSpot" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0, marginBottom: "16px" }}>ThoughtSpot</h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(0,0,0,0.6)", fontWeight: 300 }}>Powering global AI with seamlessly integrated web development</p>
        </div>
      </section>

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { label: "Industry", value: "Technology" },
            { label: "Valuation", value: "$4.2B" },
            { label: "Revenue", value: "$150M" },
            { label: "Global locations", value: "9" },
            { label: "Employees", value: "600" },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(0,0,0,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{stat.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#000" }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Services</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Technology Audits", "Website Development", "Website Re-platforming, Takeovers & Support", "Website Security & Performance Optimization"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.5)", background: "rgba(0,0,0,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.08)" }}>{s} →</span>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 120px" }}>
        <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0, marginBottom: "32px" }}>
          Global leaders <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>need help too.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.55)", lineHeight: 1.85 }}>
            Being a leader in any industry means working with partners who are proactive, not reactive, in tackling market challenges. Our team integrates seamlessly with ThoughtSpot's — across security, sales, product, and marketing — collaborating on the frontend while their tech team builds the product.
          </p>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.55)", lineHeight: 1.85 }}>
            From proof-of-concept to a sophisticated tech stack (Next.js, React, and a Free Trial intake workflow), ThoughtSpot relies on 300FeetOut to align with their infrastructure and provide on-demand development support. When ThoughtSpot needed a website upgrade, a full overhaul wasn't feasible due to cost risks — so we took a strategic approach.
          </p>
        </div>

        <div style={{ marginTop: "80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(0,0,0,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {[
            { number: "50%", label: "Increase in engagement" },
            { number: "1000+", label: "Drupal pages migrated" },
            { number: "99.9%", label: "Uptime maintained" },
          ].map((r) => (
            <div key={r.number} style={{ background: "#ffffff", padding: "48px 32px" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "64px", letterSpacing: "-0.04em", color: "#000", lineHeight: 1, marginBottom: "12px" }}>{r.number}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
      <style>{`@media(max-width:900px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}[style*="repeat(5, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important;}}`}</style>
    </main>
  );
}
