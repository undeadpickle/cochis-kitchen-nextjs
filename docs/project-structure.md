# Cochi's Kitchen Website - Project Structure Tree (Next.js)

**Note to coding assistant: This tree is a guide and will be a work in progress. Please update as things change.**

cochis-kitchen-nextjs/
├── .env.local # Local environment variables (ignored)
├── .git/ # Git directory (usually hidden)
├── .gitignore # Git ignore rules
├── .next/ # Next.js build output (ignored)
├── .vscode/ # VS Code settings (optional)
├── README.md # Project README
├── components.json # shadcn/ui configuration
├── content/ # TinaCMS content files (Markdown)
│ └── pages/
│ ├── about.md
│ ├── contact.md
│ ├── features.md
│ ├── footer.md
│ ├── hero.md
│ ├── location.md
│ ├── offerings.md
│ └── reviews.md
├── docs/ # Project documentation (PRD, guides, etc.)
│ ├── cochis-kitchen-prd.md
│ └── tech-stack.md
├── node_modules/ # Project dependencies (ignored)
├── next-env.d.ts # Next.js TypeScript declarations
├── next.config.mjs # Next.js configuration
├── package-lock.json # npm lock file (or bun.lockb, yarn.lock)
├── package.json # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration (for Tailwind)
├── public/ # Static assets (images, icons, robots.txt)
│ ├── favicon.ico
│ ├── images/
│ │ ├── README.md
│ │ ├── cochis_kitchen_logo.svg
│ │ ├── cochis_kitchen_logomark.svg
│ │ ├── hero/
│ │ │ └── hero-01.png # ... other hero images
│ │ └── menu/
│ │ └── menu-breakfast-burrito.png # ... other menu images
│ └── robots.txt
├── src/ # Source code (can be root level too)
│ ├── app/ # Next.js App Router directory
│ │ ├── globals.css # Global styles
│ │ ├── layout.tsx # Root layout component
│ │ └── page.tsx # Homepage route component (Server Component)
│ ├── components/ # Reusable React components
│ │ ├── common/ # Shared common components
│ │ │ ├── CategoryDropdown.tsx
│ │ │ └── ImagePopup.tsx
│ │ ├── sections/ # Page section components
│ │ │ ├── About.tsx
│ │ │ ├── Contact.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Hero.tsx
│ │ │ ├── Location.tsx
│ │ │ ├── Menu.tsx
│ │ │ ├── NavBar.tsx
│ │ │ ├── SectionTitle.tsx
│ │ │ ├── Testimonials.tsx
│ │ │ └── TopBar.tsx
│ │ └── ui/ # shadcn/ui components (Button, Card, etc.)
│ │ ├── button.tsx
│ │ └── card.tsx
│ ├── hooks/ # Custom React hooks
│ │ └── use-mobile.tsx
│ └── lib/ # Utility functions
│ └── utils.ts
├── tailwind.config.ts # Tailwind CSS configuration
├── tina/ # TinaCMS configuration and generated client
│ ├── **generated**/ # Auto-generated Tina types/client (ignored)
│ │ ├── client.ts
│ │ └── types.ts
│ └── config.ts # Main TinaCMS configuration file
└── tsconfig.json # TypeScript configuration
