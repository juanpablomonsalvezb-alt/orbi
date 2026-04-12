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
    description:
      "We are in it for results that count. So we speculate over every idea, reach for the best possible solution, and we bring it. Each and every time.",
  },
  {
    tagline: "We're honest, not modest",
    title: "Sincere",
    description:
      "We won't jerk you around. In fact, you can always count on full disclosure. Because we want you to make the best decisions possible. No regrets.",
  },
  {
    tagline: "We get it done",
    title: "Committed",
    description:
      "We anticipate everything. What's wanted. What's needed. What's been overlooked. We prepare a plan A, B and C. Most firms don't go so far. We're not most firms.",
  },
  {
    tagline: "Let's go there",
    title: "Fearless",
    description:
      "No guts. No glory. We push the outer reaches of what's possible, and stand by our ideas. And fight for our client's successes. But we're never too proud to take a step back when it's needed.",
  },
  {
    tagline: "It's all about the humans",
    title: "People-centric",
    description:
      "We're in this together. So we work as one. Because the world can change at a moment's notice. And moving toward it with the best people, makes us change with it.",
  },
];

const teamMembers = [
  "Barbara Stephenson",
  "Rex Vokey",
  "Stephanie Frier",
  "Greg Tornincasa",
  "Chantel Keith",
  "Joren Mathews",
  "Mia Pinzelik",
  "Hector Banuelos",
  "Forrest Darabian",
  "Colin Grafft",
];

export default function AboutPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="25 years in the game and still"
        cycleWords={["winning.", "innovating.", "growing."]}
        image="/images/3fo_website-about_hero-3.jpg"
      />

      {/* Meet 300FeetOut */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 80px" }}>
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-1.44px",
            color: "#000",
            lineHeight: 1.05,
            marginBottom: 40,
          }}
        >
          Meet{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>300FeetOut</span>
        </h2>
        <p
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: 22,
            fontWeight: 300,
            color: "#000",
            lineHeight: 1.6,
            maxWidth: 800,
          }}
        >
          An offbeat, no-holds-barred kind of digital marketing agency — giving it all
          we&apos;ve got, with zero reservations. We jump in with both feet and take
          ownership of your project, using every tool we&apos;ve got to get you
          world-class results. We were a startup before startups were cool.
        </p>
      </section>

      {/* Top-notch clients */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 80px" }}>
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-1.44px",
            color: "#000",
            lineHeight: 1.05,
            marginBottom: 48,
          }}
        >
          Top-notch{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>clients</span>
        </h2>
      </section>
      <ClientsSection />

      {/* Living by our values */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 120px" }}>
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-1.44px",
            color: "#000",
            lineHeight: 1.05,
            marginBottom: 80,
          }}
        >
          Living by{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>our values</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {values.map((value, i) => (
            <div
              key={value.title}
              style={{
                paddingTop: i === 0 ? 0 : 56,
                paddingBottom: 56,
                borderBottom:
                  i < values.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fdc115",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {value.tagline}
              </p>
              <h3
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: 700,
                  fontSize: 64,
                  letterSpacing: "-1.44px",
                  color: "#000",
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#000",
                  lineHeight: 1.6,
                  maxWidth: 700,
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* A tight-knit team */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 120px" }}>
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-1.44px",
            color: "#000",
            lineHeight: 1.05,
            marginBottom: 64,
          }}
        >
          A tight-knit{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>team</span>
        </h2>

        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px 80px",
          }}
        >
          {teamMembers.map((name) => (
            <p
              key={name}
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: 22,
                fontWeight: 300,
                color: "#000",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {name}
            </p>
          ))}
        </div>
      </section>

      {/* Join our team */}
      <section
        style={{
          background: "#fdc115",
          padding: "100px 40px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 700,
              fontSize: 64,
              letterSpacing: "-1.44px",
              color: "#000",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            JOIN OUR TEAM *
          </h2>
          <p
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontSize: 22,
              fontWeight: 300,
              color: "#000",
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            We&apos;re always looking for talented people who share our passion and
            drive. If you think you have what it takes, we&apos;d love to hear from
            you.
          </p>
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; }
          h2, h3 { font-size: clamp(36px, 8vw, 64px) !important; }
        }
      `}</style>
    </main>
  );
}
