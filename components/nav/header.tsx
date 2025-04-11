"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { tinaField } from "tinacms/dist/react";
import { useLayout } from "../layout/layout-context";

export default function Header() {
  const { globalSettings } = useLayout();

  const siteName = globalSettings?.siteName || "Default Site Name";

  const defaultHeaderColorCss =
    "text-black dark:text-white bg-gray-100 dark:bg-gray-800";

  // Basic navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/menu", label: "Menu" },
    { href: "/location", label: "Location" },
    { href: "/contact", label: "Contact" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <div className={`relative overflow-hidden ${defaultHeaderColorCss}`}>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between lg:gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <span data-tina-field={tinaField(globalSettings, "siteName")}>
                {siteName}
              </span>
            </Link>
          </h4>

          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 my-2 md:my-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
}
