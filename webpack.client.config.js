const base = require("./webpack.base.config");
const merge = require("webpack-merge");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = merge(base, {
    mode: "development",
    entry: "./src/client.ts",
    output: {
        filename: "client.js"
    },
    plugins: [
        new VueSSRClientPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
});