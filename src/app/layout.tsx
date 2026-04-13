import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PostHogProvider from "@/components/PostHogProvider";
import CookieBanner from "@/components/CookieBanner";
import { LangProvider } from "@/contexts/LangContext";

export const metadata: Metadata = {
  verification: {
    google: "nGHKPqMTM96eNxu15Iec8ODTV_0ccRsDleY-Q_VDkdE",
  },
  title: "Nebbuler — Tu sitio web listo en 72 horas",
  description: "Diseño web profesional para negocios de América Latina y el mundo. Sin reuniones previas. Sin código.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.nebbuler.com"),
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <PostHogProvider>
          <LangProvider>
            <LenisProvider>{children}</LenisProvider>
            <CookieBanner />
          </LangProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
