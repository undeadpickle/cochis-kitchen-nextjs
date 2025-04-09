import React from "react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import client from "@/tina/__generated__/client";

import "@/app/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cochi's Kitchen",
  description: "Tina Cloud Starter",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });

  const fontVariable = `font-sans ${fontSans.variable} `;

  return (
    <html lang="en">
      <head>
        <meta name="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="Content-Security-Policy" content="frame-ancestors 'self'" />
      </head>
      <body
        suppressHydrationWarning
        className={cn("min-h-screen flex flex-col antialiased", fontVariable)}
      >
        {children}
      </body>
    </html>
  );
}
