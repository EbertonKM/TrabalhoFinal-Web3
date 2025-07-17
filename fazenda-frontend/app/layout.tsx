import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trabalho final",
  description: "Trabalho para a matéria de WEB 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <Link href={'/'}><h1>Gerenciamento de animais</h1></Link>
          <nav>
            <Link href={"/animals"}>Animais</Link>
            <Link href={"/lotes"}>Lotes</Link>
            <Link href={"/piquetes"}>Piquetes</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
