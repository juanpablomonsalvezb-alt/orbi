"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function ECSSeniorLivingPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website_case-studies_ecs_cover_1.jpg" alt="ECS Senior Living" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "16px" }}>ECS Senior Living</h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>Re-envisioning a new corporate brand strategy for a century-old company</p>
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[{ label: "Industry", value: "Real Estate" }, { label: "Years of operation", value: "100" }, { label: "Employees", value: "500+" }, { label: "In assets", value: "$167M" }].map((s) => (
            <div key={s.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Brand Identity & Design Support", "Campaign Ideation + Implementation", "Content Marketing Strategy", "Custom Website Design", "Website Development"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>{s} →</span>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "32px" }}>Evolving with <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>the times.</span></h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>When you're a 100 year old nonprofit organization, it's easy to stick to doing things the way they've always been done. With for-profit competition with dozens of major national outlets, ECS needed a change.</p>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>They had 5 websites and multiple communities that acted more like individual fiefdoms rather than a cohesive organization. Creating a new brand foundation and streamlining processes with tech stacks has led to an amazing partnership with YoY growth and revenue resilience.</p>
        </div>
        <div style={{ position: "relative", aspectRatio: "1100/1300", borderRadius: "16px", overflow: "hidden" }}>
          <Image src="/images/3fo_website_case-studies_ecs_campaign-02.jpg" alt="ECS Campaign" fill style={{ objectFit: "cover" }} />
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 120px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {[{ number: "535%", label: "Boost in site traffic since launch" }, { number: "5→1", label: "Websites consolidated" }, { number: "100%", label: "Brand consistency achieved" }].map((r) => (
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
