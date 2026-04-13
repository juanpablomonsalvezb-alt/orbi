"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled ? "rgba(255,255,255,0.97)" : "transparent";
  const fg = scrolled ? "#000" : "#fff";

  const NAV_LINKS = [
    { label: tr.nav_home,     href: "/" },
    { label: tr.nav_work,     href: "/work" },
    { label: tr.nav_services, href: "/services" },
    { label: tr.nav_about,    href: "/about" },
    { label: tr.nav_insights, href: "/insights" },
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px, 4vw, 56px)",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: bg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
        transition: "background 0.4s ease, border 0.4s ease",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: 22, letterSpacing: "-0.02em",
          color: fg, transition: "color 0.4s ease",
        }}>
          {scrolled ? "NBL" : "Nebbuler"}
        </Link>

        {/* Desktop nav — solo visible cuando NO hace scroll */}
        {!scrolled && (
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 16,
                color: "#fff", transition: "opacity .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{l.label}</Link>
            ))}
            <LanguageSwitcher dark={false} />
            <Link href="/contact" style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 600, fontSize: 14,
              color: "#000", background: "var(--yellow)", padding: "10px 24px",
              borderRadius: 100, whiteSpace: "nowrap",
            }}>{tr.nav_cta}</Link>
          </nav>
        )}

        {/* Desktop nav — visible cuando hace scroll (texto negro) */}
        {scrolled && (
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
                color: "#000", transition: "opacity .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{l.label}</Link>
            ))}
            <LanguageSwitcher dark={true} />
            <Link href="/contact" style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 600, fontSize: 14,
              color: "#000", background: "var(--yellow)", padding: "10px 24px",
              borderRadius: 100, whiteSpace: "nowrap",
            }}>{tr.nav_cta}</Link>
          </nav>
        )}

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="menu-btn-mobile"
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
            color: fg, letterSpacing: "0.02em", transition: "color 0.4s",
          }}>
          {menuOpen ? "✕" : "Menú"}
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
        }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 40,
              color: "#000", letterSpacing: "-0.02em",
            }}>{l.label}</Link>
          ))}
          <LanguageSwitcher dark={true} />
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 600, fontSize: 16,
            color: "#000", background: "var(--yellow)", padding: "14px 36px", borderRadius: 100, marginTop: 8,
          }}>{tr.nav_cta}</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } }
        @media (min-width: 901px) { .menu-btn-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
