// components/ServiceHighlights.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, DollarSign, Users } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All drivers are verified with background checks and real-time ride tracking"
  },
  {
    icon: Clock,
    title: "Quick Pickup",
    description: "Average pickup time under 5 minutes in most urban areas"
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Competitive pricing with no surprise charges. Upfront fare estimates"
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Round-the-clock customer support for any help you need"
  }
];

export function ServiceHighlights() {
  return (
    <section className="py-20 bg-background">
      <div className="mxw">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing you with the best riding experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg bg-card hover:shadow-xl transition-all group hover:bg-primary/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 group-hover:bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}