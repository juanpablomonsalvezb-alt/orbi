import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PostHogProvider from "@/components/PostHogProvider";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  verification: {
    google: "nGHKPqMTM96eNxu15Iec8ODTV_0ccRsDleY-Q_VDkdE",
  },
  title: "300 Feet Out — Brand Strategy & Creative Agency",
  description: "We help brands grow through strategy, design, and digital. Brand strategy, web design, and demand generation for ambitious companies.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.orbbilatam.com"),
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <LenisProvider>{children}</LenisProvider>
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  );
}
