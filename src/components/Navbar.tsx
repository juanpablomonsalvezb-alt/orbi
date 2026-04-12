"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "'Aeonik', sans-serif",
          fontWeight: 900,
          fontSize: "20px",
          letterSpacing: "-0.02em",
          color: "#fff",
        }}
      >
        300FeetOut
      </Link>

      {/* Desktop nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          style={{
            fontFamily: "'Aeonik', sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            color: "#000",
            background: "#fff",
            padding: "8px 20px",
            borderRadius: "100px",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Let&apos;s Chat
        </Link>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontSize: "14px",
          fontFamily: "'Aeonik', sans-serif",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
        className="show-mobile"
        aria-label="Toggle menu"
      >
        {menuOpen ? "close" : "menu"}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a0a",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 700,
                fontSize: "36px",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              color: "#000",
              background: "#fff",
              padding: "12px 32px",
              borderRadius: "100px",
              marginTop: "16px",
            }}
          >
            Let&apos;s Chat
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
