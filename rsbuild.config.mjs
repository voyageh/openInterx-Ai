import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import pxtorem from 'postcss-pxtorem'

const baseURL = process.env.BASE_URL

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass({
      sassLoaderOptions: {
        additionalData: `
         @import '@/assets/style/mixins/mixins.scss';
        `,
      },
    }),
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
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: baseURL,
        pathRewrite: { '^/api': '' },
      },
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
