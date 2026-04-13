"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TABS = [
  {
    label: "Servicios",
    title: "Ofrece servicios",
    body: "Promociona tu experiencia y ofertas, recopila información de los asistentes y recibe pagos por tu trabajo.",
    footnote: "Ideal para: campamentos · consultores · organizadores de eventos",
    img: "/images/sq_services.jpg",
  },
  {
    label: "Tienda online",
    title: "Vende productos",
    body: "Comercializa tus productos, acepta pagos, gestiona pedidos y envíos y más.",
    footnote: "Ideal para: artesanos · minoristas · lanzamientos limitados",
    img: "/images/sq_online-store.jpg",
  },
  {
    label: "Facturación",
    title: "Factura a tus clientes",
    body: "Legitima tu negocio y recibe pagos con propuestas, contratos y facturas profesionales.",
    footnote: "Ideal para: contratistas · trabajadores autónomos · organizadores de eventos",
    img: "/images/sq_invoicing.jpg",
  },
  {
    label: "Reserva de citas",
    title: "Acepta reservas",
    body: "Obtén reservas de citas sin inconvenientes, gestión automatizada del calendario y pagos integrados.",
    footnote: "Ideal para: profesionales de belleza · servicios de bienestar · fotógrafos",
    img: "/images/sq_scheduling.jpg",
  },
  {
    label: "Donaciones",
    title: "Recibe donaciones",
    body: "Crea una campaña de recaudación de fondos, acepta donaciones en tu sitio web y envía correos electrónicos dirigidos a los donantes.",
    footnote: "Ideal para: grupos de defensa de derechos · organizaciones sin fines de lucro · recaudaciones de fondos",
    img: "/images/sq_donations.jpg",
  },
  {
    label: "Membresías",
    title: "Crea membresías",
    body: "Monetiza tu contenido o comunidad con planes de membresía recurrentes y acceso exclusivo.",
    footnote: "Ideal para: creadores de contenido · formadores · comunidades online",
    img: "/images/sq_memberships.jpg",
  },
  {
    label: "Blog",
    title: "Publica tu blog",
    body: "Comparte tu historia, construye autoridad y atrae más visitantes con contenido que conecta.",
    footnote: "Ideal para: escritores · emprendedores · marcas de lifestyle",
    img: "/images/sq_blog.jpg",
  },
  {
    label: "Portafolio",
    title: "Muestra tu portafolio",
    body: "Presenta tu trabajo de forma impactante con galerías elegantes y proyectos organizados.",
    footnote: "Ideal para: fotógrafos · diseñadores · artistas",
    img: "/images/sq_portfolio.jpg",
  },
];

