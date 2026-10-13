# Markdown Formatting Guide

Use this guide for course notes in this directory. It keeps the source
consistent, readable in plain text, and predictable in the app renderer.

## Headings

Use headings to express document structure, not to choose a font size.

```md
# Document title

## 1. Major topic

### 1.1 Subtopic

#### Optional smaller subdivision
```

Use one `#` title per document. Do not skip levels (for example, do not
place a `####` directly below a `##`). The app/theme controls heading
sizes; if a semantically correct heading appears smaller than paragraph
text, that is a CSS/typography issue, not a Markdown issue. Do not
promote a heading level solely to make its text larger.

## Tables

Use pipe tables, with one header row and one separator row. Do not use
space-aligned or dashed fixed-width tables: they can wrap or render as
plain text in Markdown viewers.

```md
| Method | Bias effect | Variance effect |
| --- | --- | --- |
| Bagging | Roughly unchanged | Reduced by averaging |
| Boosting | Often reduced | Can increase |
```

Keep each cell on one line. If a cell becomes too long, shorten the
wording or use a list below the table instead.

## Mathematics

Use `$...$` for inline mathematics and `$$...$$` for a standalone,
centered equation.

```md
The weak learner should have error $\epsilon_t < 0.5$.

$$
H(x)=\operatorname{sign}\left(\sum_{t=1}^{T}\alpha_t h_t(x)\right).
$$
```

Do not use parentheses as a substitute for mathematical notation, such
as `(p>0.5)`. Write `$p>0.5$` instead. Leave a blank line before and
after a display equation; keep the closing `$$` immediately after the
equation unless the renderer requires otherwise.

## Lists

Use `-` for unordered lists and `1.` for ordered lists. Indent nested
items by four spaces.

```md
1. Train a base learner.
2. Aggregate its prediction.
   - Classification: vote.
   - Regression: average.
```

Keep a blank line before a list unless it directly continues a list
item.

## Text, emphasis, and links

- Use `**term**` for a key term on first introduction; avoid bolding
  complete sentences.
- Use backticks for code, filenames, identifiers, and literal commands.
- Use descriptive links: `[course repository](https://example.com)`.
- Wrap prose at a readable width when editing manually; do not insert
  hard line breaks to simulate visual layout.

## Front matter

Keep metadata at the very start of a file, enclosed by `---` lines.

```yaml
---
order: "11"
tags:
  - machine-learning
title: Ensemble Learning
---
```

## Final check

Before committing an edited note, verify that tables render as tables,
heading levels match the document outline, list nesting is intentional,
and inline math is wrapped in `$` delimiters. For repository whitespace
issues, run:

```bash
git diff --check
```
