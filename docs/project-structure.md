# Cochi's Kitchen Website - Project Structure Tree (Next.js)

**Note to coding assistant: This tree is a guide and will be a work in progress. Please update as things change.**

cochis-kitchen-nextjs/
├── .env.local # Local environment variables (ignored)
├── .git/ # Git directory (usually hidden)
├── .gitignore # Git ignore rules
├── .next/ # Next.js build output (ignored)
├── .vscode/ # VS Code settings (optional)
├── README.md # Project README
├── app/ # Next.js App Router directory
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout component
│ ├── page.tsx # Homepage route component (Server Component)
│ ├── home-page-client.tsx # Client component for homepage
│ ├── about/
│ │ └── page.tsx
│ ├── contact/
│ │ └── page.tsx
│ ├── location/
│ │ └── page.tsx
│ ├── menu/
│ │ └── page.tsx
│ ├── reviews/
│ │ └── page.tsx
│ └── [...urlSegments]/ # Catch-all route
│ ├── client-page.tsx # Generic client component
│ └── page.tsx
├── components/ # Reusable React components
│ ├── common/ # Shared common components (Example - adjust as needed)
│ │ └── ImagePopup.tsx
│ ├── layout/ # Layout specific components
│ │ ├── container.tsx
│ │ ├── layout.tsx
│ │ └── layout-context.tsx
│ ├── nav/ # Navigation components
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ └── nav-items.tsx # (If needed later)
│ ├── sections/ # Page section components (Migrated - verify/adjust content)
│ │ ├── about.tsx
│ │ ├── contact.tsx
│ │ ├── features.tsx # (If used)
│ │ ├── hero.tsx
│ │ ├── location.tsx
│ │ ├── menu.tsx
│ │ └── testimonials.tsx # (If used)
│ ├── ui/ # shadcn/ui components (or other UI library) - Examples
│ │ ├── button.tsx
│ │ └── card.tsx
│ └── blocks.tsx # Generic block renderer (from starter - likely remove/refactor)
│ └── icon.tsx # Icon component (from starter - verify usage)
│ └── raw-renderer.tsx # Raw data renderer (from starter - remove?)
├── components.json # shadcn/ui configuration (If using)
├── content/ # TinaCMS content files
│ ├── global/
│ │ └── index.json # Global site settings
│ └── pages/
│ ├── home.mdx # Use .mdx for potential component embedding
│ ├── about.mdx # (Placeholder - to be created)
│ ├── contact.mdx # (Placeholder - to be created)
│ ├── location.mdx # (Placeholder - to be created)
│ ├── offerings.mdx # (Placeholder - to be created)
│ └── reviews.mdx # (Placeholder - to be created)
├── docs/ # Project documentation (PRD, guides, etc.)
│ ├── prd.md # (was cochis-kitchen-prd.md)
│ ├── progress-checklist.md
│ ├── project-structure.md # (This file)
│ └── tina-migration-plan.md
├── hooks/ # Custom React hooks (Migrated)
│ └── use-mobile.tsx # (Example - verify)
├── lib/ # Utility functions (Migrated)
│ └── utils.ts # (Example - verify)
├── node_modules/ # Project dependencies (ignored)
├── next-env.d.ts # Next.js TypeScript declarations
├── next.config.mjs # Next.js configuration
├── package-lock.json # npm lock file
├── package.json # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration (for Tailwind)
├── public/ # Static assets (images, icons, robots.txt)
│ ├── favicon.ico
│ ├── images/ # (Migrated content - verify)
│ │ ├── README.md
│ │ ├── cochis_kitchen_logo.svg
│ │ └── cochis_kitchen_logomark.svg
│ └── robots.txt
├── tailwind.config.ts # Tailwind CSS configuration
├── tina/ # TinaCMS configuration and generated client
│ ├── **generated**/ # Auto-generated Tina types/client (ignored)
│ │ ├── client.ts
│ │ └── types.ts
│ └── config.ts # Main TinaCMS configuration file
└── tsconfig.json # TypeScript configuration
