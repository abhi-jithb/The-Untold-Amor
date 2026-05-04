import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Untold Amor",
  description: "A sanctuary for words that were felt but never sent.",
};

import StarBackground from "@/components/StarBackground";
import AudioPlayer from "@/components/AudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} bg-slate-950 text-slate-200 antialiased`}>
      <body className="min-h-screen bg-transparent selection:bg-slate-700 font-sans flex flex-col items-center justify-center">
        <StarBackground />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}

