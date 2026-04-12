"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    client: "ThoughtSpot",
    description: "Powering global AI with seamlessly integrated web development",
    image: "/images/3fo_website_case-studies_tsp_cover.jpg",
    href: "/case-study/thoughtspot",
    tags: ["Technology Audits", "Website Development", "Website Re-platforming"],
    industry: "Technology",
  },
  {
    client: "Parker Palm Springs",
    description: "High-impact digital marketing for an iconic desert oasis resort",
    image: "/images/3fo_website_case-studies_pps_cover_1.jpg",
    href: "/case-study/parker-palm-springs",
    tags: ["Digital Channel Strategy", "Campaign Ideation", "Digital Advertising", "SEM"],
    industry: "Hospitality",
  },
  {
    client: "Personalis",
    description: "Scaling next-stage biotech growth into commercialization",
    image: "/images/3fo_website_case-studies_per_tech-cover.jpg",
    href: "/case-study/personalis",
    tags: ["Campaign Ideation + Implementation", "Custom Website Design", "Motion Graphics"],
    industry: "Biotech",
  },
  {
    client: "ECS Senior Living",
    description: "Re-envisioning a new corporate brand strategy for a century-old company",
    image: "/images/3fo_website_case-studies_ecs_cover_1.jpg",
    href: "/case-study/ecs-senior-living",
    tags: ["Brand Identity & Design", "Campaign Ideation", "Content Marketing"],
    industry: "Real Estate",
  },
  {
    client: "Highgate",
    description: "Driving digital marketing growth with a $15B global hospitality powerhouse",
    image: "/images/3fo_website_case-studies_highgate_cover.jpg",
    href: "/case-study/highgate",
    tags: ["Content Creation", "Custom Website Design", "SEM"],
    industry: "Hospitality",
  },
  {
    client: "SF State University",
    description: "Igniting change with a multi-channel campaign for education",
    image: "/images/3fo_website-about_hero-3.jpg",
    href: "/case-study/sf-state-university",
    tags: ["Brand & Positioning", "Content Creation", "Campaign Marketing"],
    industry: "Education",
  },
];

export default function WorkPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Break-thru with"
        cycleWords={["impact.", "connection.", "differentiation.", "innovation.", "creativity."]}
        image="/images/3fo_website-work_hero-3.jpg"
      />

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 120px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0 }}>
            Standout{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>case studies</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(0,0,0,0.5)", maxWidth: "400px", lineHeight: 1.6 }}>
            Our favorite projects aren't just pretty. They tackle complex problems and realize business goals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {caseStudies.map((cs) => (
            <Link
              key={cs.client}
              href={cs.href}
              style={{
                display: "block",
                background: "#f5f5f5",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                transition: "border-color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)")}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={cs.image} alt={cs.client} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", display: "block", marginBottom: "8px" }}>
                  {cs.industry}
                </span>
                <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "22px", letterSpacing: "-0.02em", color: "#000", lineHeight: 1.1, marginBottom: "8px" }}>
                  {cs.client}
                </h3>
                <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, marginBottom: "20px" }}>
                  {cs.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {cs.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", color: "rgba(0,0,0,0.4)", background: "rgba(0,0,0,0.06)", padding: "4px 10px", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.08)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
