'use client'

import { Button } from "@/components/ui/button"
import { ChevronRight, Layout, Calendar, BarChart, ArrowRight } from "lucide-react"
import Link from 'next/link';
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CompanyCarousel from "@/components/company-carousel";

const faqs = [
  {
    question: "What is JiraX?",
    answer: "JiraX is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.",
  },
  {
    question: "How does JiraX compare to other project management tools?",
    answer: "JiraX offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.",
  },
  {
    question: "Is JiraX suitable for small teams?",
    answer: "Absolutely! JiraX is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from JiraX's features.",
  },
  {
    question: "What key features does JiraX offer?",
    answer: "JiraX provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.",
  },
  {
    question: "Can JiraX handle multiple projects simultaneously?",
    answer: "Yes, JiraX is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes JiraX ideal for organizations juggling multiple projects or clients.",
  },
  {
    question: "Is there a learning curve for new users?",
    answer: "While JiraX is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.",
  },
];

const features = [
  {
    title: "Intuitive Kanban Boards",
    description: "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description: "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description: "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <div>
        <section className="container mx-auto py-20 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-cyan-200 pb-6 flex flex-col items-center">
            <span>Build with Precision.</span>
            <span className="flex flex-wrap justify-center gap-3 sm:gap-4 items-center text-purple-300 mt-4">
              Powered by
              <Image
                src="/companies/logo2.png"
                alt="Logo"
                width={400}
                height={80}
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Modern project infrastructure, designed for teams that ship fast and think ahead.
          </p>
          <Link href='/onboarding'>
            <Button size="lg" className="mr-2">
              Get started <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href='#features'>
            <Button size="lg" variant="outline" className="mr-4">
              Learn More
            </Button>
          </Link>
        </section>

        <section id="features" className="bg-gray-900 py-20 px-5">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">Key Features</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-800">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                    <h4 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">
              Trusted by Industry Leaders
            </h3>
            <CompanyCarousel />
          </div>
        </section>

        <section className="bg-gray-900 py-20 px-5">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 text-center px-5">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-cyan-100">
              Ready to Elevate Your Team?
            </h3>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of modern teams using JiraX to simplify planning, track progress, and deliver faster.
            </p>
            <Link href="/onboarding">
              <Button size="lg">
                Start For Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}