"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const stats = [
  {
    number: 203,
    suffix: "%",
    label: "increase in revenue from search traffic",
    client: "Alohilani Resort",
    href: "/case-study/alohilani-resort",
  },
  {
    number: 247,
    suffix: "%",
    label: "increase in revenue from Google ads",
    client: "Parker Palm Springs",
    href: "/case-study/parker-palm-springs",
  },
  {
    number: 535,
    suffix: "%",
    label: "boost in site traffic since launch",
    client: "ECS Senior Living",
    href: "/case-study/ecs-senior-living",
  },
  {
    number: 50,
    suffix: "%",
    label: "increase in engagement",
    client: "ThoughtSpot",
    href: "/case-study/thoughtspot",
  },
];

function useCountUp(target: number, trigger: boolean): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1800;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let frame: number;

    const tick = () => {
      start += increment;
      if (start >= target) {
        setCurrent(target);
      } else {
        setCurrent(Math.floor(start));
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [trigger, target]);

  return current;
}

function StatRow({
  stat,
  visible,
  isLast,
}: {
  stat: (typeof stats)[0];
  visible: boolean;
  isLast: boolean;
}) {
  const count = useCountUp(stat.number, visible);

  return (
    <div
      style={{
        padding: "48px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.08)",
        display: "grid",
        gridTemplateColumns: "240px 1fr auto",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {/* Big number */}
      <span
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(60px, 8vw, 120px)",
          letterSpacing: "-0.04em",
          color: "var(--yellow)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        {stat.suffix}
      </span>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "rgba(0,0,0,0.55)",
          lineHeight: 1.5,
          maxWidth: "360px",
        }}
      >
        {stat.label}
      </p>

      {/* Case study link */}
      <Link
        href={stat.href}
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "#000000",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap" as const,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {stat.client} &rarr;
      </Link>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: "120px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(48px, 6vw, 96px)",
          letterSpacing: "-0.03em",
          color: "#000000",
          lineHeight: 1.0,
          marginBottom: "8px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        Results-driven{" "}
        <span
          style={{
            fontWeight: 300,
            fontStyle: "italic",
            color: "#fdc115",
          }}
        >
          impact
        </span>
      </h2>

      {/* Stats list */}
      <div
        style={{
          marginTop: "48px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      >
        {stats.map((stat, i) => (
          <StatRow
            key={stat.number}
            stat={stat}
            visible={visible}
            isLast={i === stats.length - 1}
          />
        ))}
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 768px) {
          section [style*="grid-template-columns: 240px"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 32px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
