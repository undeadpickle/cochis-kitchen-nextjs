import React from "react";
import { notFound } from "next/navigation"; // Import notFound
import client from "@/tina/__generated__/client"; // Import Tina client
import Layout from "@/components/layout/layout"; // Import Layout
import ClientPage from "../[...urlSegments]/client-page"; // Import ClientPage (adjust path as needed)

// TODO: Import and use specific components for the About page

export const revalidate = 300; // Optional: Set revalidation time

export default async function AboutPage() {
  // Fetch data for the About page from TinaCMS
  const data = await client.queries.page({
    relativePath: "about.mdx", // Assuming content file is about.mdx
  });

  // Check if data was fetched successfully
  if (!data.data.page) {
    notFound();
  }

  return (
    // Pass raw data to Layout for context
    <Layout rawPageData={data}>
      {/* Pass data to ClientPage for potential useTina hook */}
      <ClientPage {...data} />
      {/* 
        Alternatively, if ClientPage is generic, create an AboutClient component:
        <AboutClient data={data.data} query={data.query} variables={data.variables} />
        You would then build the actual page structure within AboutClient,
        potentially using useTina.
      */}
      {/* --- TEMPORARY PLACEHOLDER STRUCTURE --- */}
      {/* Remove this section once ClientPage or specific components are implemented */}
      {/* <div>
        <h1>{data.data.page.title}</h1>
        <p>This is the placeholder for the About page content.</p>
        <pre>{JSON.stringify(data.data.page, null, 2)}</pre>
      </div> */}
      {/* --- END TEMPORARY PLACEHOLDER --- */}
    </Layout>
  );
}
