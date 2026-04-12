"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    client: "Parker Palm Springs",
    description: "High-impact digital marketing for an iconic desert oasis resort",
    image: "/images/3fo_website_case-studies_pps_cover_1.jpg",
    href: "/case-study/parker-palm-springs",
    tags: ["Digital Channel Strategy", "Campaign Ideation + Implementation", "Digital Advertising", "Search Engine Marketing"],
  },
  {
    client: "ThoughtSpot",
    description: "Powering global AI with seamlessly integrated web development",
    image: "/images/3fo_website_case-studies_tsp_cover.jpg",
    href: "/case-study/thoughtspot",
    tags: ["Technology Audits", "Website Development", "Website Re-platforming", "Security & Performance Optimization"],
  },
  {
    client: "Personalis",
    description: "Scaling next-stage biotech growth into commercialization",
    image: "/images/3fo_website_case-studies_per_tech-cover.jpg",
    href: "/case-study/personalis",
    tags: ["Campaign Ideation + Implementation", "Custom Website Design", "Information Architecture", "Motion Graphics & Video"],
  },
  {
    client: "ECS Senior Living",
    description: "Re-envisioning a new corporate brand strategy for a century-old company",
    image: "/images/3fo_website_case-studies_ecs_cover_1.jpg",
    href: "/case-study/ecs-senior-living",
    tags: ["Brand Identity & Design", "Campaign Ideation + Implementation", "Content Marketing Strategy", "Website Development"],
  },
  {
    client: "Highgate",
    description: "Driving digital marketing growth with a $15B global hospitality powerhouse",
    image: "/images/3fo_website_case-studies_highgate_cover.jpg",
    href: "/case-study/highgate",
    tags: ["Content Creation", "Custom Website Design", "Information Architecture", "Search Engine Marketing"],
  },
];

export default function WorkSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cs = caseStudies[active];

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: "80px 40px 120px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 60px)",
            letterSpacing: "-0.03em",
            color: "#0a0a0a",
            lineHeight: 1.0,
          }}
        >
          Dig into{" "}
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "#f2b233" }}>
            our work
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            color: "rgba(10,10,10,0.5)",
            maxWidth: "420px",
            lineHeight: 1.6,
          }}
        >
          Looking to attract more people, launch a new product, or upgrade your tech stack? Explore our real-world success stories.
        </p>
        <Link
          href="/work"
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "14px",
            color: "rgba(10,10,10,0.6)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.6)")}
        >
          work →
        </Link>
      </div>

      {/* Main card + sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Main case study card */}
        <Link
          href={cs.href}
          style={{
            display: "block",
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            aspectRatio: "16/9",
            background: "#111",
          }}
        >
          <Image
            src={cs.image}
            alt={cs.client}
            fill
            style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px" }}>
            <div
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 300,
                fontSize: "12px",
                color: "rgba(10,10,10,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              View case study
            </div>
            <h3
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
                lineHeight: 1.1,
                marginBottom: "8px",
              }}
            >
              {cs.client}
            </h3>
            <p
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                color: "rgba(10,10,10,0.6)",
                lineHeight: 1.5,
              }}
            >
              {cs.description}
            </p>
          </div>
        </Link>

        {/* Sidebar: case study list + tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {caseStudies.map((item, i) => (
            <button
              key={item.client}
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(10,10,10,0.08)",
                padding: "20px 0",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: active === i ? 700 : 400,
                  fontSize: "15px",
                  color: active === i ? "#fff" : "rgba(10,10,10,0.4)",
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s",
                }}
              >
                {item.client}
              </span>
              <span
                style={{
                  color: "rgba(10,10,10,0.3)",
                  fontSize: "16px",
                  transform: active === i ? "translateX(4px)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                →
              </span>
            </button>
          ))}

          {/* Tags */}
          <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {cs.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(10,10,10,0.5)",
                  background: "rgba(10,10,10,0.07)",
                  padding: "6px 12px",
                  borderRadius: "100px",
                  border: "1px solid rgba(10,10,10,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {tag} →
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Nav counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <button
          onClick={() => setActive((a) => (a - 1 + caseStudies.length) % caseStudies.length)}
          style={{
            background: "none",
            border: "1px solid rgba(10,10,10,0.2)",
            color: "#0a0a0a",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s",
          }}
        >
          ←
        </button>
        <span
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "13px",
            color: "rgba(10,10,10,0.4)",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => setActive((a) => (a + 1) % caseStudies.length)}
          style={{
            background: "none",
            border: "1px solid rgba(10,10,10,0.2)",
            color: "#0a0a0a",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s",
          }}
        >
          →
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