export default function GrowSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll active pill into view on mobile
  useEffect(() => {
    if (!pillsRef.current) return;
    const activePill = pillsRef.current.querySelectorAll("li")[activeTab];
    if (activePill) {
      activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const current = TABS[activeTab];

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .grow-cards-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .grow-card {
            min-height: 420px !important;
          }
        }
        @media (max-width: 1019px) {
          .grow-card-footnote {
            display: none !important;
          }
        }
        .grow-pills-list::-webkit-scrollbar {
          display: none;
        }
        .grow-pills-list {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .grow-pill-btn {
          font-family: 'Aeonik', sans-serif;
          font-size: 16px;
          font-weight: 400;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 100px;
          padding: 12px 16px;
          white-space: nowrap;
          position: relative;
          z-index: 1;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .grow-pill-btn:hover {
          opacity: 0.7;
        }
        .grow-card-cta {
          transition: box-shadow 0.3s cubic-bezier(0.645,0.045,0.355,1);
        }
        .grow-card-cta:hover {
          box-shadow: 0 39px 23px rgba(0,0,0,0.05), 0 17px 17px rgba(0,0,0,0.09), 0 4px 9px rgba(0,0,0,0.1) !important;
        }
        .grow-card-cta:hover .grow-card-arrow {
          opacity: 1 !important;
        }
        .grow-card-cta:hover .grow-card-footnote {
          opacity: 1 !important;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#fff",
          paddingBottom: 80,
          paddingTop: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          overflow: "hidden",
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: "center", paddingBottom: 32, paddingLeft: 24, paddingRight: 24 }}>
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: "#000",
            margin: 0,
          }}>
            Haz crecer tu negocio
          </h2>
          <p style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "clamp(15px, 1.5vw, 18px)",
            color: "rgba(0,0,0,0.55)",
            fontWeight: 400,
            marginTop: 24,
            marginBottom: 0,
          }}>
            Te mereces un sitio web que haga todo lo que necesitas.
          </p>
        </div>

        {/* Pills row */}
        <div style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 32,
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
        }}>
          <ul
            ref={pillsRef}
            className="grow-pills-list"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 4,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              borderRadius: 100,
              backgroundColor: "rgba(0,0,0,0.05)",
              height: 62,
              width: "fit-content",
              flexWrap: "nowrap",
            }}
          >
            {TABS.map((tab, i) => (
              <li
                key={tab.label}
                style={{
                  padding: "0 4px",
                  position: "relative",
                  listStyle: "none",
                  flexShrink: 0,
                }}
              >
                {/* Active indicator */}
                {activeTab === i && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 4,
                    width: "calc(100% - 8px)",
                    height: "100%",
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                    zIndex: 0,
                    transition: "none",
                  }} />
                )}
                <button
                  className="grow-pill-btn"
                  onClick={() => setActiveTab(i)}
                  style={{
                    fontWeight: activeTab === i ? 500 : 400,
                    color: "#000",
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cards */}
        <div
          className="grow-cards-row"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            maxWidth: 1200,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Main active card */}
          <div
            className="grow-card"
            style={{
              flex: 2,
              minHeight: 540,
              borderRadius: 8,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <a
              className="grow-card-cta"
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
                height: "100%",
                padding: "32px",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                minHeight: "inherit",
                borderRadius: 8,
              }}
            >
              {/* Background image */}
              <Image
                src={current.img}
                alt={current.title}
                fill
                style={{ objectFit: "cover", zIndex: 0 }}
                priority
                sizes="(max-width: 767px) 100vw, 66vw"
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
              }} />
              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, marginTop: "auto" }}>
                <h3 style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                  color: "#fff",
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                  maxWidth: 365,
                }}>
                  {current.title}
                </h3>
                <p style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: 365,
                }}>
                  {current.body}
                </p>
                <p
                  className="grow-card-footnote"
                  style={{
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    margin: "16px 0 0",
                    lineHeight: 1.4,
                    opacity: 0,
                    transition: "opacity 0.3s cubic-bezier(0.645,0.045,0.355,1)",
                  }}
                >
                  {current.footnote}
                </p>
              </div>
              {/* Arrow */}
              <span
                className="grow-card-arrow"
                style={{
                  position: "absolute", bottom: 32, right: 32,
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: 500, fontSize: 22,
                  color: "#fff", zIndex: 2,
                  userSelect: "none",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                →
              </span>
            </a>
          </div>

          {/* Secondary preview card — next tab */}
          <div
            className="grow-card"
            style={{
              flex: 1,
              minHeight: 540,
              borderRadius: 8,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab((activeTab + 1) % TABS.length)}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{
              width: "100%", height: "100%", position: "relative",
              borderRadius: 8, overflow: "hidden",
              minHeight: "inherit",
            }}>
              {/* Background image */}
              <Image
                src={TABS[(activeTab + 1) % TABS.length].img}
                alt={TABS[(activeTab + 1) % TABS.length].title}
                fill
                style={{ objectFit: "cover", zIndex: 0 }}
                sizes="(max-width: 767px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: hovered === 1
                  ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)",
                transition: "background 0.3s",
              }} />
              {/* Content */}
              <div style={{
                position: "absolute", bottom: 32, left: 32, right: 32, zIndex: 2,
              }}>
                <h3 style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  {TABS[(activeTab + 1) % TABS.length].title}
                </h3>
                <p style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.8)",
                  margin: "8px 0 0",
                  lineHeight: 1.4,
                  opacity: hovered === 1 ? 1 : 0,
                  transition: "opacity 0.3s",
                }}>
                  {TABS[(activeTab + 1) % TABS.length].body}
                </p>
              </div>
              {/* Arrow */}
              <span style={{
                position: "absolute", bottom: 32, right: 32,
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 500, fontSize: 20,
                color: "#fff", zIndex: 2,
                userSelect: "none",
                opacity: hovered === 1 ? 1 : 0,
                transition: "opacity 0.3s",
              }}>
                →
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
