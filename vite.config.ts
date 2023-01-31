import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

const path = require('path');

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, 'app/javascript/components') },
      { find: '@redux', replacement: path.resolve(__dirname, 'app/javascript/redux') },
      { find: '@routes', replacement: path.resolve(__dirname, 'app/javascript/routes') },
      { find: '@services', replacement: path.resolve(__dirname, 'app/javascript/services') },
    ],
  },
})
