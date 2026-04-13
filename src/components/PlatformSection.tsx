"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   PlatformSection — clonado pixel-perfect de Squarespace "Todo lo que
   necesitas en una sola plataforma" (es.squarespace.com).

   Valores CSS exactos extraídos del CSS real de Squarespace:
   - Card background:     #2f2f2f
   - Card border-radius:  8px
   - Card padding:        24px
   - Sección bg:          #ffffff
   - text--subtitle1:     font-size clamp(22px→40px), letter-spacing -0.04em
   - text--subtitle3:     font-size 18px/20px, fw 500, ls -0.01em, lh 1.2em
   - text--footnote:      font-size 12px, lh 1.4em
   - text--body:          font-size 15px, ls -0.001em, lh 1.4em
   - Hover shadow:        0 78px 47px #0000000d, 0 35px 35px #00000017, 0 9px 19px #0000001a
   - Image hover:         transform scale(1.05) transition 0.5s
   - Arrow:               position absolute, bottom 24px, right 24px
   - Colors:              --color-white: #fff, --color-black: #000, --color-gray-02: #898989

   Imágenes: assets reales de media-www.sqspcdn.com descargados en /public/images/
───────────────────────────────────────────────────────────────────────────── */

interface CardData {
  title: string;
  desc: string;
  img: string;
  alt: string;
}

const CARDS: CardData[] = [
  {
    title: "Edición de sitios web",
    desc: "Personaliza fácilmente todos los detalles de diseño con nuestro vanguardista editor de arrastrar y soltar.",
    img: "/images/sq_platform_website-editing.webp",
    alt: "Editor visual de sitios web",
  },
  {
    title: "Dominios",
    desc: "Registra el dominio de tus sueños. Incluye privacidad de WHOIS, SSL y DNS premium gratuitos.",
    img: "/images/sq_platform_domains.webp",
    alt: "Gestión de dominios",
  },
  {
    title: "Analytics",
    desc: "Realiza un seguimiento del rendimiento de tu sitio web con indicadores clave de tráfico y comercio electrónico.",
    img: "/images/sq_platform_analytics.webp",
    alt: "Panel de analíticas",
  },
  {
    title: "Optimización de IA y búsqueda",
    desc: "Aumenta el tráfico de tus plataformas de búsqueda e IA con herramientas integradas de auditoría de sitios de SEO e IA.",
    img: "/images/sq_platform_ai-seo.webp",
    alt: "Optimización SEO e IA",
  },
  {
    title: "Contactos",
    desc: "Captura, almacena y segmenta tu audiencia para crear campañas de marketing personalizadas.",
    img: "/images/sq_platform_contacts.webp",
    alt: "Gestión de contactos y CRM",
  },
  {
    title: "Email Marketing",
    desc: "Herramientas de email marketing eficaces a tu alcance para hacer crecer tu audiencia y potenciar tu marca.",
    img: "/images/sq_platform_email-campaigns.webp",
    alt: "Campañas de email marketing",
  },
  {
    title: "Diseño inteligente",
    desc: "Tu asistente creativo de IA para generar diseños, imágenes y contenido diseñado exclusivamente para ti.",
    img: "/images/sq_platform_design-intelligence.webp",
    alt: "Diseño inteligente con IA",
  },
  {
    title: "Correo empresarial",
    desc: "Aporta legitimidad a tu negocio con un correo electrónico profesional para tu empresa.",
    img: "/images/sq_platform_business-email.webp",
    alt: "Correo empresarial profesional",
  },
  {
    title: "Tienda online",
    desc: "Vende productos físicos o digitales con pagos integrados y checkout optimizado para conversiones.",
    img: "/images/sq_platform_online-store.webp",
    alt: "Tienda online y ecommerce",
  },
  {
    title: "Reserva de citas",
    desc: "Acepta reservas automáticamente, gestiona tu disponibilidad y elimina la fricción en la agenda.",
    img: "/images/sq_platform_invoicing.webp",
    alt: "Sistema de reserva de citas",
  },
];

