"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const INDUSTRY = ["brands", "tech", "healthcare", "real estate", "hospitality", "education", "arts"];
const AUDIENCE = ["people", "investors", "patients", "dwellers", "explorers", "learners", "patrons"];
const CASE_STUDIES = [
  { label: "ThoughtSpot", href: "/case-study/thoughtspot" },
  { label: "Personalis", href: "/case-study/personalis" },
  { label: "ECS Senior Living", href: "/case-study/ecs-senior-living" },
  { label: "Parker Palm Springs", href: "/case-study/parker-palm-springs" },
  { label: "SF State University", href: "/case-study/sf-state-university" },
  { label: "Smuin Ballet", href: "/work" },
];
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
  const [idx, setIdx] = useState(0);
  const [vidIdx, setVidIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % INDUSTRY.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.load(); v.play().catch(() => {}); }
  }, [vidIdx]);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, overflow: "hidden", background: "#000" }}>
      <video ref={videoRef} autoPlay muted playsInline onEnded={() => setVidIdx(i => (i + 1) % HERO_VIDEOS.length)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
        <source src={HERO_VIDEOS[vidIdx]} type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 35%, transparent 100%)" }} />
      <div style={{ position: "absolute", insetInline: 0, bottom: 0, zIndex: 2, display: "flex", flexDirection: "column", gap: 28, padding: "0 clamp(24px,5vw,80px) clamp(48px,7vh,96px)" }}>
        <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7vw, 100px)", lineHeight: "110px", letterSpacing: "-2.2px", color: "#fff", maxWidth: 1200 }}>
          Connecting{" "}
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span key={`i${idx}`} style={{ display: "inline-block", color: "var(--yellow)", animation: "cycleIn .55s cubic-bezier(.16,1,.3,1) forwards" }}>
              {INDUSTRY[idx]}
            </span>
          </span>
          <br />with{" "}
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span key={`a${idx}`} style={{ display: "inline-block", color: "var(--yellow)", animation: "cycleIn .55s cubic-bezier(.16,1,.3,1) forwards", animationDelay: ".12s" }}>
              {AUDIENCE[idx]}
            </span>
          </span>.
        </h1>
        <Link key={`cs${idx}`} href={CASE_STUDIES[idx % CASE_STUDIES.length].href}
          style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content", animation: "cycleIn .55s cubic-bezier(.16,1,.3,1) forwards", animationDelay: ".2s" }}>
          {CASE_STUDIES[idx % CASE_STUDIES.length].label} <span style={{ fontSize: 18 }}>→</span>
        </Link>
      </div>
    </section>
  );
}
