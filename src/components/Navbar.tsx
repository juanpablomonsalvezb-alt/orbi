"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over hero: white text on transparent. Scrolled: black text on white.
  const bg = scrolled ? "rgba(255,255,255,0.95)" : "transparent";
  const fg = scrolled ? "#000" : "#fff";
  const logo = scrolled ? "3FO" : "300FeetOut";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px, 4vw, 56px)",
        height: 80, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: bg, backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease",
      }}>
        <Link href="/" style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 900,
          fontSize: scrolled ? 20 : 18, letterSpacing: "-0.02em",
          color: fg, transition: "color 0.4s ease",
        }}>
          {logo}
        </Link>

        {/* Desktop nav links — hidden when scrolled (becomes "Menu" button) */}
        {!scrolled && (
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: "'Aeonik', sans-serif", fontWeight: 400, fontSize: 15,
                color: fg, transition: "opacity .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{l.label}</Link>
            ))}
            <Link href="/contact" style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
              color: "#000", background: "var(--yellow)", padding: "10px 24px",
              borderRadius: 100, transition: "opacity .2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >Let&apos;s Chat</Link>
          </nav>
        )}

        {/* Menu button — always visible on mobile, visible on desktop when scrolled */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
          color: fg, letterSpacing: "0.02em", transition: "color .4s ease",
          display: scrolled ? "block" : undefined,
        }} className={scrolled ? "" : "menu-btn-mobile"}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36,
        }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 48,
              color: "#000", letterSpacing: "-0.02em",
            }}>{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 22,
            color: "#000", background: "var(--yellow)", padding: "14px 36px",
            borderRadius: 100, marginTop: 16,
          }}>Let&apos;s Chat</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .menu-btn-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
