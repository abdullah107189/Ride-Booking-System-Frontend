// components/about/TeamProfiles.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function TeamProfiles() {
  const teamMembers = [
    {
      name: "Abdullah Al Mamun",
      role: "CEO & Founder",
      image: "/team/ceo.jpg",
      bio: "Visionary entrepreneur with 10+ years in tech industry. Passionate about solving urban mobility challenges.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ceo@rideshare.com"
      }
    },
    {
      name: "Fatima Begum",
      role: "CTO",
      image: "/team/cto.jpg", 
      bio: "Tech expert specializing in scalable platforms. Leads our engineering team with innovation and precision.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "cto@rideshare.com"
      }
    },
    {
      name: "Raj Sharma",
      role: "Head of Operations",
      image: "/team/operations.jpg",
      bio: "Operations specialist ensuring seamless service delivery across all cities. Focused on driver and rider satisfaction.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "operations@rideshare.com"
      }
    },
    {
      name: "Sarah Islam",
      role: "Marketing Director",
      image: "/team/marketing.jpg",
      bio: "Creative marketer building the RideShare brand. Expert in digital marketing and customer engagement.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marketing@rideshare.com"
      }
    },
    {
      name: "Karim Ahmed",
      role: "Head of Safety",
      image: "/team/safety.jpg",
      bio: "Safety expert implementing rigorous driver verification and ride monitoring protocols.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "safety@rideshare.com"
      }
    },
    {
      name: "Nadia Chowdhury",
      role: "Customer Experience Lead",
      image: "/team/customer.jpg",
      bio: "Dedicated to ensuring every rider has an exceptional experience. Leads our 24/7 support team.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "support@rideshare.com"
      }
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate professionals dedicated to revolutionizing transportation in Bangladesh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg bg-card hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                {/* Profile Image */}
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{member.name}</h3>
                <div className="text-accent font-medium mb-4">{member.role}</div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-[oklch(0.65_0.15_250)] text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Want to Join Our Team?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for innovation and customer service.
              </p>
              <Button size="lg" className="bg-background text-foreground hover:bg-muted">
                View Open Positions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}