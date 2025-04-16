"use client"

import React, { useState } from 'react';
import { Brain, TrendingUp, MessageSquare, Users, GraduationCap, FileText, BriefcaseBusiness } from 'lucide-react';

export default function SharkathonBenefits() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const benefits = [
    {
      id: 1,
      icon: <FileText className="text-secondary" size={24} />,
      title: "Certification & Letter of Recommendation",
      description: "Earn a prestigious certificate and LOR that proves your investor mindset."
    },
    {
      id: 2,
      icon: <GraduationCap className="text-secondary" size={24} />,
      title: "College & Career Readiness",
      description: "Boost your profile with real business experience that stands out on applications."
    },
    {
      id: 3,
      icon: <Users className="text-secondary" size={24} />,
      title: "Mentorship & Internship Opportunities",
      description: "Get guided by top investors and unlock exclusive industry internships"
    },
    {
      id: 4,
      icon: <BriefcaseBusiness className="text-secondary" size={24} />,
      title: "Real-World Business Simulation",
      description: "Take part in high-stakes challenges that mirror actual startup investment rounds."
    },
    {
      id: 5,
      icon: <Brain className="text-secondary" size={24} />,
      title: "Critical Thinking & Strategic Decision-Making",
      description: "Learn to solve complex problems and make bold decisions like future CEOs and investors."
    },
    {
      id: 6,
      icon: <TrendingUp className="text-secondary" size={24} />,
      title: "Business & Investment Skills",
      description: "Master how to evaluate startups, read numbers, and think like a real-world shark."
    },
    {
      id: 7,
      icon: <MessageSquare className="text-secondary" size={24} />,
      title: "Effective Communication",
      description: "Build the confidence to ask sharp questions and communicate your decision with clarity."
    }
  ];

  return (
    <div className="w-full mx-auto px-6 py-12 bg-primary">
      <h1 className="text-3xl font-bold mb-10 text-white">What do you get from <img 
    src="/logo.png" 
    alt="Sharkathon" 
    className="h-14 inline-block align-text-bottom"
  /></h1>
      
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 pr-4 mb-12 lg:mb-0 lg:pr-16">
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="h-16 bg-transparent transition-all duration-300 overflow-hidden group"
                onMouseEnter={() => setHoveredBenefit(benefit.id)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className="h-full flex flex-col justify-center">
                  <div className="flex items-center">
                    <div className="mr-3">{benefit.icon}</div>
                    <h3 className="font-bold text-secondary">{benefit.title}</h3>
                  </div>
                  
                  <div 
                    className={`text-white transition-opacity duration-300 pl-9 ${
                      hoveredBenefit === benefit.id 
                        ? "opacity-100" 
                        : "opacity-0 absolute"
                    }`}
                  >
                    {benefit.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="rounded-lg overflow-hidden h-full">
            <img 
              src="/benefits.jpg" 
              alt="Sharkathon event" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}