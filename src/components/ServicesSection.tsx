"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Craft a winning gameplan",
    description:
      "A solid strategy starts with your brand, aligns with your audience, supports business goals, and is backed by the right resources, execution, and results.",
    href: "/services#craft",
    label: "Digital marketing services",
  },
  {
    number: "02",
    title: "Create something amazing",
    description:
      "Don't settle for ordinary — dare to break-thru. Be bold. Be different. Get noticed. Because boring doesn't break boundaries.",
    href: "/services#create",
    label: "Creative & Design",
  },
  {
    number: "03",
    title: "Connect with people",
    description:
      "Real connections beat clever gimmicks. Ditch the fake, forget the fluff — focus on being genuinely good at what you do. That's how you win.",
    href: "/services#connect",
    label: "Digital Channels",
  },
  {
    number: "04",
    title: "Digital marketing services",
    description:
      "Need a standout website, powerful multi-channel marketing plan, or a campaign that turns heads? We're here to make it happen.",
    href: "/services",
    label: "Full Service",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: "80px 40px 120px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "16px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
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
          Digital marketing{" "}
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "#f2b233" }}>
            services
          </span>
        </h2>
        <Link
          href="/services"
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
          services →
        </Link>
      </div>

      {/* Service cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(10,10,10,0.08)",
          border: "1px solid rgba(10,10,10,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
      >
        {services.map((service, i) => (
          <div
            key={service.number}
            onMouseEnter={() => setActive(i)}
            style={{
              background: active === i ? "rgba(10,10,10,0.06)" : "#0a0a0a",
              padding: "48px 32px",
              cursor: "pointer",
              transition: "background 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <span
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                color: "rgba(10,10,10,0.3)",
                letterSpacing: "0.08em",
              }}
            >
              {service.number}
            </span>
            <h3
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </h3>
            <p
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(10,10,10,0.5)",
                lineHeight: 1.7,
                flex: 1,
              }}
            >
              {service.description}
            </p>
            <Link
              href={service.href}
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: "13px",
                color: "rgba(10,10,10,0.5)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "auto",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.5)")}
            >
              services →
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
