"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Link from "next/link";

const caseStudies = [
  {
    client: "Parker Palm Springs",
    description: "High-impact digital marketing for an iconic desert oasis resort",
    video: "/videos/3fo_website_case-studies_pps_cover.mp4",
    href: "/case-study/parker-palm-springs",
  },
  {
    client: "ThoughtSpot",
    description: "Powering global AI with seamlessly integrated web development",
    video: "/videos/3fo_website_case-studies_tsp_cover.mp4",
    href: "/case-study/thoughtspot",
  },
  {
    client: "Personalis",
    description: "Scaling next-stage biotech growth into commercialization",
    video: "/videos/3fo_website_case-studies_per_tech-cover.mp4",
    href: "/case-study/personalis",
  },
  {
    client: "ECS Senior Living",
    description: "Re-envisioning a new corporate brand strategy for a century-old company",
    video: "/videos/3fo_website_case-studies_ecs_cover.mp4",
    href: "/case-study/ecs-senior-living",
  },
  {
    client: "Highgate",
    description: "Driving digital marketing growth with a $15B global hospitality powerhouse",
    video: "/videos/3fo_website_case-studies_highgate_cover.mp4",
    href: "/case-study/highgate",
  },
  {
    client: "SF State University",
    description: "Igniting change with a multi-channel campaign for education",
    image: "/images/3fo_forrest-spotlight_hero.jpg",
    href: "/case-study/sf-state-university",
  },
];

const spotlightProjects = [
  {
    title: "Forrest Spotlight",
    description: "Behind the scenes of creative direction",
    image: "/images/3fo_forrest-spotlight_hero.jpg",
    href: "/work",
  },
  {
    title: "Brand Systems",
    description: "Building scalable visual identities",
    image: "/images/3fo_website-about_hero-3.jpg",
    href: "/work",
  },
  {
    title: "Motion Design",
    description: "Bringing stories to life through motion",
    image: "/images/3fo_website-work_hero-3.jpg",
    href: "/work",
  },
  {
    title: "Digital Campaigns",
    description: "Performance-driven creative strategies",
    image: "/images/3fo_website_case-studies_pps_cover_1.jpg",
    href: "/work",
  },
];

export default function WorkPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Break-thru with"
        cycleWords={["impact.", "connection.", "differentiation.", "innovation."]}
        image="/images/3fo_website-work_hero-3.jpg"
      />

      {/* Standout case studies */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 120px" }}>
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
          Standout{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>case studies</span>
        </h2>

        <div
          className="cs-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}
        >
          {caseStudies.map((cs) => (
            <Link
              key={cs.client}
              href={cs.href}
              style={{
                display: "block",
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "4/3",
                textDecoration: "none",
              }}
            >
              {"video" in cs && cs.video ? (
                <video
                  src={cs.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={(cs as { image: string }).image}
                  alt={cs.client}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              {/* overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              {/* content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 32,
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: "#fff",
                    lineHeight: 1.15,
                    marginBottom: 8,
                  }}
                >
                  {cs.client}
                </h3>
                <p
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  {cs.description}
                </p>
                <span
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fdc115",
                  }}
                >
                  view case →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Spotlight projects */}
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
          Spotlight{" "}
          <span style={{ fontStyle: "italic", color: "#fdc115" }}>projects</span>
        </h2>

        <div
          className="sp-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}
        >
          {spotlightProjects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              style={{
                display: "block",
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "16/9",
                textDecoration: "none",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, zIndex: 2 }}>
                <h3
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.5,
                  }}
                >
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .cs-grid { grid-template-columns: 1fr !important; }
          .sp-grid { grid-template-columns: 1fr !important; }
          h2 { font-size: clamp(36px, 8vw, 64px) !important; }
        }
      `}</style>
    </main>
  );
}
