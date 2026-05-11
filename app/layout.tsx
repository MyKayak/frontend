import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Nav from "@/components/ui/nav";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "MyKayak - Il Portale della Canoa Velocità",
  description: "Risultati, classifiche e statistiche della Canoa Velocità Italiana.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("token");

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700" rel="stylesheet" />
      </head>
      <body
        className={`antialiased min-h-screen ${isAdmin ? "border-[6px] border-red-600 min-h-screen" : ""}`}
      >
        <Nav isAdmin={isAdmin} />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
