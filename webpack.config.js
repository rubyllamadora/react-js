const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const WebpackChunkHash = require("webpack-chunk-hash");
const isDev = process.env.NODE_ENV !== "production";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: ["./src/index.js"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDev ? "[name].js" : "[name].[chunkhash].js",
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
        extensions: ['.js', '.jsx', '.scss']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? "[name].css" : "[name].[hash].css",
            chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
        })
    ]
};
