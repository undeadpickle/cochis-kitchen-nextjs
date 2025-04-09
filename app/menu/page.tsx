import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "../[...urlSegments]/client-page";

export const revalidate = 300;

export default async function MenuPage() {
  // Assuming the content for the menu page corresponds to 'offerings.mdx'
  const data = await client.queries.page({
    relativePath: "offerings.mdx",
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
