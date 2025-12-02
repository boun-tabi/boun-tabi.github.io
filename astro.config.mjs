import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://boun-tabi.github.io',
  base: '/',
  outDir: './dist',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
}); 