const config =  require('./webpackChain.config')
config.mode("production");
config.optimization.splitChunks({
 
    cacheGroups: {
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial'
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true
      }
    }
  
})
// config.optimization.splitChunks

module.exports = config.toConfig();
