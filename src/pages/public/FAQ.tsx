// components/faq/FAQSection.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  FileText,
  CreditCard,
  Car,
  User,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      icon: HelpCircle,
      title: "General Questions",
      questions: [
        {
          question: "What is RideShare?",
          answer:
            "RideShare is a ride-hailing platform that connects riders with verified drivers for safe, reliable, and affordable transportation across Bangladesh.",
        },
        {
          question: "Which cities do you operate in?",
          answer:
            "We currently operate in Dhaka, Chittagong, Sylhet, Rajshahi, and Khulna. We're expanding to more cities soon!",
        },
        {
          question: "Is RideShare available 24/7?",
          answer:
            "Yes! You can book rides 24 hours a day, 7 days a week. However, availability may vary based on location and time.",
        },
      ],
    },
    {
      icon: User,
      title: "For Riders",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Download our app from Google Play or App Store, then sign up with your phone number and email. Verification takes less than 2 minutes.",
        },
        {
          question: "How do I book a ride?",
          answer:
            "Open the app, enter your destination, choose your vehicle type, confirm pickup location, and tap 'Book Ride'. It's that simple!",
        },
        {
          question: "Can I schedule rides in advance?",
          answer:
            "Yes! You can schedule rides up to 7 days in advance. Perfect for airport trips, meetings, or special occasions.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept cash, credit/debit cards, mobile banking (bKash, Nagad), and in-app wallet payments.",
        },
      ],
    },
    {
      icon: Car,
      title: "For Drivers",
      questions: [
        {
          question: "How do I become a RideShare driver?",
          answer:
            "Download the Driver app, complete the registration, submit required documents, pass our verification process, and attend orientation.",
        },
        {
          question: "What documents do I need?",
          answer:
            "You'll need valid driver's license, vehicle registration, tax identification, and insurance documents.",
        },
        {
          question: "How much can I earn?",
          answer:
            "Our drivers typically earn 25,000-60,000 BDT per month depending on hours worked and location. Top drivers earn even more!",
        },
        {
          question: "Is there any vehicle requirement?",
          answer:
            "Yes, vehicles must be 2015 or newer, well-maintained, and pass our safety inspection. Specific requirements vary by vehicle type.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Payments & Pricing",
      questions: [
        {
          question: "How is the fare calculated?",
          answer:
            "Fares are based on distance, time, vehicle type, and demand. You'll see the estimated fare before confirming your ride.",
        },
        {
          question: "Are there any hidden charges?",
          answer:
            "No hidden charges! The price you see before booking is what you pay. Any tolls or parking fees are clearly displayed.",
        },
        {
          question: "What is your cancellation policy?",
          answer:
            "You can cancel free of charge within 2 minutes of booking. After that, a small cancellation fee may apply depending on the situation.",
        },
        {
          question: "How do I get a refund?",
          answer:
            "Contact our support team within 24 hours of the ride. Refunds are processed within 3-5 business days to your original payment method.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Safety & Support",
      questions: [
        {
          question: "How do you ensure rider safety?",
          answer:
            "All drivers are verified with background checks, vehicles are inspected regularly, and we offer real-time ride tracking and emergency assistance.",
        },
        {
          question: "What if I left something in the vehicle?",
          answer:
            "Use the 'Lost Item' feature in the app or contact support immediately. We'll connect you with the driver to retrieve your item.",
        },
        {
          question: "How can I report an issue?",
          answer:
            "You can report issues through the app's help section, call our support line, or email us at support@rideshare.com",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Yes! We use bank-level encryption and never share your data with third parties without your consent. Your privacy is our priority.",
        },
      ],
    },
  ];

  // Filter questions based on search
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <section className="py-20 bg-background">
      <div className="mxw">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find quick answers to common questions about RideShare
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Found{" "}
                {filteredCategories.reduce(
                  (acc, cat) => acc + cat.questions.length,
                  0
                )}{" "}
                results for "{searchQuery}"
              </p>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="border border-border rounded-lg px-4 hover:bg-muted/50 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact our support team
                </a>
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please chat with our
              friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="tel:+8801771-542594">Message Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
