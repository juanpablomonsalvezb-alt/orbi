export type Lang = "es" | "pt" | "ar" | "tr" | "pl" | "ro" | "ms" | "en";

export const LANGS: { code: Lang; label: string; flag: string; dir?: "rtl" }[] = [
  { code: "es", label: "Español",    flag: "🇪🇸" },
  { code: "pt", label: "Português",  flag: "🇧🇷" },
  { code: "ar", label: "العربية",    flag: "🇦🇪", dir: "rtl" },
  { code: "tr", label: "Türkçe",     flag: "🇹🇷" },
  { code: "pl", label: "Polski",     flag: "🇵🇱" },
  { code: "ro", label: "Română",     flag: "🇷🇴" },
  { code: "ms", label: "Melayu",     flag: "🇲🇾" },
  { code: "en", label: "English",    flag: "🌐" },
];

export const t: Record<Lang, {
  // Nav
  nav_home: string;
  nav_work: string;
  nav_services: string;
  nav_about: string;
  nav_insights: string;
  nav_cta: string;
  // Hero
  hero_title: string;
  hero_sub: string;
  hero_cta: string;
  hero_secondary: string;
  // Together
  together: string;
  // Stats
  stats_title: string;
  stats_italic: string;
  // CTA section
  cta_title: string;
  cta_sub: string;
  // Footer
  footer_newsletter: string;
  footer_email_placeholder: string;
  footer_subscribe: string;
  footer_subscribed: string;
  footer_rights: string;
  // WhatsApp
  whatsapp_msg: string;
}> = {
  es: {
    nav_home:        "Inicio",
    nav_work:        "Proyectos",
    nav_services:    "Servicios",
    nav_about:       "Nosotros",
    nav_insights:    "Blog",
    nav_cta:         "Hablemos",
    hero_title:      "Tu sitio web listo en 72 horas",
    hero_sub:        "Diseño profesional, precio justo, sin reuniones previas. Tu negocio online hoy.",
    hero_cta:        "Empezar ahora",
    hero_secondary:  "Ver plantillas",
    together:        "Tu competencia ya está online. Tus clientes también. ¿Y tú?",
    stats_title:     "Resultados que",
    stats_italic:    "importan",
    cta_title:       "Hagamos crecer tu negocio",
    cta_sub:         "Sin reuniones previas. Sin compromisos.",
    footer_newsletter:    "Recibe novedades en tu correo",
    footer_email_placeholder: "tu@email.com",
    footer_subscribe:     "Suscribirme",
    footer_subscribed:    "¡Gracias! Ya estás suscrito.",
    footer_rights:        "Todos los derechos reservados.",
    whatsapp_msg:    "Hola, quiero mi sitio web",
  },
  pt: {
    nav_home:        "Início",
    nav_work:        "Projetos",
    nav_services:    "Serviços",
    nav_about:       "Sobre nós",
    nav_insights:    "Blog",
    nav_cta:         "Fale conosco",
    hero_title:      "Seu site pronto em 72 horas",
    hero_sub:        "Design profissional, preço justo, sem reuniões. Seu negócio online hoje.",
    hero_cta:        "Começar agora",
    hero_secondary:  "Ver modelos",
    together:        "Juntos, criamos presença digital que faz seu negócio crescer.",
    stats_title:     "Resultados que",
    stats_italic:    "importam",
    cta_title:       "Vamos fazer seu negócio crescer",
    cta_sub:         "Sem reuniões prévias. Sem compromissos.",
    footer_newsletter:    "Receba novidades no seu e-mail",
    footer_email_placeholder: "seu@email.com",
    footer_subscribe:     "Inscrever-me",
    footer_subscribed:    "Obrigado! Você está inscrito.",
    footer_rights:        "Todos os direitos reservados.",
    whatsapp_msg:    "Olá, quero meu site",
  },
  ar: {
    nav_home:        "الرئيسية",
    nav_work:        "أعمالنا",
    nav_services:    "الخدمات",
    nav_about:       "من نحن",
    nav_insights:    "المدونة",
    nav_cta:         "تحدث معنا",
    hero_title:      "موقعك جاهز في 72 ساعة",
    hero_sub:        "تصميم احترافي، سعر عادل، بدون اجتماعات. عملك على الإنترنت اليوم.",
    hero_cta:        "ابدأ الآن",
    hero_secondary:  "استعرض القوالب",
    together:        "معاً، نبني حضوراً رقمياً يُنمّي أعمالك.",
    stats_title:     "نتائج",
    stats_italic:    "حقيقية",
    cta_title:       "لنُنمّي أعمالك معاً",
    cta_sub:         "بدون اجتماعات مسبقة. بدون التزامات.",
    footer_newsletter:    "احصل على آخر الأخبار في بريدك",
    footer_email_placeholder: "بريدك@الإلكتروني.com",
    footer_subscribe:     "اشتراك",
    footer_subscribed:    "شكراً! أنت مشترك الآن.",
    footer_rights:        "جميع الحقوق محفوظة.",
    whatsapp_msg:    "مرحبا، أريد موقعي",
  },
  tr: {
    nav_home:        "Ana Sayfa",
    nav_work:        "Projeler",
    nav_services:    "Hizmetler",
    nav_about:       "Hakkımızda",
    nav_insights:    "Blog",
    nav_cta:         "İletişime Geç",
    hero_title:      "Web siteniz 72 saatte hazır",
    hero_sub:        "Profesyonel tasarım, adil fiyat, toplantı yok. İşletmeniz bugün çevrimiçi.",
    hero_cta:        "Hemen Başla",
    hero_secondary:  "Şablonlara bak",
    together:        "Birlikte, işinizi büyüten bir dijital varlık oluşturuyoruz.",
    stats_title:     "Sonuçlar",
    stats_italic:    "önemlidir",
    cta_title:       "İşletmenizi birlikte büyütelim",
    cta_sub:         "Önceden toplantı yok. Taahhüt yok.",
    footer_newsletter:    "Haberleri e-postana al",
    footer_email_placeholder: "e-posta@adresin.com",
    footer_subscribe:     "Abone Ol",
    footer_subscribed:    "Teşekkürler! Abone oldunuz.",
    footer_rights:        "Tüm hakları saklıdır.",
    whatsapp_msg:    "Merhaba, web sitem için",
  },
  pl: {
    nav_home:        "Strona główna",
    nav_work:        "Projekty",
    nav_services:    "Usługi",
    nav_about:       "O nas",
    nav_insights:    "Blog",
    nav_cta:         "Porozmawiajmy",
    hero_title:      "Twoja strona gotowa w 72 godziny",
    hero_sub:        "Profesjonalny design, uczciwa cena, bez spotkań. Twój biznes online już dziś.",
    hero_cta:        "Zacznij teraz",
    hero_secondary:  "Zobacz szablony",
    together:        "Razem tworzymy obecność cyfrową, która rozwija Twój biznes.",
    stats_title:     "Wyniki, które",
    stats_italic:    "mają znaczenie",
    cta_title:       "Rozwijajmy razem Twój biznes",
    cta_sub:         "Bez wcześniejszych spotkań. Bez zobowiązań.",
    footer_newsletter:    "Otrzymuj nowości na e-mail",
    footer_email_placeholder: "twoj@email.com",
    footer_subscribe:     "Subskrybuj",
    footer_subscribed:    "Dziękujemy! Jesteś zapisany.",
    footer_rights:        "Wszelkie prawa zastrzeżone.",
    whatsapp_msg:    "Cześć, chcę swoją stronę",
  },
  ro: {
    nav_home:        "Acasă",
    nav_work:        "Proiecte",
    nav_services:    "Servicii",
    nav_about:       "Despre noi",
    nav_insights:    "Blog",
    nav_cta:         "Hai să vorbim",
    hero_title:      "Site-ul tău gata în 72 de ore",
    hero_sub:        "Design profesional, preț corect, fără întâlniri. Afacerea ta online astăzi.",
    hero_cta:        "Începe acum",
    hero_secondary:  "Vezi șabloane",
    together:        "Împreună, construim prezența digitală care îți crește afacerea.",
    stats_title:     "Rezultate care",
    stats_italic:    "contează",
    cta_title:       "Să creștem afacerea ta împreună",
    cta_sub:         "Fără întâlniri prealabile. Fără angajamente.",
    footer_newsletter:    "Primește noutăți pe email",
    footer_email_placeholder: "email@tau.com",
    footer_subscribe:     "Abonează-te",
    footer_subscribed:    "Mulțumim! Ești abonat.",
    footer_rights:        "Toate drepturile rezervate.",
    whatsapp_msg:    "Bună, vreau site-ul meu",
  },
  ms: {
    nav_home:        "Laman Utama",
    nav_work:        "Projek",
    nav_services:    "Perkhidmatan",
    nav_about:       "Tentang Kami",
    nav_insights:    "Blog",
    nav_cta:         "Hubungi Kami",
    hero_title:      "Laman web anda siap dalam 72 jam",
    hero_sub:        "Reka bentuk profesional, harga berpatutan, tanpa mesyuarat. Perniagaan anda online hari ini.",
    hero_cta:        "Mulakan Sekarang",
    hero_secondary:  "Lihat templat",
    together:        "Bersama, kami membina kehadiran digital yang menumbuhkan perniagaan anda.",
    stats_title:     "Keputusan yang",
    stats_italic:    "bermakna",
    cta_title:       "Mari kembangkan perniagaan anda",
    cta_sub:         "Tanpa mesyuarat awal. Tanpa komitmen.",
    footer_newsletter:    "Dapatkan berita terkini di emel anda",
    footer_email_placeholder: "emel@anda.com",
    footer_subscribe:     "Langgan",
    footer_subscribed:    "Terima kasih! Anda telah melanggan.",
    footer_rights:        "Hak cipta terpelihara.",
    whatsapp_msg:    "Hai, saya nak laman web",
  },
  en: {
    nav_home:        "Home",
    nav_work:        "Work",
    nav_services:    "Services",
    nav_about:       "About",
    nav_insights:    "Insights",
    nav_cta:         "Let's Chat",
    hero_title:      "Your website ready in 72 hours",
    hero_sub:        "Professional design, fair price, no prior meetings. Your business online today.",
    hero_cta:        "Get Started",
    hero_secondary:  "View Templates",
    together:        "Together, we build a digital presence that grows your business.",
    stats_title:     "Results that",
    stats_italic:    "matter",
    cta_title:       "Let's grow your business",
    cta_sub:         "No prior meetings. No commitments.",
    footer_newsletter:    "Send cool stuff to my inbox",
    footer_email_placeholder: "your@email.com",
    footer_subscribe:     "Subscribe",
    footer_subscribed:    "Thanks! You're subscribed.",
    footer_rights:        "All rights reserved.",
    whatsapp_msg:    "Hi, I want my website",
  },
};

export function detectLang(): Lang {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("nebbuler_lang") as Lang | null;
  if (saved && t[saved]) return saved;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  const map: Record<string, Lang> = {
    es: "es", pt: "pt", ar: "ar", tr: "tr", pl: "pl", ro: "ro", ms: "ms", en: "en",
  };
  return map[browser] || "es";
}
