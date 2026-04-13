"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const TABS = [
  { label: "Servicios",      title: "Ofrece servicios",       body: "Promociona tu experiencia y ofertas, recopila información de los asistentes y recibe pagos por tu trabajo.",                          img: "/images/sq_services.jpg" },
  { label: "Tienda online",  title: "Vende productos",         body: "Comercializa tus productos, acepta pagos, gestiona pedidos y envíos y más.",                                                         img: "/images/sq_online-store.jpg" },
  { label: "Facturación",    title: "Factura a tus clientes",  body: "Legitima tu negocio y recibe pagos con propuestas, contratos y facturas profesionales.",                                              img: "/images/sq_invoicing.jpg" },
  { label: "Reserva de citas", title: "Acepta reservas",       body: "Obtén reservas de citas sin inconvenientes, gestión automatizada del calendario y pagos integrados.",                                img: "/images/sq_scheduling.jpg" },
  { label: "Donaciones",     title: "Recibe donaciones",       body: "Crea una campaña de recaudación de fondos, acepta donaciones en tu sitio web.",                                                      img: "/images/sq_donations.jpg" },
  { label: "Membresías",     title: "Crea membresías",         body: "Monetiza tu contenido o comunidad con planes de membresía recurrentes y acceso exclusivo.",                                          img: "/images/sq_memberships.jpg" },
  { label: "Blog",           title: "Publica tu blog",         body: "Comparte tu historia, construye autoridad y atrae más visitantes con contenido que conecta.",                                       img: "/images/sq_blog.jpg" },
  { label: "Portafolio",     title: "Muestra tu portafolio",   body: "Presenta tu trabajo de forma impactante con galerías elegantes y proyectos organizados.",                                           img: "/images/sq_portfolio.jpg" },
];

const N = TABS.length;
const GAP = 16;

// Track extendido: [ultimo_clone, ...TABS, primero_clone]
// El índice real 0 en TABS → trackIdx = 1
const EXTENDED = [TABS[N - 1], ...TABS, TABS[0]];

