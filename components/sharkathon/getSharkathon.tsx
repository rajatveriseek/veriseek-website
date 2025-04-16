"use client";

import React, { useState } from 'react';
import { Brain, TrendingUp, MessageSquare, Users, GraduationCap, FileText, BriefcaseBusiness, ChevronDown } from 'lucide-react'; // Optional: Add ChevronDown for visual cue

export default function SharkathonBenefits() {
  // State to track the ID of the currently open/active benefit
  const [activeBenefitId, setActiveBenefitId] = useState(null);

  const benefits = [
    {
      id: 1,
      icon: <FileText className="text-secondary flex-shrink-0" size={24} />, // Added flex-shrink-0
      title: "Certification & Letter of Recommendation",
      description: "Earn a prestigious certificate and LOR that proves your investor mindset."
    },
    {
      id: 2,
      icon: <GraduationCap className="text-secondary flex-shrink-0" size={24} />,
      title: "College & Career Readiness",
      description: "Boost your profile with real business experience that stands out on applications."
    },
    {
      id: 3,
      icon: <Users className="text-secondary flex-shrink-0" size={24} />,
      title: "Mentorship & Internship Opportunities",
      description: "Get guided by top investors and unlock exclusive industry internships"
    },
    {
      id: 4,
      icon: <BriefcaseBusiness className="text-secondary flex-shrink-0" size={24} />,
      title: "Real-World Business Simulation",
      description: "Take part in high-stakes challenges that mirror actual startup investment rounds."
    },
    {
      id: 5,
      icon: <Brain className="text-secondary flex-shrink-0" size={24} />,
      title: "Critical Thinking & Strategic Decision-Making",
      description: "Learn to solve complex problems and make bold decisions like future CEOs and investors."
    },
    {
      id: 6,
      icon: <TrendingUp className="text-secondary flex-shrink-0" size={24} />,
      title: "Business & Investment Skills",
      description: "Master how to evaluate startups, read numbers, and think like a real-world shark."
    },
    {
      id: 7,
      icon: <MessageSquare className="text-secondary flex-shrink-0" size={24} />,
      title: "Effective Communication",
      description: "Build the confidence to ask sharp questions and communicate your decision with clarity."
    }
  ];

  // Function to handle clicking on a benefit item
  const handleToggleBenefit = (id) => {
    // If the clicked item is already active, close it (set active ID to null)
    // Otherwise, set the clicked item's ID as the active one
    setActiveBenefitId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-12 bg-primary"> {/* Adjusted padding */}
      <h1 className="text-3xl font-bold mb-10 text-center text-white"> {/* Centered title */}
        What do you get from <img
          src="/logo.png"
          alt="Sharkathon"
          className="h-10 sm:h-14 inline-block align-text-bottom mx-1" /* Adjusted size/margin */
        />?
      </h1>

      <div className="flex flex-wrap lg:flex-nowrap -mx-4"> {/* Use flex-nowrap on large screens */}

        {/* Left Column: Benefits List */}
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0"> {/* Added padding */}
          <div className="space-y-3"> {/* Adjusted spacing */}
            {benefits.map((benefit) => {
              const isActive = activeBenefitId === benefit.id;
              return (
                <div
                  key={benefit.id}
                  className="border border-secondary/20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out bg-primary-dark hover:border-secondary/50" // Added bg, border, hover
                  onClick={() => handleToggleBenefit(benefit.id)}
                  aria-expanded={isActive} // Accessibility
                  aria-controls={`benefit-desc-${benefit.id}`} // Accessibility
                >
                  {/* Header part (always visible) */}
                  <div className="flex items-center justify-between p-4"> {/* Added padding */}
                    <div className="flex items-center mr-2"> {/* Added margin-right */}
                      <div className="mr-3">{benefit.icon}</div>
                      <h3 className="font-bold text-secondary text-base sm:text-lg">{benefit.title}</h3> {/* Responsive text size */}
                    </div>
                    {/* Optional: Chevron indicator */}
                    <ChevronDown
                      className={`text-secondary flex-shrink-0 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </div>

                  {/* Description part (collapsible) */}
                  <div
                    id={`benefit-desc-${benefit.id}`} // Accessibility
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isActive
                        ? 'max-h-40 opacity-100' // Set max-height to allow transition
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Added padding only when open */}
                    <p className={`text-white px-4 pb-4 pl-14 text-sm sm:text-base ${isActive ? 'pt-0' : ''}`}> {/* Adjust padding */}
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 px-4"> {/* Added padding */}
          {/* Sticky container for large screens if desired */}
          {/* <div className="sticky top-24"> */}
           <div className="rounded-lg overflow-hidden h-full max-h-[500px] lg:max-h-full"> {/* Constrained height on mobile */}
            <img
              src="/benefits.jpg" // Make sure this path is correct
              alt="Students participating in a Sharkathon-like event" // More descriptive alt text
              className="w-full h-full object-cover rounded-lg"
            />
           </div>
          {/* </div> */}
        </div>

      </div>
    </div>
  );
}