/* ─── Card individual ──────────────────────────────────────────────────────── */
function PlatformCard({
  card,
  delay,
}: {
  card: CardData;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* Card base — exacto de .card-carousel-card__cta */
        background: "#2f2f2f",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 24,
        position: "relative",
        cursor: "pointer",
        /* Ratio aproximado al de Squarespace (~270/366 ≈ 0.74) */
        aspectRatio: "366 / 270",
        /* Animación de entrada escalonada */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, box-shadow 0.3s linear`,
        /* Hover shadow exacta de Squarespace */
        boxShadow: hovered
          ? "0 78px 47px #0000000d, 0 35px 35px #00000017, 0 9px 19px #0000001a"
          : "none",
      }}
    >
      {/* Imagen de fondo — ocupa toda la card, z-index 0 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.img}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            /* Hover scale exacto de Squarespace: transform .5s */
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s",
          }}
        />
      </div>

      {/* Contenido de texto — z-index 1, alineado al fondo-izquierda */}
      <div
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
          marginTop: "auto",
        }}
      >
        {/* Título — .text--subtitle3 de Squarespace */}
        <h3
          style={{
            fontFamily: "'Aeonik', Helvetica, sans-serif",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "1.2em",
            letterSpacing: "-0.01em",
            color: "#ffffff",
            margin: 0,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {card.title}
        </h3>

        {/* Descripción — .text--footnote de Squarespace */}
        <p
          style={{
            fontFamily: "'Aeonik', Helvetica, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "1.4em",
            color: "#ffffff",
            margin: 0,
            opacity: 0.75,
          }}
        >
          {card.desc}
        </p>
      </div>

      {/* Flecha — .card-carousel-card__arrow: position absolute, bottom 24px, right 24px */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 1,
          color: "#ffffff",
          fontSize: 18,
          lineHeight: 1,
          opacity: 0.9,
        }}
      >
        →
      </div>
    </div>
  );
}

/* ─── Sección principal ───────────────────────────────────────────────────── */
export default function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Grid responsive — espeja el comportamiento de Squarespace */
        .platform-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1279px) {
          .platform-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
        @media (max-width: 1019px) {
          .platform-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 743px) {
          .platform-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 479px) {
          .platform-grid { grid-template-columns: 1fr; gap: 12px; }
        }
        /* Suavizar tipografía en fondos oscuros como Squarespace */
        .platform-card-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Sección — .one-platform { background-color: var(--color-white) } */}
      <section
        ref={sectionRef}
        style={{
          backgroundColor: "#ffffff",
          /* Padding igual al de .card-carousel { padding-top: 80px } → 120px en 1280px+ */
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
        }}
      >
        {/* Header — igual al .headline de Squarespace */}
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            marginBottom: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
            flexWrap: "wrap",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* H2 — .text--subtitle1: letter-spacing -0.04em, line-height 1em */}
          <h2
            style={{
              fontFamily: "'Aeonik', Helvetica, sans-serif",
              fontWeight: 400,
              /* clamp exacto de .text--subtitle1 */
              fontSize: "clamp(22px, 2.5vw, 40px)",
              lineHeight: "1em",
              letterSpacing: "-0.04em",
              color: "#000000",
              margin: 0,
              maxWidth: 480,
            }}
          >
            Todo lo que necesitas en una sola plataforma
          </h2>

          {/* Body — .text--body: font-size 15px, letter-spacing -0.001em, line-height 1.4em */}
          <p
            style={{
              fontFamily: "'Aeonik', Helvetica, sans-serif",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: "1.4em",
              letterSpacing: "-0.001em",
              color: "#5a5a5a", /* --color-gray-03 */
              margin: 0,
              maxWidth: 420,
              paddingTop: 4,
            }}
          >
            Impulsa tu día a día con todas las herramientas y sugerencias de IA
            que necesitas para gestionar tu negocio, integradas sin inconvenientes
            en un solo lugar.
          </p>
        </div>

        {/* Grid de cards */}
        <div
          className="platform-grid"
          style={{
            maxWidth: 1320,
            margin: "0 auto",
          }}
        >
          {CARDS.map((card, i) => (
            <PlatformCard
              key={card.title}
              card={card}
              delay={i * 55}
            />
          ))}
        </div>
      </section>
    </>
  );
}
