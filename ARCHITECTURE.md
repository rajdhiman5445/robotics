# Architecture

## Overview

The site is a static Astro build that turns the filesystem into the knowledge model.

The main rule is simple: folders are navigators and Markdown files are document screens.

## Content structure

The preferred source tree lives under `content/`:

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
  projects/
    visual-odometry/
      index.md
      setup.md
```

Rules:

- every folder renders as a launcher
- every `index.md` appears as a selectable `Overview` item
- selecting `Overview` opens the overview markdown as a normal document
- sibling Markdown files in the same folder become selectable items automatically
- nested folders work at any depth
- frontmatter supplies title, description, tags, ordering, and related pages

## Backward compatibility

Standalone files still work.

That means older pages such as `concepts/calculus.md` remain routable while the folder-based model becomes the preferred structure.

## Routing

- `src/pages/index.astro` renders the home launcher
- `src/pages/search/index.astro` renders the dedicated search page
- `src/pages/[section]/index.astro` renders top-level navigators
- `src/pages/[...slug].astro` renders nested navigators and document screens
- opening a folder resolves to its navigator, not its overview content
- breadcrumbs and search paths are generated from the same filesystem index

## Interaction model

There are two screen types:

- navigator screens are menu-like and keyboard driven
- document screens are quiet and optimized for long sessions

Search is a dedicated page, not a modal.

An internal navigation stack keeps Escape and Backspace predictable across launcher, search, and reading screens.

Document screens expose a small reading settings panel that persists text size, content width, line spacing, and focus mode in localStorage.

## Components

Only a small reusable set is used:

- `Callout`
- `Breadcrumbs`
- `RelatedConcepts`
- `Image`
- `CodeBlock`

They stay intentionally small so most content remains plain Markdown.

## Markdown and MDX

Markdown is configured for:

- headings
- code blocks
- syntax highlighting
- tables
- images
- internal links
- external links
- footnotes

MDX is available for pages that need components without changing the overall content model.

## Search

Search is built from the same filesystem index.

Results search:

- titles
- headings
- tags
- document body text

Results show the full knowledge path, such as:

- `Concepts → Linear Algebra → Eigenvalues`

instead of just the leaf title.

## Future additions

The structure is prepared for later additions without forcing them now:

- `/` can later become a global launcher from anywhere.
- Ctrl+K can later open search from anywhere.
- KaTeX can be added through the Astro markdown pipeline when math pages are needed.
- Mermaid can be introduced as a remark/rehype step for diagram-heavy notes.
- Pagefind can be layered on top of the static output for full-text search.

## Maintainability rules

- Keep content in Markdown unless a page genuinely needs component composition.
- Prefer permanent concept pages over repeated explanations in courses or projects.
- Keep UI changes conservative and focused on navigation clarity and reading comfort.
