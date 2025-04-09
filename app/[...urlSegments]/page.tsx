import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./client-page";

export const revalidate = 300;

// Define common static file extensions
const STATIC_FILE_EXTENSIONS = [
  "ico",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "gif",
  "css",
  "js",
  "txt",
  "xml",
  "webmanifest",
];

export default async function Page({
  params,
}: {
  params: { urlSegments: string[] };
}) {
  const requestedPath = params.urlSegments.join("/");
  const potentialExtension = requestedPath.split(".").pop()?.toLowerCase();

  // Check if the path looks like a static file request
  if (
    potentialExtension &&
    STATIC_FILE_EXTENSIONS.includes(potentialExtension)
  ) {
    notFound(); // Trigger a 404 if it looks like a static file
  }

  // Proceed with TinaCMS query only if it's not a likely static file
  const data = await client.queries.page({
    relativePath: `${requestedPath}.mdx`,
  });

  // Add a check here too: if Tina doesn't find the page, return 404
  if (!data.data.page) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === "home")); // exclude the home page

  return params;
}
