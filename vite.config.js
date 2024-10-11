import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [react({})],
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 3001,
    // //主要是加上这段代码
    // proxy: {
    //   '/p': {
    //     target: 'https://site-work.1017182993.workers.dev', //实际请求地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/p/, ''),
    //   },
    // },
  },
});
