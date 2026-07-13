import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  trailingSlash: 'always',
  integrations: [mdx(), tailwind(), vercel()],
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkGfm],
  },
});
