import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";
import { Check, Calendar, Users, Mail, Phone as PhoneIcon } from "lucide-react";
import { toast } from "sonner";
import type { PageQuery } from "@/tina/__generated__/types"; // Corrected path alias

type InquiryType = "general" | "catering";

/**
 * Type for the props expected by Contact
 */
interface ContactProps {
  content: PageQuery["page"]; // Expects the contact page data object
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("general");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Effect to set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if content is loaded - No longer needed if component is static
  // if (!content) {
  //   return null; // Or a loading placeholder
  // }

  // Structure catering bullets data for mapping - Use hardcoded bullets
  const cateringBullets = [
    "Custom menu planning",
    "Delivery and setup",
    "Serving staff available",
    "Special dietary accommodations",
    "From corporate lunches to private parties",
  ]; // Hardcoded bullets

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message!", {
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setInquiryType("general");
      setEventDate("");
      setGuestCount("");
      setEventType("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 bg-[url('/images/ingredients-bg-mobile.jpg')] md:bg-[url('/images/ingredients-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-90"></div>
      <div className="container mx-auto relative z-10">
        <SectionTitle
          subtitle={"Get In Touch"} // Hardcoded
          title={"Contact & Catering"} // Hardcoded
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-3 text-cochi-brown">
                {"Contact Us"} {/* Hardcoded */}
              </h3>
              <p className="text-cochi-brown/90">
                {
                  "Have a question or want to discuss catering? Send us a message!"
                }{" "}
                {/* Hardcoded */}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold mb-3 text-cochi-brown">
                {"Catering Services"} {/* Hardcoded */}
              </h3>
              <p className="text-cochi-brown/90">
                {
                  "Let us bring Cochi's Kitchen to your next event. We cater events of all sizes with fresh, delicious food."
                }{" "}
                {/* Hardcoded */}
              </p>

              {cateringBullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {cateringBullets.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check
                        size={20}
                        className="text-cochi-gold flex-shrink-0"
                      />
                      <span className="text-cochi-brown/90">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-cochi-cream-darker/30">
                <h4 className="text-xl font-serif font-semibold mb-3 text-cochi-brown">
                  {"What Our Clients Say"} {/* Hardcoded */}
                </h4>
                <blockquote className="italic text-cochi-brown/80 border-l-4 border-cochi-gold/30 pl-4">
                  {
                    "Cochi's Kitchen catered our company lunch, and it was a huge hit! Everything was fresh and delicious."
                  }{" "}
                  {/* Hardcoded */}
                </blockquote>
                <p className="mt-3 font-medium text-cochi-brown">
                  {"- Local Business Owner"} {/* Hardcoded */}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg border border-cochi-cream-darker/30">
            <h3 className="text-2xl font-display font-semibold mb-6 text-cochi-brown">
              {"Send Us a Message"} {/* Hardcoded */}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1 text-cochi-brown"
                >
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-cochi-brown"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1 text-cochi-brown"
                  >
                    Phone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-sm font-medium mb-1 text-cochi-brown"
                >
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  value={inquiryType}
                  onChange={(e) =>
                    setInquiryType(e.target.value as InquiryType)
                  }
                  className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200 bg-white appearance-none"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="catering">Catering</option>
                </select>
              </div>

              {isMounted && inquiryType === "catering" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-sm font-medium mb-1 text-cochi-brown"
                      >
                        Event Date
                      </label>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cochi-brown/60"
                        />
                        <input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block text-sm font-medium mb-1 text-cochi-brown"
                      >
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users
                          size={16}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cochi-brown/60"
                        />
                        <input
                          id="guestCount"
                          type="number"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="eventType"
                      className="block text-sm font-medium mb-1 text-cochi-brown"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200 bg-white appearance-none"
                    >
                      <option value="">Select Event Type</option>
                      <option value="corporate">Corporate</option>
                      <option value="wedding">Wedding</option>
                      <option value="private">Private Party</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 text-cochi-brown"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-cochi-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cochi-gold/50 focus:border-cochi-gold/50 transition-all duration-200"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3.5 px-6 rounded-md text-white font-medium transition-all duration-300 shadow-md",
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-cochi-red to-cochi-red-light hover:from-cochi-red-light hover:to-cochi-red"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
