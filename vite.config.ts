/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

const projectRootDir = path.resolve(__dirname);

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    setupFiles: './setupVitest.ts',
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '~entities': path.resolve(projectRootDir, 'src/entities'),
      '~services': path.resolve(projectRootDir, 'src/services'),
      '~components': path.resolve(projectRootDir, 'src/components'),
    }
  }
});
