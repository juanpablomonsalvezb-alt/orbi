"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Mockups CSS inline — uno por card
───────────────────────────────────────────────────────────────────────────── */

function MockupAnalytics() {
  return (
    <div style={{
      width: "100%", flex: 1,
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "20px 20px 0",
      gap: 6,
      overflow: "hidden",
    }}>
      {/* Número grande */}
      <div style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 32, color: "#fff", lineHeight: 1 }}>
        $8,850
      </div>
      <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
        103 visitas · ↑ 24%
      </div>
      {/* Mini barras */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64, marginTop: 8 }}>
        {[30, 50, 38, 70, 55, 80, 65, 90, 72, 100, 84, 95].map((h, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: "4px 4px 0 0",
            height: `${h}%`,
            background: i === 9 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)",
          }} />
        ))}
      </div>
    </div>
  );
}

function MockupEditor() {
  return (
    <div style={{
      flex: 1, margin: "20px 16px 0",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "10px 10px 0 0",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* Barra top */}
      <div style={{ height: 28, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 6, padding: "0 10px" }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />)}
        <div style={{ flex: 1, height: 10, background: "rgba(255,255,255,0.12)", borderRadius: 4, marginLeft: 6 }} />
      </div>
      {/* Imagen placeholder */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)", margin: 8, borderRadius: 6, position: "relative" }}>
        {/* Cuadrícula ficticia */}
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4, padding: 4 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />)}
        </div>
      </div>
      {/* Botón Publicar */}
      <div style={{ padding: "0 10px 10px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 6, padding: "5px 14px", fontFamily: "'Aeonik', sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a" }}>
          Publicar
        </div>
      </div>
    </div>
  );
}

function MockupAI() {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* Anillos concéntricos */}
      <div style={{ position: "relative", width: 120, height: 120 }}>
        {[120, 90, 66].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: size, height: size,
            borderRadius: "50%",
            border: `${i === 0 ? 1 : i === 1 ? 1.5 : 2}px solid rgba(255,255,255,${0.12 + i * 0.1})`,
          }} />
        ))}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 46, height: 46, borderRadius: "50%",
          background: "linear-gradient(135deg, #a78bfa, #818cf8, #38bdf8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff",
          boxShadow: "0 0 24px rgba(167,139,250,0.5)",
        }}>
          AI
        </div>
      </div>
    </div>
  );
}

function MockupEmail() {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{
        width: 90, height: 90,
        background: "rgba(255,255,255,0.95)",
        borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      }}>
        {/* Gmail M */}
        <svg width="52" height="40" viewBox="0 0 52 40" fill="none">
          <path d="M4 4L26 22L48 4" stroke="#EA4335" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M4 4L4 36H16V20L26 28L36 20V36H48V4L36 14L26 22L16 14L4 4Z" fill="white" />
          <path d="M4 4L16 14V36H4V4Z" fill="#4285F4" />
          <path d="M48 4L36 14V36H48V4Z" fill="#34A853" />
          <path d="M4 4L16 14L26 22L36 14L48 4L36 14L26 28L16 20V36" fill="none" />
          <path d="M16 14L26 22L36 14" stroke="#FBBC05" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function MockupDomains() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px 20px", gap: 8 }}>
      {/* Barra de búsqueda */}
      <div style={{
        background: "rgba(255,255,255,0.1)", borderRadius: 8,
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 6,
        border: "1px solid rgba(255,255,255,0.18)",
      }}>
        <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
          nebbuler
        </div>
        <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, color: "#FACC15", fontWeight: 600 }}>
          .com
        </div>
      </div>
      {/* Resultados */}
      {[".net", ".io", ".co"].map((ext) => (
        <div key={ext} style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 7,
          padding: "8px 14px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            nebbuler{ext}
          </span>
          <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>disponible</span>
        </div>
      ))}
    </div>
  );
}

