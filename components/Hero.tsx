import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types

/**
 * Type for the props expected by Hero
 */
interface HeroProps {
  content: PageQuery["page"]; // Expects the page data object
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Background images
  const backgrounds = [
    "/images/hero/hero-01.png",
    "/images/hero/hero-02.png",
    "/images/hero/hero-03.png",
    "/images/hero/hero-04.png",
    "/images/hero/hero-05.png",
    "/images/hero/hero-06.png",
  ];

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Ensure content is available before trying to access its properties
  if (!content) {
    return null; // Or a loading/placeholder component
  }

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Fixed-height container that accounts for navbar */}
      <div className="h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        {/* Background images */}
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${bg})` }}
            aria-hidden="true"
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-cochi-red/60"
          aria-hidden="true"
        />

        {/* Content wrapper - centers content vertically */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Content block with animations */}
            <div
              className={cn(
                "max-w-2xl transform transition-all duration-1000 ease-out",
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              )}
            >
              {/* Static Title - Assuming this doesn't change via CMS for now */}
              <h1 className="text-white font-display text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 text-shadow flex items-center gap-2 sm:gap-3 leading-tight">
                <img
                  src="/images/cochis_kitchen_logomark.svg"
                  alt="Cochi's Kitchen logomark"
                  className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                />
                Cochi's Kitchen
              </h1>

              {/* Dynamic Tagline from TinaCMS */}
              <h2 className="text-white text-2xl sm:text-2xl md:text-3xl font-light mb-5 sm:mb-6 text-shadow-sm leading-snug sm:leading-relaxed">
                {/* Split tagline for potential styling (keeping existing split logic) */}
                {content.headerTagline?.split("in Morgan Hill")[0]}
                {content.headerTagline?.includes("in Morgan Hill") && (
                  <>
                    in{" "}
                    <span className="text-cochi-gold font-medium">
                      Morgan Hill
                    </span>
                  </>
                )}
              </h2>

              {/* Call to action buttons */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 transform transition-all duration-1000 delay-500 ease-out",
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                )}
              >
                <a
                  href="#menu"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-3.5 rounded-md shadow-lg w-fit text-lg sm:text-base font-medium transition-all duration-300 hover:shadow-xl"
                >
                  {content.menuButtonText} {/* Dynamic Button Text */}
                </a>
                <a
                  href="#location"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-md hover:bg-white/20 transition-all duration-300 shadow-lg w-fit text-lg sm:text-base font-medium"
                >
                  {content.findUsButtonText} {/* Dynamic Button Text */}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - fixed at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a
            href="#menu"
            aria-label="Scroll down"
            className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-cochi-red/40 hover:bg-cochi-red/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
          >
            <ArrowDown className="text-white w-6 h-6 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
