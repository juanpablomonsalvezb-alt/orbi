"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (_) {}
    setSubmitted(true);
    setEmail("");
    setLoading(false);
  };

  return (
    <footer
      style={{
        background: "#fdc115",
        padding: "80px 40px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Newsletter row */}
        <div
          style={{
            marginBottom: "80px",
          }}
        >
          <p
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 40px)",
              color: "#000000",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            Send cool stuff to my inbox
          </p>
          {submitted ? (
            <p
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: "16px",
                color: "#000000",
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
                borderBottom: "2px solid #000000",
                paddingBottom: "12px",
                maxWidth: "480px",
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
                  fontSize: "16px",
                  color: "#000000",
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
                  color: "#000000",
                  fontSize: "22px",
                  padding: "0",
                  lineHeight: 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
                aria-label="Subscribe"
              >
                &rarr;
              </button>
            </form>
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "16px",
          }}
        >
          {/* Copyright + Privacy */}
          <p
            style={{
              fontFamily: "'Aeonik', sans-serif",
              fontSize: "13px",
              color: "#000000",
              letterSpacing: "0.01em",
              opacity: 0.6,
            }}
          >
            &copy;2026 300FeetOut All Rights Reserved{" "}
            <span style={{ margin: "0 6px" }}>|</span>
            <Link
              href="/privacy-policy"
              style={{
                color: "#000000",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              Privacy Policy
            </Link>
          </p>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <Link
              href="https://www.instagram.com/300feetout/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Aeonik', sans-serif",
                fontSize: "14px",
                color: "#000000",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
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
                color: "#000000",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
