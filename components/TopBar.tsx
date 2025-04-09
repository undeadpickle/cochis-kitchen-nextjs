/**
 * File path: src/components/TopBar.tsx
 */
import React from "react";
import { Phone } from "lucide-react";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types

/**
 * Type for the props expected by TopBar
 */
interface TopBarProps {
  content: PageQuery["page"]; // Expects the page data object
}

/**
 * TopBar component
 *
 * A fixed position banner displayed at the top of the application.
 * Contains promotional message and contact phone number.
 * Responsive design with left-aligned content.
 */
const TopBar: React.FC<TopBarProps> = ({ content }) => {
  // Ensure content is available before trying to access its properties
  if (!content) {
    // Return null or a placeholder if content is not yet loaded
    // This prevents errors during initial render or if fetching fails
    return null;
  }

  // Construct tel: link from the phone number
  const phoneLink = `tel:${content.headerPhoneNumber?.replace(/\D/g, "")}`;

  return (
    // Fixed container with red background and shadow
    <div className="fixed top-0 left-0 right-0 w-full bg-cochi-red shadow-sm h-10 z-[1000]">
      <div className="container mx-auto h-full px-4">
        {/* Content container - left-aligned on all screen sizes */}
        <div className="flex justify-start items-center h-full">
          <p className="flex items-center m-0">
            {/* Promotional text from TinaCMS */}
            <span className="!text-white font-normal text-xs md:text-sm">
              {content.headerCallToAction}
            </span>
            {/* Phone number with icon from TinaCMS */}
            <a
              href={phoneLink}
              className="inline-flex items-center gap-1 text-cochi-gold hover:brightness-125 transition-all ml-2 font-bold"
            >
              <Phone size={14} className="hidden md:block" />{" "}
              {/* Desktop phone icon */}
              <Phone size={12} className="md:hidden" />{" "}
              {/* Mobile phone icon (smaller) */}
              {content.headerPhoneNumber}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
