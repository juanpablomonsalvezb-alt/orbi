"use client";
import { useEffect, useRef, useState } from "react";

/*
 * CLONADO DE: https://es.squarespace.com — sección #get-started
 * CSS extraído de: homepage/default/index.css (1775844521521)
 * Valores exactos: colores, espaciados, animaciones, aspect-ratios
 */

export default function GetStartedSection() {
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

  // Auto-play videos when they enter view
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    if (!visible) return;
    videoRefs.current.forEach((v) => { if (v) v.play().catch(() => {}); });
  }, [visible]);

  return (
    <>
      <style>{`
        /* ── AI dots ── */
        @keyframes rotateAnimation {
          0%   { transform: rotate(0deg); }
          22%  { transform: rotate(240deg); }
          44%  { transform: rotate(480deg); }
          66%  { transform: rotate(720deg); }
          100% { transform: rotate(720deg); }
        }
        @keyframes scaleAnimationLarge {
          0%   { transform: scale(1) translate(0%,0%); }
          11%  { transform: scale(.403) translate(-20%,-30%); }
          22%  { transform: scale(.403) translate(-20%,-30%); }
          33%  { transform: scale(.64) translate(40%,-45%); }
          44%  { transform: scale(.64) translate(40%,-45%); }
          55%  { transform: scale(1) translate(0%,0%); }
          100% { transform: scale(1) translate(0%,0%); }
        }
        @keyframes scaleAnimationMedium {
          0%   { transform: scale(1) translate(0%,0%); }
          11%  { transform: scale(1.56) translate(-10%,-33%); }
          22%  { transform: scale(1.56) translate(-10%,-33%); }
          33%  { transform: scale(.63) translate(10%,-85%); }
          44%  { transform: scale(.63) translate(10%,-85%); }
          55%  { transform: scale(1) translate(0%,0%); }
          100% { transform: scale(1) translate(0%,0%); }
        }
        @keyframes scaleAnimationSmall {
          0%   { transform: scale(1) translate(0%,0%); }
          11%  { transform: scale(1.59) translate(-45%,-30%); }
          22%  { transform: scale(1.59) translate(-45%,-30%); }
          33%  { transform: scale(2.48) translate(5%,-15%); }
          44%  { transform: scale(2.48) translate(5%,-15%); }
          55%  { transform: scale(1) translate(0%,0%); }
          100% { transform: scale(1) translate(0%,0%); }
        }
        @keyframes gradientAnimation {
          0%   { background-position: 0%; }
          100% { background-position: -165%; }
        }

        /* ── Section ── */
        .gs-section {
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1020px) {
          .gs-section { padding-bottom: 240px; }
        }

        /* ── Background image (desktop only) ── */
        .gs-bg-img {
          display: none;
          object-fit: fill;
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        @media (min-width: 1020px) {
          .gs-bg-img { display: block; }
        }

        /* ── Gradient overlay (desktop only) ── */
        .gs-gradient {
          display: none;
        }
        @media (min-width: 1020px) {
          .gs-gradient {
            display: block;
            background: linear-gradient(#0000 85%, #000 100%);
            z-index: 1;
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }

        /* ── Headline ── */
        .gs-headline {
          z-index: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 16px 64px;
        }
        @media (min-width: 744px) {
          .gs-headline { padding: 80px 24px 64px; }
        }
        @media (min-width: 1020px) {
          .gs-headline { padding: 80px 40px 80px; }
        }

        /* ── AI dots ── */
        .gs-ai-dots {
          aspect-ratio: 1;
          width: 22px;
          position: relative;
          animation: 14s cubic-bezier(.645,.045,.355,1) infinite rotateAnimation;
          margin-bottom: 40px;
        }
        .gs-ai-dots__dot {
          background: #000;
          transform-origin: 50%;
          border-radius: 100%;
          position: absolute;
        }
        .gs-ai-dots__dot--large {
          width: 59.5%; height: 59.5%;
          animation: scaleAnimationLarge 14s linear infinite;
          top: 4%; left: 0;
        }
        .gs-ai-dots__dot--medium {
          width: 38.13%; height: 38.13%;
          animation: scaleAnimationMedium 14s linear infinite;
          top: 40%; right: 0;
        }
        .gs-ai-dots__dot--small {
          width: 24%; height: 24%;
          animation: scaleAnimationSmall 14s linear infinite;
          bottom: 6%; left: 30%;
        }

        /* ── Headline title (text--subtitle1) ── */
        .gs-title {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 22px;
          line-height: 1em;
          letter-spacing: -0.04em;
          color: #000;
          -webkit-font-smoothing: antialiased;
          text-wrap: balance;
          max-width: 600px;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
        }
        .gs-title.is-visible {
          opacity: 1;
          transform: none;
        }
        @media (min-width: 744px)  { .gs-title { font-size: 32px; } }
        @media (min-width: 1020px) { .gs-title { font-size: 40px; } }
        @media (min-width: 1280px) { .gs-title { font-size: 50px; } }

        /* ── Headline body (text--body) ── */
        .gs-body {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.4em;
          letter-spacing: -0.001em;
          color: #000;
          -webkit-font-smoothing: antialiased;
          margin-top: 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s 0.1s cubic-bezier(.16,1,.3,1), transform 0.7s 0.1s cubic-bezier(.16,1,.3,1);
        }
        .gs-body.is-visible {
          opacity: 1;
          transform: none;
        }

        /* ── ai-entrypoints (desktop only) ── */
        .gs-entrypoints {
          display: none;
        }
        @media (min-width: 1020px) {
          .gs-entrypoints {
            z-index: 2;
            display: flex;
            justify-content: center;
            gap: 24px;
            perspective: 1000px;
            width: 100%;
            position: relative;
            padding: 0 24px;
          }
        }
        @media (min-width: 1280px) {
          .gs-entrypoints { gap: 40px; padding: 0 40px; }
        }

        /* ── Each card ── */
        .gs-card {
          background-color: #000;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          flex: 1;
          max-width: 640px;
          cursor: pointer;
          text-decoration: none;
          display: block;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
        }
        .gs-card:nth-child(2) {
          transition-delay: 0.1s;
        }
        .gs-card.is-visible {
          opacity: 1;
          transform: none;
        }

        /* ── Card asset (4:3) ── */
        .gs-card__asset {
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: hidden;
        }
        .gs-card__overlay {
          background: linear-gradient(180deg, #0000 0%, #0000 50%, #000 100%);
          z-index: 2;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .gs-card__video {
          object-fit: cover;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── TIME logo badge ── */
        .gs-time-badge {
          backdrop-filter: blur(50px);
          z-index: 3;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 66px;
          height: 90px;
          padding: 16px;
          position: absolute;
          top: 11px;
          left: 11px;
        }
        .gs-time-badge img {
          width: 50px;
          height: 68px;
          object-fit: contain;
        }

        /* ── Card content ── */
        .gs-card__content {
          text-align: center;
          background-color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          padding: 16px 48px 40px;
        }

        /* ── Card eyebrow (gradient shimmer) ── */
        .gs-card__eyebrow {
          font-family: 'Aeonik', sans-serif;
          font-size: 12px;
          line-height: 1.4em;
          background: linear-gradient(90deg, #fff 29.44%, #88bcd8 39.97%, #f3ffc1 61.04%, #fff 71.57%);
          -webkit-text-fill-color: transparent;
          background-size: 300%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: 1.8s cubic-bezier(.23,1,.32,1) forwards gradientAnimation;
          margin: 0;
        }
        .gs-card__eyebrow--delayed {
          animation-duration: 2.2s;
          animation-delay: 0.5s;
        }

        /* ── Card title ── */
        .gs-card__title {
          font-family: 'Aeonik', sans-serif;
          font-size: 15px;
          line-height: 1.4em;
          letter-spacing: -0.001em;
          font-weight: 400;
          color: #898989;
          -webkit-font-smoothing: antialiased;
          margin: 0;
          width: 100%;
        }

        /* ── Card CTA ── */
        .gs-card__cta {
          font-family: 'Aeonik', sans-serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }
        @media (min-width: 1280px) {
          .gs-card__cta { font-size: 24px; }
        }

        /* ── Footer note (desktop only) ── */
        .gs-footnote {
          display: none;
        }
        @media (min-width: 1020px) {
          .gs-footnote {
            color: #fff;
            text-align: center;
            z-index: 2;
            padding-top: 56px;
            display: block;
            position: relative;
            font-family: 'Aeonik', sans-serif;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.4em;
            letter-spacing: -0.001em;
            -webkit-font-smoothing: antialiased;
          }
        }

        /* ── Mobile CTA (tablet only) ── */
        .gs-mobile-cta {
          display: none;
        }
        @media (min-width: 744px) and (max-width: 1019px) {
          .gs-mobile-cta {
            display: flex;
            justify-content: center;
            margin-top: 40px;
          }
          .gs-mobile-cta a {
            font-family: 'Aeonik', sans-serif;
            font-size: 15px;
            font-weight: 400;
            color: #000;
            border: 1.5px solid rgba(0,0,0,0.3);
            border-radius: 50px;
            padding: 12px 24px;
            text-decoration: none;
            transition: border-color 0.2s;
          }
          .gs-mobile-cta a:hover { border-color: rgba(0,0,0,0.6); }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-ai-dots, .gs-ai-dots__dot { animation: none; }
        }
      `}</style>

      <section ref={sectionRef} className="gs-section">
        {/* Background gradient overlay (desktop) */}
        <div className="gs-gradient" />

        {/* Background image (desktop) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="gs-bg-img"
          src="/images/sq_getstarted_bg.webp"
          alt=""
          loading="lazy"
          width={2880}
          height={2104}
        />

        {/* Headline */}
        <div className="gs-headline">
          {/* AI animated dots */}
          <div className="gs-ai-dots" aria-hidden="true">
            <span className="gs-ai-dots__dot gs-ai-dots__dot--large" />
            <span className="gs-ai-dots__dot gs-ai-dots__dot--medium" />
            <span className="gs-ai-dots__dot gs-ai-dots__dot--small" />
          </div>

          <h2 className={`gs-title${visible ? " is-visible" : ""}`}>
            Comenzar nunca ha sido tan fácil gracias a la IA
          </h2>
          <p className={`gs-body${visible ? " is-visible" : ""}`}>
            No hace falta tener experiencia.
          </p>

          {/* Tablet CTA */}
          <div className="gs-mobile-cta">
            <a href="https://nebbuler.com/registro">Ver las plantillas</a>
          </div>
        </div>

        {/* AI Entrypoints — 2 video cards (desktop only) */}
        <div className="gs-entrypoints">
          {/* Card 1: Kit de diseño con IA */}
          <a className={`gs-card${visible ? " is-visible" : ""}`} href="https://nebbuler.com/registro">
            <div className="gs-card__asset">
              <div className="gs-card__overlay" />
              {/* TIME magazine badge */}
              <div className="gs-time-badge">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sq_getstarted_time-logo.webp"
                  alt="TIME Best Inventions 2025"
                  loading="lazy"
                  width={50}
                  height={68}
                />
              </div>
              <video
                ref={(el) => { videoRefs.current[0] = el; }}
                className="gs-card__video"
                loop
                muted
                playsInline
                disablePictureInPicture
                preload="none"
              >
                <source src="/videos/sq_getstarted_blueprint-ai.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="gs-card__content">
              <p className="gs-card__eyebrow">Kit de diseño con IA</p>
              <p className="gs-card__title">
                Responde algunas preguntas y deja que nuestro creador de páginas web asistido por IA se encargue del resto.
              </p>
              <p className="gs-card__cta">Crear con IA →</p>
            </div>
          </a>

          {/* Card 2: Plantillas profesionales */}
          <a className={`gs-card${visible ? " is-visible" : ""}`} href="https://nebbuler.com/registro">
            <div className="gs-card__asset">
              <div className="gs-card__overlay" />
              <video
                ref={(el) => { videoRefs.current[1] = el; }}
                className="gs-card__video"
                loop
                muted
                playsInline
                disablePictureInPicture
                preload="none"
              >
                <source src="/videos/sq_getstarted_templates.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="gs-card__content">
              <p className="gs-card__eyebrow gs-card__eyebrow--delayed">Plantillas profesionales</p>
              <p className="gs-card__title">
                Creadas por nuestros diseñadores y personalizadas por la IA especialmente para tu negocio.
              </p>
              <p className="gs-card__cta">Mirar las plantillas web →</p>
            </div>
          </a>
        </div>

        {/* Footer note (desktop only) */}
        <p className="gs-footnote">
          Kit de diseño con IA, uno de los mejores inventos de TIME de 2025*
        </p>
      </section>
    </>
  );
}
