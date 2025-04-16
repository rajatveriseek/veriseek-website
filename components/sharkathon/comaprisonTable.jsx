import React from 'react';
import { Star, DollarSign, Briefcase, BookOpen, Award, Users } from 'lucide-react';

export default function SharkathonComparison() {
  const features = [
    {
      id: 1,
      icon: <BookOpen className="text-blue-600" size={20} />,
      name: "Skills Developed",
      sharkathon: {
        text: "Critical Thinking, Problem-Solving, Decision-Making, Startup Investing Skills, Communication",
        highlight: true
      },
      mun: {
        text: "Public Speaking, Diplomacy, Research",
        highlight: false
      },
      olympiads: {
        text: "Subject-Specific Theoretical Knowledge (Maths, Science, etc.)",
        highlight: false
      }
    },
    {
      id: 2,
      icon: <Briefcase className="text-blue-600" size={20} />,
      name: "Real-World Application",
      sharkathon: {
        text: "Prepares you for being an investor, a Consultant, or a CXO",
        highlight: true
      },
      mun: {
        text: "Simulated international relations and debate on global issues",
        highlight: false
      },
      olympiads: {
        text: "Tests conceptual knowledge but lacks real-world application",
        highlight: false
      }
    },
    {
      id: 3,
      icon: <Users className="text-blue-600" size={20} />,
      name: "Industry Exposure",
      sharkathon: {
        text: "Direct mentorship from investors, venture capitalists, and startup founders",
        highlight: true
      },
      mun: {
        text: "Prepares you for being a debater/diplomat",
        highlight: false
      },
      olympiads: {
        text: "No direct industry involvement, primarily academic evaluations",
        highlight: false
      }
    },
    {
      id: 4,
      icon: <BookOpen className="text-blue-600" size={20} />,
      name: "Learning Resources",
      sharkathon: {
        text: "Structured learning materials, including case studies, financial models, real-world business scenarios, and mentorship resources",
        highlight: true
      },
      mun: {
        text: "Relies on self-research, delegate guides, and global issue briefs",
        highlight: false
      },
      olympiads: {
        text: "Offer subject-based problem sets that test theoretical concepts",
        highlight: false
      }
    },
    {
      id: 5,
      icon: <Award className="text-blue-600" size={20} />,
      name: "Recognition & Value",
      sharkathon: {
        text: "Judged by industry leaders, valuable for CVs and college applications",
        highlight: true
      },
      mun: {
        text: "Recognition among debating circles",
        highlight: false
      },
      olympiads: {
        text: "Prestigious for academic excellence but limited direct industry impact",
        highlight: false
      }
    },
    {
      id: 6,
      icon: <DollarSign className="text-blue-600" size={20} />,
      name: "Cost & Accessibility",
      sharkathon: {
        text: "Fraction of the cost of international MUNs and Olympiads, making it more accessible",
        highlight: true
      },
      mun: {
        text: "Expensive for high-level MUNs (e.g., Yale MUN)",
        highlight: false
      },
      olympiads: {
        text: "High costs for training, travel, and participation",
        highlight: false
      }
    }
  ];

  return (
    <div className="w-full py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">How Does <img 
    src="/logo.png" 
    alt="Sharkathon" 
    className="h-10 inline-block align-text-bottom"
  /> Compare?</h1>
        
        <p className="text-center text-lg mb-12">
          Sharkathon is not just another competition, it's a <span className="font-semibold text-blue-700">high-impact learning experience</span> designed to equip students with <span className="font-semibold">real-world business and investment skills</span>.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-gray-100 border-b-2 border-gray-300 text-left w-1/4">Feature</th>
                <th className="p-4 bg-gray-700 text-black border-b-2 border-gray-800 text-center w-1/4">Sharkathon</th>
                <th className="p-4 bg-gray-700 text-black border-b-2 border-gray-800 text-center w-1/4">MUN</th>
                <th className="p-4 bg-gray-700 text-black border-b-2 border-gray-800 text-center w-1/4">Olympiads</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      {feature.icon}
                      <span className="ml-2 font-medium">{feature.name}</span>
                    </div>
                  </td>
                  <td className={`p-4 border-b border-gray-200 ${feature.sharkathon.highlight ? "bg-blue-50" : ""}`}>
                    <div className="text-sm">{feature.sharkathon.text}</div>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className="text-sm">{feature.mun.text}</div>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className="text-sm">{feature.olympiads.text}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}