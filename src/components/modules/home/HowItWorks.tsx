// components/HowItWorks.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Car, CreditCard, Star } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Set Your Location",
    description: "Enter your pickup and drop-off locations with our smart address detection"
  },
  {
    icon: Car,
    title: "Choose Your Ride",
    description: "Select from various vehicle types that suit your needs and budget"
  },
  {
    icon: CreditCard,
    title: "Pay Securely",
    description: "Multiple payment options including cash, card, and mobile payments"
  },
  {
    icon: Star,
    title: "Rate Your Experience",
    description: "Share your feedback to help us improve our services"
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting your ride is as easy as 1-2-3. Follow these simple steps to book your journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-card hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}