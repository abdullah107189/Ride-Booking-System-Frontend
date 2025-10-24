"use client";

import {
  Car,
  MapPin,
  DollarSign,
  Shield,
  Users,
  Briefcase,
  BarChart,
  Settings,
  Gavel,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureData = {
  rider: [
    {
      icon: Car,
      title: "Real-Time Booking",
      description:
        "Instantly find and book the nearest available car or bike with just a few taps.",
    },
    {
      icon: MapPin,
      title: "Live GPS Tracking",
      description:
        "Track your driver's arrival and monitor your trip progress on the map in real-time.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "Get upfront fare estimates and choose from multiple payment options (Cash, Card, MFS).",
    },
    {
      icon: Shield,
      title: "In-App Safety",
      description:
        "Access SOS button, share your live location with trusted contacts, and review driver details.",
    },
  ],
  driver: [
    {
      icon: Briefcase,
      title: "Flexible Earnings",
      description:
        "Drive when you want, where you want. No fixed hours, complete freedom to earn.",
    },
    {
      icon: DollarSign,
      title: "Instant Payouts",
      description:
        "View your daily earnings summary and request timely payouts directly to your account.",
    },
    {
      icon: Settings,
      title: "Optimized Routing",
      description:
        "In-app navigation and smart matching ensures minimal idle time and efficient trips.",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description:
        "Dedicated support team available round the clock to help you with any issue or query.",
    },
  ],
  admin: [
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description:
        "Monitor key metrics like ride volume, user engagement, and revenue in real-time dashboards.",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Efficiently manage and verify Rider & Driver accounts, ensuring platform quality and security.",
    },
    {
      icon: Gavel,
      title: "Dispute & Compliance",
      description:
        "Resolve trip issues, manage disputes, and ensure full compliance with regulatory standards.",
    },
    {
      icon: Settings,
      title: "Dynamic Pricing",
      description:
        "Control pricing, implement surge rules, and roll out promotional offers instantly across regions.",
    },
  ],
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-border/50">
    <CardHeader className="flex flex-row items-center space-x-4 p-4 md:p-6">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="text-lg font-semibold text-foreground/90">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0 md:px-6 md:pb-6">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function FeaturesPage() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mxw">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-3">
            Core Platform Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Powerful Features for Everyone
          </h1>
          <p className="text-lg text-muted-foreground">
            Our platform is designed to provide a seamless, safe, and efficient
            experience for riders, drivers, and administrators alike.
          </p>
        </div>

        {/* Features Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="rider" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full grid-cols-3 max-w-lg bg-secondary">
                <TabsTrigger
                  value="rider"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
                >
                  Rider
                </TabsTrigger>
                <TabsTrigger
                  value="driver"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
                >
                  Driver
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
                >
                  Admin
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Rider Features */}
            <TabsContent value="rider">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Seamless Journeys, Total Control
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureData.rider.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </TabsContent>

            {/* Driver Features */}
            <TabsContent value="driver">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Drive Smart, Earn More
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureData.driver.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </TabsContent>

            {/* Admin Features */}
            <TabsContent value="admin">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Full Control, Scalable Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureData.admin.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* General Feature Summary (Optional CTA) */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-primary mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're looking for a ride, a flexible job, or a robust
            platform to manage, RideShare has the tools you need.
          </p>
          {/* এখানে আপনি একটি বাটন বা লিংক যোগ করতে পারেন */}
          {/* <Button size="lg">Get Started Today</Button> */}
        </div>
      </div>
    </section>
  );
}
