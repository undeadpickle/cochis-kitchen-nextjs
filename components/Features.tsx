import React from "react";
// Import the specific page type from generated Tina types
import type { PageQuery } from "@tina/types";
import { cn } from "@/lib/utils"; // Import utility
import { Check } from "lucide-react"; // Import icon
import SectionTitle from "./SectionTitle"; // Import SectionTitle

// Define props type using the specific type for page data
interface FeaturesProps {
  // Use PageQuery['page'] which represents the structure of the page object
  // Use '|' null to indicate that content might be null initially
  content: PageQuery["page"] | null;
}

const Features: React.FC<FeaturesProps> = ({ content }) => {
  if (!content) {
    return null; // Don't render if no content
  }

  // Structure features data for mapping (copied from About.tsx)
  // Ensure field names match those in features.md / tina/config.ts
  const features = [
    { title: content.feature1Title, description: content.feature1Text },
    { title: content.feature2Title, description: content.feature2Text },
    { title: content.feature3Title, description: content.feature3Text },
  ].filter((f) => f.title && f.description); // Filter out empty features

  // Use the rendering logic copied from About.tsx
  return (
    <section
      id="features"
      className="section bg-gradient-to-b from-gray-50 to-white py-20"
    >
      <div className="container mx-auto px-4">
        {/* Add a section title - Use static text or make editable later */}
        <SectionTitle subtitle="Why Choose Us?" title="Fresh & Flavorful" />

        {/* Render features if they exist */}
        {features.length > 0 && (
          <div className="mt-16">
            {" "}
            {/* Adjusted margin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-8 rounded-xl hover-lift group",
                    "bg-gradient-to-br from-white to-gray-50",
                    "border border-gray-100 shadow-md hover:shadow-xl",
                    "transform transition-all duration-500 ease-out"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-cochi-red/10 flex items-center justify-center mr-3 group-hover:bg-cochi-red group-hover:text-white transition-all duration-300">
                      <Check
                        size={18}
                        className="text-cochi-red group-hover:text-white"
                      />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-cochi-red">
                      {item.title} {/* Use title from mapped item */}
                    </h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>{" "}
                  {/* Use description from mapped item */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
