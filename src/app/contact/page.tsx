"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { useState } from "react";

const topics = ["Brand", "Website", "Leads"];

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (t: string) =>
    setSelected((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "160px 40px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(48px,7vw,120px)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "#000" }}>
          Let&apos;s create new
          <br />
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.4)" }}>futures</span>
          <br />
          together.
        </h1>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* Contact form */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,52px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0, marginBottom: "24px" }}>
            We&apos;re all about{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>connecting</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.5)", lineHeight: 1.7 }}>
            Let&apos;s chat about your next project, idea or endeavor.
          </p>
        </div>

        {submitted ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "24px", color: "#000", textAlign: "center" }}>
              Thanks! We&apos;ll be in touch soon. →
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <div>
              <label style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                I&apos;d like to chat about
              </label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    style={{
                      fontFamily: "'Aeonik', sans-serif",
                      fontSize: "14px",
                      padding: "8px 20px",
                      borderRadius: "100px",
                      border: "1px solid",
                      borderColor: selected.includes(t) ? "#fff" : "rgba(0,0,0,0.2)",
                      background: selected.includes(t) ? "#fff" : "transparent",
                      color: selected.includes(t) ? "#000" : "rgba(0,0,0,0.7)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {[
              { name: "name", label: "Your name", type: "text" },
              { name: "email", label: "Email address", type: "email" },
              { name: "company", label: "Company", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    outline: "none",
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: "16px",
                    color: "#000",
                    padding: "8px 0",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)")}
                />
              </div>
            ))}

            <div>
              <label style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                  outline: "none",
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: "16px",
                  color: "#000",
                  padding: "8px 0",
                  resize: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)")}
              />
            </div>

            <button
              type="submit"
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "#000",
                background: "#fff",
                border: "none",
                padding: "16px 40px",
                borderRadius: "100px",
                cursor: "pointer",
                alignSelf: "flex-start",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Submit →
            </button>
          </form>
        )}
      </section>

      {/* Address */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 120px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ paddingTop: "80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,52px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0 }}>
            The place we{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>call home</span>
          </h2>
          <div>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.9 }}>
              1035 Folsom Street<br />
              San Francisco, CA 94103<br /><br />
              <a href="mailto:hello@300FeetOut.com" style={{ color: "rgba(0,0,0,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.6)")}>
                hello@300FeetOut.com
              </a><br />
              415.571.2377 x23
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
