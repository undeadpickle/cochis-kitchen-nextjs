"use client";

import { useTina } from "tinacms/dist/react";
import type { PageQuery } from "@/tina/__generated__/types";
import { useEffect, useRef } from "react";

// --- Import actual section components ---
import Hero from "@/components/Hero"; // Updated path
import About from "@/components/About"; // Updated path
import Menu from "@/components/Menu"; // Add Menu import
import Location from "@/components/Location"; // Add Location import
import Contact from "@/components/Contact"; // Add Contact import
// import MenuHighlightsSection from '@/components/sections/menu-highlights-section';
// import FeaturesSection from '@/components/sections/features-section';
// import TestimonialsSection from '@/components/sections/testimonials-section';

// --- Remove Placeholder Helper ---
// const PlaceholderSection = ({ name, data }: { name: string; data: any }) => (
//   <section className="py-8 px-4 border-t border-dashed">
//     <h2 className="text-xl font-bold mb-2">Placeholder: {name} Section</h2>
//     <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
//       {JSON.stringify(data, null, 2)}
//     </pre>
//   </section>
// );
// --- End Remove Placeholder ---

export interface HomePageClientProps {
  data: PageQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function HomePageClient(props: HomePageClientProps) {
  // --- DEBUG: Log props received by client component ---
  console.log("HomePageClient: Received props:", props);
  // --- END DEBUG ---

  // Ref to store the previous data
  const prevDataRef = useRef<PageQuery | null>(null);

  // Apply useTina, passing the parts from the props object
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // --- DEBUG: Log data comparison from useTina ---
  useEffect(() => {
    // --- DEBUG: Log useEffect execution ---
    console.log("HomePageClient: useEffect for [data] is running.");
    // --- END DEBUG ---

    // Log only when data actually changes after the initial load
    if (prevDataRef.current && prevDataRef.current !== data) {
      console.log("HomePageClient: Data UPDATED by useTina.");
      console.log("  PREVIOUS Data:", prevDataRef.current);
      console.log("  NEW Data:", data);
    } else if (!prevDataRef.current) {
      console.log("HomePageClient: Initial Data received from useTina:", data);
    }
    // Update the ref *after* logging
    prevDataRef.current = data;
  }, [data]); // Rerun effect when data changes
  // --- END DEBUG ---

  // Extract page data (check for nulls if necessary, though page should exist)
  const pageData = data?.page;
  // No need to extract heroData/aboutData separately for these components
  // const heroData = pageData?.hero;
  // const aboutData = pageData?.about;
  // const menuData = pageData?.menuHighlights; // Example if using menu highlights

  if (!pageData) {
    return <div>Loading home page data or page not found...</div>;
  }

  return (
    <main>
      {/* Render actual components using the data */}
      {/* Pass the entire pageData object to Hero and About */}

      {pageData && <Hero content={pageData} />}
      {/* {heroData && <Hero data={heroData} />} */}
      {/* {heroData && <PlaceholderSection name="Hero" data={heroData} />} */}
      {/* {heroData && <HeroSection data={heroData} />} */}

      {pageData && <About content={pageData} />}
      {/* {aboutData && <About data={aboutData} />} */}
      {/* {aboutData && <PlaceholderSection name="About" data={aboutData} />} */}
      {/* {aboutData && <AboutSection data={aboutData} />} */}

      {pageData && <Menu content={pageData} />}
      {pageData && <Location content={pageData} />}
      {pageData && <Contact content={pageData} />}

      {/* Add other sections as needed based on your schema and components */}
      {/* {menuData && <MenuHighlightsSection data={menuData} />} */}

      {/* You might also render the main MDX body content if present */}
      {/* {pageData._body && <TinaMarkdown content={pageData._body} />} */}
    </main>
  );
}
