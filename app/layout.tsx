import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

/* metadataBase: set NEXT_PUBLIC_SITE_URL at deploy so OG/twitter URLs go
   absolute (scrapers require it). Relative paths work for local preview. */
export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  title: "Alter — AI should learn how you think",
  description:
    "Alter is the file that carries how you actually work into every AI you use. Your voice, your reasoning, your decisions — yours, on your device.",
  openGraph: {
    title: "Alter — AI should learn how you think",
    description:
      "The file that carries how you work into every AI you use. Yours, on your device.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alter — the .alter file" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alter — AI should learn how you think",
    description:
      "The file that carries how you work into every AI you use. Yours, on your device.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        instrumentSerif.variable,
        instrumentSans.variable,
        plexMono.variable,
      )}
    >
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
