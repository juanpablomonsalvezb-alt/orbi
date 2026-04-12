"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

const POSTS = [
  {
    title: "Brand Archetypes: Why They Matter and How to Find Yours",
    category: "Brand Strategy",
    image: "/images/3fo_blog-archetypes_c.jpg",
    href: "/insights/brand-archetypes",
    date: "Mar 2026",
  },
  {
    title: "Why Design Systems Matter More Than You Think",
    category: "Web Design",
    image: "/images/3fo_blog-why-design-system-matter_r1.jpg",
    href: "/insights/design-systems",
    date: "Feb 2026",
  },
  {
    title: "The ROI of Rebranding: When to Refresh and When to Reinvent",
    category: "Brand Strategy",
    image: "/images/3fo_home-thrive-05.jpg",
    href: "/insights/roi-rebranding",
    date: "Jan 2026",
  },
  {
    title: "Digital Marketing in 2026: Trends That Actually Matter",
    category: "Digital Marketing",
    image: "/images/3fo_home-thrive-06.jpg",
    href: "/insights/digital-marketing-2026",
    date: "Dec 2025",
  },
  {
    title: "How to Build a Website That Converts",
    category: "Web Development",
    image: "/images/3fo_home-thrive-07.jpg",
    href: "/insights/website-converts",
    date: "Nov 2025",
  },
  {
    title: "The Power of Video Marketing for Brands",
    category: "Content Marketing",
    image: "/images/3fo_home-thrive-08.jpg",
    href: "/insights/video-marketing",
    date: "Oct 2025",
  },
];

export default function InsightsPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <PageHero
        title="Insights &"
        cycleWords={["ideas.", "trends.", "strategies.", "perspectives."]}
        image="/images/3fo_website-insights_hero-3.jpg"
      />

      {/* Blog grid */}
      <section style={{ padding: "clamp(80px,10vw,160px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: "'Aeonik', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: "70.4px", letterSpacing: "-1.44px" }}>
              Latest <span style={{ color: "var(--yellow)", fontWeight: 300, fontStyle: "italic" }}>articles</span>
            </h2>
            <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 300, color: "rgba(0,0,0,0.55)" }}>
              Thoughts from our team
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
            {POSTS.map(post => (
              <Link key={post.title} href={post.href} style={{ display: "block", borderRadius: 16, overflow: "hidden", transition: "transform .3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "none")}
              >
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover", transition: "transform .4s ease" }} />
                </div>
                <div style={{ padding: "20px 4px" }}>
                  <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--yellow)" }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.3, marginTop: 8, color: "#000" }}>
                    {post.title}
                  </h3>
                  <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(0,0,0,0.4)", marginTop: 8 }}>
                    {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
