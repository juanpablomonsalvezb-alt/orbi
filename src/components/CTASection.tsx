"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const cycleVerbs = [
  "create",
  "discover",
  "strategize",
  "ideate",
  "craft",
  "design",
  "build",
  "develop",
  "optimize",
];

export default function CTASection() {
  const [verbIdx, setVerbIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerbIdx((i) => (i + 1) % cycleVerbs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        background: "#f5c94c",
        padding: "120px 40px 160px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 7vw, 120px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#0a0a0a",
          }}
        >
          <span style={{ display: "block", fontWeight: 300, color: "rgba(10,10,10,0.4)" }}>
            Let&apos;s
          </span>
          <span style={{ display: "block", overflow: "hidden", height: "1.05em" }}>
            <span
              key={verbIdx}
              style={{
                display: "block",
                color: "#0a0a0a",
                animation: "cycleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
              }}
            >
              {cycleVerbs[verbIdx]}
            </span>
          </span>
          <span style={{ display: "block", fontWeight: 300, color: "rgba(10,10,10,0.4)" }}>
            new futures
          </span>
          <span style={{ display: "block", fontWeight: 300, color: "rgba(10,10,10,0.4)" }}>
            together.
          </span>
        </h2>

        <Link
          href="/contact"
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "#000",
            background: "#fff",
            padding: "16px 40px",
            borderRadius: "100px",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          let&apos;s chat
        </Link>
      </div>

      <style>{`
        @keyframes cycleIn {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes cycleOut {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
