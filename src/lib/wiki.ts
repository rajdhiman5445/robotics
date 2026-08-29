import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getPdfEntries } from './pdfs';

export type SectionKey =
  | 'concepts'
  | 'courses'
  | 'projects'
  | 'papers'
  | 'cheatsheets'
  | 'templates';

export type HeadingEntry = {
  depth: number;
  slug: string;
  text: string;
};

export type DocFrontmatter = {
  title: string;
  description?: string;
  order?: number;
  tags?: string[];
  related?: string[];
  draft?: boolean;
};

export type DocEntry = {
  href: string;
  slug: string[];
  sourceSlug: string[];
  section: SectionKey;
  title: string;
  description: string;
  order: number;
  tags: string[];
  related: string[];
  draft: boolean;
  filePath: string;
  isIndex: boolean;
  folderSlug: string[];
  parentSlug: string[];
  navigatorHref: string;
  Content: any;
  headings: HeadingEntry[];
  searchText: string;
};

export type SearchEntry = {
  title: string;
  href: string;
  path: string;
  section: string;
  tags: string[];
  searchText: string;
};

export type NavigatorItem = {
  label: string;
  href: string;
  kind: 'overview' | 'folder' | 'document';
  order: number;
};

type DocModule = {
  default?: any;
  frontmatter: Partial<DocFrontmatter> & Record<string, unknown>;
  headings?: HeadingEntry[];
};

type FolderNode = {
  slug: string[];
  parentSlug: string[];
  childFolderKeys: Set<string>;
  docHrefs: Set<string>;
  indexDocHref?: string;
  title: string;
};

export const mainSections: Array<{
  key: Exclude<SectionKey, 'templates'>;
  label: string;
  description: string;
}> = [
  {
    key: 'concepts',
    label: 'Concepts',
    description: 'Foundational ideas to relearn, not just revisit.',
  },
  {
    key: 'courses',
    label: 'Courses',
    description: 'Structured study notes that point back to core concepts.',
  },
  {
    key: 'projects',
    label: 'Projects',
    description: 'Build logs and implementation notes linked to theory.',
  },
  {
    key: 'papers',
    label: 'Papers',
    description: 'Paper summaries with the background needed to reread them.',
  },
  {
    key: 'cheatsheets',
    label: 'Cheat Sheets',
    description: 'Compact references for commands, formulas, and workflows.',
  },
];

export const allSections: Array<{
  key: SectionKey;
  label: string;
  description: string;
  visible: boolean;
}> = [
  ...mainSections.map((section) => ({ ...section, visible: true })),
  {
    key: 'templates',
    label: 'Templates',
    description: 'Drafting structures and page blueprints.',
    visible: false,
  },
];

