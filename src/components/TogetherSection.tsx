"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Inline images that appear BETWEEN the words (real 300feetout pattern)
const INLINE_IMAGES = [
  { src: "/images/3fo_home-thrive-02.jpg", alt: "thrive" },
  { src: "/images/3fo_home-thrive-03.jpg", alt: "change" },
  { src: "/images/3fo_home-thrive-04.jpg", alt: "help" },
];

export default function TogetherSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const imgStyle: React.CSSProperties = {
    display: "inline-block",
    width: "clamp(60px, 8vw, 120px)",
    height: "clamp(40px, 5vw, 80px)",
    borderRadius: 8,
    objectFit: "cover",
    verticalAlign: "middle",
    margin: "0 6px",
  };

  return (
    <section ref={ref} style={{
      background: "#fff", padding: "clamp(100px, 12vw, 200px) clamp(24px, 5vw, 80px)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "opacity 0.9s ease, transform 0.9s ease",
    }}>
      <h2 style={{
        fontFamily: "'Aeonik', sans-serif", fontWeight: 900,
        fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 1.08,
        letterSpacing: "-0.03em", color: "#000", maxWidth: 1100,
      }}>
        Together
        <Image src={INLINE_IMAGES[0].src} alt={INLINE_IMAGES[0].alt} width={120} height={80} style={imgStyle} />
        , we<br />
        inspire meaningful<br />
        change
        <Image src={INLINE_IMAGES[1].src} alt={INLINE_IMAGES[1].alt} width={120} height={80} style={imgStyle} />
        {" "}
        <span style={{ color: "var(--yellow)" }}>and help</span>
        <br />
        <Image src={INLINE_IMAGES[2].src} alt={INLINE_IMAGES[2].alt} width={120} height={80} style={imgStyle} />
        {" "}others{" "}
        <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>thrive.</span>
      </h2>
    </section>
  );
}
