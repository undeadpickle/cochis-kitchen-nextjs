import React from "react";
import SectionTitle from "./SectionTitle";
import { MapPin, Clock, Car, Phone } from "lucide-react";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types

const LocationCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg 
    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100"
  >
    <div className="flex items-start gap-4">
      <div
        className="bg-gradient-to-br from-cochi-red to-cochi-red-dark p-3 rounded-full text-white 
        shadow-md flex-shrink-0 mt-1"
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className="text-xl font-display font-semibold mb-2 text-gray-900">
          {title}
        </h3>
        {children}
      </div>
    </div>
  </div>
);

/**
 * Type for the props expected by Location
 */
interface LocationProps {
  content: PageQuery["page"]; // Expects the location page data object
}

const Location: React.FC<LocationProps> = ({ content }) => {
  // Check if content is loaded
  if (!content) {
    return null; // Or a loading placeholder
  }

  // Helper to extract phone number for tel: link
  const getPhoneNumber = (phoneString: string | null | undefined): string => {
    return (
      phoneString?.match(
        /\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g
      )?.[0] || ""
    );
  };
  const telLink = `tel:+1${getPhoneNumber(content.contactPhone)?.replace(
    /\D/g,
    ""
  )}`;

  return (
    <section id="location" className="section bg-white relative py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle={content.locationSectionLabel || "Visit Us"} // Dynamic subtitle
          title={content.locationSectionTitle || "Our Location & Hours"} // Dynamic title
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-xl h-full min-h-[450px] border border-gray-200">
              <iframe
                title="Cochi's Kitchen Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3181.230580759061!2d-121.65390382406847!3d37.13207247227737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8091e2d2b4c1eff9%3A0x95eac397f51525b0!2s435%20Vineyard%20Blvd%2C%20Morgan%20Hill%2C%20CA%2095037!5e0!3m2!1sen!2sus!4v1716511064321!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <LocationCard icon={MapPin} title="Address">
              <p className="text-gray-700">{content.addressLine1}</p>
              <p className="text-gray-700">{content.addressLine2}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  content.addressLine1 + ", " + content.addressLine2
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-cochi-red hover:text-cochi-red-dark font-medium transition-colors"
              >
                Get Directions →
              </a>
            </LocationCard>

            <LocationCard icon={Clock} title="Hours">
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">
                    Wednesday-Sunday:
                  </span>
                  <span className="text-gray-700">
                    {content.weekdayHours?.split(":")[1]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">
                    Monday-Tuesday:
                  </span>
                  <span className="text-gray-700">
                    {content.weekendHours?.split(":")[1]}
                  </span>
                </div>
              </div>
            </LocationCard>

            <LocationCard icon={Car} title="Parking">
              <p className="text-gray-700">{content.parkingInfo}</p>
            </LocationCard>

            <LocationCard icon={Phone} title="Contact">
              <p className="text-gray-700">
                <a
                  href={telLink}
                  className="hover:text-cochi-red transition-colors"
                >
                  {content.contactPhone}
                </a>
              </p>
            </LocationCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
