/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import fs from 'fs';

const projectRootDir = path.resolve(__dirname);
const tsLikeAutoAliases = fs.readdirSync(
  path.resolve(__dirname, 'src'), { withFileTypes: true }
).filter(d => d.isDirectory()).reduce((aliases, e) => {
  aliases[e.name] = path.resolve(projectRootDir, 'src', e.name)
  return aliases
}, {});

export default defineConfig({
  plugins: [solidPlugin()],
  clearScreen: false,
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
    alias: tsLikeAutoAliases
  }
});

