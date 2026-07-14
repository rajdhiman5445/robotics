import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

export type PdfEntry = {
  title: string;
  href: string;
  assetHref: string;
  slug: string[];
  folderSlug: string[];
  parentSlug: string[];
  filePath: string;
  path: string;
};

type PdfRecord = {
  title: string;
  href: string;
  assetHref: string;
  slug: string[];
  folderSlug: string[];
  parentSlug: string[];
  filePath: string;
  path: string;
  isPrivate: boolean;
};

const publicPdfRoot = join(process.cwd(), 'public', 'pdfs');
const privatePdfRoot = join(process.cwd(), 'private-pdfs');
const includePrivatePdfs = import.meta.env.DEV;
const privatePdfAssetRoot = '/__private-pdf';

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

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];

  const items = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (item.isFile() && /\.pdf$/i.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function buildPdfRecord(filePath: string, pdfRoot: string, isPrivate: boolean): PdfRecord {
  const relativePath = relative(pdfRoot, filePath).replace(/\\/g, '/');
  const sourceSegments = relativePath.replace(/\.pdf$/i, '').split('/').filter(Boolean);
  const slug = sourceSegments.map((segment) => slugify(segment) || 'pdf');
  const title = toTitle(sourceSegments.at(-1) ?? 'PDF');
  const folderSlug = slug.slice(0, -1);
  const path = ['PDFs', ...(isPrivate ? ['Private'] : []), ...folderSlug.map(toTitle)].join(' › ');
  const assetRoot = isPrivate ? privatePdfAssetRoot : '/pdfs';

  return {
    title,
    href: `/pdfs/${slug.join('/')}/`,
    assetHref: encodeURI(`${assetRoot}/${relativePath}`),
    slug,
    folderSlug,
    parentSlug: folderSlug,
    filePath,
    path,
    isPrivate,
  };
}

const pdfRecords = [
  ...walk(publicPdfRoot).map((filePath) => buildPdfRecord(filePath, publicPdfRoot, false)),
  ...(includePrivatePdfs
    ? walk(privatePdfRoot).map((filePath) => buildPdfRecord(filePath, privatePdfRoot, true))
    : []),
].sort((a, b) => {
  if (a.folderSlug.join('/') !== b.folderSlug.join('/')) {
    return a.folderSlug.join('/').localeCompare(b.folderSlug.join('/'));
  }

  if (a.isPrivate !== b.isPrivate) {
    return Number(a.isPrivate) - Number(b.isPrivate);
  }

  return a.title.localeCompare(b.title);
});

const pdfByHref = new Map(pdfRecords.map((record) => [record.href, record] as const));
const pdfBySlug = new Map(pdfRecords.map((record) => [record.slug.join('/'), record] as const));

export function getPdfEntries() {
  return pdfRecords;
}

export function getPdfByHref(href: string) {
  return pdfByHref.get(href);
}

export function getPdfBySlug(slug: string[] | string) {
  const key = Array.isArray(slug) ? slug.join('/') : slug;
  return pdfBySlug.get(key);
}

export function getPdfTrail(pdf: PdfEntry) {
  const trail = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'PDFs',
      href: '/pdfs/',
    },
  ];

  for (let depth = 0; depth < pdf.folderSlug.length; depth += 1) {
    trail.push({
      label: toTitle(pdf.folderSlug[depth] ?? ''),
    });
  }

  trail.push({
    label: pdf.title,
  });

  return trail;
}