function MockupSEO() {
  const pct = 78;
  const r = 34;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, gap: 10 }}>
      <div style={{ position: "relative", width: 90, height: 90 }}>
        <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle cx="45" cy="45" r={r} fill="none" stroke="#34d399" strokeWidth="8"
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff",
        }}>
          {pct}%
        </div>
      </div>
      <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
        Score SEO · Optimizado
      </div>
      {/* Mini barras IA */}
      <div style={{ display: "flex", gap: 4, width: "80%" }}>
        {[60, 85, 70, 90, 78].map((v, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: `rgba(52,211,153,${v / 100})` }} />
        ))}
      </div>
    </div>
  );
}

function MockupContacts() {
  const contacts = [
    { name: "María G.", color: "#818cf8" },
    { name: "Carlos M.", color: "#34d399" },
    { name: "Laura P.", color: "#fb923c" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 18px", gap: 8 }}>
      {/* Badge */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
        <div style={{
          background: "#818cf8", borderRadius: 100, padding: "3px 10px",
          fontFamily: "'Aeonik', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff",
        }}>
          95 contactos
        </div>
      </div>
      {contacts.map((c) => (
        <div key={c.name} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 12px",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: c.color, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Aeonik', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff",
          }}>
            {c.name.charAt(0)}
          </div>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
            {c.name}
          </div>
          <div style={{ marginLeft: "auto", width: 50, height: 4, borderRadius: 2, background: `${c.color}66` }}>
            <div style={{ width: "70%", height: "100%", borderRadius: 2, background: c.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MockupEmailMarketing() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 18px", gap: 8 }}>
      {/* Mini newsletter card */}
      <div style={{
        background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div style={{ height: 36, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
            Welcome to our weekly newsletter
          </div>
        </div>
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
          {[100, 70, 85].map((w, i) => (
            <div key={i} style={{ height: 5, width: `${w}%`, background: "rgba(255,255,255,0.12)", borderRadius: 3 }} />
          ))}
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {[{ label: "Open rate", val: "83%", color: "#34d399" }, { label: "Clicks", val: "26%", color: "#818cf8" }].map(s => (
          <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupStore() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px 18px", gap: 10 }}>
      {/* Producto */}
      <div style={{
        background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ height: 60, background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(99,102,241,0.2))", position: "relative" }}>
          <div style={{
            position: "absolute", bottom: 8, left: 12,
            fontFamily: "'Aeonik', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.55)"
          }}>
            Producto Digital
          </div>
        </div>
        <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff" }}>Plantilla Pro</div>
            <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Descarga inmediata</div>
          </div>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 15, fontWeight: 700, color: "#FACC15" }}>$29</div>
        </div>
      </div>
      {/* Botón */}
      <div style={{
        background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "8px 0",
        textAlign: "center", fontFamily: "'Aeonik', sans-serif", fontSize: 12, fontWeight: 700, color: "#1a1a1a",
      }}>
        Comprar ahora
      </div>
    </div>
  );
}

function MockupBooking() {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const highlighted = [3, 5]; // índices marcados
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px 18px", gap: 8 }}>
      {/* Mini calendario */}
      <div style={{
        background: "rgba(255,255,255,0.07)", borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden",
      }}>
        <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Abril 2026</span>
          <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>↑↓</span>
        </div>
        <div style={{ padding: "8px 12px", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
          {days.map((d, i) => (
            <div key={d} style={{
              width: 24, height: 24, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: highlighted.includes(i) ? (i === 3 ? "#818cf8" : "rgba(129,140,248,0.3)") : "transparent",
              fontFamily: "'Aeonik', sans-serif", fontSize: 10,
              color: highlighted.includes(i) ? "#fff" : "rgba(255,255,255,0.5)",
              fontWeight: highlighted.includes(i) ? 700 : 400,
            }}>
              {d}
            </div>
          ))}
        </div>
      </div>
      {/* Cita marcada */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(129,140,248,0.15)", borderRadius: 8, padding: "8px 12px",
        border: "1px solid rgba(129,140,248,0.3)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8", flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>Consulta · 10:00 AM</div>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Confirmada automáticamente</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Datos de las cards
───────────────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    title: "Edición de sitios web",
    desc: "Personaliza fácilmente todos los detalles de diseño con nuestro vanguardista editor de arrastrar y soltar.",
    mockup: <MockupEditor />,
  },
  {
    title: "Dominios",
    desc: "Refuerza el dominio de tu sitio web. Incluye privacidad DNS, SSL y DNS premium gratuitos.",
    mockup: <MockupDomains />,
  },
  {
    title: "Analytics",
    desc: "Realiza un seguimiento del rendimiento de tu sitio web con indicadores clave de tráfico y comercio electrónico.",
    mockup: <MockupAnalytics />,
  },
  {
    title: "Optimización de IA y búsqueda",
    desc: "Aumenta el tráfico de tus plataformas de búsqueda e IA con herramientas integradas de auditoría de sitios de SEO e IA.",
    mockup: <MockupSEO />,
  },
  {
    title: "Contactos",
    desc: "Captura, almacena y segmenta tu audiencia para crear campañas de marketing personalizadas.",
    mockup: <MockupContacts />,
  },
  {
    title: "Email Marketing",
    desc: "Herramientas de email marketing eficaces a tu alcance para hacer crecer tu audiencia y potenciar tu marca.",
    mockup: <MockupEmailMarketing />,
  },
  {
    title: "Diseño inteligente",
    desc: "Tu asistente creativo de IA para generar diseños, imágenes y contenido diseñado exclusivamente para ti.",
    mockup: <MockupAI />,
  },
  {
    title: "Correo empresarial",
    desc: "Sorprende a tus clientes con un correo electrónico para la empresa de Google Workspace.",
    mockup: <MockupEmail />,
  },
  {
    title: "Tienda online",
    desc: "Vende productos físicos o digitales con pagos integrados vía Stripe o MercadoPago.",
    mockup: <MockupStore />,
  },
  {
    title: "Reserva de citas",
    desc: "Acepta reservas automáticamente con integración a Calendly o Cal.com, sin fricción.",
    mockup: <MockupBooking />,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Card individual con animación escalonada
───────────────────────────────────────────────────────────────────────────── */
function PlatformCard({ title, desc, mockup, delay }: {
  title: string;
  desc: string;
  mockup: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#1c1c1c",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 340,
        border: "1px solid rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        cursor: "default",
      }}
    >
      {/* Mockup area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {mockup}
      </div>

      {/* Footer de texto */}
      <div style={{ padding: "18px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <h3 style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: "#fff",
            margin: 0,
            lineHeight: 1.3,
          }}>
            {title}
          </h3>
          <span style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 1,
          }}>→</span>
        </div>
        <p style={{
          fontFamily: "'Aeonik', sans-serif",
          fontSize: 12.5,
          color: "rgba(255,255,255,0.45)",
          margin: 0,
          lineHeight: 1.55,
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sección principal
───────────────────────────────────────────────────────────────────────────── */
export default function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .platform-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .platform-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#fff",
          padding: "clamp(72px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Header — título izquierda, subtítulo derecha */}
        <div style={{
          maxWidth: 1320,
          margin: "0 auto 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 32,
          flexWrap: "wrap",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "none" : "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <h2 style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: "#000",
            margin: 0,
            maxWidth: 420,
          }}>
            Todo lo que necesitas en una sola plataforma
          </h2>
          <p style={{
            fontFamily: "'Aeonik', sans-serif",
            fontSize: "clamp(14px, 1.3vw, 17px)",
            color: "rgba(0,0,0,0.5)",
            fontWeight: 400,
            margin: 0,
            maxWidth: 400,
            lineHeight: 1.6,
            paddingTop: 6,
          }}>
            Impulsa tu día a día con todas las herramientas y sugerencias de IA que necesitas para gestionar tu negocio, integradas sin inconvenientes en un solo lugar.
          </p>
        </div>

        {/* Grid de cards */}
        <div
          className="platform-grid"
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {CARDS.map((card, i) => (
            <PlatformCard
              key={card.title}
              title={card.title}
              desc={card.desc}
              mockup={card.mockup}
              delay={i * 60}
            />
          ))}
        </div>
      </section>
    </>
  );
}
