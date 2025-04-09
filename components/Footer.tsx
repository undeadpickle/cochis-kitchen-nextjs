import React from "react";
import {
  Facebook,
  Instagram,
  ArrowUp,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { FaYelp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types

/**
 * Type for the props expected by Footer
 */
interface FooterProps {
  // For now, we expect Hero content for tagline/phone.
  // Ideally, this would use dedicated Footer content or combined data.
  content: PageQuery["page"];
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if content is loaded
  if (!content) {
    return null; // Or a loading placeholder
  }

  // TODO: Ideally fetch address/hours from location data in Index.tsx and pass here.
  // Using static data for address/hours for now.
  const addressLine1 = "435 Vineyard Blvd";
  const addressLine2 = "Morgan Hill, CA 95037";
  const hours = [
    "Monday: Closed",
    "Tuesday: Closed",
    "Wednesday: 8:00am - 2:00pm",
    "Thursday: 8:00am - 2:00pm",
    "Friday: 8:00am - 2:00pm",
    "Saturday: 8:00am - 2:00pm",
    "Sunday: 8:00am - 2:00pm",
  ];
  // Construct tel: link from the phone number
  const phoneLink = `tel:${content.headerPhoneNumber?.replace(/\D/g, "")}`;

  return (
    <footer className="bg-gradient-to-br from-cochi-red to-cochi-red-dark text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Column 1 - Cochi's Kitchen */}
          <div>
            <h3 className="text-xl font-display font-bold mb-5 !text-white">
              Cochi's Kitchen
            </h3>
            {/* Dynamic Tagline */}
            <div className="!text-white">{content.headerTagline}</div>
            {/* Social links remain static */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/cochiskitchen/" // Corrected link
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center hover:bg-white hover:text-cochi-red transition-all duration-300 text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/cochis2.0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center hover:bg-white hover:text-cochi-red transition-all duration-300 text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.yelp.com/biz/cochis-kitchen-morgan-hill"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center hover:bg-white hover:text-cochi-red transition-all duration-300 text-white"
                aria-label="Yelp"
              >
                <FaYelp size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Hours (Static for now) */}
          <div>
            <h3 className="text-xl font-display font-bold mb-5 !text-white">
              Hours
            </h3>
            <ul className="space-y-1">
              {hours.map((hour, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Clock size={16} className="text-white flex-shrink-0" />
                  <span className="!text-white">{hour}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact (Address static, Phone dynamic) */}
          <div>
            <h3 className="text-xl font-display font-bold mb-5 !text-white">
              Contact
            </h3>
            <address className="not-italic">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-white flex-shrink-0 mt-1.5" />
                <div className="flex flex-col">
                  {/* Static Address */}
                  <span className="!text-white block">{addressLine1}</span>
                  <span className="!text-white block">{addressLine2}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Phone size={16} className="text-white flex-shrink-0" />
                {/* Dynamic Phone Number */}
                <a href={phoneLink} className="!text-white hover:underline">
                  {content.headerPhoneNumber}
                </a>
              </div>
            </address>
          </div>

          {/* Column 4 - Quick Links (Static) */}
          <div>
            <h3 className="text-xl font-display font-bold mb-5 !text-white">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {[
                "Home",
                "Menu",
                "About Us",
                "Testimonials",
                "Location",
                "Contact",
              ].map((item, index) => (
                <li
                  key={index}
                  className="transform transition-transform hover:translate-x-1"
                >
                  <a
                    href={`#${item
                      .toLowerCase()
                      .replace(/\s/g, "-")
                      .replace("-us", "")}`}
                    className="!text-white hover:text-white hover:underline transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-white/50 flex flex-col md:flex-row justify-between items-center">
          {/* Dynamic Copyright Year */}
          <p className="!text-white">
            © {new Date().getFullYear()} Cochi's Kitchen. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="mt-6 md:mt-0 p-3 bg-white/30 hover:bg-white hover:text-cochi-red rounded-full transition-all duration-300 shadow-md text-white"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
