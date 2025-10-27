// components/CTASection.tsx
import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";
import { useNavigate } from "react-router";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-accent to-[oklch(0.70_0.12_145)] text-accent-foreground">
      <div className="mxw">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg">
              Download our app now and get 50% off on your first ride. Limited
              time offer!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="border-background text-foreground hover:bg-background hover:text-foreground"
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Smartphone className="h-5 w-5" />
              <span>Available on iOS and Android</span>
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-background/20 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Ride Management App Preview - Mobile app interface showing booking and tracking features"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
