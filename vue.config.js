const { defineConfig } = require('@vue/cli-service')

const entryPath = 'examples/entry.js'

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: entryPath,
      filename: 'index.html',
      template: 'public/index.html'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
})
