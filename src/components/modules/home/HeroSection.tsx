// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// Image variable for the full-screen background
import heroSection from "@/assets/heroSection.jpg";
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    // 1. Full-screen section with relative positioning
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 2. Absolute positioned Background Image */}
      <img
        src={heroSection}
        alt="Ride Management System Hero Image"
        // Ensure image covers the entire section
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 3. Dark Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* 4. Content Container (relative z-index to stay on top) */}
      <div className="relative z-10 mxw px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
              Ride With
              <span className="text-yellow-400 block sm:inline">
                {" "}
                Confidence
              </span>
              & Comfort
            </h1>
            <p className="sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Book your ride in seconds. Experience premium transportation
              services with verified drivers and real-time tracking.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                onClick={() => navigate("/rider/book-ride")}
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-base sm:w-auto transition duration-300 shadow-xl hover:shadow-2xl"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/about")}
                variant="outline"
                className="duration-300 transition border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-base sm:w-auto bg-transparent backdrop-blur-sm"
              >
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform rotate-180" />
                About us
              </Button>
            </div>
          </div>

          {/* Stats Section - Moved under the main text block */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-16 text-sm text-white">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                10K+
              </div>
              <div className="text-gray-200 text-xs sm:text-sm">
                Happy Riders
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                500+
              </div>
              <div className="text-gray-200 text-xs sm:text-sm">
                Verified Drivers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                50+
              </div>
              <div className="text-gray-200 text-xs sm:text-sm">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
