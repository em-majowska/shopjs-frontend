export const instant = false;
import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Lumière — Boutique de cosmétiques français",
  description:
    "Découvrez Maison Lumière : soins du visage, parfums et savons artisanaux composés en France, dans une boutique en ligne délicate et épurée.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = (await cookies()).get("theme")?.value || "light";

  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body
        className={`${theme === "dark" ? "dark" : ""} flex min-h-full flex-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
