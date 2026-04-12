"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const CASES = [
  { title: "Parker Palm Springs", desc: "High-impact digital marketing for an iconic desert oasis resort", video: "/videos/3fo_website_case-studies_pps_cover.mp4", href: "/case-study/parker-palm-springs" },
  { title: "ThoughtSpot", desc: "Powering global AI with seamlessly integrated web development", video: "/videos/3fo_website_case-studies_tsp_cover.mp4", href: "/case-study/thoughtspot" },
  { title: "Personalis", desc: "Building a brand platform for precision oncology innovation", video: "/videos/3fo_website_case-studies_per_tech-cover.mp4", href: "/case-study/personalis" },
  { title: "ECS Senior Living", desc: "A century of care reimagined through digital transformation", video: "/videos/3fo_website_case-studies_ecs_cover.mp4", href: "/case-study/ecs-senior-living" },
  { title: "Highgate", desc: "Elevating a global real estate investment firm's digital presence", video: "/videos/3fo_website_case-studies_highgate_cover.mp4", href: "/case-study/highgate" },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: "#fff", padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1400, margin: "0 auto 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
        <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "70.4px", letterSpacing: "-1.44px" }}>
          Dig into<br />our <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>work</span>
        </h2>
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, lineHeight: 1.5, color: "rgba(0,0,0,0.55)", fontWeight: 300, marginBottom: 16 }}>
            Looking to attract more people, launch a new product, or upgrade your tech stack? Explore our real-world success stories.
          </p>
          <Link href="/work" style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 15, color: "#000", display: "inline-flex", alignItems: "center", gap: 6 }}>
            work <span>→</span>
          </Link>
        </div>
      </div>

      {/* Grid layout */}
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: 24,
      }}>
        {CASES.map(c => (
          <Link key={c.title} href={c.href} style={{
            borderRadius: 16, overflow: "hidden", position: "relative",
            aspectRatio: "4 / 3", display: "block",
          }}
            onMouseEnter={e => { const v = e.currentTarget.querySelector("video"); if (v) (v as HTMLVideoElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { const v = e.currentTarget.querySelector("video"); if (v) (v as HTMLVideoElement).style.transform = "scale(1)"; }}
          >
            <video autoPlay muted loop playsInline style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
            }}>
              <source src={c.video} type="video/mp4" />
            </video>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
              display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28,
            }}>
              <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 24, color: "#fff", marginBottom: 6 }}>{c.title}</h3>
              <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{c.desc}</p>
              <span style={{
                marginTop: 12, fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 14,
                color: "var(--yellow)", display: "inline-flex", alignItems: "center", gap: 6,
              }}>view case <span>→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
