"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { useState } from "react";

const SERVICE_TAGS = ["SEM", "Digital Advertising", "Web Development", "Web Design", "Content Marketing", "SEO", "Video Marketing", "Campaign Strategy"];

const SERVICE_GROUPS = [
  {
    num: "01", title: "Craft a game plan",
    desc: "After nearly three decades in the game, we know it takes a strategic village to bring a brand to life. It starts with defining who you are — because if you don't know, your audience won't either.",
    items: [
      { name: "Brand & Positioning Sprints", note: "Like refreshed logos or taglines." },
      { name: "Technology Audits", note: "Tech stack, APIs, third party vendors." },
      { name: "Information Architecture Mapping", note: "Site maps, user paths, functionality." },
      { name: "Content Marketing Strategy", note: "What we say + when we say it + who we talk to." },
      { name: "Digital Channel Strategy", note: "Where are your people at? LinkedIn? Social?" },
    ],
  },
  {
    num: "02", title: "Create amazing",
    desc: "By amplifying your brand's strategy and strengths, we deliver messaging and visuals that don't just look good — they connect, convert, and leave a lasting impression.",
    items: [
      { name: "Website Copy & Blog", note: "Website copy, blog and newsletters, etc." },
      { name: "Brand Identity Design", note: "Logos, color palettes, typography systems." },
      { name: "Website Design & Development", note: "From wireframe to launch." },
      { name: "Motion & Video Production", note: "Story-driven brand content." },
      { name: "Photography & Art Direction", note: "Styled shoots, lifestyle, product." },
    ],
  },
  {
    num: "03", title: "Connect with people",
    desc: "Real connections beat clever gimmicks. Ditch the fake, forget the fluff — focus on being genuinely good at what you do. That's how you win.",
    items: [
      { name: "Search Engine Marketing", note: "Google Ads, Bing, paid search." },
      { name: "Social Media Marketing", note: "Organic + paid across platforms." },
      { name: "Email Marketing", note: "Campaigns, drips, automations." },
      { name: "Digital Advertising", note: "Display, retargeting, programmatic." },
      { name: "Analytics & Reporting", note: "GA4, dashboards, insights." },
    ],
  },
];

const STATS = [
  { num: "203%", desc: "increase in revenue from search traffic", client: "Alohilani Resort" },
  { num: "247%", desc: "increase in revenue from Google ads", client: "Parker Palm Springs" },
  { num: "535%", desc: "boost in site traffic since launch", client: "ECS Senior Living" },
];

export default function ServicesPage() {
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Digital marketing"
        cycleWords={["advertising", "brand", "campaign", "web", "interactive"]}
        image="/images/3fo_website-services_hero-3.jpg"
        prefix="experiences."
      />

      {/* All things digital */}
      <section style={{ padding: "clamp(80px,10vw,160px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px" }}>
              All things<br /><span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>digital</span>
            </h2>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "rgba(0,0,0,0.55)", maxWidth: 500 }}>
              All in one place. Explore our award-winning services — crafted to fulfill your brand promise and make it stick.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SERVICE_TAGS.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Aeonik', sans-serif", fontSize: 15, fontWeight: 500,
                padding: "10px 20px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.15)",
                color: "#000", cursor: "pointer", transition: "all .2s",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Full service or à la carte */}
      <section style={{ padding: "0 clamp(24px,5vw,80px) clamp(80px,10vw,160px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px" }}>
              Full service<br />or <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>à la carte</span>
            </h2>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "rgba(0,0,0,0.55)", maxWidth: 500 }}>
              You need powerful digital solutions — we deliver them. With a proven track record creating success stories across industries.
            </p>
          </div>

          {/* Accordion service groups */}
          {SERVICE_GROUPS.map((g, i) => (
            <div key={g.num} style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "32px 0" }}>
              <button
                onClick={() => setOpenGroup(openGroup === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontFamily: "'Aeonik', sans-serif", fontSize: 48, fontWeight: 700, letterSpacing: "-1px",
                  color: "#000", textAlign: "left", cursor: "pointer",
                  background: "none", border: "none", padding: 0,
                }}
              >
                {g.title}
                <span style={{ fontSize: 28, color: "var(--yellow)", transform: openGroup === i ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>✦</span>
              </button>
              {openGroup === i && (
                <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 48px" }}>
                  <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "rgba(0,0,0,0.55)", gridColumn: "1 / -1", marginBottom: 16 }}>{g.desc}</p>
                  {g.items.map(item => (
                    <div key={item.name} style={{ padding: "12px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{item.name}</p>
                      <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(0,0,0,0.5)" }}>{item.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats section */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--yellow)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px", marginBottom: 48 }}>
            Land knockout<br /><span style={{ color: "#000", fontWeight: 300, fontStyle: "italic" }}>results</span>
          </h2>
          {STATS.map(s => (
            <div key={s.num} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "28px 0", borderTop: "1px solid rgba(0,0,0,0.15)", flexWrap: "wrap", gap: 16 }}>
              <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 300, color: "#000" }}>{s.num}</span>
              <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, flex: 1, marginLeft: 24 }}>{s.desc}</span>
              <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 15, fontWeight: 700 }}>{s.client} →</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
