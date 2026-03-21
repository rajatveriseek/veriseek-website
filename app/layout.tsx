import type { Metadata } from "next";
import { Inter, DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AnalyticsWrapper from "@/components/shared/analytics-wrapper";
import GlobalWhatsAppButton from "@/components/shared/global-whatsapp-button";
import GlobalScrollReveal from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"], display: "swap" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700"], style: ["normal", "italic"], display: "swap" });

const GOOGLE_ANALYTICS_ID = 'G-DJ59N085L0';

export const metadata: Metadata = {
  title: "Veriseek Education | Bridging Academic Learning and Professional Skills",
  description:
    "Veriseek Education is an innovative platform that bridges the gap between traditional academic learning and real-world professional skills through competitions like Sharkathon.",
  keywords:
    "student competitions, educational workshops, Sharkathon, real-world skills, business skills for students, pitch competition, entrepreneurship education, student entrepreneur program, financial literacy for students",
  metadataBase: new URL("https://www.veriseekeducation.com"),
  openGraph: {
    title: "Veriseek Education | Bridging Academic Learning and Professional Skills",
    description: "Veriseek Education bridges the gap between traditional academic learning and real-world professional skills.",
    url: "https://www.veriseekeducation.com",
    siteName: "Veriseek Education",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veriseek Education",
    description: "Bridging Academic Learning and Professional Skills",
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
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* ✅ Google Tag Manager Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5C3LMFWR');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Veriseek Education",
              url: "https://www.veriseekeducation.com",
              description: "Veriseek Education bridges the gap between traditional academic learning and real-world professional skills.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "alt.f MPD Tower, 2nd Floor, Golf Course Road, Sector 43",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122002",
                addressCountry: "IN",
              },
              telephone: "+919953371191",
              email: "team@veriseekeducation.com",
            }),
          }}
        />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          dmSans.variable,
          playfairDisplay.variable
        )}
      >
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5C3LMFWR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2142418656589626');
            fbq('track', 'PageView');
          `}
        </Script>

        <AnalyticsWrapper ga_id={GOOGLE_ANALYTICS_ID} />
        <GlobalScrollReveal />

        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <GlobalWhatsAppButton />
      </body>
    </html>
  );
}