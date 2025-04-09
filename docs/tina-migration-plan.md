# Step-by-Step Plan: Cochi's Kitchen Next.js Migration & TinaCMS Integration

<!-- paste.txt -->

## Table of Contents

- [0. Introduction & Overview](#0-introduction--overview)
  - [0.1. Goal of this Plan](#01-goal-of-this-plan)
  - [0.2. Information for AI Assistant (SSoT)](#02-information-for-ai-assistant-ssot)
  - [0.3. Understanding TinaCMS](#03-understanding-tinacms)
  - [0.4. Prerequisites](#04-prerequisites)
- [Phase 1: New Project Setup (Next.js + TinaCMS)](#phase-1-new-project-setup-nextjs--tinacms)
  - [1.1. Create New Project](#11-create-new-project)
  - [1.2. Configure Environment Variables](#12-configure-environment-variables)
  - [1.3. Verify Scripts](#13-verify-scripts)
  - [1.4. Configure .gitignore](#14-configure-gitignore)
  - [1.5. Initial Dev Server Test](#15-initial-dev-server-test)
- [Phase 2: Configuration & Content Migration](#phase-2-configuration--content-migration)
  - [2.1. Migrate & Adapt tina/config.ts](#21-migrate--adapt-tinaconfigts)
  - [2.2. Migrate content/ Directory](#22-migrate-content-directory)
  - [2.3. Regenerate Tina Types](#23-regenerate-tina-types)
- [Phase 3: Asset, Code & Style Migration](#phase-3-asset-code--style-migration)
  - [3.1. Migrate public/ Assets](#31-migrate-public-assets)
  - [3.2. Migrate Components, Libs, Hooks](#32-migrate-components-libs-hooks)
  - [3.3. Adapt Migrated Code (AI Task)](#33-adapt-migrated-code-ai-task)
  - [3.4. Migrate & Adapt Styles](#34-migrate--adapt-styles)
  - [3.5. Install Dependencies](#35-install-dependencies)
- [Phase 4: Page Reconstruction & Data Integration](#phase-4-page-reconstruction--data-integration)
  - [4.1. Rebuild Page Structure (Routing)](#41-rebuild-page-structure-routing)
  - [4.2. Implement Server-Side Data Fetching (client.queries)](#42-implement-server-side-data-fetching-clientqueries)
  - [4.3. Implement Visual Editing (useTina in Client Components)](#43-implement-visual-editing-usetina-in-client-components)
- [Phase 5: Deployment Setup (Netlify)](#phase-5-deployment-setup-netlify)
  - [5.1. Configure Build Command & Publish Directory](#51-configure-build-command--publish-directory)
  - [5.2. Set Environment Variables on Netlify](#52-set-environment-variables-on-netlify)
- [Phase 6: Testing & Validation](#phase-6-testing--validation)
  - [6.1. Local Admin Interface Testing](#61-local-admin-interface-testing)
  - [6.2. Local Site Preview & Live Editing Test](#62-local-site-preview--live-editing-test)
  - [6.3. Local Save/Commit Test](#63-local-savecommit-test)
  - [6.4. Deployment Build Test](#64-deployment-build-test)
  - [6.5. Deployed Site Test](#65-deployed-site-test)
  - [6.6. Deployed Admin Test](#66-deployed-admin-test)
  - [6.7. End-to-End Content Update Test](#67-end-to-end-content-update-test)
- [Phase 7: Troubleshooting](#phase-7-troubleshooting)
- [Phase 8: Further Resources](#phase-8-further-resources)

## 0. Introduction & Overview

This document outlines the step-by-step plan for migrating the Cochi's Kitchen website from Vite to Next.js and integrating TinaCMS for content management.

### 0.1. Goal of this Plan

To serve as a detailed, sequential technical guide for the AI coding assistant (Gemini) during the implementation, ensuring clarity and providing necessary context for each phase. This document acts as the detailed reference linked from the project checklist.

### 0.2. Information for AI Assistant (SSoT)

This section contains specific project details (acting as the Single Source of Truth) and general instructions for the AI assistant (Gemini).

**Project Details (SSoT):**

- New Project Name: cochis-kitchen-nextjs
- [GitHub Repo:](https://github.com/undeadpickle/cochis-kitchen-nextjs.git)
- Production Website URL: New Netlify site URL (TBD by user after deployment).
- [Original Vite Project Path:](/Users/travisgregory/Projects/cochis-kitchen-tinacms) (Source for copying assets)
- [New Local Project Path:](/Users/travisgregory/Projects/cochis-kitchen-nextjs)
- [Local Dev Server URL:](http://localhost:3000) (Next.js default)
- [Local TinaCMS Admin Dashboard URL:](http://localhost:3000/admin/index.html)
- Development Environment: macOS, Cursor IDE
- Node.js Version: LTS Recommended (e.g., v22.13.1 verified working)
- Package Manager: npm
- TinaCMS Client ID: c70a77d5-357b-4a52-b9fd-f0486a14e757
- TinaCMS Token (Read-Only): 705a75852513ebb68e0c7096f69ccdac299c042c
- Environment Variable (Client ID): NEXT_PUBLIC_TINACMS_CLIENT_ID
- Environment Variable (Token): TINACMS_TOKEN

**General Instructions for AI:**

- Follow this plan sequentially, referring to the [progress checklist](docs/progress-checklist.md) for progress tracking.
- Prioritize Simplicity: Favor straightforward solutions.
- Goal-Oriented Adaptation: Understand the objective of each step. Use provided examples/instructions as strong recommendations, but adapt them based on specific project context, potential library updates, or encountered issues.
- Consult Official Documentation: If provided approaches seem problematic or outdated, consult official [Next.js](https://nextjs.org/docs) and [TinaCMS](https://tina.io/docs/frameworks/next/app-router) documentation before proceeding.
- Ask Questions: If instructions are ambiguous, conflict, or require significant deviation, ask clarifying questions.
- Report Roadblocks: Alert the user promptly if significant issues or necessary deviations from the plan are identified.
- Error Handling & Validation: Implement as needed during code generation.
- Logging/Debugging: Include balanced logging where appropriate.
- Testing Suggestions: Suggest relevant manual testing steps after implementing features or sections.

### 0.3. Understanding TinaCMS

TinaCMS is an open-source, Git-backed headless CMS enabling visual editing. Content is stored in your Git repository (Markdown, JSON). Key features include its headless nature, Git sync, visual editing interface (/admin), and schema-driven content modeling.

### 0.4. Prerequisites

- Node.js LTS installed and active (See 0.2).
- npm installed.
- Git installed and configured.
- GitHub Account (for new repo).
- Netlify Account (for deployment).
- TypeScript familiarity.

## Phase 1: New Project Setup (Next.js + TinaCMS)

Goal: Create a new, functional Next.js project with the basic TinaCMS setup running.

### 1.1. Create New Project

**Action:** Navigate to our new project directory: `/Users/travisgregory/Projects/cochis-kitchen-nextjs`. Run `npx create-tina-app@latest`. Select npm and ⭐ NextJS starter. Run `npm install` if needed.

**Reference:** Guide Section 5.A

### 1.2. Configure Environment Variables

**Action:** Create `.env.local` file in the project root. Add `NEXT_PUBLIC_TINACMS_CLIENT_ID` and `TINACMS_TOKEN` using values from Section 0.2.

**Reference:** Guide Section 5.B

### 1.3. Verify Scripts

**Action:** Check package.json scripts section. Ensure dev script is `tinacms dev -c "next dev"` and build script is `tinacms build && next build`.

**Reference:** Guide Section 5.C

### 1.4. Configure .gitignore

**Action:** Verify `.gitignore` includes `.next/`, `admin/` (if Tina generates it outside .next), and `.env*.local`. Add if missing.

**Reference:** Guide Section 5.D

### 1.5. Initial Dev Server Test

**Action:** Run `npm run dev`. Verify Next.js starts on localhost:3000 and Tina backend on localhost:4001. Access http://localhost:3000/admin in browser.

**Check:** Does the default starter admin panel load without errors? (Should match successful minimal test).

**Reference:** Guide Section 5.E

## Phase 2: Configuration & Content Migration

Goal: Transfer the TinaCMS schema definition and Markdown content files from the old project.

### 2.1. Migrate & Adapt tina/config.ts

**Action:** Copy `tina/config.ts` from the old Vite project's tina/ directory to the new project's tina/ directory, replacing the default.

**AI Task:** Review the copied config.ts. Ensure clientId references `process.env.NEXT_PUBLIC_TINACMS_CLIENT_ID` and token references `process.env.TINACMS_TOKEN`. Verify build.publicFolder and media.publicFolder are "public". The schema.collections should be valid, but consult Tina docs if issues arise with specific field types in the Next.js context.

**Reference:** Guide Section 6.A

### 2.2. Migrate content/ Directory

**Action:** Copy the entire content/ directory from the old Vite project root to the new project root.

**Reference:** Guide Section 6.B

### 2.3. Regenerate Tina Types

**Action:** Stop and restart the dev server (`npm run dev`).

**Check:** Observe terminal output for successful Tina type generation based on the migrated config.ts. Address any errors reported during startup.

**Reference:** Guide Section 6.A (part 3)

## Phase 3: Asset, Code & Style Migration

Goal: Transfer static assets, reusable React code (components, hooks, utils), and styling configuration, adapting where necessary.

### 3.1. Migrate public/ Assets

**Action:** Copy contents (images/, favicon.ico, etc.) from the old project's public/ directory into the new project's public/ directory.

**Reference:** Guide Section 6.C

### 3.2. Migrate Components, Libs, Hooks

**Action:** Copy src/components/, src/hooks/, src/lib/ directories from the old project to the new project's source structure (e.g., under src/).

**Reference:** Guide Section 7.A (part 1)

### 3.3. Adapt Migrated Code (AI Task)

**Action:** Review the copied components, hooks, and utilities. Make necessary adaptations:

- **Imports:** Update relative paths; verify path aliases (@/) work (check tsconfig.json).
- **Routing:** Remove react-router-dom (Link, useNavigate). Plan replacements using next/link, next/navigation.
- **Data Fetching:** Remove useEffect logic used for initial page data fetching. Note components that will need data passed as props.
- **Client Components:** Identify components using hooks/event handlers/browser APIs and add "use client"; directive.

**Reference:** Guide Section 7.A (part 2)

### 3.4. Migrate & Adapt Styles

**Action:** Copy tailwind.config.ts and postcss.config.js to the new project root. Copy global styles from old src/index.css into src/app/globals.css.

**AI Task:** Update tailwind.config.ts content array paths for Next.js structure (e.g., `./src/app/**/*.{js,ts,jsx,tsx,mdx}`, `./src/components/**/*.{js,ts,jsx,tsx,mdx}`). Ensure globals.css is imported in src/app/layout.tsx.

**Reference:** Guide Section 7.B

### 3.5. Install Dependencies

**Action:** Review old package.json. Use `npm install <package-name>` to add required dependencies (Radix, Framer Motion, RHF, Zod, Sonner, etc.) to the new project. Use `npm uninstall <package-name>` to remove Vite/React Router.

**Reference:** Guide Section 7.C

## Phase 4: Page Reconstruction & Data Integration

Goal: Rebuild the website pages using Next.js routing, integrate migrated components, and implement TinaCMS data fetching with visual editing.

### 4.1. Rebuild Page Structure (Routing)

**Action (AI Task):** Create page files/folders in src/app/ corresponding to the site structure (initially, likely just src/app/page.tsx for the main landing page). Import the necessary migrated section components (Hero, Menu, About, etc.) into page.tsx (or a client component it uses) to reconstruct the UI layout.

**Reference:** Guide Section 8.A

### 4.2. Implement Server-Side Data Fetching (client.queries)

**Action (AI Task):** In the main page file (src/app/page.tsx, which is a Server Component), use `await client.queries.page({ relativePath: "..." })` (adjust query name and relativePath based on tina/config.ts and the content file holding the main page data, e.g., "home.md" or "hero.md") to fetch the required data server-side.

**Reference:** Guide Section 8.B (Example provided)

### 4.3. Implement Visual Editing (useTina in Client Components)

**Action (AI Task):**

- Create a Client Component (e.g., home-page-client.tsx) marked with "use client";.
- Pass the full props object (data, query, variables) returned from client.queries in the Server Component (Step 4.2) to this Client Component.
- Inside the Client Component, use the useTina hook with the received props: `const { data } = useTina(props);`.
- Render the actual page sections/components using the data object returned by useTina, ensuring property access (e.g., data.page.title) matches your schema.
- Define appropriate TypeScript types for the props passed between Server and Client components.

**Reference:** Guide Section 8.C (Example provided)

## Phase 5: Deployment Setup (Netlify)

Goal: Configure the Netlify site for successful deployment of the Next.js application and TinaCMS admin panel.

### 5.1. Configure Build Command & Publish Directory

**Action:** In Netlify site settings (UI or netlify.toml), set:

- Build Command: `tinacms build && next build`
- Publish Directory: `.next`

**Reference:** Guide Section 9.A

### 5.2. Set Environment Variables on Netlify

**Action:** In Netlify site settings -> Environment variables, add:

- `NEXT_PUBLIC_TINACMS_CLIENT_ID` (Value from Section 0.2)
- `TINACMS_TOKEN` (Value from Section 0.2)

**Reference:** Guide Section 9.B

## Phase 6: Testing & Validation

Goal: Ensure the migrated site, content editing, and deployment pipeline function correctly.

### 6.1. Local Admin Interface Testing

**Action:** Navigate localhost:3000/admin. Verify collections and fields defined in tina/config.ts appear correctly. Test editing different field types (string, rich-text).

**Reference:** Checklist Item 6.1

### 6.2. Local Site Preview & Live Editing Test

**Action:** View the site (localhost:3000) alongside the admin panel. Make changes in the admin. Verify changes appear in real-time on the site preview via useTina.

**Reference:** Checklist Item 6.2

### 6.3. Local Save/Commit Test

**Action:** Click "Save" in the admin panel. Verify a success notification appears and check Git status/log to confirm changes were committed locally.

**Reference:** Checklist Item 6.3

### 6.4. Deployment Build Test

**Action:** Push changes to the connected GitHub repository branch. Trigger a Netlify build. Monitor the build log for successful execution of `tinacms build` and `next build`.

**Reference:** Checklist Item 6.4

### 6.5. Deployed Site Test

**Action:** Access the Netlify deploy preview URL or production URL. Verify the site loads correctly and displays content fetched via Next.js data fetching.

**Reference:** Checklist Item 6.5

### 6.6. Deployed Admin Test

**Action:** Access /admin on the deployed Netlify URL. Verify login (if applicable) and that the admin interface loads and functions correctly. Check for console errors.

**Reference:** Checklist Item 6.6

### 6.7. End-to-End Content Update Test

**Action:** Make a content change using the deployed admin interface. Save the change. Verify the commit appears in the GitHub repository. Verify Netlify automatically triggers and completes a new build. Verify the content change appears on the live deployed site.

**Reference:** Checklist Item 6.7

## Phase 7: Troubleshooting

(Refer to this section if issues arise)

- **Admin Panel 404**: Check Netlify build logs, tinacms build execution, publish directory, potential need for Netlify build plugin or redirects for /admin.
- **Data Fetching Errors**: Verify client.queries/staticRequest usage, relativePath, schema alignment. Check serverless function logs on Netlify if using SSR.
- **useTina Errors**: Ensure props (data, query, variables) are correctly passed server->client. Ensure component has "use client";.
- **Build Errors**: Check dependencies, Next.js/React/TinaCMS compatibility, env var prefixes. Check Node version alignment between local and Netlify.

## Phase 8: Further Resources

- TinaCMS Official Documentation: https://tina.io/docs/
- TinaCMS Next.js Guide: https://tina.io/docs/frameworks/next/app-router
- Next.js Documentation: https://nextjs.org/docs
- TinaCMS GitHub Repository: https://github.com/tinacms/tinacms
- Community Discord: Link available on the TinaCMS website.
