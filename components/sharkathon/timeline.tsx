<<<<<<< HEAD
import { Card, CardContent } from "@/components/ui/card";
import { 
  FaRegFileAlt, 
  FaBook, 
  FaLaptop, 
  FaUsers, 
  FaSearch,
  FaTrophy 
} from "react-icons/fa";

export default function SharkathonTimeline() {
  // A lighter navy blue color
=======
import { FaRegFileAlt, FaBook, FaLaptop, FaUsers, FaSearch } from "react-icons/fa";

export default function SharkathonTimeline() {
>>>>>>> design-change-apr25
  const lighterNavyBlue = "#0a2a5e";

  const timelineSteps = [
    {
      icon: <FaRegFileAlt className="text-white text-2xl" />,
      title: "Step 1: Register & Secure Your Spot",
      description: "Submit your application with essential details to secure your spot."
    },
    {
      icon: <FaBook className="text-white text-2xl" />,
      title: "Step 2: Access Study Resources & Prepare",
<<<<<<< HEAD
      description: "Access comprehensive learning resources covering investment principles, data analysis, and strategic evaluation to prepare for the competition."
=======
      description: "Use our curated materials to prepare for the upcoming competition."
>>>>>>> design-change-apr25
    },
    {
      icon: <FaLaptop className="text-white text-2xl" />,
      title: "Step 3: Online Assessment",
<<<<<<< HEAD
      description: "Take a proctored multiple-choice test to evaluate your business logic, problemsolving skills, and strategic thinking."
=======
      description: "Test your logic, problem-solving, and strategic thinking online."
>>>>>>> design-change-apr25
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Step 4: Case Study Challenge & Mentorship",
<<<<<<< HEAD
      description: "Analyse real business case studies, assess data, and present strategic recommendations, while receiving mentorship from industry professionals to refine your evaluation skills."
=======
      description: "Solve real-world business cases and get expert guidance throughout."
>>>>>>> design-change-apr25
    },
    {
      icon: <FaSearch className="text-white text-2xl" />,
      title: "Step 5: The Final Pitch - Live Investor Panel",
<<<<<<< HEAD
      description: "Step into the role of investors and evaluate live business pitches from real entrepreneurs, engaging in high-stakes decision-making and justify your investment rationale in front of a panel of experienced VCs, startup founders, and business leaders."
    },
    {
      icon: <FaTrophy className="text-white text-2xl" />,
      title: "Step 6: Finals",
      description: "The top contenders step into the shoes of real investors, assessing business pitches, making strategic decisions, and communicating their rationale for investment in a concise and precise way."
=======
      description: "Act as investors, evaluate pitches, and present your decisions live."
>>>>>>> design-change-apr25
    }
  ];

  return (
<<<<<<< HEAD
    <div className="max-w-full mx-auto py-16 px-8">
      {/* Horizontal Timeline for Desktop */}
      <div className="relative hidden md:block">
        {/* Timeline Line */}
        <div className="absolute top-12 left-0 right-0 h-2" style={{ backgroundColor: `${lighterNavyBlue}30` }}></div>
        
        <div className="flex justify-between items-start">
          {timelineSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center px-6" style={{ width: "16%" }}>
              {/* Step Icon */}
              <div className="p-4 rounded-full border-2 flex items-center justify-center w-20 h-20 z-10" 
                   style={{ backgroundColor: lighterNavyBlue, borderColor: lighterNavyBlue }}>
                {step.icon}
              </div>
              
              {/* Step Details */}
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium mb-2" style={{ color: lighterNavyBlue }}>{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
=======
    <div className="max-w-7xl mx-auto py-20 px-6">
      {/* Desktop Timeline */}
      <div className="hidden md:block relative">
        {/* Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-opacity-20" style={{ backgroundColor: lighterNavyBlue }}></div>

        <div className="flex justify-between items-start">
          {timelineSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-left px-4 w-1/5">
              {/* Icon */}
              <div
                className="p-4 rounded-full border-4 shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: lighterNavyBlue, borderColor: lighterNavyBlue }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-bold text-[#0a2a5e] leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
>>>>>>> design-change-apr25
            </div>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* Vertical Timeline for Mobile */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-2" style={{ backgroundColor: `${lighterNavyBlue}30` }}></div>
          
          <div className="space-y-16">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                {/* Step Icon */}
                <div className="p-3 rounded-full border-2 flex items-center justify-center w-16 h-16 z-10 mr-6"
                     style={{ backgroundColor: lighterNavyBlue, borderColor: lighterNavyBlue }}>
                  {step.icon}
                </div>
                
                {/* Step Details */}
                <div className="pt-2">
                  <h3 className="text-base font-medium mb-3" style={{ color: lighterNavyBlue }}>{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
=======
      {/* Mobile Timeline */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-[#0a2a5e30]"></div>

          <div className="space-y-14">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                {/* Icon */}
                <div
                  className="p-3 rounded-full border-4 shadow-lg mr-6"
                  style={{ backgroundColor: lighterNavyBlue, borderColor: lighterNavyBlue }}
                >
                  {step.icon}
                </div>

                {/* Details */}
                <div className="pt-1">
                  <h3 className="text-base font-bold text-[#0a2a5e] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed pr-2">
                    {step.description}
                  </p>
>>>>>>> design-change-apr25
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> design-change-apr25
