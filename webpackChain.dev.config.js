const path = require("path");
const {
  HotModuleReplacementPlugin,
  IgnorePlugin,
  DefinePlugin,
} = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const Config = require("webpack-chain");
const config = new Config();

config.mode("development");
config
  .entry("index")
  .add("./src/main.js")
  .end()
  .output.path(path.resolve(__dirname, "dist"))
  .filename("[name].bundle.js");
config.watchOptions({
  ignored: /node_modules/,
});
config.plugin("CleanWebpackPlugin").use(CleanWebpackPlugin);
config.plugin("hot").use(HotModuleReplacementPlugin);
config.plugin("HtmlWebpackPlugin").use(HtmlWebpackPlugin, {
  title: "Hot Module Replacement",
  template: "index.html",
});
config.plugin("IgnorePlugin").use(IgnorePlugin, [/^\.\/locale$/, /moment$/]);
config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);
config.plugin("DefinePlugin").use(DefinePlugin, {
  "process.env": {
    NODE_ENV: '"development"',
    BASE_URL: '"/"',
  },
});
config.devServer
  .contentBase(false)
  .hot(true)
  .port(8080)
  .open(true)
  .compress(true)
  .overlay(true);
config.resolve.alias
  .set("@", path.join(__dirname, "src"))
  .set("vue$", "vue/dist/vue.runtime.esm.js");
config.resolve.extensions.add(".js").add(".vue");

module.exports = config.toConfig();
