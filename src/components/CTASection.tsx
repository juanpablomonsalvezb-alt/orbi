"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const VERBS = ["create", "discover", "strategize", "ideate", "craft", "design", "build", "develop", "optimize"];
// Small inline images that appear next to the cycling verb
const VERB_IMAGES = [
  "/images/3fo_home-thrive-05.jpg",
  "/images/3fo_home-thrive-06.jpg",
  "/images/3fo_home-thrive-07.jpg",
  "/images/3fo_home-thrive-08.jpg",
  "/images/3fo_home-thrive-02.jpg",
  "/images/3fo_home-thrive-03.jpg",
  "/images/3fo_home-thrive-04.jpg",
  "/images/3fo_home-thrive-05.jpg",
  "/images/3fo_home-thrive-06.jpg",
];

export default function CTASection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % VERBS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      background: "var(--yellow)", padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px) 60px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 900,
          fontSize: "clamp(44px, 7vw, 112px)", lineHeight: 1.0,
          letterSpacing: "-0.035em", color: "#000",
        }}>
          Let&apos;s{" "}
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <Image
              src={VERB_IMAGES[idx % VERB_IMAGES.length]}
              alt=""
              width={100} height={68}
              style={{
                display: "inline-block", width: "clamp(60px, 8vw, 110px)", height: "clamp(40px, 5vw, 70px)",
                borderRadius: 8, objectFit: "cover", verticalAlign: "middle", marginRight: 8,
              }}
            />
          </span>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span key={idx} style={{
              display: "inline-block",
              animation: "cycleIn .55s cubic-bezier(.16,1,.3,1) forwards",
            }}>
              {VERBS[idx]}
            </span>
          </span>
          <br />
          <span style={{ color: "#fff" }}>new futures together.</span>
        </h2>

        {/* Email subscription */}
        <div style={{
          marginTop: 48, display: "flex", alignItems: "center", gap: 12,
          maxWidth: 420,
        }}>
          <div style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "clamp(16px, 2vw, 20px)",
            color: "#000", whiteSpace: "nowrap",
          }}>
            Send cool stuff to my inbox
          </div>
          <span style={{ fontSize: 24, color: "#000" }}>→</span>
        </div>

        <div style={{
          marginTop: 16, display: "flex", alignItems: "center", maxWidth: 420,
          borderBottom: "2px solid rgba(0,0,0,0.3)", paddingBottom: 8,
        }}>
          <input type="email" placeholder="Enter your email"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "'Aeonik', sans-serif", fontSize: 16, color: "#000",
            }}
          />
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: "#000",
          }}>→</button>
        </div>
      </div>
    </section>
  );
}
