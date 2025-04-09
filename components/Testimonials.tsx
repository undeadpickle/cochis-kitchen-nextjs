import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Star, Quote } from "lucide-react";
import { FaYelp, FaFacebookSquare } from "react-icons/fa";
import type { PageQuery } from "../../tina/__generated__/types"; // Import generated types

// Define proper type for testimonial
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  source: "yelp" | "facebook";
  text: string;
  date: string;
}

/**
 * Type for the props expected by Testimonials
 */
interface TestimonialsProps {
  content: PageQuery["page"]; // Expects the reviews page data object
}

// Sample testimonial data - would be fetched from Yelp/Facebook API in a real implementation
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    source: "yelp",
    text: "The Guido sandwich is absolutely incredible! Perfectly balanced flavors and high-quality ingredients. Their fresh-baked scones are also to die for. I've been coming here every weekend since they opened.",
    date: "March 2023",
  },
  {
    id: 2,
    name: "Michael L.",
    rating: 5,
    source: "facebook",
    text: "Nashville hot chicken sandwich is the best I've had outside of Tennessee. The meat is perfectly cooked and juicy, and the heat level is just right. Their house-made pickles add the perfect crunch!",
    date: "February 2023",
  },
  {
    id: 3,
    name: "Jennifer R.",
    rating: 5,
    source: "yelp",
    text: "Stopped in for breakfast and had their breakfast burrito - absolutely phenomenal! Fresh ingredients, perfectly cooked eggs, and the potatoes had an amazing seasoning. Will definitely be back!",
    date: "April 2023",
  },
  {
    id: 4,
    name: "David K.",
    rating: 5,
    source: "facebook",
    text: "They catered our company event and everyone was blown away by the quality and presentation. The tri-tip was cooked to perfection and their house-made sauces were incredible. Highly recommend for any catering needs!",
    date: "January 2023",
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg 
        border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute -top-3 -left-2 text-cochi-gold/20">
        <Quote size={48} strokeWidth={1} />
      </div>
      <div className="flex justify-between items-start mb-4 relative">
        <div>
          <h3 className="font-display font-semibold text-lg text-gray-900">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500">{testimonial.date}</p>
        </div>
        <div className="flex items-center">
          <RatingStars rating={testimonial.rating} />
          {testimonial.source === "yelp" ? (
            <div className="ml-2 text-red-500 bg-red-50 p-1 rounded-md">
              <FaYelp size={16} />
            </div>
          ) : (
            <div className="ml-2 text-blue-600 bg-blue-50 p-1 rounded-md">
              <FaFacebookSquare size={16} />
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-700 relative z-10">{testimonial.text}</p>
    </motion.div>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  // Check if content is loaded
  if (!content) {
    return null; // Or a loading placeholder
  }

  return (
    <section id="testimonials" className="section py-20 relative">
      <div className="absolute inset-0 bg-[url('/images/flour-bg-02-mobile.jpg')] md:bg-[url('/images/flour-bg-02.jpg')] bg-cover bg-center bg-no-repeat opacity-90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          subtitle={content.reviewsSectionLabel || "What People Say"}
          title={content.reviewsSectionTitle || "Customer Reviews"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cochi-red/5 to-cochi-gold/5 -z-10 rounded-3xl blur-3xl opacity-50"></div>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-8 text-gray-700 font-display">
            {content.reviewsCallToAction}
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://www.yelp.com/biz/cochis-kitchen-morgan-hill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 shadow-md"
            >
              <FaYelp size={20} /> {content.yelpReviewsLinkText}
            </a>
            <a
              href="https://www.facebook.com/cochiskitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 shadow-md"
            >
              <FaFacebookSquare size={20} /> {content.facebookReviewsLinkText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
