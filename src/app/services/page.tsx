"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";

const serviceGroups = [
  {
    id: "craft",
    number: "01",
    title: "Craft a game plan",
    description: "After nearly three decades in the game, we know it takes a strategic village to bring a brand to life. It starts with defining who you are — because if you don't know, your audience won't either.",
    services: [
      { name: "Brand & Positioning Sprints", description: "Like refreshed logos or taglines." },
      { name: "Technology Audits", description: "Tech stack, APIs, third party vendors." },
      { name: "Information Architecture Mapping", description: "Site maps, user paths, functionality." },
      { name: "Content Marketing Strategy", description: "What we say + when we say it + who we talk to." },
      { name: "Digital Channel Strategy", description: "Where are your people at? LinkedIn? Social?" },
    ],
  },
  {
    id: "create",
    number: "02",
    title: "Create amazing",
    description: "By amplifying your brand's strategy and strengths, we deliver messaging and visuals that don't just catch the eye — they make people stop, take a closer look, and come back for more.",
    services: [
      { name: "Custom Website Design", description: "Pixel-perfect, conversion-focused designs." },
      { name: "Brand Identity & Design Support", description: "Visual systems that scale." },
      { name: "Campaign Ideation + Implementation", description: "End-to-end campaign execution." },
      { name: "Motion Graphics, Animation & Video", description: "Moving visuals that tell your story." },
      { name: "Content Creation", description: "Copy, photography, video, and more." },
    ],
  },
  {
    id: "connect",
    number: "03",
    title: "Connect with people",
    description: "Real connections beat clever gimmicks. Ditch the fake, forget the fluff — focus on being genuinely good at what you do. That's how you win.",
    services: [
      { name: "Website Development", description: "Next.js, React, WordPress, and more." },
      { name: "Digital Advertising", description: "Paid campaigns across all channels." },
      { name: "Search Engine Marketing", description: "SEM & SEO that drives revenue." },
      { name: "Website Re-platforming, Takeovers & Support", description: "Seamless migrations and ongoing support." },
      { name: "Website Security & Performance Optimization", description: "Fast, secure, resilient sites." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Digital"
        cycleWords={["marketing", "advertising", "brand", "campaign", "web", "interactive"]}
        prefix="experiences."
        image="/images/3fo_website-services_hero-3.jpg"
      />

      {/* Intro */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0 }}>
            All things{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>digital</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", lineHeight: 1.7 }}>
            All in one place. Explore our award-winning services — crafted to fulfill your brand promise and make a lasting impact with your clients.
          </p>
        </div>

        {/* Scrolling tags */}
        <div style={{ marginTop: "48px", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 0" }}>
          {["SEM", "Digital Advertising", "Web Development", "Web Design", "Branding", "Content Marketing", "SEO", "Video Marketing", "Campaign Marketing"].map((tag) => (
            <span key={tag} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", marginRight: "32px" }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* Service groups */}
      {serviceGroups.map((group, gi) => (
        <section key={group.id} id={group.id} style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px", borderTop: gi > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Left */}
            <div>
              <span style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", display: "block", marginBottom: "24px" }}>
                {group.number}
              </span>
              <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,52px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "24px" }}>
                {group.title}
              </h2>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {group.description}
              </p>
            </div>

            {/* Right: service list */}
            <div>
              {group.services.map((service) => (
                <div
                  key={service.name}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    padding: "20px 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: "2px" }}>+</span>
                  <div>
                    <p style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: "16px", color: "#fff", marginBottom: "4px" }}>{service.name}</p>
                    <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
