import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { event } from "@/content/event";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * Police unique de la charte : Roboto Condensed (Google Fonts).
 * La police du logo (Nexa) est réservée au logo, fourni en image.
 */
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

// Meta description (~155 caractères, longueur optimale pour Google)
const description =
  "Le rendez-vous alsacien de la protection sociale, de la retraite et de la " +
  "prévoyance. 1ʳᵉ édition le 1ᵉʳ octobre 2026 à Strasbourg — réservez votre place.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${event.domain}`),
  title: {
    default: "Forum de la Protection Sociale — 1ᵉʳ octobre 2026, Strasbourg",
    template: "%s · Forum de la Protection Sociale",
  },
  description,
  keywords: [
    "protection sociale",
    "retraite",
    "prévoyance",
    "Strasbourg",
    "Alsace",
    "forum",
    "experts-comptables",
    "URSSAF",
  ],
  authors: [{ name: "StriQ", url: event.links.agency }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `https://${event.domain}`,
    siteName: "Forum de la Protection Sociale",
    title: "Le rendez-vous alsacien de la protection sociale et de la retraite",
    description,
    images: [
      {
        url: "/images/banniere-rencontres.png",
        width: 1496,
        height: 565,
        alt: "Forum de la Protection Sociale — 1ᵉʳ octobre 2026, Strasbourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forum de la Protection Sociale — 1ᵉʳ octobre 2026, Strasbourg",
    description,
    images: ["/images/banniere-rencontres.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={robotoCondensed.variable}>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
