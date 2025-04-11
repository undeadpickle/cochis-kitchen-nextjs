import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import HomePageClient from "./home-page-client";

export const revalidate = 300;

export default async function Home() {
  // Fetch page data and global data in parallel
  const [pageResult, globalResult] = await Promise.all([
    client.queries.page({ relativePath: `home.mdx` }),
    client.queries.global({ relativePath: `index.json` }),
  ]);

  // Log the fetched page data structure (optional)
  // console.log("Home Page Data:", JSON.stringify(pageResult.data.page, null, 2));

  // Check if data exists
  if (!pageResult.data.page) {
    notFound();
  }
  if (!globalResult.data.global) {
    // Handle case where global data might be missing, though unlikely
    console.error("Global settings not found!");
    // Optionally throw an error or provide defaults
  }

  // Combine results for passing down (optional, but can be cleaner)
  // Or pass pageResult and globalResult separately
  const props = {
    pageData: pageResult,
    globalData: globalResult,
  };

  return (
    // Pass both results to Layout
    <Layout {...props}>
      {/* Pass page-specific data to the client component */}
      <HomePageClient {...pageResult} />
    </Layout>
  );
}
