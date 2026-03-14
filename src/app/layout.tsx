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
  title: "13ly35",
  description: "FV - Building stuff and documenting my Journey",
  openGraph: {
    title: "FV - Building stuff and documenting my Journey",
    description: "FV - Building stuff and documenting my Journey",
    siteName: "13ly35",
  },
  twitter: {
    title: "FV - Building stuff and documenting my Journey",
    description: "FV - Building stuff and documenting my Journey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart.variable} antialiased bg-beige text-black`}>
        {children}
      </body>
    </html>
  );
}
