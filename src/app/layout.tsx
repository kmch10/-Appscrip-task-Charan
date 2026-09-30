import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Discover Our Products | mettā muse";
const description =
  "Browse the mettā muse collection. Filter by fit, occasion, fabric, and pattern, then sort by recommendation, popularity, or price.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "mettā muse",
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "mettā muse",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
