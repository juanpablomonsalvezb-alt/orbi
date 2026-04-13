"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

const HERO_VIDEOS = [
  "/videos/3fo003_2024-website-design_hero-vignette_01_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_02-b_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_03.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_04_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_05_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_06_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_07_1.mp4",
];

export default function Hero() {
  const [vidIdx, setVidIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { tr, dir } = useLang();

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.load(); v.play().catch(() => {}); }
  }, [vidIdx]);

  return (
    <section style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 640, overflow: "hidden", background: "#000",
    }}>
      <video
        ref={videoRef}
        autoPlay muted playsInline
        onEnded={() => setVidIdx(i => (i + 1) % HERO_VIDEOS.length)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={HERO_VIDEOS[vidIdx]} type="video/mp4" />
      </video>

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", insetInline: 0, bottom: 0, zIndex: 2,
        display: "flex", flexDirection: "column", gap: 24,
        padding: "0 clamp(24px,5vw,80px) clamp(56px,8vh,110px)",
        direction: dir,
      }}>
        <h1 style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 1.05,
          letterSpacing: "-0.03em", color: "#fff", maxWidth: 1100,
          margin: 0,
        }}>
          {tr.hero_title}
        </h1>

        <p style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 400,
          fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.75)",
          maxWidth: 600, margin: 0, lineHeight: 1.5,
        }}>
          {tr.hero_sub}
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
            fontSize: 15, color: "#000", background: "var(--yellow)",
            padding: "14px 36px", borderRadius: 100,
            letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}>
            {tr.hero_cta}
          </Link>
          <Link href="/work" style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 500,
            fontSize: 15, color: "#fff",
            padding: "14px 36px", borderRadius: 100,
            border: "1.5px solid rgba(255,255,255,0.4)",
            letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}>
            {tr.hero_secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
