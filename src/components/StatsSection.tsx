"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  {
    number: "203%",
    label: "increase in revenue from search traffic",
    client: "Alohilani Resort",
    href: "/",
  },
  {
    number: "247%",
    label: "increase in revenue from Google ads",
    client: "Parker Palm Springs",
    href: "/case-study/parker-palm-springs",
  },
  {
    number: "535%",
    label: "boost in site traffic since launch",
    client: "ECS Senior Living",
    href: "/case-study/ecs-senior-living",
  },
  {
    number: "50%",
    label: "increase in engagement",
    client: "ThoughtSpot",
    href: "/case-study/thoughtspot",
  },
  {
    number: "36+",
    label: "students and staff video shoot",
    client: "SF State University",
    href: "/case-study/sf-state-university",
  },
];

function useCountUp(target: string, trigger: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const suffix = target.replace(/[0-9]/g, "");
    const num = parseInt(target);
    if (isNaN(num)) return;

    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = num / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplay(num + suffix);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start) + suffix);
      }
    }, step);

    return () => clearInterval(timer);
  }, [trigger, target]);

  return display;
}

function StatItem({ stat, visible }: { stat: (typeof stats)[0]; visible: boolean }) {
  const display = useCountUp(stat.number, visible);

  return (
    <div
      style={{
        padding: "48px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gridTemplateColumns: "200px 1fr 200px",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <span
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(48px, 5vw, 80px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1,
          tabularNums: "tabular-nums",
        } as React.CSSProperties}
      >
        {display}
      </span>
      <p
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </p>
      <Link
        href={stat.href}
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          justifyContent: "flex-end",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
      >
        {stat.client} →
      </Link>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0a0a0a",
        padding: "80px 40px 120px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h2
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 4vw, 60px)",
          letterSpacing: "-0.03em",
          color: "#fff",
          lineHeight: 1.0,
          marginBottom: "8px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        Results-driven{" "}
        <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>
          impact
        </span>
      </h2>

      <div
        style={{
          marginTop: "48px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {stats.map((stat) => (
          <StatItem key={stat.number} stat={stat} visible={visible} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 200px 1fr 200px"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
