const path = require("path");
const VueLoader = require("vue-loader");

module.exports = {
    output: {
        path: __dirname + "/dist",
        publicPath: "/dist/"
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            "scss": [ "vue-style-loader", "css-loader", "sass-loader" ],
                            "sass": [ "vue-style-loader", "css-loader", "sass-loader?indentedSyntax" ]
                        }
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: "file-loader"
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "@": path.resolve("src"),
        }
    },

    plugins: [
        new VueLoader.VueLoaderPlugin()
    ]
};