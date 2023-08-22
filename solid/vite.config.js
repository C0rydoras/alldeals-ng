import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  server: {
    port: 4200,
  },
  plugins: [solid()],
  host: true,
});
