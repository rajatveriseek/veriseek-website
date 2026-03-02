"use client";
import React from "react";
import Link from "next/link";

import SharkathonHero from "@/components/sharkathon_season2/Sharkathonhero";
import SharkathonFAQ from "@/components/sharkathon_season2/Sharkathonfaq";
import SharkathonPricing from "@/components/sharkathon_season2/Sharkathonpricing";
import SharkathonRounds from "@/components/sharkathon_season2/SharkathonRounds";
import SharkathonJourney from "@/components/sharkathon_season2/Sharkathonjourney";
import Sharkathoncontact from "@/components/sharkathon_season2/Sharkathonconnect";
import SharkathonTestimonials from "@/components/sharkathon_season2/Sharkathontestimonials";
import SchoolMarquee from "@/components/sharkathon_season2/Schoolmarquee";
import SharkathonWhyParticipate from "@/components/sharkathon_season2/Sharkathonwhyparticipate";
import SharkathonMentors from "@/components/sharkathon_season2/Sharkathonmentors";

export default function SharkathonPage() {
  return (
    // overflow-x: hidden is required so the full-bleed hero (-50vw margins)
    // doesn't create a horizontal scrollbar on the page
    <div style={{ overflowX: "hidden" }}>
      <SharkathonHero
        brochureHref="/Sharkathon Season 2.pdf"
        imageSrc="/images/P1101636.JPG"
      />
      <SharkathonRounds />
      <SharkathonJourney />
      <SchoolMarquee />
      <SharkathonWhyParticipate imageSrc="/images/P1101634.JPG" />
      <SharkathonMentors />
      <SharkathonTestimonials />
      <SharkathonPricing />
      <Sharkathoncontact imageSrc="/images/P1101587.JPG" />
      <SharkathonFAQ />

      {/* Floating Apply Button */}
      <Link
        href="https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 
                   rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black
                   shadow-lg transition hover:scale-105 hover:bg-yellow-400"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
        Apply Now
      </Link>
    </div>
  );
}