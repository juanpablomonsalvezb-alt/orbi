"use client";
import { useState, useRef, useEffect } from "react";

/*
 * CLONADO DE: https://es.squarespace.com — secciones #homepage-how-to, #homepage-faq, #homepage-support
 * CSS extraído de: homepage/default/index.css (1775844521521)
 * "Squarespace" reemplazado por "Nebbuler" en todos los textos
 */

/* ─── data ─────────────────────────────────────────────────────────── */

const STEPS = [
  {
    header: "Inicia tu prueba gratis para sitios web",
    body: "Para crear tu propio sitio web, elige una plantilla web diseñada profesionalmente o usa el creador de páginas web con IA de Nebbuler para comenzar en cuestión de minutos. No hace falta tarjeta de crédito.",
  },
  {
    header: "Personaliza el diseño de tu sitio web",
    body: "Dale tu toque personal con la intuitiva plataforma de sitios web de arrastrar y soltar de Nebbuler. Edita diseños rápidamente, actualiza fuentes y colores, y agrega tus propias imágenes y gestión de marca.",
  },
  {
    header: "Agrega páginas y funciones a tu sitio web",
    body: "Ya sea que estés creando un portafolio o un blog, configurando una tienda online o promocionando servicios y experiencias profesionales, elige entre diseños de página prediseñados o crea uno propio para satisfacer las necesidades de tu contenido.",
  },
  {
    header: "Crea tu contenido",
    body: "Genera títulos, descripciones de productos, etiquetas de SEO y más con herramientas de inteligencia artificial integradas. O escribe tu propio contenido y disfruta de un control creativo absoluto.",
  },
  {
    header: "Publica y crece con herramientas empresariales",
    body: "Conecta un dominio personalizado, publica tu sitio y empieza a hacer crecer tu audiencia con herramientas de marketing integradas, que incluyen SEO, email marketing y conexiones de redes sociales.",
  },
  {
    header: "Empieza a vender en línea",
    body: "Crea una tienda online y permite que los clientes exploren tus productos o servicios, agreguen artículos a su carrito y finalicen la compra de manera segura y eficiente con Nebbuler Payments.",
  },
];

const FAQS = [
  {
    q: "¿Cómo puedo crear un sitio web con Nebbuler?",
    a: "Puedes crear tu propio sitio web con solo iniciar una prueba gratis y seleccionar una plantilla web diseñada por profesionales que se adapte a tu visión, o crear un sitio web totalmente personalizado con el creador de páginas web con IA de Nebbuler. Usa nuestro editor de arrastrar y soltar para personalizar diseños, imágenes, colores y fuentes. También podrás añadir nuevas páginas y funciones empleando diseños prediseñados o crear los tuyos. Agrega contenido a tu sitio con herramientas de IA o escribe el tuyo. Por último, busca un dominio personalizado y publica tu sitio web.",
  },
  {
    q: "¿Tengo que saber programar para crear un sitio web?",
    a: "No es necesario entender el lenguaje de programación para crear un sitio web con Nebbuler. Saber escribir código puede ayudarte a crear sitios web más complejos, pero en nuestra plataforma puedes generar fácilmente un sitio web que sea totalmente personalizado, se adapte a la personalidad de tu marca y te permita publicar tu blog, exhibir tu portafolio o vender tus productos.",
  },
  {
    q: "¿Qué es un creador de páginas web y cuál es el mejor para mí?",
    a: "Un creador de páginas web es una plataforma o herramienta que permite a personas y negocios crear y gestionar sitios web sin experiencia previa en programación o diseño. Busca un creador de sitios web que ofrezca una prueba gratuita, una interfaz fácil de usar, plantillas prediseñadas, opciones de personalización y funciones de comercio electrónico.",
  },
  {
    q: "¿Cuánto cuesta crear un sitio web?",
    a: "Después de una prueba gratis de 14 días, Nebbuler ofrece suscripciones a precios accesibles que te brindan acceso a tu propio sitio web personalizado y herramientas de venta. Los planes más avanzados incluyen funciones de comercio electrónico de última generación y cargos por procesamiento de pagos reducidos.",
  },
  {
    q: "¿Puedo obtener un dominio personalizado para mi sitio web?",
    a: "Sí, puedes obtener un dominio personalizado para tu sitio web con Nebbuler. Busca un registrador de dominios que ofrezca una amplia variedad de dominios de nivel superior (TLD) y extensiones, y que te permita gestionar tu dominio a través de su plataforma.",
  },
  {
    q: "¿Nebbuler ofrece herramientas para crear sitios web impulsadas por IA?",
    a: "Sí, el conjunto de herramientas con IA de Nebbuler puede ayudarte a crear un sitio web personalizado en minutos. El Kit de diseño con IA combina tecnología eficiente con años de experiencia en diseño, generando un sitio web completamente único para tu negocio.",
  },
];

