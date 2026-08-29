import { existsSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { getPdfEntries } from '../../lib/pdfs';

const contentRoot = resolve(process.cwd(), 'content');

export function getStaticPaths() {
  return getPdfEntries()
    .filter((pdf) => pdf.assetHref.startsWith('/content-pdf/'))
    .map((pdf) => ({
      params: { path: relative(contentRoot, pdf.filePath).replace(/\\/g, '/') },
    }));
}

export function GET({ params }: { params: { path?: string } }) {
  const requestedPath = params.path ?? '';
  const filePath = resolve(contentRoot, requestedPath);
  const normalizedRoot = `${contentRoot}/`;

  if (!filePath.startsWith(normalizedRoot) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(readFileSync(filePath), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(statSync(filePath).size),
    },
  });
}
