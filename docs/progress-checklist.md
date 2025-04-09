# TinaCMS Migration Project Checklist (Next.js)

This checklist outlines the phases and tasks for migrating the Cochi's Kitchen website to Next.js and integrating TinaCMS. Refer to the Migration Plan document located at `docs/tina-migration-plan.md` for detailed instructions on each step.

## Phase 1: Next.js Migration & TinaCMS Integration

### 1. New Project Setup (Next.js + TinaCMS)

- [x] Create new Next.js project using `create-tina-app` (See Plan 1.1)
- [x] Configure environment variables (`.env.local`) (See Plan 1.2)
- [x] Verify `package.json` scripts (See Plan 1.3)
- [x] Configure `.gitignore` (See Plan 1.4)
- [x] Confirm local dev server and basic Tina admin access (See Plan 1.5)

### 2. Configuration & Content Migration

- [x] Copy and adapt `tina/config.ts` (See Plan 2.1)
- [x] Copy `content/` directory (See Plan 2.2)
- [x] Regenerate Tina types (See Plan 2.3)

### 3. Asset, Code & Style Migration

- [x] Copy `public/` assets (See Plan 3.1)
- [x] Copy components, hooks, libs (See Plan 3.2)
- [ ] Adapt migrated code (Imports, Routing, Fetching Logic, Client Components) (See Plan 3.3)
- [x] Migrate & Adapt Styles (Tailwind config, Global CSS) (See Plan 3.4)
- [x] Install necessary dependencies & remove unused ones (See Plan 3.5)

### 4. Page Reconstruction & Data Integration

- [ ] Rebuild page structure using Next.js routing (See Plan 4.1)
- [ ] Implement Next.js server-side data fetching with `client.queries` (See Plan 4.2)
- [ ] Integrate `useTina` in Client Components for visual editing (See Plan 4.3)

### 5. Deployment Setup (Netlify)

- [ ] Configure Netlify Build Command & Publish Directory (See Plan 5.1)
- [ ] Set Environment Variables on Netlify (See Plan 5.2)

### 6. Testing & Validation

- [ ] Test local admin interface (View/Edit Content) (See Plan 6.1)
- [ ] Test local site preview & live editing (See Plan 6.2)
- [ ] Test local saving/committing changes (See Plan 6.3)
- [ ] Test deployment build on Netlify (See Plan 6.4)
- [ ] Test deployed site loading & content (See Plan 6.5)
- [ ] Test deployed admin functionality (See Plan 6.6)
- [ ] Test end-to-end content update workflow (Deployed Admin -> GitHub -> Live Site) (See Plan 6.7)

## Phase 2: Future Enhancements (Out of Scope for Phase 1)

- [ ] Implement Image Uploads / Media Management via TinaCMS.
- [ ] Enable adding/deleting repeatable items (e.g., Menu Items, Testimonials) via TinaCMS.
- [ ] Explore and potentially implement block-based editing using Templates for more flexible page layouts.