const SUPPORT_LINKS = [
  {
    href: "https://app.nebbuler.com",
    title: "Centro de ayuda",
    body: "Recibe ayuda de nuestro galardonado equipo de Atención al Cliente.",
  },
  {
    href: "https://app.nebbuler.com",
    title: "Seminarios web",
    body: "Sesiones gratuitas en línea para aprender los aspectos básicos y refinar tus habilidades.",
  },
];

/* ─── PlusIcon ─────────────────────────────────────────────────────── */
function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.77,0,0.175,1)",
        flexShrink: 0,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6.185V0H6.185V6.185L0 6.185V8L6.185 8V14H8V8L14 8V6.185L8 6.185Z"
        fill="white"
      />
    </svg>
  );
}

/* ─── AnimatedContent ──────────────────────────────────────────────── */
function AnimatedContent({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      style={{
        height,
        overflow: "hidden",
        transition: "height 0.4s cubic-bezier(0.77,0,0.175,1)",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────── */
export default function AccordionSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggle = (i: number) => setOpenItem(openItem === i ? null : i);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      <style>{`
        /* ── Shared accordion styles ── */
        .acc-section {
          background-color: #000;
        }
        .acc-item {
          width: 100%;
          position: relative;
        }
        .acc-item::before {
          content: " ";
          height: 1px;
          left: 16px;
          top: 0;
          right: 16px;
          background-color: #5a5a5a;
          display: block;
          position: absolute;
        }
        @media (min-width: 744px) { .acc-item::before { left: 24px; right: 24px; } }
        @media (min-width: 1280px) { .acc-item::before { left: 40px; right: 40px; } }

        .acc-btn {
          text-align: left;
          width: 100%;
          padding: 24px 16px;
          cursor: pointer;
          color: #fff;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (min-width: 744px) { .acc-btn { padding: 32px 24px; } }
        @media (min-width: 1280px) { .acc-btn { padding: 40px 40px; } }

        .acc-btn h2 {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 22px;
          line-height: 1em;
          letter-spacing: -0.04em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }
        @media (min-width: 744px) { .acc-btn h2 { font-size: 32px; } }
        @media (min-width: 1020px) { .acc-btn h2 { font-size: 40px; } }
        @media (min-width: 1280px) { .acc-btn h2 { font-size: 50px; } }

        .acc-icon { margin-left: 16px; flex-shrink: 0; }
        @media (min-width: 1280px) { .acc-icon { margin-left: 40px; } }

        /* ── Steps content ── */
        .steps-list {
          counter-reset: stepCounter;
          list-style: none;
          margin: 0;
          padding: 24px 16px 64px;
        }
        @media (min-width: 744px)  { .steps-list { padding: 24px 24px 64px; max-width: 680px; } }
        @media (min-width: 1280px) { .steps-list { padding: 24px 40px 80px; max-width: 780px; } }

        .steps-item {
          counter-increment: stepCounter;
          display: flex;
          align-items: flex-start;
        }
        .steps-item:not(:first-child) { margin-top: 40px; }

        .steps-item::before {
          content: counters(stepCounter, "", decimal-leading-zero);
          font-family: 'Aeonik', sans-serif;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.2em;
          letter-spacing: -0.01em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          flex-shrink: 0;
          padding-top: 2px;
        }
        @media (min-width: 744px)  { .steps-item::before { font-size: 20px; } }
        @media (min-width: 1280px) { .steps-item::before { font-size: 22px; } }

        .steps-text { margin-left: 32px; }
        @media (min-width: 744px)  { .steps-text { margin-left: 24px; } }
        @media (min-width: 1020px) { .steps-text { margin-left: 32px; } }
        @media (min-width: 1440px) { .steps-text { margin-left: 48px; } }

        .steps-header {
          font-family: 'Aeonik', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.2em;
          letter-spacing: -0.01em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0 0 12px;
        }
        @media (min-width: 744px)  { .steps-header { font-size: 20px; } }
        @media (min-width: 1280px) { .steps-header { font-size: 24px; } }

        .steps-desc {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.4em;
          letter-spacing: -0.001em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }

        /* ── FAQ content ── */
        .faq-wrap {
          padding: 0 16px 64px;
        }
        @media (min-width: 744px)  { .faq-wrap { padding: 0 24px 64px; } }
        @media (min-width: 1280px) { .faq-wrap { padding: 0 40px 80px; max-width: 860px; } }

        .faq-item { position: relative; }
        .faq-item::before {
          content: " ";
          height: 1px;
          background-color: #5a5a5a;
          display: block;
          position: absolute;
          top: 0; left: 0; right: 0;
        }

        .faq-btn {
          text-align: left;
          cursor: pointer;
          width: 100%;
          color: #fff;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
        }
        @media (min-width: 744px) { .faq-btn { padding: 32px 0; } }

        .faq-btn h3 {
          font-family: 'Aeonik', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.2em;
          letter-spacing: -0.01em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }
        @media (min-width: 744px)  { .faq-btn h3 { font-size: 20px; } }
        @media (min-width: 1280px) { .faq-btn h3 { font-size: 24px; } }

        .faq-body {
          font-family: 'Aeonik', sans-serif;
          font-size: 15px;
          line-height: 1.4em;
          letter-spacing: -0.001em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          padding-bottom: 32px;
          margin: 0;
        }

        /* ── Support cards ── */
        .support-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          padding: 40px 16px 64px;
        }
        @media (min-width: 744px) {
          .support-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            padding: 40px 24px 64px;
          }
        }
        @media (min-width: 1280px) {
          .support-grid {
            gap: 40px;
            padding: 40px 40px 80px;
          }
        }

        .support-card {
          border: 1px solid #5a5a5a;
          border-radius: 8px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          transition: border-color 0.3s;
          color: #fff;
        }
        .support-card:hover { border-color: #fff; }

        .support-card h3 {
          font-family: 'Aeonik', sans-serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 1em;
          letter-spacing: -0.02em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }
        @media (min-width: 744px)  { .support-card h3 { font-size: 24px; } }
        @media (min-width: 1280px) { .support-card h3 { font-size: 34px; } }

        .support-card-body {
          font-family: 'Aeonik', sans-serif;
          font-size: 15px;
          line-height: 1.4em;
          letter-spacing: -0.001em;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          padding-top: 16px;
          max-width: 18em;
          margin: 0;
        }

        .support-card-arrow {
          font-family: 'Aeonik', sans-serif;
          font-size: 26px;
          line-height: 1.2;
          color: #fff;
          padding-top: 80px;
          display: flex;
          justify-content: flex-end;
          align-self: flex-end;
        }
        @media (min-width: 1280px) { .support-card-arrow { padding-top: 120px; } }
      `}</style>

      <div className="acc-section">
        {/* ── Item 1: Cómo crear una página web ── */}
        <div className="acc-item">
          <button
            className="acc-btn"
            onClick={() => toggle(0)}
            aria-expanded={openItem === 0}
          >
            <h2>Cómo crear una página web</h2>
            <span className="acc-icon"><PlusIcon open={openItem === 0} /></span>
          </button>
          <AnimatedContent open={openItem === 0}>
            <ol className="steps-list">
              {STEPS.map((step) => (
                <li key={step.header} className="steps-item">
                  <div className="steps-text">
                    <h3 className="steps-header">{step.header}</h3>
                    <p className="steps-desc">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </AnimatedContent>
        </div>

        {/* ── Item 2: Preguntas frecuentes ── */}
        <div className="acc-item">
          <button
            className="acc-btn"
            onClick={() => toggle(1)}
            aria-expanded={openItem === 1}
          >
            <h2>Preguntas frecuentes</h2>
            <span className="acc-icon"><PlusIcon open={openItem === 1} /></span>
          </button>
          <AnimatedContent open={openItem === 1}>
            <div className="faq-wrap">
              {FAQS.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-btn"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <h3>{faq.q}</h3>
                    <span className="acc-icon"><PlusIcon open={openFaq === i} /></span>
                  </button>
                  <AnimatedContent open={openFaq === i}>
                    <p className="faq-body">{faq.a}</p>
                  </AnimatedContent>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>

        {/* ── Item 3: Atención al cliente ── */}
        <div className="acc-item">
          <button
            className="acc-btn"
            onClick={() => toggle(2)}
            aria-expanded={openItem === 2}
          >
            <h2>Atención al cliente las 24 horas, todos los días de la semana</h2>
            <span className="acc-icon"><PlusIcon open={openItem === 2} /></span>
          </button>
          <AnimatedContent open={openItem === 2}>
            <div className="support-grid">
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.href}
                  className="support-card"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{link.title}</h3>
                  <p className="support-card-body">{link.body}</p>
                  <span className="support-card-arrow">→</span>
                </a>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}
