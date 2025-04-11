import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
// Remove direct client import if no longer needed here
// import client from "../../tina/__generated__/client";
import Header from "../nav/header";
import Footer from "../nav/footer";
import { cn } from "../../lib/utils";
// Import the specific query type returned by the page query
import type {
  GlobalQuery,
  PageQuery,
  PagePartsFragment,
  GlobalPartsFragment,
} from "@/tina/__generated__/types";

// Define the expected structure for the props coming from the page
interface LayoutDataProps {
  pageData?: {
    // Contains result of client.queries.page
    data: { page: PagePartsFragment }; // Use Fragment types if available
    variables: { relativePath: string };
    query: string;
  };
  globalData?: {
    // Contains result of client.queries.global
    data: { global: GlobalPartsFragment }; // Use Fragment types if available
    variables: { relativePath: string };
    query: string;
  };
}

type LayoutProps = PropsWithChildren & LayoutDataProps;

export default function Layout({
  children,
  pageData,
  globalData,
}: LayoutProps) {
  // Remove the separate global query fetch
  /*
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  });
  */

  // Extract global settings from the dedicated globalData prop
  const globalSettings = (globalData?.data?.global ||
    {}) as GlobalQuery["global"];

  // Log the globalSettings being passed to the provider
  console.log(
    "Layout Provider is receiving globalSettings:",
    JSON.stringify(globalSettings, null, 2)
  );

  return (
    <LayoutProvider
      globalSettings={globalSettings}
      // Pass the pageData down - specific components might need it later
      pageData={pageData || {}}
    >
      <Header />
      <main
        className={cn(
          "font-sans flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col"
        )}
      >
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
