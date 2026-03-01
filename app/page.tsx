import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import React from "react";
import VeriseekHero from "@/components/home_revamp/Veriseekhero";
import VeriseekWhySection from "@/components/home_revamp/Veriseekwhysection";
import Veriseekcontact from "@/components/home_revamp/Veriseekcontact";
import VeriseekProgrammes from "@/components/home_revamp/Veriseekprogrammes";
// Import the image utility
import { getImageUrl } from "@/lib/image-utils";
import ImageCarousel from "@/components/home/carousel-home";

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