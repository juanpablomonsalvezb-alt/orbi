"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { LANGS, type Lang } from "@/i18n/translations";

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang)!;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: `1px solid ${dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)"}`,
          borderRadius: 99,
          padding: "6px 12px",
          cursor: "pointer",
          fontFamily: "'Aeonik', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: dark ? "#000" : "#fff",
          letterSpacing: "0.02em",
          transition: "border-color 0.2s",
          whiteSpace: "nowrap",
        }}
        aria-label="Cambiar idioma"
      >
        <span style={{ fontSize: 15 }}>{current.flag}</span>
        <span>{current.label}</span>
        <svg
          width="10" height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 998 }}
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              zIndex: 999,
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              overflow: "hidden",
              minWidth: 160,
            }}
          >
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 16px",
                  background: lang === l.code ? "#f9f9f9" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: 14,
                  color: "#000",
                  textAlign: "left",
                  fontWeight: lang === l.code ? 600 : 400,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; }}
                onMouseLeave={e => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ fontSize: 16 }}>{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && (
                  <span style={{ marginLeft: "auto", color: "#fdc115", fontSize: 16 }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
