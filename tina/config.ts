import { defineConfig, defineSchema } from "tinacms";
// import type { TinaField } from "tinacms"; // No longer needed with this structure

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Helper function for rich text descriptions (optional, but keeps things DRY)
const richTextDescription = (fieldName: string) =>
  `Rich text content for the ${fieldName}. Supports formatting like bold, italics, lists.`;

// Helper function for simple text descriptions
const stringDescription = (fieldName: string) =>
  `Text content for the ${fieldName}.`;

// Helper function for image descriptions
const imageDescription = (fieldName: string) =>
  `Image for the ${fieldName}. Please upload from the Media Manager.`;

// --- Schema Definition ---
const schema = defineSchema({
  collections: [
    // --- Global Settings Collection ---
    // Stores site-wide settings in a single JSON file.
    {
      label: "Global Settings",
      name: "global",
      path: "content/global", // Standard path for global config
      format: "json",
      ui: {
        // Improves the UI label and behavior for this singleton document
        global: true, // Mark as configuration
        // Prevent users from creating/deleting the single global file
        allowedActions: {
          create: false,
          delete: false,
        },
        // Optional: Direct link in admin sidebar (adjust filename if not index.json)
        // router: () => "/admin/index.html#/collections/global/documents/index",
      },
      fields: [
        {
          type: "string",
          label: "Site Name",
          name: "siteName",
          description:
            "The overall name of the site, used in titles and meta tags.",
        },
        {
          type: "string",
          label: "Header Phone Number",
          name: "headerPhoneNumber",
          description: "Phone number displayed in the header.",
        },
        {
          type: "object",
          label: "Social Links",
          name: "socialLinks",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.platform || "New Social Link",
            }),
            defaultItem: {
              platform: "Facebook",
              url: "https://facebook.com/",
            },
          },
          fields: [
            {
              type: "string",
              label: "Platform",
              name: "platform",
              description: "e.g., Facebook, Instagram, Yelp",
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              description: "Full URL to the social media page",
              required: true,
            },
          ],
        },
        {
          type: "rich-text", // Allow formatting
          label: "Footer Text",
          name: "footerText",
          description: "Text displayed in the site footer (e.g., copyright).",
        },
        // Add other global fields as needed (e.g., default SEO description, logo)
      ],
    },
    // --- Page Content Collection ---
    // Manages individual pages of the site.
    {
      label: "Pages",
      name: "page",
      path: "content/pages", // Standard path for page content
      format: "mdx", // Use MDX for potential component embedding
      ui: {
        // Define how routes are determined from filenames in the admin UI
        router: ({ document }) => {
          // Handle the homepage specifically
          if (document._sys.filename === "home") {
            return `/`;
          }
          // Basic slug generation for other pages
          // return `/${document._sys.filename}`;
          // Return undefined for default routing or implement custom logic
          return undefined;
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          description: "The main title of the page, used for SEO and display.",
          isTitle: true, // Marks this field as the main identifier in the UI
          required: true,
        },
        {
          type: "string",
          label: "SEO Description",
          name: "seoDescription",
          description:
            "Short description for search engines (meta description).",
          ui: {
            component: "textarea",
          },
        },
        // --- Page Sections (Example using Object Fields) ---
        // Group related fields for better organization in the admin UI.
        {
          type: "object",
          label: "Hero Section",
          name: "hero",
          fields: [
            {
              type: "image",
              label: "Background Images",
              name: "images",
              list: true,
              description: "Images for the hero background carousel.",
            },
            {
              type: "string",
              label: "Tagline",
              name: "tagline",
              description: "Main tagline displayed in the hero section.",
            },
            {
              type: "object",
              label: "Call to Action Buttons",
              name: "ctaButtons",
              list: true,
              ui: {
                itemProps: (item) => ({
                  label: item.text || "New Button",
                }),
                defaultItem: {
                  text: "Learn More",
                  url: "/",
                  variant: "primary",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Button Text",
                  name: "text",
                  required: true,
                },
                {
                  type: "string",
                  label: "Button URL",
                  name: "url",
                  required: true,
                },
                {
                  type: "string",
                  label: "Variant",
                  name: "variant",
                  options: ["primary", "secondary", "outline"], // Example variants
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "About Us Section",
          name: "about",
          fields: [
            {
              type: "string",
              label: "Section Label",
              name: "sectionLabel",
              description:
                "Small label above the main title (e.g., 'Our Story').",
            },
            {
              type: "string",
              label: "Title",
              name: "title",
              description: "Main title for the About Us section.",
            },
            {
              type: "rich-text",
              label: "Main Content",
              name: "content",
              description: "The primary text content for the About Us section.",
              isBody: true, // Indicates this is the main content body for MDX
            },
            {
              type: "image",
              label: "Section Image",
              name: "image",
              description: "Optional image accompanying the About Us content.",
            },
            // Add other fields specific to the About Us section if needed
          ],
        },
        // --- Menu Section (Example using Reference or Object List) ---
        /*
        // Option A: Simple Object List (if menu structure is fixed per page)
        {
          type: "object",
          label: "Menu Highlights",
          name: "menuHighlights",
          list: true,
          ui: { itemProps: (item) => ({ label: item.name || "New Item" }) },
          fields: [
            { type: "string", label: "Name", name: "name", required: true },
            { type: "string", label: "Price", name: "price" },
            { type: "string", label: "Description", name: "description" },
            { type: "image", label: "Image", name: "image" },
          ],
        },
        // Option B: Reference (if menu items are managed in a separate collection)
        // This requires defining a 'menuItem' collection first.
        // {
        //   type: "reference",
        //   label: "Featured Menu Items",
        //   name: "featuredMenuItems",
        //   collections: ["menuItem"], // Reference the 'menuItem' collection
        //   list: true,
        // },
        */
        // --- Add more page sections as needed (e.g., Reviews, Location, Contact) ---
      ],
    },
    // --- Example: Separate Menu Item Collection ---
    /*
    {
      label: "Menu Items",
      name: "menuItem",
      path: "content/menuItems",
      format: "md",
      fields: [
        { type: "string", label: "Name", name: "name", isTitle: true, required: true },
        { type: "string", label: "Category", name: "category", options: ["Breakfast", "Lunch", "Drinks"] },
        { type: "string", label: "Price", name: "price" },
        { type: "string", label: "Description", name: "description", ui: { component: "textarea" } },
        { type: "image", label: "Image", name: "image" },
        { type: "boolean", label: "Featured", name: "isFeatured" },
      ],
    },
    */
    // --- Example: Testimonials Collection ---
    /*
    {
      label: "Testimonials",
      name: "testimonial",
      path: "content/testimonials",
      format: "md", // Or json
      fields: [
        { type: "string", label: "Author", name: "author", isTitle: true, required: true },
        { type: "string", label: "Quote", name: "quote", required: true, ui: { component: "textarea" } },
        { type: "datetime", label: "Date", name: "date" },
        { type: "number", label: "Rating", name: "rating", description: "Optional rating (e.g., 1-5)" },
      ],
    },
    */
    // --- Add other collections as needed (e.g., Blog Posts, Team Members) ---
  ],
});

// --- TinaCMS Configuration ---
export default defineConfig({
  branch,
  // Get clientId and token from environment variables
  clientId: process.env.NEXT_PUBLIC_TINACMS_CLIENT_ID!, // Ensure VITE_ prefix is removed
  token: process.env.TINACMS_TOKEN!,

  build: {
    // Relative path to your build output directory (usually .next)
    outputFolder: "admin", // Keep Tina admin build separate
    publicFolder: "public", // Path to your public assets directory
  },
  media: {
    tina: {
      // Path where media assets will be stored relative to the project root
      mediaRoot: "uploads", // Conventionally place uploads in public/uploads
      publicFolder: "public", // Path to public assets directory
      // Optional: Define external media storage like Cloudinary
    },
  },
  // Pass the defined schema to the config
  schema,
  // Optional: Configure search if needed
  // search: {
  //   tina: {
  //     indexerToken: process.env.TINACMS_SEARCH_TOKEN!,
  //     stopwordLanguages: ['eng'],
  //   },
  //   indexBatchSize: 100,
  //   maxSearchIndexFieldLength: 100,
  // },
});
