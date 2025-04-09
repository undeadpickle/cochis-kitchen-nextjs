# Cochi's Kitchen Website PRD (Next.js Migration)

## Overview & Objectives

This document outlines the requirements and specifications for creating a modern, visually appealing website for Cochi's Kitchen, a beloved bakery and delicatessen located in Morgan Hill, CA, using the Next.js framework. The website will serve as a digital storefront to showcase their menu, highlight their community involvement, and provide essential information to customers.

### Core Objectives

- Create a modern website built with Next.js that maintains a farm-to-table aesthetic, potentially utilizing a single primary landing page structure for core content access.
- Showcase Cochi's menu, specialties, and fresh-baked goods.
- Highlight the family-owned, community-oriented nature of the business.
- Provide essential information (hours, location, contact details).
- Enable customers to inquire about catering services.
- Ensure a responsive, mobile-friendly experience.
- Implement smooth, animated navigation (especially for section scrolling on the main page).
- Maintain brand consistency with their existing color palette and style.
- Integrate TinaCMS for content management by non-technical users.

## Project Information

**Development Environment:**

- MacBook M1 with macOS Sonoma
- Project Name: cochis-kitchen-nextjs (or user preference)
- [GitHub Repo:](https://github.com/undeadpickle/cochis-kitchen-nextjs.git)
- [Production Website URL:](https://cochis-kitchen-nextjs.netlify.app/)
- See [Migration Guide](docs/tina-migration-plan.md) for specific local paths, keys, and IDs

## Target Audience

- Local Morgan Hill community residents
- Potential customers looking for breakfast, lunch, or baked goods
- People searching for catering services
- First-time visitors wanting to learn about Cochi's Kitchen
- Regular customers checking for specials or hours
- Local businesses seeking catering services

## Business Background

Cochi's Kitchen was founded by husband and wife team, Manny and Gabby Vasquez. They started by catering for a tech company in Silicon Valley, and by March 2018 were providing over 400 meals daily. Like many businesses during the pandemic, they had to pivot their model and began offering fried chicken sandwiches for pickup and expanded their catering services throughout Morgan Hill.

The restaurant grew from these humble beginnings to establish their brick-and-mortar location in the Vineyard Town Center. Their deep community roots and commitment to quality have made them a beloved local establishment in Morgan Hill.

## User Experience Requirements

### Primary Page Layout

The website's core information will be presented on a primary landing page, potentially utilizing smooth scrolling navigation between sections. This approach provides a modern, fluid experience while making key information easily accessible. Next.js's routing capabilities can be used for any distinct pages if needed later (e.g., dedicated catering page, blog).

### Navigation & Content Organization

The primary page is organized into the following sections, potentially accessible via main navigation:

#### Hero Section

- Hero image carousel featuring high-quality food photography
- Prominent display of Cochi's Kitchen logo
- Tagline: "Farm-fresh café & bakery"
- Call-to-action buttons for menu and location

#### About Us Section

- Story about Cochi's Kitchen's journey from catering to brick-and-mortar
- Emphasis on family ownership (Manny & Gabby Vasquez)
- Profile of the owners with their connection to the community
- Highlight of their pivot during the pandemic and growth
- Focus on their commitment to high-quality, local ingredients

#### Menu Section

- Categorized display of menu items:
  - Breakfast: Featuring their popular breakfast burritos
  - Sandwiches: Highlighting the signature Guido sandwich
  - BBQ: Showcasing their house-smoked meats
  - Baked Goods: Featuring their highly praised scones
  - Coffee: Displaying their coffee drink options
- Special features section for:
  - Nashville fried chicken sandwiches (monthly special)
  - Tri-tip sandwiches (monthly special)
  - House-cured bacon and sausages
  - Daily specials (with link to social media)

#### Testimonials Section

- Customer reviews highlighting the quality of their food
- Testimonials specifically about their scones, Guido sandwich, and breakfast burritos
- Catering client testimonials
- Local business partner endorsements

#### Location/Hours Section

- Address: 435 Vineyard Blvd, Morgan Hill, California 95037
- Hours: Wednesday-Sunday 8:00am-2:00pm (Closed Mondays & Tuesdays)
- Embedded Google Map
- Parking information

#### Contact Form Section

- Form for general inquiries and catering requests
- Information about their catering services and capabilities
- Social media links (Facebook, Instagram)
- Customer testimonials about their catering services

## UI/UX Requirements

- Smooth, animated scrolling between sections (on the main page)
- Mobile-responsive design that adapts to all screen sizes
- Interactive menu categories
- Modern image carousel for hero section
- Clean, intuitive navigation
- Subtle animations to enhance user experience without overwhelming it
- Accessible design that meets WCAG standards

## Technical Requirements

### Technology Stack

[Full Project Tech Stack](/Users/travisgregory/Projects/cochis-kitchen-nextjs/docs/tech-stack.md)

#### Core Technologies

- Framework: Next.js (with React 18+ and TypeScript)
- Build Tool: Next.js (uses SWC/Webpack internally)
- Styling: Tailwind CSS 3.x
- Routing: Next.js File-System Based Routing (App Router or Pages Router)

#### Content Management System (CMS)

- Headless CMS: TinaCMS
- Core Library: tinacms
- React Integration: tinacms/dist/react (for useTina hook), tinacms/dist/rich-text (for TinaMarkdown component)
- CLI Tool: @tinacms/cli (for setup, local dev server, builds)
- Data Fetching: TinaCMS Client (tina/**generated**/client) via GraphQL, using staticRequest within Next.js data fetching methods.
- Content Storage: Git (via GitHub - new repository TBD)
- Content Formats: Markdown (.md), JSON (.json)

#### Frontend Libraries

- UI Components: shadcn/ui (with Radix UI primitives)
- Component Documentation: Storybook 8.x
- Form Handling: React Hook Form 7.x with Zod 3.x validation
- Animation: Framer Motion 10.x, vaul (Drawer UI)
- Icons: Lucide React, React Icons
- Notifications: Sonner toast notifications
- Carousel: Embla Carousel
- Date Handling: date-fns
- Theme Switching: next-themes (Well-suited for Next.js)
- Image Optimization: React Lazy Load Image Component, sharp (Potentially replaced/supplemented by Next.js Image component)
- Resizable Panels: React Resizable Panels
- Cookie Consent: React Cookie Consent
- Data Visualization: Recharts (available but not currently used)
- Accessible UI Primitives: Radix UI

#### Backend / Services Integration

- Form Submission: Netlify Forms
- Maps: Google Maps Embed API
- CMS Backend: Tina Cloud (handles authentication, Git communication, data layer for TinaCMS)

#### Deployment (Netlify)

- Platform: Netlify (New Site ID TBD)
- Build Command: tinacms build && next build (Recommended)
- Publish Directory: .next (Default Next.js output)
- Node.js Version: 22.x (LTS Recommended)
- Key Environment Variables: NEXT_PUBLIC_TINACMS_CLIENT_ID, TINACMS_TOKEN (See Migration Guide for values)

#### Development Tools

- Linting: ESLint (Configured via next lint)
- Type Checking: TypeScript
- Version Control: Git (TinaCMS utilizes Git workflow heavily)
- Package Manager: npm/Bun
- Component Development: Storybook
- Build Tooling: Next.js CLI

## Performance Requirements

- Lighthouse score of 90+ on all metrics
- Leverage Next.js performance features: SSG/ISR where applicable, optimized image loading via next/image.
- Initial load time under 2 seconds (for static/optimized pages)
- Lazy loading for off-screen content (often handled by Next.js or manually)
- Efficient bundle size management (Next.js automatic code splitting)

## Responsive Design Requirements

- Mobile-first design approach
- Breakpoints for mobile, tablet, and desktop views
- Adaptive navigation for smaller screens
- Flexible image sizing and layout

## Content Requirements

### Images

High-quality food photography focusing on:

- Signature dishes (Guido sandwich, breakfast burritos)
- Baked goods (especially their famous scones)
- BBQ and smoked meats
- Coffee drinks
- Interior shots (limited)
- Staff/owners (Manny & Gabby)
- Catering events and special occasions

### Text Content

- Founding story emphasizing growth from catering to brick-and-mortar
- Farm-to-table philosophy and commitment to local sourcing
- Clear, straightforward menu descriptions with emphasis on signature items
- Information about their catering capabilities and past events
- Prominent display of business hours and location
- Community involvement and partnerships

### Testimonials

- Customer reviews highlighting the quality of their food
- Testimonials specifically about their scones, Guido sandwich, and breakfast burritos
- Catering client testimonials
- Local business partner endorsements

### Brand Elements

- Consistent use of maroon and white brand colors
- Integration of farm-to-table aesthetic
- Warm, inviting tone in all copy
- Font choices that balance modern design with traditional charm
- Visual elements that emphasize their community connections

## Form Requirements

### Contact/Catering Form

**Fields:**

- Name (required)
- Email (required)
- Phone number (required)
- Type of inquiry dropdown (General/Catering) (required)
- If Catering selected:
  - Event date
  - Number of guests
  - Event type (Corporate, Wedding, Private Party, etc.)
  - Special requests or dietary restrictions
- Message (required)

**Processing:**

- Form validation using React Hook Form with Zod
- Submission handled by Netlify Forms
- Success/error notifications using Sonner

## SEO Requirements

To ensure the website ranks well in search engines:

### Technical SEO

- Implement proper semantic HTML structure
- Add structured data (JSON-LD) for local business and restaurant
- Ensure fast loading times (Leverage Next.js SSG/ISR)
- Generate a sitemap.xml file (Can be done via Next.js config/build)
- Create a robots.txt file (public/ or via Next.js config)

### On-Page SEO

- Optimize metadata using Next.js Metadata API (App Router) or next/head (Pages Router).
- Use proper heading hierarchy (H1-H6)
- Include alt text for all images (Leverage next/image)
- Implement schema markup for menu items and business information
- Ensure mobile-friendly design (responsive)
- Include targeted keywords: "Morgan Hill restaurant", "breakfast Morgan Hill", "catering Morgan Hill", "farm to table", etc.

### Local SEO

- Include NAP (Name, Address, Phone) information in consistent format
- Embed Google Maps with proper business location
- Include local keywords relevant to Morgan Hill and surrounding areas
- Link to and from social media accounts (Facebook, Instagram)
- Create content highlighting local partnerships and community involvement

### Content SEO

- Include relevant keywords naturally in content
- Create unique, valuable content about Cochi's Kitchen
- Highlight local connections and community involvement
- Ensure all text is readable and not embedded in images
- Update content regularly (via TinaCMS)

## Project Structure (Example Next.js App Router)

[Full Project Structure Tree](/Users/travisgregory/Projects/cochis-kitchen-nextjs/docs/project-structure.md)

## Project Reference Documentation

The Migration Plan document located at `docs/tina-migration-plan.md` for detailed instructions on each step.
Project checklist document located at `docs/progress-checklist.md` for keeping track of our project phases and tasks.
Full project tech stack document located at `docs/tech-stack.md` that details all of the packages, libraries, etc we use in our project.
Full project tree structure located at `docs/project-structure.md`. (This tree is a guide and will be a work in progress and should be updated as things change)

## Implementation Status (Reset for Migration)

- ⏳ Project Setup (Next.js + TinaCMS)
  - Create new Next.js project using create-tina-app.
  - Configure environment variables (.env.local).
  - Verify dev server and basic Tina admin access.
- ⏳ Configuration & Content Migration
  - Copy and adapt tina/config.ts.
  - Copy content/ directory.
  - Regenerate Tina types.
- ⏳ Asset, Code & Style Migration
  - Copy public/ assets.
  - Copy components, hooks, libs.
  - Set up Tailwind CSS and global styles.
  - Install necessary dependencies.
- ⏳ Page Reconstruction & Data Integration
  - Rebuild page structure using Next.js routing.
  - Implement Next.js data fetching with staticRequest.
  - Integrate useTina in client components.
- ⏳ Deployment & Testing
  - Configure Netlify for Next.js build (next build, .next directory).
  - Set environment variables on Netlify.
  - Perform comprehensive testing (local and deployed).

## Success Criteria

The website will be considered successful if it:

- Accurately represents Cochi's Kitchen's brand, story, and offerings
- Provides a seamless, intuitive user experience across all devices
- Maintains fast load times and smooth performance (leveraging Next.js capabilities)
- Effectively communicates essential information (menu, hours, location)
- Successfully captures and processes contact and catering inquiries
- Ranks well in local search results
- Highlights their community involvement and farm-to-table philosophy
- Achieves a Lighthouse score of 90+ across all metrics

## Future Enhancements (Phase 2)

- Instagram feed integration for social media content
- Online ordering system integration
- Blog section for recipes and updates
- Newsletter signup functionality
- Special events calendar
- Dark mode support
- Customer reviews/testimonials submission system
- TinaCMS Enhancements: Image uploads, repeatable items, block-based editing.
