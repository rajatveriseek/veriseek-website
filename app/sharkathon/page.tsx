"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users } from "lucide-react"
import SharkathonTimeline from "@/components/sharkathon/timeline"
import RegistrationForm from "@/components/sharkathon/registration-form"
import SharkathonFAQ from "@/components/sharkathon/faq"
import SharkathonComparison from "@/components/sharkathon/comaprisonTable"
import PricingCards from "@/components/sharkathon/pricing"

import React, { useEffect } from "react"

// Import the image utility
import { getImageUrl } from "@/lib/image-utils"
import MentorsSection from "@/components/sharkathon/mentor"
import SimulationProcess from "@/components/sharkathon/simulation"
import SneakPeekSection from "@/components/sharkathon/sneak"
import ImageCarousel from "@/components/sharkathon/carousel.jsx"
import SharkathonBenefits from "@/components/sharkathon/getSharkathon"
import HeroSection from "@/components/sharkathon/heroSection"
import ProgramFlowImage from "@/components/sharkathon/dates"
import ProgramTimeline from "@/components/sharkathon/timeline_v2"
import ProfileCards from "@/components/sharkathon/mentor2"
import SchoolMarquee from "@/components/sharkathon/schools"

// Import the tracking function
import { trackEvent } from "@/app/analytics"



export default function SharkathonPage() {
  // Track page view and scroll depth
  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      event_category: 'page_engagement',
      event_label: 'sharkathon_page',
      page_title: 'Sharkathon Competition'
    });

    // Scroll tracking variables
    let scrollDepths = {
      '25': false,
      '50': false,
      '75': false,
      '100': false
    };

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track 25% scroll
      if (scrollPercent >= 25 && !scrollDepths['25']) {
        scrollDepths['25'] = true;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: 'sharkathon_page_25_percent',
          value: 25
        });
      }

      // Track 50% scroll
      if (scrollPercent >= 50 && !scrollDepths['50']) {
        scrollDepths['50'] = true;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: 'sharkathon_page_50_percent',
          value: 50
        });
      }

      // Track 75% scroll
      if (scrollPercent >= 75 && !scrollDepths['75']) {
        scrollDepths['75'] = true;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: 'sharkathon_page_75_percent',
          value: 75
        });
      }

      // Track 100% scroll
      if (scrollPercent >= 100 && !scrollDepths['100']) {
        scrollDepths['100'] = true;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: 'sharkathon_page_complete',
          value: 100
        });
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Event handlers for tracking
  const handleRegisterClick = (source: string) => {
    trackEvent('cta_click', {
      event_category: 'conversion',
      event_label: `register_${source}`,
      value: 1
    });
  };

  const handleSectionView = (sectionName: string) => {
    trackEvent('section_view', {
      event_category: 'engagement',
      event_label: `${sectionName}_section`,
      value: 1
    });
  };

  const handlePDFDownload = (pdfName: string) => {
    trackEvent('file_download', {
      event_category: 'engagement',
      event_label: pdfName,
      file_extension: 'pdf',
      value: 1
    });
  };

  const handleExternalLink = (linkName: string, url: string) => {
    trackEvent('outbound_link', {
      event_category: 'engagement',
      event_label: linkName,
      destination_url: url,
      value: 1
    });
  };

  return (
    <React.Fragment>
      {/* Hero Section */}
      <div onMouseEnter={() => handleSectionView('hero')}>
        <HeroSection />
      </div>

      <div onMouseEnter={() => handleSectionView('simulation')}>
        <SimulationProcess />
      </div>

      <section className="py-16 bg-primary" id="process">
        <div className="container" onMouseEnter={() => handleSectionView('timeline')}>
          <ProgramTimeline/>
        </div>
      </section>

      <div onMouseEnter={() => handleSectionView('mentors')}>
        <ProfileCards/>
      </div>

      <div onMouseEnter={() => handleSectionView('schools')}>
        <SchoolMarquee/>
      </div>

      <section className="py-10 px-0 bg-primary" id="process">
        <div className="container" onMouseEnter={() => handleSectionView('benefits')}>
          <SharkathonBenefits />
        </div>
      </section>

      <div onMouseEnter={() => handleSectionView('pricing')}>
        <PricingCards />
      </div>

      <section className="py-10 px-0 bg-primary" id="process">
        <div className="container" onMouseEnter={() => handleSectionView('sneak_peek')}>
          <SneakPeekSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container" onMouseEnter={() => handleSectionView('faq')}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Find answers to common questions about Sharkathon</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SharkathonFAQ />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container" onMouseEnter={() => handleSectionView('final_cta')}>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Think Like an Investor?</h2>
            <p className="text-white/80">
              Join Sharkathon today and embark on an exciting journey of critical thinking, analysis, and investment
              evaluation.
            </p>
            {/* <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-lg border-2 border-secondary transition-all hover:scale-105"
              onClick={() => handleRegisterClick('final_cta')}
            >
              <Link href="#register">Register Now</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Hidden PDF download links for tracking (add these where your actual PDFs are) */}
      <div style={{ display: 'none' }}>
        {/* Example PDF downloads - replace with your actual PDF links */}
        <a 
          href="/deck.pdf" 
          onClick={() => handlePDFDownload('sharkathon_brochure')}
        >
          Sharkathon Brochure
        </a>
      </div>

    </React.Fragment>
  )
}