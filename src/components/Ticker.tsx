"use client";

export default function Ticker() {
  const text = "IN THE GAME SINCE 1997";
  const items = Array(8).fill(text);

  return (
    <div
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        overflow: "hidden",
        padding: "24px 0",
        whiteSpace: "nowrap" as const,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          animation: "ticker-scroll 30s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(80px, 12vw, 180px)",
              letterSpacing: "-0.03em",
              textTransform: "uppercase" as const,
              color: "#000000",
              lineHeight: 1,
              paddingRight: "0.3em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3em",
            }}
          >
            {item}
            <span
              style={{
                fontSize: "0.5em",
                lineHeight: 1,
                opacity: 0.4,
              }}
            >
              *
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
