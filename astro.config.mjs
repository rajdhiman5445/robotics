import { defineConfig } from 'astro/config';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

function privatePdfDevPlugin() {
  const privatePdfRoot = resolve(process.cwd(), 'private-pdfs');
  const privatePdfPrefix = '/__private-pdf/';

  const handleRequest = (req, res, next) => {
    const requestUrl = req.url ?? '';

    if (!requestUrl.startsWith(privatePdfPrefix)) {
      next();
      return;
    }

    const relativePath = decodeURIComponent(requestUrl.slice(privatePdfPrefix.length));
    const filePath = resolve(privatePdfRoot, relativePath);
    const normalizedRoot = `${privatePdfRoot}${sep}`;

    if (!filePath.startsWith(normalizedRoot) || !existsSync(filePath)) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const stats = statSync(filePath);

    if (!stats.isFile()) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', String(stats.size));
    createReadStream(filePath).pipe(res);
  };

  return {
    name: 'private-pdf-dev',
    configureServer(server) {
      server.middlewares.use(handleRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRequest);
    },
  };
}

export default defineConfig({
  trailingSlash: 'always',
  integrations: [mdx(), tailwind(), vercel()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [privatePdfDevPlugin()],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
