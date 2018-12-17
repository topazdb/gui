const merge = require("webpack-merge");
const base = require("./webpack.config");

module.exports = merge(base, {
    target: "node",
    entry: "./src/server.ts",
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    externals: Object.keys(require("./package.json")).dependencies
})