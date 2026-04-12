"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "why-your-brand-is-boring",
    category: "insights",
    title: "Why Your Brand is Boring",
    image: "/images/3fo_blog-archetypes_c.jpg",
    href: "/insights/why-your-brand-is-boring",
  },
  {
    slug: "brand-friction",
    category: "insights",
    title: "Brand Friction",
    image: "/images/redlining.jpg",
    href: "/insights/brand-friction",
  },
  {
    slug: "why-design-systems-matter",
    category: "insights",
    title: "Why Design Systems Matter",
    image: "/images/3fo_blog-why-design-system-matter_r1.jpg",
    href: "/insights/why-design-systems-matter",
  },
  {
    slug: "your-3fo-all-star-meet-forrest",
    category: "culture",
    title: "Your 3FO All-Star: Meet Forrest",
    image: "/images/3fo_forrest-spotlight_hero.jpg",
    href: "/insights/your-3fo-all-star-meet-forrest",
  },
];

export default function InsightsPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Dive in deep with"
        cycleWords={["stories.", "insights.", "news.", "brags.", "ideas."]}
        image="/images/3fo_website-insights_hero-3.jpg"
      />

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px 120px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.03em", color: "#000", lineHeight: 1.0 }}>
            News, brags,{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>shenanigans.</span>
          </h2>
          <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "15px", color: "rgba(0,0,0,0.5)", maxWidth: "400px", lineHeight: 1.6 }}>
            From strategy, to technology, to marketing, to design trends and more, this is your spot for lifelong learning.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={post.href}
              style={{
                display: "block",
                background: "#f5f5f5",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                transition: "border-color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)")}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
              </div>
              <div style={{ padding: "24px 28px 28px" }}>
                <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", display: "block", marginBottom: "8px" }}>
                  {post.category}
                </span>
                <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em", color: "#000", lineHeight: 1.2 }}>
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
