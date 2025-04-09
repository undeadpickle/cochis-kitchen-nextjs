import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "../[...urlSegments]/client-page";

export const revalidate = 300;

// TODO: Import and use components from the /components directory

export default async function LocationPage() {
  const data = await client.queries.page({
    relativePath: "location.mdx", // Assuming content file is location.mdx
  });

  if (!data.data.page) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
