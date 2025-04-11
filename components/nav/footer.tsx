"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useLayout } from "../layout/layout-context";
import type { IconType } from "react-icons";

const socialIconMap: { [key: string]: IconType } = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  instagram: AiFillInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
};

export default function Footer() {
  const { globalSettings /*, pageData */ } = useLayout();

  const footerText = globalSettings?.footerText;
  const socialLinks = globalSettings?.socialLinks || [];
  const siteName = globalSettings?.siteName || "Default Site Name";

  const defaultFooterColorCss =
    "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900";

  // Attempt to extract plain text directly (may need adjustments based on structure)
  const plainFooterText =
    footerText?.children?.[0]?.type === "p" &&
    footerText.children[0].children?.[0]?.type === "text"
      ? footerText.children[0].children[0].text
      : "Default Footer Text";

  return (
    <footer className={cn(`bg-gradient-to-br`, defaultFooterColorCss)}>
      <Container className="relative py-8" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="/"
            className="group mx-2 flex items-center font-bold tracking-tight text-gray-500 dark:text-gray-300 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
          >
            {siteName}
          </Link>

          {socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks
                .filter((link) => link && link.platform && link.url)
                .map((link) => {
                  const SocialIconComponent =
                    socialIconMap[link!.platform!.toLowerCase() || ""];
                  return SocialIconComponent ? (
                    <a
                      key={link!.platform}
                      href={link!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition ease-out duration-150"
                      aria-label={link!.platform}
                    >
                      <SocialIconComponent className="h-6 w-auto" />
                    </a>
                  ) : null;
                })}
            </div>
          )}
        </div>

        {footerText && (
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            {/* <TinaMarkdown content={footerText} /> */}
            {/* Render plain text directly for debugging */}
            {plainFooterText}
          </div>
        )}
      </Container>
    </footer>
  );
}
