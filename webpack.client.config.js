const base = require("./webpack.base.config");
const merge = require("webpack-merge");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

// populate client bundle with placeholders
if(process.env.NODE_ENV === "production") {
    process.env.TOPAZ_OKTA_DOMAIN = "{{TOPAZ_OKTA_DOMAIN}}";
    process.env.TOPAZ_OKTA_AUTHSERV = "{{TOPAZ_OKTA_AUTHSERV}}";
    process.env.TOPAZ_OKTA_CLIENTID = "{{TOPAZ_OKTA_CLIENTID}}";
    process.env.TOPAZ_OKTA_REDIRECTURI = "{{TOPAZ_OKTA_REDIRECTURI}}";
}

module.exports = merge(base, {
    mode: "development",
    entry: "./src/client.ts",
    output: {
        filename: "client.js",
        publicPath: "dist/",
    },
    plugins: [
        new VueSSRClientPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.EnvironmentPlugin([
            "TOPAZ_OKTA_DOMAIN",
            "TOPAZ_OKTA_AUTHSERV",
            "TOPAZ_OKTA_CLIENTID",
            "TOPAZ_OKTA_REDIRECTURI",
        ])
    ]
});