import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OX Pumps | Reliable Water Pumps For Every Need | ISO 9001 Certified",
  description: "OX Pumps (Baba Engg. Works) is a leading Indian manufacturer of domestic, agricultural, and industrial water pumps. Based in Coimbatore, AN ISO 9001:2008 Certified Company.",
  keywords: "water pump, monobloc pump, submersible pump, agricultural pump, industrial pump, jet pump, borewell pump, coimbatore pump manufacturer, ox pumps, baba engineering works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background-custom text-foreground-custom">
        <Header />
        <main className="flex-grow relative">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
