"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";

const TOPICS = ["Brand", "Website", "Leads"];

export default function ContactPage() {
  const [topic, setTopic] = useState("");

  return (
    <main style={{ background: "var(--yellow)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero — yellow bg with cycling text */}
      <section style={{ padding: "clamp(140px,18vh,220px) clamp(24px,5vw,80px) clamp(60px,8vw,120px)" }}>
        <h1 style={{
          fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
          fontSize: "clamp(44px, 7vw, 100px)", lineHeight: "110px",
          letterSpacing: "-2.2px", color: "#000", maxWidth: 1000,
        }}>
          Let&apos;s create new futures together.
        </h1>
      </section>

      {/* Form section */}
      <section style={{ padding: "0 clamp(24px,5vw,80px) clamp(80px,10vw,160px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px", marginBottom: 16 }}>
            We&apos;re all about<br /><span style={{ color: "#000", fontWeight: 300, fontStyle: "italic" }}>connecting</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, color: "rgba(0,0,0,0.6)", marginBottom: 40 }}>
            Let&apos;s chat about your next project, idea or endeavor.
          </p>

          {/* Topic pills */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 15, fontWeight: 500, marginBottom: 12 }}>I&apos;d like to chat about →</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {TOPICS.map(t => (
                <button key={t} onClick={() => setTopic(t)} style={{
                  fontFamily: "'Aeonik', sans-serif", fontSize: 15, fontWeight: 500,
                  padding: "10px 24px", borderRadius: 100,
                  border: topic === t ? "2px solid #000" : "1px solid rgba(0,0,0,0.2)",
                  background: topic === t ? "#000" : "transparent",
                  color: topic === t ? "var(--yellow)" : "#000",
                  cursor: "pointer", transition: "all .2s",
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
            <input placeholder="First Name*" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "#000" }} />
            <input placeholder="Last Name*" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "#000" }} />
            <input placeholder="Email*" type="email" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "#000" }} />
            <input placeholder="Zip Code*" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "#000" }} />
            <input placeholder="Company" style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "#000" }} />
            <select style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 16, padding: "16px 0", border: "none", borderBottom: "2px solid rgba(0,0,0,0.2)", background: "transparent", outline: "none", color: "rgba(0,0,0,0.5)", appearance: "none" }}>
              <option value="">I&apos;d like to chat about</option>
              <option value="brand">Brand</option>
              <option value="website">Website</option>
              <option value="leads">Leads</option>
            </select>
          </form>

          <button style={{
            fontFamily: "'Aeonik', sans-serif", fontSize: 16, fontWeight: 700,
            padding: "14px 32px", borderRadius: 100, border: "2px solid #000",
            background: "transparent", color: "#000", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
            transition: "all .2s",
          }}>
            Submit <span>→</span>
          </button>
        </div>
      </section>

      {/* Address section */}
      <section style={{ padding: "clamp(80px,10vw,160px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px" }}>
            The place we<br /><span style={{ fontWeight: 300, fontStyle: "italic" }}>call home</span>
          </h2>
          <div style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.8, color: "rgba(0,0,0,0.7)" }}>
            <p>1035 Folsom Street</p>
            <p>San Francisco, CA 94103</p>
            <p style={{ marginTop: 16 }}>hello@300FeetOut.com</p>
            <p>415.571.2377 x23</p>
          </div>
        </div>
      </section>

      {/* SF aerial photo */}
      <div style={{ width: "100%", height: "50vh", minHeight: 300, position: "relative", overflow: "hidden" }}>
        <Image src="/images/3fo_website-about_hero-3.jpg" alt="San Francisco aerial" fill style={{ objectFit: "cover" }} />
      </div>

      <Footer />
    </main>
  );
}
