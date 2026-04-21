"use client";
import React from "react";
import dynamic from "next/dynamic";
import { submitSharkathonSchoolEnquiry } from "@/app/actions/registration";

import SharkathonHero from "@/components/sharkathon_season2/Sharkathonhero";

const SchoolMarquee = dynamic(() => import("@/components/sharkathon_season2/Schoolmarquee"));
const SharkathonRounds = dynamic(() => import("@/components/sharkathon_season2/SharkathonRounds"));
const SharkathonTestimonials = dynamic(() => import("@/components/sharkathon_season2/Sharkathontestimonials"));
const SharkathonMentors = dynamic(() => import("@/components/sharkathon_season2/Sharkathonmentors"));
const SharkathonWhyParticipate = dynamic(() => import("@/components/sharkathon_season2/Sharkathonwhyparticipate"));
const SharkathonPricingSchool = dynamic(() => import("@/components/sharkathon_season2/SharkathonpricingSchool"));
const Sharkathoncontact = dynamic(() => import("@/components/sharkathon_season2/Sharkathonconnect"));
const SharkathonFAQ = dynamic(() => import("@/components/sharkathon_season2/Sharkathonfaq"));
const SharkathonJourneyCopy = dynamic(() => import("@/components/sharkathon_season2/Sharkathonjourney_copy"));

const PAYMENT_URL = "https://rzp.io/rzp/q7Drpeq";
const openPayment = () => window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");

export default function SharkathonPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <SharkathonHero
        brochureHref="/Sharkathon Season__2.pdf"
        imageSrc="/images/P1101636.JPG"
        onApply={openPayment}
        submitAction={submitSharkathonSchoolEnquiry}
      />
      <SchoolMarquee />
      <SharkathonRounds onApply={openPayment} brochureHref="/Sharkathon Season__2.pdf" submitAction={submitSharkathonSchoolEnquiry}/>
      <SharkathonTestimonials onApply={openPayment} brochureHref="/Sharkathon Season__2.pdf" submitAction={submitSharkathonSchoolEnquiry}/>
      <SharkathonMentors />
      <SharkathonJourneyCopy/>
      <SharkathonWhyParticipate imageSrc="/images/P1101634.JPG" onApply={openPayment} brochureHref="/Sharkathon Season__2.pdf" submitAction={submitSharkathonSchoolEnquiry}/>
      <SharkathonPricingSchool onApply={openPayment} brochureHref="/Sharkathon Season__2.pdf" submitAction={submitSharkathonSchoolEnquiry}/>
      <Sharkathoncontact imageSrc="/images/P1101587.JPG" />
      <SharkathonFAQ />

      {/* Floating Apply Now Button */}
      <button
        type="button"
        onClick={openPayment}
        className="fixed z-50 flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-400"
        style={{ bottom: "1.5rem", right: "1.5rem" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
        Apply Now
      </button>
    </div>
  );
}