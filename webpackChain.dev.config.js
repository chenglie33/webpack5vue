const path = require("path");
const {
  HotModuleReplacementPlugin,
  IgnorePlugin,
  DefinePlugin,
} = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
  .filename("[name].bundle.js")
  .publicPath("/")
  .chunkFilename("js/[name].js");
config.watchOptions({
  ignored: /node_modules/,
});
config.plugin("CleanWebpack").use(CleanWebpackPlugin);
config.plugin("hot").use(HotModuleReplacementPlugin);
config.plugin("HtmlWebpack").use(HtmlWebpackPlugin, [
  {
    title: "Hot Module Replacement",
    template: "index.html",
  },
]);
config.plugin("IgnorePlugin").use(IgnorePlugin, [/^\.\/locale$/, /moment$/]);
config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);
config.plugin("DefinePlugin").use(DefinePlugin, [
  {
    "process.env": {
      NODE_ENV: '"development"',
      BASE_URL: '"/"',
    },
  },
]);
// config.plugin("CopyPlugin").use(CopyWebpackPlugin,[
//   [
//     {
//       from: path.join(__dirname, "public"),
//       to: path.join(__dirname, "dist"),
//       toType: 'dir',
//       ignore: [
//         '.DS_Store',
//         {
//           glob: 'index.html',
//           matchBase: false
//         }
//       ]
//     }
//   ]
// ])
config.devServer
  .contentBase(false)
  .hot(true)
  .port(8089)
  .open(true)
  .compress(true)
  .overlay(true);
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
  .rule("css")
  .test(/\.css$/)
  .use("style")
  .loader("style-loader")
  .end()
  .use("cssloader")
  .loader("css-loader");

const types = ["vue-modules", "vue", "normal-modules", "normal"];
// types.forEach((item) => {
config.module
  .rule("less")
  .test(/\.less$/)
  .oneOf("vue-modules")
  .resourceQuery(/module/)
  .use("vue-style")
  .loader("vue-style-loader")
  .end()
  .use("style")
  .loader("style-loader")
  .end()
  .use("cssloader")
  .loader("css-loader")
  
  .end()
  .use("postcss-loader")
  .loader("postcss-loader")
  .end()
  .use("lessloader")
  .loader("less-loader")
  .end()
  .end()
  .oneOf("normal")
  .use("vue-style")
  .loader("vue-style-loader")
  .end()
  .use("style")
  .loader("style-loader")
  .end()
  .use("cssloader")
  .loader("css-loader")
  
  .end()
  .use("postcss-loader")
  .loader("postcss-loader")
  .end()
  .use("lessloader")
  .loader("less-loader")
  .end()
  .end()
  .oneOf("vue")
  .resourceQuery(/\?vue/)
  .use("vue-style")
  .loader("vue-style-loader")
  .end()
  .use("style")
  .loader("style-loader")
  .end()
  .use("cssloader")
  .loader("css-loader")
  
  .end()
  .use("postcss-loader")
  .loader("postcss-loader")
  .end()
  .use("lessloader")
  .loader("less-loader")
  .end()
  .end()
  .oneOf("normal-modules")
  .test(/\.module\.\w+$/)
  .use("vue-style")
  .loader("vue-style-loader")
  .end()
  .use("style")
  .loader("style-loader")
  .end()
  .use("cssloader")
  .loader("css-loader")
  
  .end()
  .use("postcss-loader")
  .loader("postcss-loader")
  .end()
  .use("lessloader")
  .loader("less-loader")
  .end()
  .end();
// });

// config.module
//   .rule("less")
//   .test(/\.less$/)
//   .use("vue-style-loader")
//     .loader("vue-style-loader")
//     .end()
//   .use("style")
//   .loader("style-loader")
//   .end()
//   .use("cssloader")
//   .loader("css-loader")
//   .end()
//   .use("lessloader")
//   .loader("less-loader");
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
module.exports = config.toConfig();
