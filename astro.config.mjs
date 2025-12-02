import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://boun-tabi-lifelu.github.io',
  base: '/boun-tabi-dev/',
  outDir: './dist',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
}); 