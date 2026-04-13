"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TABS = [
  {
    label: "Servicios",
    title: "Ofrece servicios",
    body: "Promociona tu experiencia y ofertas, recopila información de los asistentes y recibe pagos por tu trabajo.",
    img: "/images/sq_services.jpg",
  },
  {
    label: "Tienda online",
    title: "Vende productos",
    body: "Comercializa tus productos, acepta pagos, gestiona pedidos y envíos y más.",
    img: "/images/sq_online-store.jpg",
  },
  {
    label: "Facturación",
    title: "Factura a tus clientes",
    body: "Legitima tu negocio y recibe pagos con propuestas, contratos y facturas profesionales.",
    img: "/images/sq_invoicing.jpg",
  },
  {
    label: "Reserva de citas",
    title: "Acepta reservas",
    body: "Obtén reservas de citas sin inconvenientes, gestión automatizada del calendario y pagos integrados.",
    img: "/images/sq_scheduling.jpg",
  },
  {
    label: "Donaciones",
    title: "Recibe donaciones",
    body: "Crea una campaña de recaudación de fondos, acepta donaciones en tu sitio web y envía correos a los donantes.",
    img: "/images/sq_donations.jpg",
  },
  {
    label: "Membresías",
    title: "Crea membresías",
    body: "Monetiza tu contenido o comunidad con planes de membresía recurrentes y acceso exclusivo.",
    img: "/images/sq_memberships.jpg",
  },
  {
    label: "Blog",
    title: "Publica tu blog",
    body: "Comparte tu historia, construye autoridad y atrae más visitantes con contenido que conecta.",
    img: "/images/sq_blog.jpg",
  },
  {
    label: "Portafolio",
    title: "Muestra tu portafolio",
    body: "Presenta tu trabajo de forma impactante con galerías elegantes y proyectos organizados.",
    img: "/images/sq_portfolio.jpg",
  },
];

export default function GrowSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);

  // Entrada section
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Medir ancho del track para el translateX
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackW(trackRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll pill activo al centro (mobile)
  useEffect(() => {
    if (!pillsRef.current) return;
    const pill = pillsRef.current.querySelectorAll<HTMLElement>("[data-pill]")[active];
    if (pill) pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const goTo = (i: number) => setActive(i);

  return (
    <>
      <style>{`
        .grow-pills-wrap::-webkit-scrollbar { display: none; }
        .grow-pills-wrap { -ms-overflow-style: none; scrollbar-width: none; }

        .grow-pill {
          font-family: 'Aeonik', sans-serif;
          font-size: 15px;
          font-weight: 400;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 100px;
          padding: 10px 18px;
          white-space: nowrap;
          color: #000;
          position: relative;
          z-index: 1;
          transition: opacity 0.2s;
        }
        .grow-pill:hover { opacity: 0.65; }
        .grow-pill.active { font-weight: 500; }

        .grow-card-link {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        .grow-card-link::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 55%, transparent 100%);
          z-index: 1;
        }

        @media (max-width: 700px) {
          .grow-track-slide { width: 85vw !important; min-width: 85vw !important; }
          .grow-track-slide-sm { display: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#fff",
          paddingTop: 80,
          paddingBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: "center", paddingBottom: 28, paddingLeft: 24, paddingRight: 24 }}>
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(30px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: "#000",
            margin: "0 0 16px",
          }}>
            Haz crecer tu negocio
          </h2>
          <p style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(0,0,0,0.5)",
            fontWeight: 400,
            margin: 0,
          }}>
            Te mereces un sitio web que haga todo lo que necesitas.
          </p>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 28, paddingLeft: 16, paddingRight: 16 }}>
          <div
            ref={pillsRef}
            className="grow-pills-wrap"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0,
              borderRadius: 100,
              backgroundColor: "rgba(0,0,0,0.06)",
              padding: 4,
              overflowX: "auto",
              flexShrink: 0,
            }}
          >
            {TABS.map((tab, i) => (
              <div key={tab.label} style={{ position: "relative", flexShrink: 0 }}>
                {active === i && (
                  <div style={{
                    position: "absolute", inset: 0,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
                    zIndex: 0,
                  }} />
                )}
                <button
                  data-pill
                  className={`grow-pill${active === i ? " active" : ""}`}
                  onClick={() => goTo(i)}
                >
                  {tab.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
            overflow: "hidden",
          }}
        >
          {/* Track — all slides side by side */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              // Each "slide unit" = 2/3 of track (main) + 1/3 (preview) but we offset by full "main card" width
              // We shift by active * (trackW * 0.655 + 12) so each click moves one card
              transform: `translateX(calc(-${active} * (65% + 12px)))`,
              transition: "transform 0.55s cubic-bezier(0.77,0,0.175,1)",
              willChange: "transform",
            }}
          >
            {TABS.map((tab, i) => (
              <div
                key={tab.label}
                className="grow-track-slide"
                style={{
                  flexShrink: 0,
                  width: "65%",
                  minWidth: "65%",
                  height: 520,
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  cursor: i !== active ? "pointer" : "default",
                }}
                onClick={() => { if (i !== active) goTo(i); }}
              >
                <div className="grow-card-link">
                  <Image
                    src={tab.img}
                    alt={tab.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 700px) 85vw, 65vw"
                    priority={i === 0}
                  />
                  {/* Overlay via ::after in CSS */}
                  <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 36px" }}>
                    <h3 style={{
                      fontFamily: "'Aeonik', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 2.2vw, 28px)",
                      color: "#fff",
                      margin: "0 0 10px",
                      lineHeight: 1.2,
                    }}>
                      {tab.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Aeonik', sans-serif",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.85)",
                      margin: 0,
                      lineHeight: 1.5,
                      maxWidth: 380,
                    }}>
                      {tab.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
          {TABS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 22 : 6,
                height: 6,
                borderRadius: 99,
                border: "none",
                padding: 0,
                cursor: "pointer",
                backgroundColor: i === active ? "#000" : "rgba(0,0,0,0.18)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
