export default function Ticker() {
  const text = "IN THE GAME SINCE 1997";
  const items = Array(12).fill(text);

  return (
    <div
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
        overflow: "hidden",
        padding: "20px 0",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "0",
          animation: "ticker 30s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.3)",
              padding: "0 48px",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
