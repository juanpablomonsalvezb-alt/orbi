"use client";
import { useLang } from "@/contexts/LangContext";
import Link from "next/link";

export default function CTASection() {
  const { tr } = useLang();

  return (
    <section style={{
      background: "var(--yellow)",
      padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px) 60px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: "clamp(44px, 7vw, 112px)", lineHeight: 1.0,
          letterSpacing: "-0.035em", color: "#000", marginBottom: 32,
        }}>
          {tr.cta_title}
        </h2>
        <p style={{
          fontFamily: "'Aeonik', sans-serif", fontSize: 20,
          color: "rgba(0,0,0,0.55)", marginBottom: 40,
        }}>
          {tr.cta_sub}
        </p>
        <Link href="/contact" style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: 16, color: "#fff", background: "#000",
          padding: "16px 40px", borderRadius: 100, display: "inline-block",
        }}>
          {tr.hero_cta}
        </Link>
      </div>
    </section>
  );
}
