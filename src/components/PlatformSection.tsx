"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  { title: "Edición de sitios web",       desc: "Personaliza fácilmente todos los detalles de diseño con nuestro vanguardista editor de arrastrar y soltar.",                                               img: "/images/sq_platform_website-editing.webp" },
  { title: "Dominios",                     desc: "Registra el dominio de tus sueños. Incluye privacidad de WHOIS, SSL y DNS premium gratuitos.",                                                             img: "/images/sq_platform_domains.webp" },
  { title: "Analytics",                    desc: "Realiza un seguimiento del rendimiento de tu sitio web con indicadores clave de tráfico y comercio electrónico.",                                          img: "/images/sq_platform_analytics.webp" },
  { title: "Optimización de IA y búsqueda", desc: "Aumenta el tráfico de tus plataformas de búsqueda e IA con herramientas integradas de auditoría de sitios de SEO e IA.",                                img: "/images/sq_platform_ai-seo.webp" },
  { title: "Contactos",                    desc: "Captura, almacena y segmenta tu audiencia para crear campañas de marketing personalizadas.",                                                               img: "/images/sq_platform_contacts.webp" },
  { title: "Email Marketing",              desc: "Herramientas de email marketing eficaces a tu alcance para hacer crecer tu audiencia y potenciar tu marca.",                                               img: "/images/sq_platform_email-campaigns.webp" },
  { title: "Diseño inteligente",           desc: "Tu asistente creativo de IA para generar diseños, imágenes y contenido diseñado exclusivamente para ti.",                                                  img: "/images/sq_platform_design-intelligence.webp" },
  { title: "Correo empresarial",           desc: "Aporta legitimidad a tu negocio con un correo electrónico profesional para tu empresa de Google Workspace.",                                              img: "/images/sq_platform_business-email.webp" },
  { title: "Tienda online",                desc: "Vende productos físicos o digitales con pagos integrados vía Stripe o MercadoPago y checkout optimizado.",                                                 img: "/images/sq_platform_online-store.webp" },
  { title: "Reserva de citas",             desc: "Acepta reservas automáticamente, gestiona tu disponibilidad y elimina la fricción en la agenda de tus clientes.",                                         img: "/images/sq_platform_invoicing.webp" },
];

const CARD_W = 300;   // ancho fijo por card en px
const CARD_GAP = 16;  // gap entre cards

export default function PlatformSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Calcular desplazamiento máximo
  const calcMax = useCallback(() => {
    if (!viewportRef.current) return;
    const totalW = CARDS.length * (CARD_W + CARD_GAP) - CARD_GAP;
    const viewW  = viewportRef.current.offsetWidth;
    setMaxOffset(Math.max(0, totalW - viewW));
  }, []);

  useEffect(() => {
    calcMax();
    window.addEventListener("resize", calcMax);
    return () => window.removeEventListener("resize", calcMax);
  }, [calcMax]);

  // IntersectionObserver para animaciones de entrada
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setHeaderVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setCardsVisible(true);
    }, { threshold: 0.05 });
    if (cardsRef.current) obs.observe(cardsRef.current);
    return () => obs.disconnect();
  }, []);

  const step = CARD_W + CARD_GAP;
  const prev = () => setOffset(o => Math.max(0, o - step));
  const next = () => setOffset(o => Math.min(maxOffset, o + step));

  return (
    <>
      <style>{`
        .platform-card {
          flex-shrink: 0;
          width: ${CARD_W}px;
          height: 370px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: #1a1a1a;
        }
        .platform-card img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .platform-card:hover img { transform: scale(1.05); }
        .platform-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }
        .platform-card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 20px 44px;
          z-index: 2;
        }
        .platform-card-title {
          font-family: 'Aeonik', sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 1.2em;
          letter-spacing: -0.01em;
          color: #fff;
          margin: 0 0 6px;
          -webkit-font-smoothing: antialiased;
        }
        .platform-card-desc {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.4em;
          color: rgba(255,255,255,0.75);
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        .platform-card-arrow {
          position: absolute; bottom: 20px; right: 20px;
          z-index: 2;
          color: #fff;
          font-size: 16px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .platform-card:hover .platform-card-arrow { opacity: 1; }
        .platform-nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.18);
          background: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .platform-nav-btn:hover { background: #f5f5f5; border-color: rgba(0,0,0,0.35); }
        .platform-nav-btn:disabled { opacity: 0.3; cursor: default; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            marginBottom: 40,
            paddingLeft: "clamp(16px, 4vw, 40px)",
            paddingRight: "clamp(16px, 4vw, 40px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
            flexWrap: "wrap",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(22px, 2.5vw, 40px)",
            lineHeight: "1.1em",
            letterSpacing: "-0.04em",
            color: "#000",
            margin: 0,
            maxWidth: 440,
          }}>
            Todo lo que necesitas en una sola plataforma
          </h2>

          <p style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: "1.4em",
            letterSpacing: "-0.001em",
            color: "#5a5a5a",
            margin: 0,
            maxWidth: 400,
          }}>
            Impulsa tu día a día con todas las herramientas y sugerencias de IA que necesitas para gestionar tu negocio, integradas sin inconvenientes en un solo lugar.
          </p>
        </div>

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          style={{
            overflow: "hidden",
            paddingLeft: "clamp(16px, 4vw, 40px)",
          }}
        >
          <div
            ref={cardsRef}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: CARD_GAP,
              transform: `translateX(-${offset}px)`,
              transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1)",
              willChange: "transform",
              opacity: cardsVisible ? 1 : 0,
              transition2: "opacity 0.6s ease",
            } as React.CSSProperties}
          >
            {CARDS.map((card) => (
              <div key={card.title} className="platform-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.img} alt={card.title} loading="lazy" />
                <div className="platform-card-overlay" />
                <div className="platform-card-content">
                  <h3 className="platform-card-title">{card.title}</h3>
                  <p className="platform-card-desc">{card.desc}</p>
                </div>
                <span className="platform-card-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flechas de navegación */}
        <div style={{
          maxWidth: 1320,
          margin: "24px auto 0",
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
          display: "flex",
          gap: 10,
        }}>
          <button
            className="platform-nav-btn"
            onClick={prev}
            disabled={offset === 0}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className="platform-nav-btn"
            onClick={next}
            disabled={offset >= maxOffset}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </section>
    </>
  );
}
