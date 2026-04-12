"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const industryWords = ["brands", "tech", "healthcare", "real estate", "hospitality", "education", "arts"];
const audienceWords = ["people", "investors", "patients", "dwellers", "explorers", "learners", "patrons"];

const caseStudies = [
  { label: "ThoughtSpot", href: "/case-study/thoughtspot" },
  { label: "Personalis", href: "/case-study/personalis" },
  { label: "ECS Senior Living", href: "/case-study/ecs-senior-living" },
  { label: "Parker Palm Springs", href: "/case-study/parker-palm-springs" },
  { label: "SF State University", href: "/case-study/sf-state-university" },
  { label: "Smuin Ballet", href: "/work#smuin" },
];

const heroVideos = [
  "/videos/3fo003_2024-website-design_hero-vignette_01_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_03.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_04_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_05_1.mp4",
  "/videos/3fo003_2024-website-design_hero-vignette_07_1.mp4",
];

export default function Hero() {
  const [industryIdx, setIndustryIdx] = useState(0);
  const [audienceIdx, setAudienceIdx] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cycle industry words
  useEffect(() => {
    const interval = setInterval(() => {
      setIndustryIdx((i) => (i + 1) % industryWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Cycle audience words (offset timing)
  useEffect(() => {
    const interval = setInterval(() => {
      setAudienceIdx((i) => (i + 1) % audienceWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Cycle videos on ended
  const handleVideoEnded = () => {
    setVideoIdx((i) => (i + 1) % heroVideos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoIdx]);

  const cycleStyle = {
    display: "inline-block",
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.7,
        }}
      >
        <source src={heroVideos[videoIdx]} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.2) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 40px 60px",
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "48px",
            maxWidth: "900px",
          }}
        >
          Connecting{" "}
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span
              key={`i-${industryIdx}`}
              style={{
                display: "inline-block",
                color: "#f5c94c",
                animation: "cycleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
              }}
            >
              {industryWords[industryIdx]}
            </span>
          </span>
          <br />
          with{" "}
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span
              key={`a-${audienceIdx}`}
              style={{
                display: "inline-block",
                color: "#f5c94c",
                animation: "cycleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
              }}
            >
              {audienceWords[audienceIdx]}
            </span>
          </span>
          .
        </h1>

        {/* Case study links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 24px",
          }}
        >
          {caseStudies.map((cs) => (
            <Link
              key={cs.label}
              href={cs.href}
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.02em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {cs.label}
              <span style={{ fontSize: "16px" }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cycleIn {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cycleOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-100%); }
        }
        @media (max-width: 768px) {
          h1 { font-size: clamp(32px, 8vw, 56px) !important; }
        }
      `}</style>
    </section>
  );
}
