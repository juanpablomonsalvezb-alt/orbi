"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

export default function TogetherSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: "#fff",
      padding: "clamp(100px, 14vw, 240px) clamp(24px, 5vw, 80px)",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(50px)",
      transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <h2 style={{
        fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
        fontSize: "clamp(44px, 6.5vw, 77px)", lineHeight: 1.1,
        letterSpacing: "-1.7px", color: "#000", maxWidth: 1100,
      }}>
        {tr.together}
      </h2>
    </section>
  );
}
