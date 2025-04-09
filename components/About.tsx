import React from "react";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types
import { TinaMarkdown } from "tinacms/dist/rich-text"; // Import TinaMarkdown

/**
 * Type for the props expected by About
 */
interface AboutProps {
  content: PageQuery["page"]; // Expects the about page data object
}

const About: React.FC<AboutProps> = ({ content }) => {
  // Check if content is loaded
  if (!content) {
    return null; // Or a loading placeholder
  }

  // Structure features data for mapping
  const features = [
    { title: content.feature1Title, description: content.feature1Text },
    { title: content.feature2Title, description: content.feature2Text },
    { title: content.feature3Title, description: content.feature3Text },
  ].filter((f) => f.title && f.description); // Filter out any potentially empty features

  return (
    <section id="about" className="section bg-white relative py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle={content.ourStorySectionLabel || "Our Story"} // Dynamic subtitle
          title={content.ourStoryTitle || "From Catering to Community Favorite"} // Dynamic title
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6 animate-fade-in prose prose-lg prose-gray max-w-none">
            {/* Dynamic Rich Text Content for Our Story */}
            {content.ourStoryContent && (
              <TinaMarkdown content={content.ourStoryContent} />
            )}

            {/* Dynamic Philosophy Section */}
            <div className="pt-4 mt-8 border-t border-gray-100">
              <h3 className="text-2xl font-display font-semibold text-cochi-red mb-4">
                {content.philosophyTitle}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 not-prose">
                {content.philosophyContent}
              </p>
            </div>
          </div>

          <div className="relative h-full min-h-[450px] overflow-hidden rounded-xl shadow-2xl transform hover:scale-[1.01] transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-cochi-red/20 to-cochi-gold/10"></div>

            {/* Assuming static image for now */}
            <img
              src="images/family.png"
              alt={content.foundersNames || "Manny and Gabby Vasquez"}
              className="w-full h-full object-cover object-center"
            />

            {/* Dynamic Image Caption */}
            <div className="image-caption-overlay absolute bottom-0 left-0 right-0 pb-4 px-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="font-display text-xl text-white mb-0">
                {content.foundersNames}
              </p>
              <p className="text-sm text-cochi-gold -mt-1">
                {content.foundersTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Features Section */}
        {features.length > 0 && (
          <div className="mt-20 pt-8 border-t border-gray-100">
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
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
