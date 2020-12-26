const path = require('path');
const { HotModuleReplacementPlugin, IgnorePlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: false,
        // publicPath: './dist',
        hot: true,
        port: 8080,
        open: true,
        // hotOnly: true,
        compress: true,
        overlay: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: 'index.html'
        }),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new DefinePlugin(
            {
              'process.env': {
                NODE_ENV: '"development"',
                BASE_URL: '"/"'
              }
            }
          )
    ],
    module: {
        rules: [
            // babel使用runtime，避免将不需要的代码注入
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        // plugins: [
                        //     '@babel/plugin-transform-runtime',
                        //     ['import', {
                        //         "libraryName": "antd",
                        //         "style": true,   // or 'css'
                        //     }, 'antd']
                        // ]
                    }
                }],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        // options: {
                        //     lessOptions: {
                        //         modifyVars: {
                        //             'primary-color': '#4608e2',
                        //             'link-color': '#4608e2',
                        //             'border-radius-base': '20px',
                        //         },
                        //         javascriptEnabled: true,
                        //     }
                        // }
                    }],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.join(__dirname, 'src'),
            vue$: 'vue/dist/vue.runtime.esm.js'
          }
    },
};

path.join(__dirname, 'src/assets')


module.exports = (env) => {
    console.log(`当前执行${env.mode}模式`);

    return config;
}