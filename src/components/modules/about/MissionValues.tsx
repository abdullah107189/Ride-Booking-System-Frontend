// components/about/MissionValues.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Shield, Users, Zap, Globe } from "lucide-react";

export function MissionValues() {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Every ride is monitored with real-time tracking and driver verification",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "We prioritize rider satisfaction and continuously improve based on feedback",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building trust between riders and drivers for a better experience",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Leveraging technology to create seamless transportation solutions",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making urban mobility affordable and available to everyone",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Striving for the highest standards in service and reliability",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="mxw">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Mission & Values
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              <strong className="text-foreground">Our Mission:</strong> To
              transform urban transportation by providing safe, reliable, and
              affordable mobility solutions that connect communities and empower
              individuals.
            </p>
            <p>
              <strong className="text-foreground">Our Vision:</strong> To become
              Bangladesh's most trusted transportation platform, recognized for
              innovation, safety, and positive social impact.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-card hover:shadow-xl transition-all group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/50  group-hover:bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <value.icon className="h-8 w-8 text-card" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
