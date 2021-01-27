const path = require("path");
const {
  HotModuleReplacementPlugin
} = require("webpack");
const config =  require('./webpackChain.config')

config.plugin("hot").use(HotModuleReplacementPlugin);
config.mode("development");
config.devServer
  .contentBase(false)
  .host("localhost")
  .hot(true)
  .port(8089)
  .open(true)
  .compress(true)
  .inline(true)
  .overlay(true)
  .publicPath('/')
  .historyApiFallback({
    rewrites: [{ from: /.*/, to: path.posix.join('/', "index.html") }],
  })
  .stats("errors-only");
// config.watch(true)
config.watchOptions({
  ignored: "node_modules/**",
});
module.exports = config.toConfig();
