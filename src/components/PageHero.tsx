"use client";
import { useEffect, useState } from "react";
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
    }, 2200);
    return () => clearInterval(interval);
  }, [cycleWords.length]);

  return (
    <section style={{ position: "relative", height: "80vh", minHeight: "500px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <Image src={image} alt={title} fill style={{ objectFit: "cover", opacity: 0.7 }} priority />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(24px, 5vw, 80px) 64px", width: "100%" }}>
        <h1
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 100px)",
            lineHeight: "110px",
            letterSpacing: "-2.2px",
            color: "#fff",
            maxWidth: "1100px",
          }}
        >
          {title}
          {prefix && <><br /><span style={{ fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>{prefix}</span></>}
          {cycleWords.length > 0 && (
            <>
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  key={wordIdx}
                  style={{
                    display: "inline-block",
                    animation: "cycleIn 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
                    color: "var(--yellow)",
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {cycleWords[wordIdx]}
                </span>
              </span>
            </>
          )}
        </h1>
      </div>
    </section>
  );
}
