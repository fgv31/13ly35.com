import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = localFont({
  src: "../fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Francesco Villani — Builder & Engineer",
    template: "%s | 13ly35",
  },
  description:
    "Personal portfolio of Francesco Villani. Projects, journey, and curated picks.",
  metadataBase: new URL("https://13ly35.com"),
  openGraph: {
    title: "Francesco Villani — Builder & Engineer",
    description:
      "Personal portfolio of Francesco Villani. Projects, journey, and curated picks.",
    siteName: "13ly35",
    url: "https://13ly35.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Francesco Villani — Builder & Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francesco Villani — Builder & Engineer",
    description:
      "Personal portfolio of Francesco Villani. Projects, journey, and curated picks.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Francesco Villani",
  url: "https://13ly35.com",
  jobTitle: "Builder & Engineer",
  knowsAbout: ["Software Engineering", "Startups", "Product Development"],
  sameAs: ["https://github.com/fgv31"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${pressStart.variable} antialiased bg-beige text-black`}
      >
        {children}
      </body>
    </html>
  );
}
