# Robotics Wiki

Personal robotics knowledge base built with Astro, TypeScript, Tailwind CSS, Markdown, and MDX.

## Purpose

This repository is a long-term engineering handbook, not a blog or a note dump.

The goal is to preserve reusable robotics knowledge in a form that is easy to reread years later.

## Content model

The `content/` directory is the source of truth.

Folders are navigators. Markdown files are document screens.

Example:

```text
content/
  concepts/
    linear-algebra/
      index.md
      vectors.md
      matrices.md
  courses/
    math-for-robotics/
      index.md
      week-01.md
```

Rules:

- every folder opens as a navigator
- `index.md` appears as a selectable `Overview` item
- selecting `Overview` opens the markdown document normally
- any sibling Markdown file in the same folder becomes a selectable document
- nested folders are supported at any depth
- frontmatter controls title, description, tags, ordering, and related links

## Navigation

- `src/pages/index.astro` renders the home launcher
- `src/pages/search/index.astro` renders the dedicated search page
- `src/pages/[section]/index.astro` renders top-level navigators
- `src/pages/[...slug].astro` renders nested navigators and document screens
- Escape and Backspace step back through an internal navigation stack
- document screens include lightweight reading settings for text size, width, spacing, and focus mode
- standalone Markdown files remain supported for backward compatibility

## Local development

```bash
npm install
npm run dev
```

## Notes

- the site is static and deployable to Cloudflare Pages or GitHub Pages
- search, breadcrumbs, and launcher items are derived from the filesystem
- `assets/` is for source diagrams and other raw materials
- `public/` contains files that must be served directly
