"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { src: "/images/3fo_client-logos_netflix_white.svg", alt: "Netflix" },
  { src: "/images/3fo_client-logos_visa.svg", alt: "Visa" },
  { src: "/images/3fo_client-logos_4-seasons_white.svg", alt: "Four Seasons" },
  { src: "/images/3fo_client-logos_roche_white.svg", alt: "Roche" },
  { src: "/images/3fo_client-logos_sap_white.svg", alt: "SAP" },
  { src: "/images/3fo_client-logos_genentech_white.svg", alt: "Genentech" },
  { src: "/images/3fo_client-logos_leading-hotels_white.svg", alt: "Leading Hotels" },
  { src: "/images/3fo_client-logos_highgate_white.svg", alt: "Highgate" },
  { src: "/images/3fo_client-logos_pps-white.svg", alt: "Parker Palm Springs" },
  { src: "/images/3fo_client-logos_tsp_white.svg", alt: "ThoughtSpot" },
  { src: "/images/3fo_client-logos_wdfm_white.svg", alt: "Walt Disney Family Museum" },
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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
        padding: "100px 40px 120px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "64px",
          flexWrap: "wrap" as const,
          gap: "24px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 4vw, 64px)",
            letterSpacing: "-1.44px",
            color: "#000000",
            lineHeight: 1.0,
          }}
        >
          Top-notch{" "}
          <span
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              color: "#fdc115",
            }}
          >
            clients
          </span>
        </h2>

        {/* Right side: description + link */}
        <div
          style={{
            maxWidth: "440px",
            display: "flex",
            flexDirection: "column" as const,
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.6,
            }}
          >
            We partner with brands who share our values, and who want to shake
            things up for the greater good.
          </p>
          <Link
            href="/about"
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            about &rarr;
          </Link>
        </div>
      </div>

      {/* Logo grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "48px 64px",
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
              position: "relative" as const,
              height: "40px",
              width: "120px",
              filter: "invert(1) brightness(0.15)",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              style={{
                objectFit: "contain" as const,
                objectPosition: "left center",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
