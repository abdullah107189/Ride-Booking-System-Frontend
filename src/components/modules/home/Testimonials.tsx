// components/Testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Regular Rider",
    content: "The best ride booking app I've used! Drivers are always professional and vehicles are clean.",
    rating: 5
  },
  {
    name: "Raj Sharma",
    role: "Business Traveler",
    content: "Perfect for my business trips. Reliable service and great customer support.",
    rating: 5
  },
  {
    name: "Fatima Begum",
    role: "Student",
    content: "Affordable prices and quick service. Love the real-time tracking feature!",
    rating: 4
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted">
      <div className="mxw">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-accent fill-accent" : "text-muted"
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}