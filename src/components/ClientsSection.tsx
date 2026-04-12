"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { src: "/logos/3fo_client-logos_netflix_white.svg", alt: "Netflix" },
  { src: "/logos/3fo_client-logos_visa.svg", alt: "Visa" },
  { src: "/logos/3fo_client-logos_roche_white.svg", alt: "Roche" },
  { src: "/logos/3fo_client-logos_sap_white.svg", alt: "SAP" },
  { src: "/logos/3fo_client-logos_genentech_white.svg", alt: "Genentech" },
  { src: "/logos/3fo_client-logos_4-seasons_white.svg", alt: "Four Seasons" },
  { src: "/logos/3fo_client-logos_leading-hotels_white.svg", alt: "Leading Hotels" },
  { src: "/logos/3fo_client-logos_highgate_white.svg", alt: "Highgate" },
  { src: "/logos/3fo_client-logos_pps-white.svg", alt: "Parker Palm Springs" },
  { src: "/logos/3fo_client-logos_tsp_white.svg", alt: "ThoughtSpot" },
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
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
          Top-notch{" "}
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "#f2b233" }}>
            clients
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            color: "rgba(10,10,10,0.5)",
            maxWidth: "400px",
            lineHeight: 1.6,
          }}
        >
          We partner with brands who share our values, and who want to shake things up for the greater good.
        </p>
        <Link
          href="/team"
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
          about →
        </Link>
      </div>

      {/* Logos grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px 60px",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        {logos.map((logo) => (
          <div
            key={logo.alt}
            style={{
              position: "relative",
              height: "40px",
              width: "120px",
              filter: "invert(1) brightness(0.15)",
              transition: "filter 0.2s",
              opacity: 0.85,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.85")}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
