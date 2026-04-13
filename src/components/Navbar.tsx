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

  const bg = scrolled ? "rgba(255,255,255,0.95)" : "transparent";
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
        position: "fixed", top: 32, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px, 4vw, 56px)",
        height: 96, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: bg, backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.5s ease",
      }}>
        <Link href="/" style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: 22, letterSpacing: "-0.02em",
          color: fg, transition: "color 0.4s ease",
        }}>
          {scrolled ? "NBL" : "Nebbuler"}
        </Link>

        {!scrolled && (
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 18,
                color: fg, transition: "opacity .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{l.label}</Link>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LanguageSwitcher dark={false} />
              <Link href="/contact" style={{
                fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 16,
                color: "#000", background: "var(--yellow)", padding: "10px 24px",
                borderRadius: 100, transition: "opacity .2s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{tr.nav_cta}</Link>
            </div>
          </nav>
        )}

        {scrolled && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LanguageSwitcher dark={true} />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
              color: fg, background: "none", border: "none", cursor: "pointer",
            }}>
              {menuOpen ? "✕" : "Menú"}
            </button>
          </div>
        )}

        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 15,
          color: fg, letterSpacing: "0.02em",
          background: "none", border: "none", cursor: "pointer",
        }} className={scrolled ? "hidden" : "menu-btn-mobile"}>
          {menuOpen ? "✕" : "Menú"}
        </button>
      </header>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 44,
              color: "#000", letterSpacing: "-0.02em",
            }}>{l.label}</Link>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 8 }}>
            <LanguageSwitcher dark={true} />
            <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Aeonik', sans-serif", fontWeight: 500, fontSize: 18,
              color: "#000", background: "var(--yellow)", padding: "14px 36px",
              borderRadius: 100,
            }}>{tr.nav_cta}</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
        @media (min-width: 769px) { .menu-btn-mobile { display: none !important; } }
        .hidden { display: none; }
      `}</style>
    </>
  );
}
