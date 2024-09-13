import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import pxtorem from 'postcss-pxtorem'

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
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          pxtorem({
            rootValue: 16,
            propList: ['*'],
          }),
        ],
      },
    },
  },
})
