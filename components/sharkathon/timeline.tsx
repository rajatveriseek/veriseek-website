import { Card, CardContent } from "@/components/ui/card"

export default function SharkathonTimeline() {
  const timelineSteps = [
    {
      icon: "📌",
      title: "Registration",
      description: "Submit your application with essential details to secure your spot in the competition.",
    },
    {
      icon: "📖",
      title: "Study Material",
      description:
        "Access comprehensive learning resources covering investment principles, financial analysis, and strategic evaluation to prepare for the competition.",
    },
    {
      icon: "🖥",
      title: "Online Test",
      description:
        "Demonstrate your understanding of critical thinking, problem-solving, and financial concepts through a proctored multiple-choice online test.",
    },
    {
      icon: "🎯",
      title: "Mentorship",
      description:
        "Top-performing students receive personalised mentorship from industry professionals, guiding them on how to evaluate businesses and make investment decisions.",
    },
    {
      icon: "🔍",
      title: "Semi-Finals",
      description:
        "Analyse real-world business cases, identify strengths and risks, and present your rationale to a panel of experts.",
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

