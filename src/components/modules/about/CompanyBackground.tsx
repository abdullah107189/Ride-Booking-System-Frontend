// components/about/CompanyBackground.tsx
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Custom hook for scroll-based fill animation
const useTimelineFill = () => {
  const [fillHeight, setFillHeight] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight * 0.8;

      // Calculate progress (0 to 1)
      const progress = Math.min(
        Math.max((scrollPosition - sectionTop) / sectionHeight, 0),
        1
      );

      setFillHeight(progress * 100); // Convert to percentage
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { fillHeight, sectionRef };
};

export function CompanyBackground() {
  const { fillHeight, sectionRef } = useTimelineFill();
  const [activeIndex, setActiveIndex] = useState(-1);

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "Started with a vision to transform urban transportation in Bangladesh",
    },
    {
      year: "2021",
      title: "10K Rides",
      description: "Reached milestone of 10,000 completed rides across Dhaka",
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded services to 5 major cities in Bangladesh",
    },
    {
      year: "2023",
      title: "500+ Drivers",
      description: "Onboarded 500+ verified drivers to our platform",
    },
    {
      year: "2024",
      title: "Award Winning",
      description: "Recognized as Best Ride-Sharing App in Bangladesh",
    },
  ];

  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Happy Riders",
    },
    {
      icon: MapPin,
      number: "10+",
      label: "Cities Covered",
    },
    {
      icon: TrendingUp,
      number: "500,000+",
      label: "Rides Completed",
    },
    {
      icon: Award,
      number: "4.8/5",
      label: "Customer Rating",
    },
  ];

  // Update active index based on scroll progress
  useEffect(() => {
    const progressPerItem = 100 / milestones.length;
    const newActiveIndex = Math.min(
      Math.floor(fillHeight / progressPerItem),
      milestones.length - 1
    );
    setActiveIndex(newActiveIndex);
  }, [fillHeight, milestones.length]);

  return (
    <section className="py-20 bg-background">
      <div className="mxw">
        {/* Company Story */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Journey
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              RideShare was born from a simple observation: urban transportation
              in Bangladesh needed to be safer, more reliable, and more
              accessible. Founded in 2020 by a group of passionate
              entrepreneurs, we set out to create a platform that would
              revolutionize how people move around cities.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              What started as a small startup in Dhaka has now grown into one of
              Bangladesh's leading ride-sharing platforms. Our commitment to
              safety, transparency, and customer satisfaction has been the
              driving force behind our rapid growth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Today, we serve thousands of riders daily across multiple cities,
              providing employment opportunities for hundreds of drivers while
              ensuring every journey is comfortable, secure, and affordable.
            </motion.p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <Card className="text-center border-0 shadow-lg bg-card hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div
          id="timeline-section"
          ref={sectionRef}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Milestones
          </motion.h3>

          <div className="relative">
            {/* Background Line (Static) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>

            {/* Animated Fill Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary transition-all duration-100"
              style={{
                height: `${fillHeight}%`,
                background:
                  "linear-gradient(to bottom, var(--primary), var(--accent))",
              }}
            />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`border-0 shadow-lg bg-card transition-all duration-300 ${
                        index <= activeIndex
                          ? "shadow-xl scale-105 border-l-4 border-accent"
                          : "opacity-60"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h4 className="text-xl font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Animated Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className={`w-6 h-6 rounded-full border-4 border-background transition-all duration-300 ${
                      index <= activeIndex
                        ? "bg-accent scale-125 shadow-lg"
                        : "bg-primary/30"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Spacer for the other side */}
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
