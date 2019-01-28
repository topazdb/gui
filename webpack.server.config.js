const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(base, {
    mode: "development",
    target: "node",
    entry: "./src/server.ts",
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    externals: Object.keys(require("./package.json")).dependencies,
    plugins: [
        new VueSSRServerPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
});