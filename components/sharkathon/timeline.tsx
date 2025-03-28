import { Card, CardContent } from "@/components/ui/card"

export default function SharkathonTimeline() {
  const timelineSteps = [
    {
      icon: "📌",
      title: "Register & Secure Your Spot",
      description: "Submit your application with essential details to secure your spot.",
    },
    {
      icon: "📖",
      title: "Access Study Resources & Prepare",
      description:
        "Access comprehensive learning resources covering investment principles, data analysis, and strategic evaluation to prepare for the competition.",
    },
    {
      icon: "🖥",
      title: "Online Assessment",
      description:
        "Take a proctored multiple-choice test to evaluate your business logic, problem-solving skills, and strategic thinking.",
    },
    {
      icon: "🎯",
      title: "Case Study Challenge & Mentorship",
      description:
        "Analyse real business case studies, assess data, and present strategic recommendations, while receiving mentorship from industry professionals to refine your evaluation skills.",
    },
    {
      icon: "🔍",
      title: "The Final Pitch - Live Investor Panel",
      description:
        "Step into the role of investors and evaluate live business pitches from real entrepreneurs, engaging in high-stakes decision-making and justify your investment rationale in front of a panel of experienced VCs, startup founders, and business leaders.",
    },
    {
      icon: "🏆",
      title: "Finals",
      description:
        "The top contenders step into the shoes of real investors, assessing business pitches, making strategic decisions, and communicating their rationale for investment in a concise and precise way.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/20"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                <span className="text-lg">{step.icon}</span>
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

