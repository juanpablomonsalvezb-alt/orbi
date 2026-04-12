"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function SFStateUniversityPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/images/3fo_website-about_hero-3.jpg" alt="SF State University" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px" }}>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>← Work</Link>
          <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "16px" }}>SF State University</h1>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>Igniting change with a multi-channel campaign for education</p>
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[{ label: "Industry", value: "Education" }, { label: "Enrolled students", value: "22K" }, { label: "Graduates", value: "300K" }, { label: "Years established", value: "125" }].map((s) => (
            <div key={s.label} style={{ padding: "32px 24px 32px 0", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Brand & Positioning Sprints", "Content Creation", "Campaign Ideation + Implementation", "Digital Advertising", "Content Marketing Strategy"].map((s) => (
            <span key={s} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>{s} →</span>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "32px" }}>Public sector channel marketing <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>for the long term.</span></h2>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>Being a large public university in California, it can be difficult to attract students because they do not lack choice. Add in the covid shutdown and SFSU needed something different.</p>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>The SFSU MarComm director worked with 300FeetOut, launching off the existing brand to create the foundation for a citywide, multi-channel campaign including TV, radio, OOH, and digital to reach students and their influencers, parents and teachers.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "24px", letterSpacing: "-0.02em" }}>Student-led concept validation.</h3>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>SFSU leadership wanted a campaign true to the experience of being on a city campus. Extracting opinions from the target audience was key to creating a campaign for students, by the students. 3FO worked with a team to conduct research that informed the messaging, then prototyped 5 concepts.</p>
            <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
              {[{ number: "36+", label: "Students & staff in video shoot" }, { number: "5", label: "Campaign concepts prototyped" }, { number: "4", label: "Channels: TV, Radio, OOH, Digital" }, { number: "8th", label: "Social mobility ranking in US" }].map((r) => (
                <div key={r.number} style={{ padding: "24px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "40px", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1, marginBottom: "8px" }}>{r.number}</p>
                  <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
      <Footer />
      <style>{`@media(max-width:900px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}[style*="repeat(2, 1fr)"]{grid-template-columns:1fr!important;}}`}</style>
    </main>
  );
}
