"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How can I register for the Sharkathon competition?",
    answer:
      "You can register for Sharkathon through our dedicated competition page. Click on the 'Sharkathon' link in the navigation menu and follow the registration instructions. Make sure to check the eligibility criteria before registering.",
  },
  {
    question: "What educational programs does Veriseek offer?",
    answer:
      "Veriseek Education offers a variety of educational initiatives focused on bridging academic learning with real-world skills. Our flagship program is the Sharkathon competition, but we also offer workshops on entrepreneurship, financial literacy, business skills, and more.",
  },
  {
    question: "Is Veriseek Education affiliated with Shark Tank?",
    answer:
      "While our Sharkathon competition follows a similar format to Shark Tank and may feature judges who have appeared on the show, Veriseek Education is an independent educational platform. The Sharkathon is our unique program designed to give students real-world entrepreneurial experience.",
  },
  {
    question: "Can schools partner with Veriseek Education?",
    answer:
      "Yes! We actively seek partnerships with schools and educational institutions. We can bring our programs directly to your students or create customized educational experiences. Please contact us through the form on this page to discuss partnership opportunities.",
  },
  {
    question: "How can I stay updated on Veriseek's upcoming events?",
    answer:
      "The best way to stay informed about our upcoming events, workshops, and competition deadlines is to sign up for our newsletter. You can also follow us on social media for regular updates and announcements.",
  },
]

export function FAQSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-[#011C41]">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-[#011C41]">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-gray-600">Don't see your question here? Contact us directly and we'll be happy to help.</p>
      </div>
    </div>
  )
}

