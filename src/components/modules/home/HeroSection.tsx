// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroSection from "@/assets/heroSection.jpg";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-[oklch(0.65_0.15_250)] text-primary-foreground py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mxw sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-tight">
              Ride With
              <span className="text-background block sm:inline"> Confidence</span>&
              Comfort
            </h1>
            <p className="sm:text-lg md:text-xl text-foreground max-w-lg leading-relaxed">
              Book your ride in seconds. Experience premium transportation
              services with verified drivers and real-time tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted font-semibold w-full sm:w-auto"
              >
                Book Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="duration-100 transition border-background hover:bg-background hover:text-foreground text-muted-foreground w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 text-sm">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">10K+</div>
                <div className="text-foreground text-xs sm:text-sm">
                  Happy Riders
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">500+</div>
                <div className="text-foreground text-xs sm:text-sm">
                  Verified Drivers
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">50+</div>
                <div className="text-foreground text-xs sm:text-sm">
                  Cities
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <img
              src={heroSection}
              alt="Ride Management System Hero Image"
              className="w-full h-auto max-w-md mx-auto lg:max-w-none rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