export default function GrowSection() {
  const [active, setActive] = useState(0);          // índice real (0–7)
  const [trackIdx, setTrackIdx] = useState(1);       // índice en EXTENDED (1–N)
  const [animated, setAnimated] = useState(true);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  const sectionRef  = useRef<HTMLElement>(null);
  const pillsRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);

  /* ---------- offset calculation ---------- */
  const computeOffset = useCallback((tIdx: number) => {
    if (!viewportRef.current) return;
    const W    = viewportRef.current.offsetWidth;
    const cardW = W * 0.80;
    const peek  = (W - cardW) / 2;
    setOffset(peek - tIdx * (cardW + GAP));
  }, []);

  useEffect(() => {
    computeOffset(trackIdx);
    const onResize = () => computeOffset(trackIdx);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [trackIdx, computeOffset]);

  /* ---------- entrance animation ---------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ---------- scroll pill to center on mobile ---------- */
  useEffect(() => {
    if (!pillsRef.current) return;
    const pills = pillsRef.current.querySelectorAll<HTMLElement>("[data-pill]");
    pills[active]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  /* ---------- navigate ---------- */
  const goTo = (realIdx: number) => {
    if (transitioning.current) return;
    setAnimated(true);
    setActive(realIdx);
    setTrackIdx(realIdx + 1); // +1 por el clone inicial
  };

  /* ---------- after slide transition → silent jump for infinite loop ---------- */
  const onTransitionEnd = () => {
    transitioning.current = false;
    // Si estamos en el clone del último → saltar al último real
    if (trackIdx === 0) {
      setAnimated(false);
      setTrackIdx(N);
      setActive(N - 1);
    }
    // Si estamos en el clone del primero → saltar al primero real
    else if (trackIdx === N + 1) {
      setAnimated(false);
      setTrackIdx(1);
      setActive(0);
    }
  };

  const onTransitionStart = () => { transitioning.current = true; };

  /* ---------- render ---------- */
  const cardW = viewportRef.current ? viewportRef.current.offsetWidth * 0.80 : 900;

  return (
    <>
      <style>{`
        .grow-pills-wrap::-webkit-scrollbar { display: none; }
        .grow-pills-wrap { -ms-overflow-style: none; scrollbar-width: none; }
        .grow-pill {
          font-family: 'Aeonik', sans-serif;
          font-size: 15px; font-weight: 400;
          border: none; background: transparent; cursor: pointer;
          border-radius: 100px; padding: 10px 18px;
          white-space: nowrap; color: #000;
          position: relative; z-index: 1;
          transition: opacity 0.2s;
        }
        .grow-pill:hover { opacity: 0.6; }
        .grow-pill.active { font-weight: 500; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#fff",
          paddingTop: 80,
          paddingBottom: 64,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: "center", paddingBottom: 28, paddingLeft: 24, paddingRight: 24 }}>
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 500,
            fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.1,
            letterSpacing: "-0.5px", color: "#000", margin: "0 0 14px",
          }}>
            Haz crecer tu negocio
          </h2>
          <p style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(0,0,0,0.5)", fontWeight: 400, margin: 0,
          }}>
            Te mereces un sitio web que haga todo lo que necesitas.
          </p>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 28, paddingLeft: 16, paddingRight: 16 }}>
          <div ref={pillsRef} className="grow-pills-wrap" style={{
            display: "flex", alignItems: "center",
            borderRadius: 100, backgroundColor: "rgba(0,0,0,0.06)",
            padding: 4, overflowX: "auto", gap: 0,
          }}>
            {TABS.map((tab, i) => (
              <div key={tab.label} style={{ position: "relative", flexShrink: 0 }}>
                {active === i && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 100,
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.14)", zIndex: 0,
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

        {/* Carousel viewport */}
        <div ref={viewportRef} style={{ overflow: "hidden", width: "100%" }}>
          <div
            onTransitionStart={onTransitionStart}
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: GAP,
              transform: `translateX(${offset}px)`,
              transition: animated ? "transform 0.6s cubic-bezier(0.77,0,0.175,1)" : "none",
              willChange: "transform",
            }}
          >
            {EXTENDED.map((tab, i) => {
              // El índice real en TABS es i-1; activo cuando trackIdx === i
              const isActive = trackIdx === i;

              return (
                <div
                  key={`${tab.label}-${i}`}
                  onClick={() => {
                    if (!isActive) {
                      // clic en peek → avanzar en la dirección correcta
                      const realIdx = ((i - 1) + N) % N;
                      goTo(realIdx);
                    }
                  }}
                  style={{
                    flexShrink: 0,
                    width: cardW,
                    height: "clamp(420px, 52vw, 620px)",
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "relative",
                    cursor: isActive ? "default" : "pointer",
                    filter: isActive ? "brightness(1)" : "brightness(0.6)",
                    transition: "filter 0.5s ease",
                  }}
                >
                  <Image
                    src={tab.img}
                    alt={tab.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="80vw"
                    priority={i <= 2}
                  />
                  {/* Gradient */}
                  <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                  }} />
                  {/* Text */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
                    padding: "36px 40px",
                  }}>
                    <h3 style={{
                      fontFamily: "'Aeonik', sans-serif", fontWeight: 500,
                      fontSize: "clamp(20px, 2vw, 28px)", color: "#fff",
                      margin: "0 0 10px", lineHeight: 1.2,
                    }}>
                      {tab.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Aeonik', sans-serif", fontSize: 15,
                      color: "rgba(255,255,255,0.85)", margin: 0,
                      lineHeight: 1.55, maxWidth: 420,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}>
                      {tab.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
          {TABS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 22 : 6, height: 6,
                borderRadius: 99, border: "none", padding: 0, cursor: "pointer",
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
