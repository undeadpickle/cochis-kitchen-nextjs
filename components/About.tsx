"use client";

import React from "react";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { PageQuery } from "@/tina/__generated__/types"; // Corrected path alias
import { TinaMarkdown } from "tinacms/dist/rich-text"; // Import TinaMarkdown

/**
 * Type for the props expected by About
 */
interface AboutProps {
  content: PageQuery["page"]; // Expects the about page data object
}

const About: React.FC<AboutProps> = ({ content }) => {
  // Check if content and the about section exist
  if (!content?.about) {
    return null; // Or a loading placeholder
  }

  // Access the about data
  const aboutData = content.about;

  // Structure features data for mapping using aboutData - Remove this logic
  // const features = [
  //   { title: aboutData.feature1Title, description: aboutData.feature1Text }, // TODO: Add these fields to schema if needed
  //   { title: aboutData.feature2Title, description: aboutData.feature2Text }, // TODO: Add these fields to schema if needed
  //   { title: aboutData.feature3Title, description: aboutData.feature3Text }, // TODO: Add these fields to schema if needed
  // ].filter((f) => f.title && f.description); // Filter out any potentially empty features
  const features: { title: string; description: string }[] = []; // Keep features array empty for now

  return (
    <section id="about" className="section bg-white relative py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle={aboutData.sectionLabel || "Our Story"} // Use aboutData
          title={aboutData.title || "From Catering to Community Favorite"} // Use aboutData
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6 animate-fade-in prose prose-lg prose-gray max-w-none">
            {/* Dynamic Rich Text Content for Our Story from aboutData */}
            {aboutData.content && <TinaMarkdown content={aboutData.content} />}

            {/* Dynamic Philosophy Section - Use Placeholders */}
            <div className="pt-4 mt-8 border-t border-gray-100">
              <h3 className="text-2xl font-display font-semibold text-cochi-red mb-4">
                {"Our Philosophy"} {/* Hardcoded Placeholder */}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 not-prose">
                {"Placeholder text about commitment to quality and community."}{" "}
                {/* Hardcoded Placeholder */}
              </p>
            </div>
          </div>

          <div className="relative h-full min-h-[450px] overflow-hidden rounded-xl shadow-2xl transform hover:scale-[1.01] transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-cochi-red/20 to-cochi-gold/10"></div>

            {/* Use image from aboutData if available */}
            <img
              src={aboutData.image || "images/family.png"} // Use aboutData.image
              alt={"Manny and Gabby Vasquez"} // Hardcoded Placeholder
              className="w-full h-full object-cover object-center"
            />

            {/* Dynamic Image Caption - Use Placeholders */}
            <div className="image-caption-overlay absolute bottom-0 left-0 right-0 pb-4 px-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="font-display text-xl text-white mb-0">
                {"Manny & Gabby Vasquez"} {/* Hardcoded Placeholder */}
              </p>
              <p className="text-sm text-cochi-gold -mt-1">
                {"Founders"} {/* Hardcoded Placeholder */}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Features Section - Will be hidden as features array is empty */}
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
