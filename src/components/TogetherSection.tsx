"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/3fo_home_thrive-01.gif", alt: "Thrive 1" },
  { src: "/images/3fo_home-thrive-02.jpg", alt: "Thrive 2" },
  { src: "/images/3fo_home-thrive-03.jpg", alt: "Thrive 3" },
  { src: "/images/3fo_home-thrive-04.jpg", alt: "Thrive 4" },
  { src: "/images/3fo_home-thrive-05.jpg", alt: "Thrive 5" },
  { src: "/images/3fo_home-thrive-06.jpg", alt: "Thrive 6" },
  { src: "/images/3fo_home-thrive-07.jpg", alt: "Thrive 7" },
  { src: "/images/3fo_home-thrive-08.jpg", alt: "Thrive 8" },
];

export default function TogetherSection() {
  const [activeImg, setActiveImg] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((i) => (i + 1) % images.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0a0a0a",
        padding: "120px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Left: text */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 64px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          Together
          <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>
          <br />
          we inspire
          <br />
          meaningful
          <br />
          change
          <br />
          and help
          <br />
          others{" "}
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
            }}
          >
            thrive.
          </span>
        </p>
      </div>

      {/* Right: image slideshow */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1200/850",
          borderRadius: "16px",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === activeImg ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: "cover" }}
              priority={i === 0}
              unoptimized={img.src.endsWith(".gif")}
            />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
