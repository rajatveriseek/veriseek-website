"use client";
import React from "react";
import Link from "next/link";

import VCFellowshipHero2 from "@/components/the_deal_room/VCFellowshipHero2";
import VCFellowshipFAQ from "@/components/the_deal_room/Vcfellowshipfaq";
import VCFellowshipPricing from "@/components/the_deal_room/Vcfellowshippricing";
import VCFellowshipExpect from "@/components/the_deal_room/Vcfellowshipexpect";
import VCFellowshipContact from "@/components/the_deal_room/Vcfellowshipcontact";
import VCProgrammeFlow from "@/components/the_deal_room/Vcfellowshipprogrammeflow";
import VCFellowshipMentors from "@/components/the_deal_room/Vcfellowshipmentors";
import VCFellowshipSection from "@/components/the_deal_room/Vcfellowshipsection";
import TheDealRoomHero from "@/components/the_deal_room/VCFellowshipHero3";

export default function SharkathonPage() {
  return (
    <>
      {/* Page Content */}
      {/* <VCFellowshipHero2
        heroImageSrc="/images/P1101556.JPG"
        brochureHref="/vc-fellowship-brochure.pdf"
      /> */}
      <TheDealRoomHero
        heroImageSrc="/images/P1101556.JPG"
        brochureHref="/images/The_Deal_Room.pdf"
      />
      <VCFellowshipSection />
      <VCProgrammeFlow />
      <VCFellowshipMentors />
      <VCFellowshipExpect imageSrc="/images/WhatsApp Image 2026-02-22 at 4.01.51 PM.jpeg" />
      <VCFellowshipPricing />
      <VCFellowshipContact imageSrc="/images/P1101587.JPG" />
      <VCFellowshipFAQ />

      {/* Floating Apply Button */}
      <Link
        href="https://rzp.io/rzp/IfWaHBUQ" // or Razorpay link
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 
                   rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black
                   shadow-lg transition hover:scale-105 hover:bg-yellow-400"
      >
       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>Apply Now
      </Link>
    </>
  );
}