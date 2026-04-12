"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ClientsSection from "@/components/ClientsSection";
import PageHero from "@/components/PageHero";

const values = [
  {
    tagline: "Go hard or go home",
    title: "Driven",
    description: "We are in it for results that count. So we speculate over every idea, reach for the best possible solution, and we bring it. Each and every time.",
  },
  {
    tagline: "We're honest, not modest",
    title: "Sincere",
    description: "We won't jerk you around. In fact, you can always count on full disclosure. Because we want you to make the best decisions possible. No regrets.",
  },
  {
    tagline: "We get (sh)it done",
    title: "Committed",
    description: "We anticipate everything. What's wanted. What's needed. What's been overlooked. We prepare a plan A, B and C. Most firms don't go so far. We're not most firms.",
  },
  {
    tagline: "We risk for reward",
    title: "Fearless",
    description: "No guts. No glory. We push the outer reaches of what's possible, and stand by our ideas. And fight for our client's successes. But we're never too proud to take a step back when it's needed.",
  },
  {
    tagline: "We make a difference",
    title: "People-centric",
    description: "We're in this together. So we work as one. Because the world can change at a moment's notice. And moving toward it with the best people, makes us change with it.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="25 years in the game"
        cycleWords={["winning.", "innovating.", "growing.", "learning.", "creating."]}
        prefix="and still"
        image="/images/3fo_website-about_hero-3.jpg"
      />

      {/* Intro */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0 }}>
            Meet{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>300FeetOut</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingTop: "8px" }}>
            An offbeat, no-holds-barred kind of digital marketing agency — giving it all we&apos;ve got, with zero reservations. We jump in with both feet and take ownership of your project, using every tool we&apos;ve got to get you world-class results. We were a startup before startups were cool.
          </p>
        </div>
      </section>

      {/* Clients */}
      <ClientsSection />

      {/* Values */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 120px" }}>
        <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0, marginBottom: "64px" }}>
          Living by{" "}
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>our values</span>
        </h2>
        <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "64px", lineHeight: 1.7 }}>
          Who we are is at the core of everything we do and we partner with companies who think like us.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {values.map((value) => (
            <div
              key={value.title}
              style={{
                background: "#0a0a0a",
                padding: "48px 36px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#111")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#0a0a0a")}
            >
              <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "20px" }}>
                {value.tagline}
              </span>
              <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "28px", letterSpacing: "-0.02em", color: "#fff", marginBottom: "16px" }}>
                {value.title}
              </h3>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team blurb */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 120px" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.0 }}>
            A tight-knit{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>team</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Strategists, creatives, in-house engineers — trusted and certified. Respected by our peers and validated by the people who matter. We&apos;ve been at this since 1997, and we&apos;re just getting started.
          </p>
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          [style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
