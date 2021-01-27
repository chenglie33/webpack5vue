const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyPlugin = require("copy-webpack-plugin");
const {
    IgnorePlugin,
    DefinePlugin,
  } = require("webpack");
const {cssLoader} = require('./webpack.css.config')
const Config = require('webpack-chain');
const config = new Config();
cssLoader(config)

config.target("web");
config
  .entry("index")
  .add("./src/main.js")
  .end()
  .output.path(path.resolve(__dirname, "dist"))
  .filename("[name].bundle.js")
  .publicPath("/")
  .chunkFilename("js/[name].js");
config.plugin("CleanWebpack").use(CleanWebpackPlugin);
config.plugin('copyPlugin').use(CopyPlugin,[{
    patterns:[{
      from: path.resolve(__dirname, "public"),
      to:  "static/",
      toType: 'dir',
      globOptions: {}
    }]
  }])
  config.plugin("HtmlWebpack").use(HtmlWebpackPlugin, [
    {
      title: "Hot Module Replacement",
      template: "public/index.html",
    },
  ]);
  config.plugin("IgnorePlugin").use(IgnorePlugin, [/^\.\/locale$/, /moment$/]);
  config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);
  config.plugin("DefinePlugin").use(DefinePlugin, [
    {
      NODE_ENV: '"development"',
      BASE_URL: '"/"',
    },
  ]);
  config.resolve.alias
  .set("@", path.join(__dirname, "src"))
  .set("vue$", "vue/dist/vue.runtime.esm.js");
config.resolve.extensions.add(".js").add(".vue");

config.module
  .rule("js")
  .test(/\.js$/)
  .exclude.add(/node_modules/)
  .end()
  .use("babel")
  .loader("babel-loader")
  .options({ presets: ["@babel/preset-env"] });
config.module
  .rule("vue")
  .test(/\.vue$/)
  .use("vue")
  .loader("vue-loader")
  .options({
    transformToRequire: {
      video: ["src", "poster"],
      source: "src",
      img: "src",
      image: ["xlink:href", "href"],
      use: ["xlink:href", "href"],
    },
  });

config.module
  .rule("image")
  .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  .use("url")
  .loader("url-loader")
  .options({
    limit: 4096,
    esModule: false,
    fallback: {
      loader: "file-loader",
      options: {
        name: "img/[name].[hash:8].[ext]",
      },
    },
  });
  module.exports = config;