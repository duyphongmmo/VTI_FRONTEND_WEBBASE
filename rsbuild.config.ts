import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { ProvidePlugin } from '@rspack/core'

// import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

// const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr({ mixedImport: true }), pluginSass()],
  source: {
    define: { process },
    alias: {
      '~': './src',
    },
    transformImport: [
      {
        libraryName: 'lodash',
        customName: 'lodash/{{ member }}',
      },
    ],
  },
  tools: {
    rspack: (cfg) => {
      cfg.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
      cfg.plugins.push(
        new ProvidePlugin({
          _: 'lodash',
        }),
      )
      return cfg
    },
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
  html: {
    template: './public/index_rsbuild.html',
  },
})
