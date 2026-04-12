"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  cycleWords: string[];
  image: string;
  prefix?: string;
}

export default function PageHero({ title, cycleWords, image, prefix }: PageHeroProps) {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (cycleWords.length <= 1) return;
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % cycleWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cycleWords.length]);

  return (
    <section style={{ position: "relative", height: "80vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <Image src={image} alt={title} fill style={{ objectFit: "cover", opacity: 0.55 }} priority />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "0 40px 64px", width: "100%" }}>
        <h1
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#fff",
            maxWidth: "900px",
          }}
        >
          {title}
          {prefix && <><br /><span style={{ fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{prefix}</span></>}
          {cycleWords.length > 0 && (
            <>
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span key={wordIdx} style={{
                  display: "inline-block",
                  animation: "cycleIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}>
                  {cycleWords[wordIdx]}
                </span>
              </span>
            </>
          )}
          {title.includes("years") && <span style={{ display: "block", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>and still</span>}
        </h1>
      </div>
      <style>{`
        @keyframes cycleIn { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }
        @keyframes cycleOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-100%); } }
      `}</style>
    </section>
  );
}
