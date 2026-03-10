import React from "react";
import dynamic from "next/dynamic";
import VeriseekHero from "@/components/home_revamp/Veriseekhero";

const VeriseekWhySection = dynamic(() => import("@/components/home_revamp/Veriseekwhysection"), { ssr: true });
const VeriseekProgrammes = dynamic(() => import("@/components/home_revamp/Veriseekprogrammes"), { ssr: true });
const Veriseekcontact = dynamic(() => import("@/components/home_revamp/Veriseekcontact"), { ssr: true });

export default function home_old() {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="">
        <VeriseekHero
            heroImageSrc="/images/P1101556.JPG"
            primaryHref="#contact"
            secondaryHref="#programmes"
        />
        <VeriseekWhySection />
        <VeriseekProgrammes />
        <Veriseekcontact
            imageSrc="/images/P1101587.JPG" 
        />
      </section>
   </React.Fragment>
  );
}