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
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" />
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
      </body>
    </html>
  );
}
