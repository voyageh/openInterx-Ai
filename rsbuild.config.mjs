import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginSvgr } from '@rsbuild/plugin-svgr'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  source: {
    alias: {
      '@': './src',
    },
  },
  html: {
    template: 'index.html',
  },
})
