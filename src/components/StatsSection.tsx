"use client";
import { useEffect, useRef, useState } from "react";

/*
 * Datos exactos desde: Nebbuler_Prompt_Maestro_ClaudeCode.docx — Sección 4
 * Card 1: Contador en vivo (algoritmo exacto del documento)
 * Card 2: 36% pymes sin sitio web (OECD 2025)
 * Card 3: 72h entrega garantizada
 * Card 4: 18 países
 */

/* ─── Algoritmo contador vivo ───────────────────────────────────────── */
const BASE_COUNT = 1975;
const PER_DAY = 17;
const LAUNCH_DATE = new Date("2026-04-13T00:00:00");

function getCount(now: Date): number {
  const totalHours = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / 3_600_000);
  if (totalHours < 0) return BASE_COUNT;
  const completeDays = Math.floor(totalHours / 24);
  const hoursToday = totalHours % 24;
  const addedToday = Math.min(hoursToday, PER_DAY);
  return BASE_COUNT + completeDays * PER_DAY + addedToday;
}

/* ─── easeOutCubic animación ────────────────────────────────────────── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useAnimatedCount(target: number, trigger: boolean, duration = 1800): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(easeOutCubic(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return value;
}

/* ─── Cards config ──────────────────────────────────────────────────── */
type Card =
  | { type: "live"; label: string }
  | { type: "stat"; value: string; label: string; source?: string };

const CARDS: Card[] = [
  {
    type: "live",
    label: "sitios web publicados con Nebbuler",
  },
  {
    type: "stat",
    value: "36%",
    label: "de las pymes en el mundo no tiene sitio web",
    source: "OECD 2025",
  },
  {
    type: "stat",
    value: "72h",
    label: "tiempo máximo de entrega garantizado",
  },
  {
    type: "stat",
    value: "18",
    label: "países donde opera Nebbuler",
  },
];

/* ─── LiveCard ──────────────────────────────────────────────────────── */
function LiveCard({ label, visible }: { label: string; visible: boolean }) {
  const [target, setTarget] = useState(() => getCount(new Date()));
  const displayed = useAnimatedCount(target, visible);

  useEffect(() => {
    const id = setInterval(() => setTarget(getCount(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <article className={`stat-card${visible ? " is-visible" : ""}`}>
      <div className="stat-card__number stat-card__number--yellow stat-card__number--live">
        {displayed.toLocaleString("es-CL")}
        <span className="stat-card__live-dot" aria-hidden="true" />
      </div>
      <p className="stat-card__label">{label}</p>
    </article>
  );
}

/* ─── StatCard ──────────────────────────────────────────────────────── */
function StatCard({
  card,
  visible,
  delay,
}: {
  card: Extract<Card, { type: "stat" }>;
  visible: boolean;
  delay: number;
}) {
  return (
    <article className={`stat-card${visible ? " is-visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-card__number stat-card__number--yellow">{card.value}</div>
      <p className="stat-card__label">{card.label}</p>
      {card.source && <p className="stat-card__source">{card.source}</p>}
    </article>
  );
}

/* ─── StatsSection ──────────────────────────────────────────────────── */
export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .stats-section {
          background: #fff;
          padding: clamp(64px, 8vw, 120px) clamp(16px, 4vw, 40px);
        }
        .stats-section__inner {
          max-width: 1320px;
          margin: 0 auto;
        }

        /* ── Título ── */
        .stats-title {
          font-family: 'Aeonik', sans-serif;
          font-weight: 700;
          font-size: clamp(40px, 6vw, 96px);
          letter-spacing: -0.04em;
          color: #000;
          line-height: 1;
          margin: 0 0 clamp(40px, 5vw, 80px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .stats-title.is-visible { opacity: 1; transform: none; }
        .stats-title em {
          font-weight: 300;
          font-style: italic;
          color: #fdc115;
        }

        /* ── Grid de 4 cards ── */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 16px;
          overflow: hidden;
        }
        @media (min-width: 900px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Card individual ── */
        .stat-card {
          background: #fff;
          padding: clamp(28px, 4vw, 48px) clamp(20px, 3vw, 40px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .stat-card.is-visible { opacity: 1; transform: none; }

        /* ── Número grande ── */
        .stat-card__number {
          font-family: 'Aeonik', sans-serif;
          font-weight: 700;
          font-size: clamp(48px, 6vw, 80px);
          letter-spacing: -0.04em;
          line-height: 1;
          color: #000;
          -webkit-font-smoothing: antialiased;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .stat-card__number--yellow { color: #fdc115; }

        /* ── Punto vivo animado ── */
        .stat-card__live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: livePulse 2s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── Label ── */
        .stat-card__label {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: rgba(0,0,0,0.55);
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }

        /* ── Fuente ── */
        .stat-card__source {
          font-family: 'Aeonik', sans-serif;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.3);
          margin: 0;
          margin-top: auto;
          padding-top: 8px;
        }
      `}</style>

      <section ref={sectionRef} className="stats-section">
        <div className="stats-section__inner">
          <h2 className={`stats-title${visible ? " is-visible" : ""}`}>
            Results-driven <em>impact</em>
          </h2>

          <div className="stats-grid">
            {CARDS.map((card, i) =>
              card.type === "live" ? (
                <LiveCard
                  key="live"
                  label={card.label}
                  visible={visible}
                />
              ) : (
                <StatCard
                  key={card.value}
                  card={card}
                  visible={visible}
                  delay={i * 80}
                />
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
