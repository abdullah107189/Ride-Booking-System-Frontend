// components/Promotions.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, Car, Zap } from "lucide-react";

const promotions = [
  {
    icon: Gift,
    title: "First Ride Free",
    description: "Get your first ride completely free up to 100 BDT",
    code: "WELCOME100",
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    icon: Car,
    title: "Weekend Special",
    description: "50% off on all rides during weekends",
    code: "WEEKEND50",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    icon: Zap,
    title: "Flash Sale",
    description: "Limited time 30% off on all premium rides",
    code: "FLASH30",
    color: "bg-chart-3/10 text-chart-3",
  },
];

export function Promotions() {
  return (
    <section className="py-20 bg-background">
      <div className="mxw">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Special Offers & Promotions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these exclusive deals and save big on your rides
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {promotions.map((promo, index) => (
            <Card
              key={index}
              className="border-2 border-dashed border-muted-foreground/30 hover:shadow-xl transition-all"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 ${promo.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <promo.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {promo.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {promo.description}
                </p>
                <div className="bg-muted px-4 py-2 rounded-lg font-mono text-sm">
                  Use code:{" "}
                  <span className="font-bold text-accent">{promo.code}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
