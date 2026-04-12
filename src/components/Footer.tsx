"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#f5c94c",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        padding: "60px 40px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {/* Newsletter */}
          <div style={{ maxWidth: "400px" }}>
            <p
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(10,10,10,0.5)",
                marginBottom: "20px",
                letterSpacing: "0.01em",
              }}
            >
              Send cool stuff to my inbox
            </p>
            {submitted ? (
              <p
                style={{
                  fontFamily: "'Aeonik', sans-serif",
                  fontSize: "14px",
                  color: "rgba(10,10,10,0.6)",
                }}
              >
                Thanks! You&apos;re subscribed.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  paddingBottom: "8px",
                  gap: "12px",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Aeonik', sans-serif",
                    fontSize: "14px",
                    color: "#0a0a0a",
                    flex: 1,
                    letterSpacing: "0.01em",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(10,10,10,0.6)",
                    fontSize: "18px",
                    padding: "0",
                    transition: "color 0.2s",
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.6)")}
                  aria-label="Subscribe"
                >
                  →
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <Link
              href="https://www.instagram.com/300feetout/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: "14px",
                color: "rgba(10,10,10,0.5)",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.5)")}
            >
              Instagram
            </Link>
            <Link
              href="https://www.linkedin.com/company/300feetout"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: "14px",
                color: "rgba(10,10,10,0.5)",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.5)")}
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontSize: "13px",
              color: "rgba(10,10,10,0.25)",
              letterSpacing: "0.01em",
            }}
          >
            ©2026 300FeetOut All Rights Reserved
          </p>
          <Link
            href="/privacy-policy"
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontSize: "13px",
              color: "rgba(10,10,10,0.25)",
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.25)")}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