const contentModules = {
  ...import.meta.glob<DocModule>('/content/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/content/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/concepts/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/concepts/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/courses/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/courses/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/projects/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/projects/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/papers/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/papers/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/cheatsheets/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/cheatsheets/**/*.mdx', { eager: true }),
  ...import.meta.glob<DocModule>('/templates/**/*.md', { eager: true }),
  ...import.meta.glob<DocModule>('/templates/**/*.mdx', { eager: true }),
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitle(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toPathHref(slug: string[]) {
  return `/${slug.join('/')}/`;
}

function normalizeFilePath(filePath: string) {
  if (filePath.startsWith('/content/')) return filePath.slice('/content/'.length);
  return filePath.replace(/^\//, '');
}

function extractHeadings(filePath: string): HeadingEntry[] {
  const source = readFileSync(join(process.cwd(), filePath), 'utf8');
  const lines = source.split(/\r?\n/);
  const headings: HeadingEntry[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of lines) {
    if (/^```/.test(line) || /^~~~/.test(line)) {
      inFence = !inFence;
      continue;
    }

    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
    const baseSlug = slugify(text) || 'section';
    const count = seen.get(baseSlug) ?? 0;
    seen.set(baseSlug, count + 1);
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    headings.push({ depth, slug, text });
  }

  return headings;
}

function extractSearchText(filePath: string) {
  const source = readFileSync(join(process.cwd(), filePath), 'utf8');
  return source
    .replace(/^---[\s\S]*?\n---\s*\n?/, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[>*-]\s+/gm, '')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/[*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function folderKey(slug: string[]) {
  return slug.join('/');
}

function folderPrefixes(slug: string[]) {
  const prefixes: string[][] = [];

  for (let index = 1; index <= slug.length; index += 1) {
    prefixes.push(slug.slice(0, index));
  }

  return prefixes;
}

function buildDocEntry(filePath: string, mod: DocModule): DocEntry {
  const normalized = normalizeFilePath(filePath).replace(/\.(md|mdx)$/, '');
  const sourceSlug = normalized.split('/').filter(Boolean);
  const isIndex = sourceSlug.at(-1) === 'index';
  const folderSlug = sourceSlug.slice(0, -1);
  const slug = isIndex ? [...folderSlug, 'overview'] : sourceSlug;
  const section = slug[0] as SectionKey;
  const fallbackTitle = isIndex
    ? toTitle(folderSlug.at(-1) ?? 'Index')
    : toTitle(sourceSlug.at(-1) ?? 'Wiki');

  return {
    href: toPathHref(slug),
    slug,
    sourceSlug,
    section,
    title: mod.frontmatter.title ?? fallbackTitle,
    description: mod.frontmatter.description ?? '',
    order: mod.frontmatter.order ?? 999,
    tags: mod.frontmatter.tags ?? [],
    related: mod.frontmatter.related ?? [],
    draft: mod.frontmatter.draft ?? false,
    filePath,
    isIndex,
    folderSlug,
    parentSlug: folderSlug,
    navigatorHref: folderSlug.length > 0 ? toPathHref(folderSlug) : '/',
    Content: mod.default ?? mod,
    headings: mod.headings ?? extractHeadings(filePath),
    searchText: extractSearchText(filePath),
  };
}

const docsByHref = new Map<string, DocEntry>();

for (const [filePath, mod] of Object.entries(contentModules)) {
  const entry = buildDocEntry(filePath, mod);
  const existing = docsByHref.get(entry.href);
  const nextPriority = filePath.startsWith('/content/') ? 2 : 1;
  const existingPriority = existing?.filePath.startsWith('/content/') ? 2 : 1;

  if (!existing || nextPriority > existingPriority) {
    docsByHref.set(entry.href, entry);
  }
}

export const docs = [...docsByHref.values()]
  .filter((doc) => !doc.draft)
  .sort((a, b) => {
    const sectionRank = (section: SectionKey) => {
      const index = allSections.findIndex((entry) => entry.key === section);
      return index === -1 ? 99 : index;
    };

    if (a.section !== b.section) {
      return sectionRank(a.section) - sectionRank(b.section);
    }

    if (a.folderSlug.join('/') !== b.folderSlug.join('/')) {
      return a.folderSlug.join('/').localeCompare(b.folderSlug.join('/'));
    }

    if (a.isIndex !== b.isIndex) return a.isIndex ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

const docBySlug = new Map(docs.map((doc) => [doc.slug.join('/'), doc] as const));
const folderNodes = new Map<string, FolderNode>();

function ensureFolderNode(slug: string[]) {
  const key = folderKey(slug);
  const existing = folderNodes.get(key);
  if (existing) return existing;

  const node: FolderNode = {
    slug: [...slug],
    parentSlug: slug.slice(0, -1),
    childFolderKeys: new Set(),
    docHrefs: new Set(),
    title:
      slug.length === 1
        ? getSectionMeta(slug[0])?.label ?? toTitle(slug[0])
        : toTitle(slug.at(-1) ?? ''),
  };

  folderNodes.set(key, node);
  return node;
}

for (const section of allSections) {
  ensureFolderNode([section.key]);
}

for (const doc of docs) {
  for (const prefix of folderPrefixes(doc.folderSlug)) {
    const node = ensureFolderNode(prefix);

    if (prefix.length === doc.folderSlug.length) {
      node.docHrefs.add(doc.href);

      if (doc.isIndex) {
        node.indexDocHref = doc.href;
      }
    }

    const parentSlug = prefix.slice(0, -1);
    if (parentSlug.length > 0) {
      ensureFolderNode(parentSlug).childFolderKeys.add(folderKey(prefix));
    }
  }
}

for (const pdf of getPdfEntries()) {
  for (const prefix of folderPrefixes(pdf.folderSlug)) {
    ensureFolderNode(prefix);
    const parentSlug = prefix.slice(0, -1);
    if (parentSlug.length > 0) {
      ensureFolderNode(parentSlug).childFolderKeys.add(folderKey(prefix));
    }
  }
}

const folderOrderCache = new Map<string, number>();

function getFolderOrder(slug: string[]) {
  const key = folderKey(slug);
  const cached = folderOrderCache.get(key);
  if (cached !== undefined) return cached;

  const node = folderNodes.get(key);
  if (!node) return 999;

  let order = 999;

  if (node.indexDocHref) {
    order = Math.min(order, docsByHref.get(node.indexDocHref)?.order ?? 999);
  }

  for (const href of node.docHrefs) {
    const doc = docsByHref.get(href);
    if (doc && !doc.isIndex) {
      order = Math.min(order, doc.order);
    }
  }

  for (const childKey of node.childFolderKeys) {
    order = Math.min(order, getFolderOrder(childKey.split('/')));
  }

  folderOrderCache.set(key, order);
  return order;
}

function getFolderTitle(slug: string[]) {
  if (slug.length === 0) return 'Home';
  if (slug.length === 1) {
    return getSectionMeta(slug[0])?.label ?? toTitle(slug[0]);
  }

  const node = folderNodes.get(folderKey(slug));
  const indexDoc = node?.indexDocHref ? docsByHref.get(node.indexDocHref) : undefined;
  return indexDoc?.title ?? toTitle(slug.at(-1) ?? '');
}

function getOverviewLabel(doc: DocEntry) {
  return doc.isIndex ? 'Overview' : doc.title;
}

function getSearchPath(doc: DocEntry) {
  const sectionLabel = getSectionMeta(doc.section)?.label ?? toTitle(doc.section);
  const folderLabels = doc.folderSlug.map((_, index) => getFolderTitle(doc.folderSlug.slice(0, index + 1)));
  const terminalLabel = doc.isIndex ? 'Overview' : doc.title;

  return [sectionLabel, ...folderLabels, terminalLabel].join(' → ');
}

export function getDocByHref(href: string) {
  return docsByHref.get(href);
}

export function getDocBySlug(slug: string[] | string) {
  const key = Array.isArray(slug) ? slug.join('/') : slug;
  return docBySlug.get(key);
}

export function getSectionMeta(section: string) {
  return allSections.find((entry) => entry.key === section);
}

export function getSectionHref(section: string) {
  return `/${section}/`;
}

export function getNavigatorItemsForSlug(slug: string[]) {
  const node = folderNodes.get(folderKey(slug));
  if (!node) return [];

  const items: NavigatorItem[] = [];

  if (node.indexDocHref) {
    const overview = docsByHref.get(node.indexDocHref);
    if (overview) {
      items.push({
        label: 'Overview',
        href: overview.href,
        kind: 'overview',
        order: overview.order,
      });
    }
  }

  const childFolders = [...node.childFolderKeys]
    .map((key) => folderNodes.get(key))
    .filter((value): value is FolderNode => Boolean(value))
    .sort((a, b) => {
      const orderDelta = getFolderOrder(a.slug) - getFolderOrder(b.slug);
      if (orderDelta !== 0) return orderDelta;
      return getFolderTitle(a.slug).localeCompare(getFolderTitle(b.slug));
    });

  for (const childFolder of childFolders) {
    items.push({
      label: getFolderTitle(childFolder.slug),
      href: toPathHref(childFolder.slug),
      kind: 'folder',
      order: getFolderOrder(childFolder.slug),
    });
  }

  const childDocs = [...node.docHrefs]
    .map((href) => docsByHref.get(href))
    .filter((value): value is DocEntry => Boolean(value) && !value.isIndex)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });

  for (const childDoc of childDocs) {
    items.push({
      label: childDoc.title,
      href: childDoc.href,
      kind: 'document',
      order: childDoc.order,
    });
  }

  for (const pdf of getPdfEntries()
    .filter((entry) => entry.folderSlug.join('/') === folderKey(slug))
    .sort((a, b) => a.title.localeCompare(b.title))) {
    items.push({
      label: pdf.title,
      href: pdf.href,
      kind: 'document',
      order: 999,
    });
  }

  return items;
}

export function getNavigatorData(slug: string[]) {
  const parentSlug = slug.slice(0, -1);
  const isRootSection = slug.length === 1;

  return {
    title: getFolderTitle(slug),
    backLabel: isRootSection ? 'Home' : getFolderTitle(parentSlug),
    backHref: isRootSection ? '/' : toPathHref(parentSlug),
    items: getNavigatorItemsForSlug(slug),
  };
}

export function getNavigatorSlugs() {
  return [...folderNodes.values()]
    .map((node) => node.slug)
    .filter((slug) => slug.length > 1)
    .sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      return folderKey(a).localeCompare(folderKey(b));
    });
}

export function getSectionEntries(section: string) {
  return getNavigatorItemsForSlug([section]);
}

export function getTrailForDoc(doc: DocEntry) {
  const trail = [
    {
      label: 'Home',
      href: '/',
    },
  ];

  for (let depth = 0; depth < doc.folderSlug.length; depth += 1) {
    const folderSlug = doc.folderSlug.slice(0, depth + 1);
    trail.push({
      label: getFolderTitle(folderSlug),
      href: toPathHref(folderSlug),
    });
  }

  trail.push({
    label: doc.isIndex ? 'Overview' : doc.title,
    href: doc.href,
  });

  return trail;
}

export function getSearchEntries() {
  return docs.map((doc) => ({
    title: doc.title,
    path: getSearchPath(doc),
    href: doc.href,
  }));
}

export function getSearchRecords(): SearchEntry[] {
  return docs.map((doc) => ({
    title: doc.title,
    href: doc.href,
    path: getSearchPath(doc),
    section: getSectionMeta(doc.section)?.label ?? toTitle(doc.section),
    tags: doc.tags,
    searchText: [doc.title, doc.description, doc.tags.join(' '), doc.headings.map((heading) => heading.text).join(' '), doc.searchText]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }));
}

export function getDocsBySection(section: string) {
  return getSectionEntries(section);
}

export function getChildrenForSlug(slug: string[]) {
  return getNavigatorItemsForSlug(slug);
}
