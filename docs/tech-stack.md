# Cochi's Kitchen Website - Technology Stack (Next.js Migration)

This document outlines the technologies planned for the Cochi's Kitchen website project following its migration to Next.js, including the integration of TinaCMS.

## Core Technologies

- **Framework**: Next.js (with React 18+ and TypeScript)
- **Build Tool**: Next.js (uses SWC/Webpack internally)
- **Styling**: Tailwind CSS 3.x
- **Routing**: Next.js File-System Based Routing (App Router or Pages Router)

## Content Management System (CMS)

- **Headless CMS**: TinaCMS
- **Core Library**: tinacms
- **React Integration**: tinacms/dist/react (for useTina hook), tinacms/dist/rich-text (for TinaMarkdown component)
- **CLI Tool**: @tinacms/cli (for setup, local dev server, builds)
- **Data Fetching**: TinaCMS Client (tina/**generated**/client) via GraphQL.
- **Content Storage**: Git (via GitHub)
- **Content Formats**: Markdown (.mdx, .md), JSON (.json)

## Frontend Libraries

- **UI Components**: shadcn/ui (with Radix UI primitives)
- **Form Handling**: React Hook Form 7.x with Zod 3.x validation
- **Animation**: Framer Motion 10.x, vaul (Drawer UI)
- **Icons**: Lucide React, React Icons
- **Notifications**: Sonner toast notifications
- **Carousel**: Embla Carousel
- **Date Handling**: date-fns
- **Theme Switching**: next-themes (Well-suited for Next.js)
- **Image Optimization**: Prefer Next.js Image component. (`react-lazy-load-image-component`, `sharp` installed but likely superseded).
- **Resizable Panels**: React Resizable Panels
- **Cookie Consent**: React Cookie Consent
- **Data Visualization**: Recharts (available but not currently used)
- **Accessible UI Primitives**: Radix UI

## Custom Components

(These should be largely reusable after migration)

- **ImagePopup**: Full-screen responsive image viewer with caption overlay and animations
- **CategoryDropdown**: Filterable category navigation for menu items
- **MenuCard**: Interactive food item card with featured item highlighting

## Responsive Design

- **Mobile-first approach**: Fully responsive design for all devices
- **Breakpoints**: Tailwind's default breakpoints
- **Navigation**: Collapsible mobile menu with smooth transitions
- **Image Handling**: Responsive images; leverage Next.js Image component for optimization.
- **Modals**: Fully responsive popup modals

## Backend / Services Integration

- **Form Submission**: Netlify Forms
- **Maps**: Google Maps Embed API
- **CMS Backend**: Tina Cloud (handles authentication, Git communication, data layer for TinaCMS)

## Deployment (Netlify)

- **Platform**: Netlify (New Site ID TBD)
- **Build Command**: tinacms build && next build (Recommended)
- **Publish Directory**: .next (Default Next.js output)
- **Node.js Version**: 22.x (LTS Recommended)
- **Key Environment Variables**:
  - NEXT_PUBLIC_TINACMS_CLIENT_ID (TinaCMS Client ID for browser - Note Prefix)
  - TINACMS_TOKEN (TinaCMS Read-Only Token for build)
  - NEXT_PUBLIC_ENVIRONMENT (If migrating custom env vars - Note Prefix)

## Development Tools

- **Linting**: ESLint (Configured via next lint)
- **Type Checking**: TypeScript
- **Version Control**: Git (TinaCMS utilizes Git workflow heavily)
- **Package Manager**: npm
- **Build Tooling**: Next.js CLI

## Performance Optimization

- **Code Splitting**: Next.js automatic code splitting per page/component.
- **Component Library**: shadcn/ui (lightweight, tree-shakable components).
- **Image Optimization**: Next.js Image component for automatic optimization, resizing, modern formats.
- **Rendering Strategies**: Leverage Next.js SSG (Static Site Generation) or ISR (Incremental Static Regeneration) where appropriate for performance.
- **Responsive Loading**: Tailwind's responsive classes.

## SEO Implementation

- **Structured Data**: JSON-LD (planned).
- **Metadata**: Next.js Metadata API (built-in for app directory) or next/head (for pages directory). (Replaces React Helmet Async).
- **Robots.txt**: Can be placed in public/ or generated via Next.js config.
- **Sitemap**: XML sitemap generation (can be done via Next.js config or build scripts).

## Accessibility Features

- **ARIA Attributes**: Properly labeled interactive elements.
- **Keyboard Navigation**: Full keyboard support.
- **Semantic HTML**: Proper heading hierarchy and landmark regions.
- **Color Contrast**: Meeting WCAG AA standards (in progress).
