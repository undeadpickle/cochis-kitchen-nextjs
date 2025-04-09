import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "../[...urlSegments]/client-page";

export const revalidate = 300;

export default async function ReviewsPage() {
  const data = await client.queries.page({
    relativePath: "reviews.mdx", // Assuming content file is reviews.mdx
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
