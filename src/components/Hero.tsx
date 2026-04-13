"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/i18n/translations";

const SLIDES: {
  video: string;
  texts: Record<Lang, { title: string; sub: string }>;
}[] = [
  {
    video: "/videos/slide_01.mp4",
    texts: {
      es: { title: "Conectando tu marca con el mundo.",        sub: "Presencia digital que genera resultados reales." },
      pt: { title: "Conectando sua marca ao mundo.",           sub: "Presença digital que gera resultados reais." },
      ar: { title: "نربط علامتك التجارية بالعالم.",            sub: "حضور رقمي يولّد نتائج حقيقية." },
      tr: { title: "Markanı dünyayla buluşturuyoruz.",         sub: "Gerçek sonuçlar yaratan dijital varlık." },
      pl: { title: "Łączymy Twoją markę ze światem.",          sub: "Cyfrowa obecność, która przynosi realne wyniki." },
      ro: { title: "Conectăm brandul tău cu lumea.",           sub: "Prezență digitală care generează rezultate reale." },
      ms: { title: "Menghubungkan jenama anda dengan dunia.",  sub: "Kehadiran digital yang menjana hasil nyata." },
      en: { title: "Connecting your brand with the world.",    sub: "Digital presence that drives real results." },
    },
  },
  {
    video: "/videos/slide_02.mp4",
    texts: {
      es: { title: "Conectando el arte con su audiencia.",     sub: "Diseño que comunica, emociona y convierte." },
      pt: { title: "Conectando a arte com seu público.",       sub: "Design que comunica, emociona e converte." },
      ar: { title: "نربط الفن بجمهوره.",                       sub: "تصميم يتواصل ويُلهم ويحوّل." },
      tr: { title: "Sanatı izleyicisiyle buluşturuyoruz.",     sub: "İletişim kuran, duygu yaratan, dönüştüren tasarım." },
      pl: { title: "Łączymy sztukę z jej odbiorcami.",         sub: "Design, który komunikuje, wzrusza i konwertuje." },
      ro: { title: "Conectăm arta cu publicul său.",           sub: "Design care comunică, emoționează și convertește." },
      ms: { title: "Menghubungkan seni dengan penontonnya.",   sub: "Reka bentuk yang berkomunikasi dan menukar." },
      en: { title: "Connecting arts with their audience.",     sub: "Design that communicates, moves and converts." },
    },
  },
  {
    video: "/videos/slide_03.mp4",
    texts: {
      es: { title: "Conectando propiedades con sus dueños.",   sub: "Sitios que venden antes de la primera visita." },
      pt: { title: "Conectando imóveis com seus donos.",       sub: "Sites que vendem antes da primeira visita." },
      ar: { title: "نربط العقارات بأصحابها.",                  sub: "مواقع تبيع قبل الزيارة الأولى." },
      tr: { title: "Mülkleri sahipleriyle buluşturuyoruz.",    sub: "İlk ziyaretten önce satan siteler." },
      pl: { title: "Łączymy nieruchomości z właścicielami.",   sub: "Strony, które sprzedają przed pierwszą wizytą." },
      ro: { title: "Conectăm proprietățile cu proprietarii.",  sub: "Site-uri care vând înainte de prima vizită." },
      ms: { title: "Menghubungkan hartanah dengan pemiliknya.", sub: "Laman yang menjual sebelum lawatan pertama." },
      en: { title: "Connecting real estate with its owners.",  sub: "Sites that sell before the first visit." },
    },
  },
  {
    video: "/videos/slide_04.mp4",
    texts: {
      es: { title: "Conectando la tecnología con inversores.", sub: "Tu startup merece una presencia de nivel global." },
      pt: { title: "Conectando a tecnologia com investidores.", sub: "Sua startup merece uma presença de nível global." },
      ar: { title: "نربط التكنولوجيا بالمستثمرين.",            sub: "شركتك الناشئة تستحق حضوراً عالمياً." },
      tr: { title: "Teknolojiyi yatırımcılarla buluşturuyoruz.", sub: "Startupın küresel düzeyde bir varlığı hak ediyor." },
      pl: { title: "Łączymy technologię z inwestorami.",       sub: "Twój startup zasługuje na globalną obecność." },
      ro: { title: "Conectăm tehnologia cu investitorii.",     sub: "Startup-ul tău merită o prezență de nivel global." },
      ms: { title: "Menghubungkan teknologi dengan pelabur.",   sub: "Startup anda layak mendapat kehadiran global." },
      en: { title: "Connecting tech with investors.",          sub: "Your startup deserves a global-level presence." },
    },
  },
  {
    video: "/videos/slide_05.mp4",
    texts: {
      es: { title: "Conectando la educación con estudiantes.", sub: "Plataformas que inspiran a aprender más." },
      pt: { title: "Conectando a educação com estudantes.",    sub: "Plataformas que inspiram a aprender mais." },
      ar: { title: "نربط التعليم بالطلاب.",                    sub: "منصات تُلهم على التعلم أكثر." },
      tr: { title: "Eğitimi öğrencilerle buluşturuyoruz.",     sub: "Daha fazla öğrenmeye ilham veren platformlar." },
      pl: { title: "Łączymy edukację ze studentami.",          sub: "Platformy, które inspirują do nauki." },
      ro: { title: "Conectăm educația cu studenții.",          sub: "Platforme care inspiră să înveți mai mult." },
      ms: { title: "Menghubungkan pendidikan dengan pelajar.", sub: "Platform yang mengilham untuk belajar lebih." },
      en: { title: "Connecting education with students.",      sub: "Platforms that inspire people to learn more." },
    },
  },
  {
    video: "/videos/slide_06.mp4",
    texts: {
      es: { title: "Conectando la salud con sus pacientes.",   sub: "Confianza digital para quienes más lo necesitan." },
      pt: { title: "Conectando a saúde com seus pacientes.",   sub: "Confiança digital para quem mais precisa." },
      ar: { title: "نربط الصحة بمرضاها.",                     sub: "ثقة رقمية لمن يحتاجها أكثر." },
      tr: { title: "Sağlığı hastalarıyla buluşturuyoruz.",     sub: "En çok ihtiyaç duyanlara dijital güven." },
      pl: { title: "Łączymy zdrowie z pacjentami.",            sub: "Cyfrowe zaufanie dla tych, którzy najbardziej go potrzebują." },
      ro: { title: "Conectăm sănătatea cu pacienții.",         sub: "Încredere digitală pentru cei care au nevoie." },
      ms: { title: "Menghubungkan kesihatan dengan pesakit.",  sub: "Kepercayaan digital untuk mereka yang perlukan." },
      en: { title: "Connecting healthcare with patients.",     sub: "Digital trust for those who need it most." },
    },
  },
  {
    video: "/videos/slide_07.mp4",
    texts: {
      es: { title: "Conectando negocios con inversores.",      sub: "La historia de tu empresa, contada con impacto." },
      pt: { title: "Conectando negócios com investidores.",    sub: "A história da sua empresa contada com impacto." },
      ar: { title: "نربط الأعمال بالمستثمرين.",               sub: "قصة شركتك تُروى بتأثير." },
      tr: { title: "İşletmeleri yatırımcılarla buluşturuyoruz.", sub: "Şirketinin hikayesi etki yaratacak şekilde anlatılıyor." },
      pl: { title: "Łączymy biznesy z inwestorami.",           sub: "Historia Twojej firmy opowiedziana z wpływem." },
      ro: { title: "Conectăm afacerile cu investitorii.",      sub: "Povestea companiei tale spusă cu impact." },
      ms: { title: "Menghubungkan perniagaan dengan pelabur.", sub: "Kisah syarikat anda diceritakan dengan impak." },
      en: { title: "Connecting businesses with investors.",    sub: "Your company's story told with impact." },
    },
  },
  {
    video: "/videos/slide_09.mp4",
    texts: {
      es: { title: "Conectando tu esfuerzo, siempre.",         sub: "Cada hora de trabajo merece ser vista." },
      pt: { title: "Conectando seu esforço, sempre.",          sub: "Cada hora de trabalho merece ser vista." },
      ar: { title: "نربط جهدك دائماً.",                        sub: "كل ساعة عمل تستحق أن تُرى." },
      tr: { title: "Çabanı her zaman bağlıyoruz.",             sub: "Her çalışma saati görülmeyi hak ediyor." },
      pl: { title: "Łączymy Twój wysiłek, zawsze.",            sub: "Każda godzina pracy zasługuje na bycie widzianą." },
      ro: { title: "Conectăm efortul tău, mereu.",             sub: "Fiecare oră de muncă merită să fie văzută." },
      ms: { title: "Menghubungkan usaha anda, sentiasa.",      sub: "Setiap jam kerja layak untuk dilihat." },
      en: { title: "Connecting your effort, always.",          sub: "Every hour of work deserves to be seen." },
    },
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [fade, setFade] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a");
  const { lang, tr, dir } = useLang();

  // Preload next video into the inactive layer
  const nextIdx = (idx + 1) % SLIDES.length;

  useEffect(() => {
    const active = activeLayer === "a" ? videoARef.current : videoBRef.current;
    if (active) { active.load(); active.play().catch(() => {}); }
  }, [idx, activeLayer]);

  // Preload next into inactive layer
  useEffect(() => {
    const inactive = activeLayer === "a" ? videoBRef.current : videoARef.current;
    if (inactive) {
      inactive.src = SLIDES[nextIdx].video;
      inactive.load();
    }
  }, [idx, activeLayer, nextIdx]);

  const handleVideoEnd = () => {
    setFade(true);
    setTimeout(() => {
      setIdx(nextIdx);
      setActiveLayer(l => l === "a" ? "b" : "a");
      setAnimKey(k => k + 1);
      setFade(false);
    }, 400);
  };

  const goTo = (i: number) => {
    setFade(true);
    setTimeout(() => {
      setIdx(i);
      setActiveLayer(l => l === "a" ? "b" : "a");
      setAnimKey(k => k + 1);
      setFade(false);
    }, 300);
  };

  const slide = SLIDES[idx];
  const text = slide.texts[lang] || slide.texts.es;

  return (
    <section style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 640, overflow: "hidden", background: "#111",
    }}>
      {/* Layer A */}
      <video
        ref={videoARef}
        autoPlay muted playsInline
        onEnded={activeLayer === "a" ? handleVideoEnd : undefined}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: activeLayer === "a" ? (fade ? 0 : 1) : 0,
          transition: "opacity 0.4s ease",
          zIndex: activeLayer === "a" ? 1 : 0,
        }}
      >
        <source src={SLIDES[idx].video} type="video/mp4" />
      </video>

      {/* Layer B */}
      <video
        ref={videoBRef}
        autoPlay muted playsInline
        onEnded={activeLayer === "b" ? handleVideoEnd : undefined}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: activeLayer === "b" ? (fade ? 0 : 1) : 0,
          transition: "opacity 0.4s ease",
          zIndex: activeLayer === "b" ? 1 : 0,
        }}
      >
        <source src={SLIDES[nextIdx].video} type="video/mp4" />
      </video>

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
      }} />

      {/* Text overlay */}
      <div style={{
        position: "absolute", insetInline: 0, bottom: 0, zIndex: 3,
        display: "flex", flexDirection: "column", gap: 20,
        padding: "0 clamp(24px,5vw,80px) clamp(56px,8vh,110px)",
        direction: dir,
      }}>
        <h1
          key={`title-${animKey}`}
          style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
            fontSize: "clamp(40px, 6.5vw, 90px)", lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", maxWidth: 1000,
            margin: 0, animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {text.title}
        </h1>

        <p
          key={`sub-${animKey}`}
          style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 400,
            fontSize: "clamp(15px, 1.8vw, 20px)", color: "rgba(255,255,255,0.72)",
            maxWidth: 560, margin: 0, lineHeight: 1.55,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          {text.sub}
        </p>

        <div
          key={`cta-${animKey}`}
          style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both",
          }}
        >
          <Link href="https://app.nebbuler.com/plantillas/comenzar" style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
            fontSize: 15, color: "#000", background: "var(--yellow)",
            padding: "14px 36px", borderRadius: 100,
            letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}>
            {tr.hero_cta}
          </Link>
          <Link href="/work" style={{
            fontFamily: "'Aeonik', sans-serif", fontWeight: 500,
            fontSize: 15, color: "#fff",
            padding: "14px 36px", borderRadius: 100,
            border: "1.5px solid rgba(255,255,255,0.4)",
            letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}>
            {tr.hero_secondary}
          </Link>
        </div>

        {/* Indicators */}
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === idx ? 24 : 6, height: 6,
                borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                backgroundColor: i === idx ? "var(--yellow)" : "rgba(255,255,255,0.35)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
