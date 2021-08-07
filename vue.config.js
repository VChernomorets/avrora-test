module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/design/index.scss";'
      }
    }
  },
  productionSourceMap: false
}
