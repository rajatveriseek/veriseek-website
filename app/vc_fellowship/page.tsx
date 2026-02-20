"use client"
import React, { useEffect } from "react"
import VCFellowshipHero from "@/components/vc_fellowship/VCFellowshipHero"
import VCFellowshipFAQ from "@/components/vc_fellowship/Vcfellowshipfaq"
import VCFellowshipPricing from "@/components/vc_fellowship/Vcfellowshippricing"
import VCFellowshipExpect from "@/components/vc_fellowship/Vcfellowshipexpect"
import VCFellowshipHero2 from "@/components/vc_fellowship/VCFellowshipHero2"
import VCFellowshipContact from "@/components/vc_fellowship/Vcfellowshipcontact"
import VCProgrammeFlow from "@/components/vc_fellowship/Vcfellowshipprogrammeflow"
import VCFellowshipMentors from "@/components/vc_fellowship/Vcfellowshipmentors"
import VCFellowshipSection from "@/components/vc_fellowship/Vcfellowshipsection"

export default function SharkathonPage() {
  
  return (
    <React.Fragment>
      <VCFellowshipHero2
        heroImageSrc="/images/students-session.JPG"
        applyHref="/apply"
        brochureHref="/vc-fellowship-brochure.pdf"
      />
        <VCFellowshipSection/>
        <VCProgrammeFlow />
        <VCFellowshipMentors />
        <VCFellowshipExpect imageSrc="/images/students-session.JPG"/>
        <VCFellowshipPricing />
        <VCFellowshipContact  imageSrc="/images/students-session.JPG"/>
        <VCFellowshipFAQ />
    </React.Fragment>
  )
}