"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "Craft a winning game plan",
    desc: "A solid strategy starts with your brand, aligns with your audience, supports business goals, and is backed by the right resources, execution, and results.",
    items: ["Brand Strategy", "Naming + Tagline", "Brand Architecture", "Customer Persona", "Go-To-Market"],
  },
  {
    num: "02",
    title: "Create something amazing",
    desc: "Don't settle for ordinary — dare to break-thru. Be bold. Be different. Get noticed. Because boring doesn't break boundaries.",
    items: ["Brand Identity", "Website Design", "Motion Design", "Photography + Video", "UX/UI Design"],
  },
  {
    num: "03",
    title: "Connect with people",
    desc: "Real connections beat clever gimmicks. Ditch the fake, forget the fluff — focus on being genuinely good at what you do. That's how you win.",
    items: ["Digital Advertising", "Search Engine Marketing", "Social Media", "Email Marketing", "Content Marketing"],
  },
  {
    num: "04",
    title: "Digital marketing services",
    desc: "Need a standout website, powerful multi-channel marketing plan, or a campaign that turns heads? We're here to make it happen.",
    items: ["Campaign Ideation", "Digital Channel Strategy", "Reporting + Analytics", "Search Engine Optimization"],
  },
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const s = SERVICES[activeIdx];

  return (
    <section ref={ref} style={{
      background: "#fff", padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Big yellow star icon */}
        <div style={{
          width: "clamp(80px, 15vw, 200px)", height: "clamp(80px, 15vw, 200px)",
          margin: "0 auto 48px",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
            <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" fill="var(--yellow)" />
          </svg>
        </div>

        {/* Title + description (centered) */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 900,
            fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 1.1,
            letterSpacing: "-0.02em", marginBottom: 16,
          }}>
            {s.title.split(" ").slice(0, 1).join(" ")}{" "}
            <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>
              {s.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 400, fontSize: 16,
            lineHeight: 1.6, color: "rgba(0,0,0,0.6)", marginBottom: 20,
          }}>{s.desc}</p>
          <Link href="/services" style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 15,
            color: "#000", display: "inline-flex", alignItems: "center", gap: 6,
          }}>services <span>→</span></Link>
        </div>

        {/* Pagination dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {SERVICES.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} style={{
              width: 36, height: 36, borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.15)",
              background: i === activeIdx ? "#000" : "transparent",
              color: i === activeIdx ? "#fff" : "#000",
              fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 14,
              cursor: "pointer", transition: "all .2s ease",
            }}>
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
