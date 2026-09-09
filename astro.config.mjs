import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fin-ele-method-website.vercel.app',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
