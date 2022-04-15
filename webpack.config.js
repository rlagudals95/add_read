// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/main.ts", // 번들링 시작 위치
    output: {
        path: path.join(__dirname, "/dist"), // 번들 결과물 위치
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // 템플릿 위치
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({ linkType: false, }),
        new CopyPlugin({
            patterns: [
              { from: "./dist", to: "../docs" }, // githubPage에 사용되는 docs 디렉토리에 번들파일 copy
            ],
          }),

    ],
    devServer: {
        host: "localhost", // live-server host 및 port
        port: 5700,
        hot: true // hot reload
    },
    mode: "development", // 번들링 모드 development / production
};