import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "./analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Veriseek Education | Bridging Academic Learning and Professional Skills",
  description:
    "Veriseek Education is an innovative platform that bridges the gap between traditional academic learning and real-world professional skills through competitions like Sharkathon.",
  keywords:
    "student competitions, educational workshops, Sharkathon, real-world skills, business skills for students, pitch competition, entrepreneurship education, student entrepreneur program, financial literacy for students",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <GoogleAnalytics ga_id= 
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          )}
        <Analytics/>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}