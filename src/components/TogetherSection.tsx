"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Real 300feetout uses videos + images inline within the text
const INLINE_MEDIA = [
  { type: "video", src: "/videos/3fo_home_change.mp4" },
  { type: "image", src: "/images/3fo_home-thrive-03.jpg" },
  { type: "video", src: "/videos/3fo_thrive_511.mp4" },
];

export default function TogetherSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const mediaStyle: React.CSSProperties = {
    display: "inline-block",
    width: "clamp(70px, 9vw, 140px)",
    height: "clamp(50px, 6vw, 95px)",
    borderRadius: 10,
    objectFit: "cover",
    verticalAlign: "middle",
    margin: "0 8px",
  };

  return (
    <section ref={ref} style={{
      background: "#fff",
      padding: "clamp(100px, 14vw, 240px) clamp(24px, 5vw, 80px)",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(50px)",
      transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <h2 style={{
        fontFamily: "'Aeonik', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(36px, 5.5vw, 64px)",
        lineHeight: "1.1",
        letterSpacing: "-1.44px",
        color: "#000",
        maxWidth: 1100,
      }}>
        Together
        <video autoPlay muted loop playsInline style={mediaStyle}>
          <source src={INLINE_MEDIA[0].src} type="video/mp4" />
        </video>
        , we{"\n"}inspire meaningful{"\n"}change
        <Image src={INLINE_MEDIA[1].src} alt="change" width={140} height={95} style={mediaStyle} />
        {" "}
        <span style={{ color: "var(--yellow)" }}>and help</span>
        {"\n"}
        <video autoPlay muted loop playsInline style={mediaStyle}>
          <source src={INLINE_MEDIA[2].src} type="video/mp4" />
        </video>
        {" "}others{" "}
        <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>thrive.</span>
      </h2>
    </section>
  );
}
