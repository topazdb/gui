const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueLoader = require("vue-loader");

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
        new VueSSRServerPlugin()
    ]
});