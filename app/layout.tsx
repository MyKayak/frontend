import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeSelector from "@/assets/ThemeSelector";
import {useEffect} from "react";
import AutoThemeSetter from "@/assets/AutoThemeSetter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyKayak",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const names = ["Federico Toluzzo", "Guido Michieletto"];
  const randomizedNames = [...names].sort(() => Math.random() - 0.5);
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="MyKayak" />
      <meta property="og:description" content="ඞඞඞ" />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:url" content="https://mykayak.fuffo.net" />
      <meta property="og:type" content="website" />

      {/* Twitter Card (optional) */}
      <meta name="twitter:card" content="/logo.png" />
      <meta name="twitter:site" content="https://mykayak.fuffo.net" />
      <meta name="twitter:title" content="MyKayak" />
      <meta name="twitter:description" content="ඞඞඞ" />
      <meta name="twitter:image" content="/logo.png" />

      {/* WhatsApp Preview (uses Open Graph) */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
      <AutoThemeSetter />
        <header className="backdrop-blur-sm fixed flex w-full gap-4 content-end p-2 justify-items-center flex-row z-10">
          <Link href="/" className="flex mx-auto">
            <button className="btn">MyKayak</button>
          </Link>
        </header>
        <div className="h-20"></div>
        {children}
        <footer className="flex p-20">
          <div className="mx-auto">
            <p className="text-center"> &copy;  2025 MyKayak - All Rights Reserved.
            <br></br>
            by {randomizedNames[0] + " and " + randomizedNames[1] + "."}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
