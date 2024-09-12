import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

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
          postcssPxToViewport({
            unitToConvert: 'px',
            viewportWidth: 1920,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [],
          }),
        ],
      },
    },
  },
})
