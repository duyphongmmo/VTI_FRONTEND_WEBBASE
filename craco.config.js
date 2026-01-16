const path = require(`path`)

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
      return webpackConfig
    },
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
}
